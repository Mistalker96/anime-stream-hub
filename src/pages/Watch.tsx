import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Star } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeList from "@/components/EpisodeList";
import CommentSection from "@/components/CommentSection";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";

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
  view_count: number;
}

interface Episode {
  id: string;
  episode_number: number;
  title: string;
  video_path: string;
  thumbnail_url: string | null;
  duration: string | null;
}

// Mock anime titles for display
const mockTitles: Record<string, string> = {
  "1": "Dragon's Flame",
  "2": "Midnight Blade",
  "3": "Spirit Mage Academy",
  "4": "Neon Ghost Protocol",
  "5": "Steel Wing Zero",
  "6": "Summer's End",
};

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [video, setVideo] = useState<AnimeVideo | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentVideoPath, setCurrentVideoPath] = useState("");
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const ep = searchParams.get("ep");
    if (ep) {
      setCurrentEpisode(parseInt(ep, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return;

      // Try to fetch from database
      const { data, error } = await supabase
        .from("anime_videos")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        setVideo(data);
        setCurrentVideoPath(data.video_path);

        // Increment view count
        await supabase.rpc("increment_view_count", { anime_uuid: id });

        // Fetch episodes
        const { data: episodesData } = await supabase
          .from("anime_episodes")
          .select("*")
          .eq("anime_id", id)
          .order("episode_number", { ascending: true });

        if (episodesData && episodesData.length > 0) {
          setEpisodes(episodesData);
          
          // Set video path for current episode
          const ep = episodesData.find(e => e.episode_number === currentEpisode);
          if (ep) {
            setCurrentVideoPath(ep.video_path);
          }
        }
      } else {
        // Use mock data
        setVideo({
          id: id,
          title: mockTitles[id] || "Video Player",
          video_path: "",
          thumbnail_url: null,
          description: null,
          rating: null,
          episodes: 12,
          genre: null,
          year: null,
          view_count: Math.floor(Math.random() * 50000) + 5000,
        });
      }
      setLoading(false);
    };

    fetchVideo();
  }, [id, currentEpisode]);

  // Fetch average rating from comments
  useEffect(() => {
    const fetchRatings = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("anime_comments")
        .select("rating")
        .eq("anime_id", id)
        .not("rating", "is", null);

      if (data && data.length > 0) {
        const ratings = data.map(c => c.rating).filter(r => r !== null) as number[];
        const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        setAverageRating(Math.round(avg * 10) / 10);
        setTotalRatings(ratings.length);
      }
    };

    fetchRatings();
  }, [id]);

  const handleEpisodeSelect = (episodeNumber: number) => {
    setCurrentEpisode(episodeNumber);
    setSearchParams({ ep: episodeNumber.toString() });

    // Update video path
    const ep = episodes.find(e => e.episode_number === episodeNumber);
    if (ep) {
      setCurrentVideoPath(ep.video_path);
    }
  };

  const handlePreviousEpisode = () => {
    if (currentEpisode > 1) {
      handleEpisodeSelect(currentEpisode - 1);
    }
  };

  const handleNextEpisode = () => {
    const maxEpisodes = episodes.length > 0 ? episodes.length : (video?.episodes || 12);
    if (currentEpisode < maxEpisodes) {
      handleEpisodeSelect(currentEpisode + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  const maxEpisodes = episodes.length > 0 ? episodes.length : (video?.episodes || 12);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Video Player */}
      <div className="pt-16">
        <VideoPlayer
          src={currentVideoPath}
          title={`${video?.title} - Episode ${currentEpisode}`}
          onPrevious={handlePreviousEpisode}
          onNext={handleNextEpisode}
          hasPrevious={currentEpisode > 1}
          hasNext={currentEpisode < maxEpisodes}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Current Episode Info */}
        <div className="mb-8 p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold font-space-grotesk text-foreground">
              Episode {currentEpisode}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{((video?.view_count || 0) / 1000).toFixed(1)}k views</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            {video?.description || "Episode description will appear here."}
          </p>
        </div>

        {/* User Rating Section */}
        <div className="mb-8 p-4 glass rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">User Rating</h3>
              <p className="text-sm text-muted-foreground">
                Based on {totalRatings} ratings from viewers
              </p>
            </div>
            <div className="flex items-center gap-2">
              {averageRating ? (
                <>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(averageRating)
                            ? "text-primary fill-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground ml-2">
                    {averageRating}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">No ratings yet</span>
              )}
            </div>
          </div>
        </div>

        {/* Episodes Grid */}
        <div className="mb-8">
          <EpisodeList
            episodes={episodes}
            currentEpisode={currentEpisode}
            onEpisodeSelect={handleEpisodeSelect}
          />
        </div>

        {/* Comments Section */}
        <div className="pb-8">
          <CommentSection animeId={id || ""} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
