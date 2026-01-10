import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeList from "@/components/EpisodeList";

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
          video_path: "", // Empty - user will add later
          thumbnail_url: null,
          description: null,
          rating: null,
          episodes: 12,
          genre: null,
          year: null,
        });
      }
      setLoading(false);
    };

    fetchVideo();
  }, [id, currentEpisode]);

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
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/anime/${id}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">
              {video?.title || "Video Player"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Episode {currentEpisode} {video?.genre && `• ${video.genre}`}
            </p>
          </div>
        </div>
      </div>

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

      {/* Episode Info & List */}
      <div className="container mx-auto px-4 py-8">
        {/* Current Episode Info */}
        <div className="mb-8 p-4 glass rounded-xl">
          <h2 className="text-xl font-bold font-space-grotesk text-foreground mb-2">
            Episode {currentEpisode}
          </h2>
          <p className="text-muted-foreground">
            {video?.description || "Episode description will appear here."}
          </p>
        </div>

        {/* Episodes Grid */}
        <EpisodeList
          episodes={episodes}
          currentEpisode={currentEpisode}
          onEpisodeSelect={handleEpisodeSelect}
        />
      </div>
    </div>
  );
};

export default Watch;
