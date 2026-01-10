import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, Trash2, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  user_id: string;
  user_email: string;
  content: string;
  rating: number | null;
  created_at: string;
}

interface CommentSectionProps {
  animeId: string;
}

const CommentSection = ({ animeId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [animeId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("anime_comments")
      .select("*")
      .eq("anime_id", animeId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a comment.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("anime_comments").insert({
      anime_id: animeId,
      user_id: user.id,
      user_email: user.email || "Anonymous",
      content: newComment.trim(),
      rating: rating > 0 ? rating : null,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Comment posted successfully!",
      });
      setNewComment("");
      setRating(0);
      fetchComments();
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase
      .from("anime_comments")
      .delete()
      .eq("id", commentId);

    if (!error) {
      toast({
        title: "Deleted",
        description: "Comment deleted successfully.",
      });
      fetchComments();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-space-grotesk text-foreground">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="glass rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">Your rating:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(rating === star ? 0 : star)}
                className="transition-colors"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= rating
                      ? "text-primary fill-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <Textarea
          placeholder={user ? "Share your thoughts..." : "Sign in to leave a comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-secondary/50 border-border resize-none"
          rows={3}
          disabled={!user}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="hero"
            disabled={!user || loading || !newComment.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="glass rounded-xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {comment.user_email.split("@")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {comment.rating && (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= comment.rating!
                              ? "text-primary fill-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {user?.id === comment.user_id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(comment.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
