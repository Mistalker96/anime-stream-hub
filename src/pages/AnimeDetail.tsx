import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Plus, Check, Star, Calendar, Film, Eye } from "lucide-react";
import { useAnimeList } from "@/hooks/useAnimeList";
import CommentSection from "@/components/CommentSection";
import EpisodeList from "@/components/EpisodeList";
import { getAnimeImage, animeImageMap } from "@/lib/animeImageMap";
import anime1 from "@/assets/anime-1.jpg";

interface AnimeData {
  id: string;
  title: string;
  description: string | null;
  rating: number | null;
  episodes: number | null;
  genre: string | null;
  year: number | null;
  thumbnail_url: string | null;
  view_count: number;
}

interface Episode {
  id: string;
  episode_number: number;
  title: string;
  thumbnail_url: string | null;
  duration: string | null;
}

// Mock data for display
const mockAnimeData: Record<string, AnimeData & { image: string }> = {
  "1": {
    id: "1",
    title: "Dragon's Flame",
    description: "Ancient dragons awaken from their slumber, and only those with the flame within can stand against the coming storm. Follow the journey of a young warrior who discovers they possess the legendary Dragon's Flame, a power that could either save or destroy the world. As dark forces gather, alliances are forged and broken, and the fate of all living things hangs in the balance.",
    rating: 9.1,
    episodes: 24,
    genre: "Action, Adventure, Fantasy",
    year: 2024,
    thumbnail_url: null,
    image: animeImageMap["1"],
    view_count: 15420,
  },
  "2": {
    id: "2",
    title: "Midnight Blade",
    description: "Under the pale moonlight, a lone swordsman walks the path of vengeance. His blade cuts through darkness, seeking the truth hidden in the shadows of the night.",
    rating: 8.9,
    episodes: 12,
    genre: "Fantasy, Drama, Action",
    year: 2024,
    thumbnail_url: null,
    image: animeImageMap["2"],
    view_count: 12350,
  },
  "3": {
    id: "3",
    title: "Spirit Mage Academy",
    description: "At the most prestigious academy for spirit wielders, young students discover their powers and forge bonds that will shape the future of the magical realm.",
    rating: 8.7,
    episodes: 48,
    genre: "Adventure, School, Fantasy",
    year: 2024,
    thumbnail_url: null,
    image: animeImageMap["3"],
    view_count: 28900,
  },
  "4": {
    id: "4",
    title: "Neon Ghost Protocol",
    description: "In a cyberpunk future where consciousness can be digitized, a team of elite hackers discovers a conspiracy that threatens both the digital and physical worlds.",
    rating: 9.3,
    episodes: 13,
    genre: "Sci-Fi, Thriller, Action",
    year: 2024,
    thumbnail_url: null,
    image: animeImageMap["4"],
    view_count: 45200,
  },
  "5": {
    id: "5",
    title: "Steel Wing Zero",
    description: "Giant mechanical warriors clash in a war that spans galaxies. Young pilot Rei inherits the legendary Steel Wing Zero, the most powerful mecha ever created.",
    rating: 8.8,
    episodes: 50,
    genre: "Mecha, Sci-Fi, Action",
    year: 2024,
    thumbnail_url: null,
    image: animeImageMap["5"],
    view_count: 8700,
  },
  "6": {
    id: "6",
    title: "Summer's End",
    description: "A heartfelt story about a group of friends spending their last summer together before adulthood takes them on separate paths.",
    rating: 9.0,
    episodes: 12,
    genre: "Slice of Life, Drama, Romance",
    year: 2024,
    thumbnail_url: null,
    image: animeImageMap["6"],
    view_count: 32100,
  },
};

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<(AnimeData & { image?: string }) | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const { isInList, loading: listLoading, toggleList } = useAnimeList(id);

  useEffect(() => {
    const fetchAnimeData = async () => {
      if (!id) return;

      const { data: dbAnime } = await supabase
        .from("anime_videos")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (dbAnime) {
        setAnime(dbAnime);
        
        const { data: episodesData } = await supabase
          .from("anime_episodes")
          .select("*")
          .eq("anime_id", id)
          .order("episode_number", { ascending: true });

        if (episodesData) {
          // Set episode thumbnails from the anime image map
          const animeImg = animeImageMap[id];
          const enrichedEpisodes = episodesData.map(ep => ({
            ...ep,
            thumbnail_url: ep.thumbnail_url || animeImg || null,
          }));
          setEpisodes(enrichedEpisodes);
        }
      } else {
        const mockData = mockAnimeData[id];
        if (mockData) {
          setAnime(mockData);
        }
      }
      
      setLoading(false);
    };

    fetchAnimeData();
  }, [id]);

  const handleEpisodeSelect = (episodeNumber: number) => {
    navigate(`/watch/${id}?ep=${episodeNumber}`);
  };

  const handleWatchNow = () => {
    navigate(`/watch/${id}?ep=1`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-xl mb-4">Anime not found</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const displayImage = getAnimeImage(anime.id, (anime as any).image || anime.thumbnail_url);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full">
        <img
          src={displayImage}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        <Button
          variant="glass"
          size="icon"
          className="absolute top-4 left-4 z-10"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-40 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-4 text-shadow-glow">
            {anime.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            {anime.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-foreground font-medium">{anime.rating}</span>
              </div>
            )}
            {anime.episodes && (
              <div className="flex items-center gap-1">
                <Film className="w-4 h-4" />
                <span>{anime.episodes} Episodes</span>
              </div>
            )}
            {anime.genre && <span>{anime.genre}</span>}
            {anime.year && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{anime.year}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{((anime.view_count || 0) / 1000).toFixed(1)}k views</span>
            </div>
          </div>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {anime.description || "No description available."}
          </p>

          <div className="flex items-center gap-4 mb-12">
            <Button variant="hero" size="xl" onClick={handleWatchNow}>
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </Button>
            <Button 
              variant={isInList ? "secondary" : "glass"} 
              size="xl"
              onClick={toggleList}
              disabled={listLoading}
            >
              {isInList ? (
                <>
                  <Check className="w-5 h-5" />
                  In My List
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add to List
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <EpisodeList
            episodes={episodes}
            onEpisodeSelect={handleEpisodeSelect}
          />
        </div>

        <div className="pb-16">
          <CommentSection animeId={id || ""} />
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
