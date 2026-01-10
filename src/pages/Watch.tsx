import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, SkipBack, SkipForward, Volume2, Maximize, Settings } from "lucide-react";

interface AnimeVideo {
  id: string;
  title: string;
  video_path: string;
  thumbnail_url: string | null;
  description: string | null;
  rating: number | null;
  episodes: number | null;
  genre: string | null;
  year: number | null;
}

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState<AnimeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("anime_videos")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setVideo(data);
      }
      setLoading(false);
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">
              {video?.title || "Video Player"}
            </h1>
            {video?.genre && (
              <p className="text-sm text-muted-foreground">{video.genre}</p>
            )}
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="pt-16">
        <div className="relative aspect-video bg-secondary/50 w-full">
          {video?.video_path ? (
            <video
              src={video.video_path}
              className="w-full h-full object-contain"
              controls
              autoPlay={isPlaying}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Play className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted-foreground text-lg">
                Video path not configured
              </p>
              <p className="text-muted-foreground/60 text-sm mt-2">
                Add video path in the database to enable playback
              </p>
            </div>
          )}

          {/* Custom Controls Overlay */}
          {video?.video_path && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-secondary rounded-full mb-4 cursor-pointer">
                <div className="w-1/3 h-full bg-primary rounded-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon">
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  <span className="text-sm text-muted-foreground">00:00 / 24:00</span>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Volume2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold font-space-grotesk mb-2">
              {video?.title || "Video Title"}
            </h2>
            {video?.description && (
              <p className="text-muted-foreground mb-4">{video.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {video?.rating && <span>⭐ {video.rating}</span>}
              {video?.episodes && <span>{video.episodes} Episodes</span>}
              {video?.year && <span>{video.year}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
