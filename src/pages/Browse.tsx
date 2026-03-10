import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, Film, Eye } from "lucide-react";
import BackButton from "@/components/BackButton";
import { Sword, Sparkles, Ghost, Rocket, Heart, Zap, Skull, Laugh } from "lucide-react";
import { getAnimeImage, animeImageMap } from "@/lib/animeImageMap";
import Navbar from "@/components/Navbar";

interface Anime {
  id: string;
  title: string;
  thumbnail_url: string | null;
  rating: number | null;
  episodes: number | null;
  genre: string | null;
  view_count: number;
}

const genres = [
  { name: "All", icon: Sparkles, color: "from-primary to-primary/70" },
  { name: "Action", icon: Sword, color: "from-red-500 to-orange-500" },
  { name: "Fantasy", icon: Sparkles, color: "from-purple-500 to-pink-500" },
  { name: "Horror", icon: Ghost, color: "from-gray-600 to-gray-800" },
  { name: "Sci-Fi", icon: Rocket, color: "from-cyan-500 to-blue-500" },
  { name: "Romance", icon: Heart, color: "from-pink-500 to-rose-500" },
  { name: "Supernatural", icon: Zap, color: "from-yellow-500 to-amber-500" },
  { name: "Thriller", icon: Skull, color: "from-emerald-600 to-teal-700" },
  { name: "Comedy", icon: Laugh, color: "from-orange-400 to-yellow-400" },
];

// Mock data
const mockAnime = [
  { id: "1", title: "Dragon's Flame", image: animeImageMap["1"], rating: 9.1, episodes: 24, genre: "Action", view_count: 15420 },
  { id: "2", title: "Midnight Blade", image: animeImageMap["2"], rating: 8.9, episodes: 12, genre: "Fantasy", view_count: 12350 },
  { id: "3", title: "Spirit Mage Academy", image: animeImageMap["3"], rating: 8.7, episodes: 48, genre: "Adventure", view_count: 28900 },
  { id: "4", title: "Neon Ghost Protocol", image: animeImageMap["4"], rating: 9.3, episodes: 13, genre: "Sci-Fi", view_count: 45200 },
  { id: "5", title: "Steel Wing Zero", image: animeImageMap["5"], rating: 8.8, episodes: 50, genre: "Mecha", view_count: 8700 },
  { id: "6", title: "Summer's End", image: animeImageMap["6"], rating: 9.0, episodes: 12, genre: "Romance", view_count: 32100 },
];

const Browse = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genre") || "All");
  const [similarAnime, setSimilarAnime] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    fetchAnime();
  }, [selectedGenre, searchQuery]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    if (search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const fetchAnime = async () => {
    setLoading(true);
    
    let query = supabase
      .from("anime_videos")
      .select("id, title, thumbnail_url, rating, episodes, genre, view_count");

    if (selectedGenre !== "All") {
      query = query.ilike("genre", `%${selectedGenre}%`);
    }

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query.order("view_count", { ascending: false });

    if (!error && data && data.length > 0) {
      setAnimeList(data);
      // Get similar anime (different genre)
      const otherGenres = data.filter(a => 
        a.genre && !a.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      ).slice(0, 6);
      setSimilarAnime(otherGenres);
    } else {
      // Use mock data filtered by genre and search
      let filtered = selectedGenre === "All" 
        ? mockAnime 
        : mockAnime.filter(a => a.genre.toLowerCase().includes(selectedGenre.toLowerCase()));
      if (searchQuery) {
        filtered = filtered.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      setAnimeList(filtered.map(a => ({ ...a, thumbnail_url: null, view_count: a.view_count })));
      
      const similar = mockAnime.filter(a => 
        selectedGenre === "All" || !a.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      ).slice(0, 4);
      setSimilarAnime(similar.map(a => ({ ...a, thumbnail_url: null, view_count: a.view_count })));
    }
    setLoading(false);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setSearchParams(genre === "All" ? {} : { genre });
  };


  const getGenreTheme = (genre: string | null) => {
    if (!genre) return { gradient: "from-primary to-primary/70", shadow: "shadow-primary/30", border: "border-primary/30" };
    const genreLower = genre.toLowerCase();
    
    if (genreLower.includes("action")) return { gradient: "from-red-500 to-orange-500", shadow: "shadow-red-500/30", border: "border-red-500/30" };
    if (genreLower.includes("fantasy")) return { gradient: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/30", border: "border-purple-500/30" };
    if (genreLower.includes("horror")) return { gradient: "from-gray-600 to-gray-800", shadow: "shadow-gray-600/30", border: "border-gray-600/30" };
    if (genreLower.includes("sci-fi") || genreLower.includes("mecha")) return { gradient: "from-cyan-500 to-blue-500", shadow: "shadow-cyan-500/30", border: "border-cyan-500/30" };
    if (genreLower.includes("romance")) return { gradient: "from-pink-500 to-rose-500", shadow: "shadow-pink-500/30", border: "border-pink-500/30" };
    if (genreLower.includes("supernatural")) return { gradient: "from-yellow-500 to-amber-500", shadow: "shadow-yellow-500/30", border: "border-yellow-500/30" };
    if (genreLower.includes("thriller")) return { gradient: "from-emerald-600 to-teal-700", shadow: "shadow-emerald-600/30", border: "border-emerald-600/30" };
    if (genreLower.includes("comedy")) return { gradient: "from-orange-400 to-yellow-400", shadow: "shadow-orange-400/30", border: "border-orange-400/30" };
    if (genreLower.includes("adventure")) return { gradient: "from-green-500 to-emerald-500", shadow: "shadow-green-500/30", border: "border-green-500/30" };
    
    return { gradient: "from-primary to-primary/70", shadow: "shadow-primary/30", border: "border-primary/30" };
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <Navbar />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold font-space-grotesk">
            {searchQuery ? <>Kết quả: <span className="gradient-text">"{searchQuery}"</span></> : <>Duyệt theo <span className="gradient-text">Thể Loại</span></>}
          </h1>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {genres.map((genre) => {
            const Icon = genre.icon;
            const isSelected = selectedGenre === genre.name;
            return (
              <button
                key={genre.name}
                onClick={() => handleGenreSelect(genre.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isSelected
                    ? `bg-gradient-to-r ${genre.color} text-white`
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{genre.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-pulse text-primary text-xl">Loading...</div>
          </div>
        ) : (
          <>
            {/* Main Results */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                {selectedGenre === "All" ? "All Anime" : `${selectedGenre} Anime`}
                <span className="text-muted-foreground text-sm ml-2">
                  ({animeList.length} results)
                </span>
              </h2>
              
              {animeList.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No anime found for this genre</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {animeList.map((anime) => {
                    const theme = getGenreTheme(anime.genre);
                    return (
                      <div
                        key={anime.id}
                        className={`group cursor-pointer p-[2px] rounded-xl bg-gradient-to-br ${theme.gradient} transition-all duration-300 hover:shadow-lg hover:${theme.shadow} hover:scale-[1.02]`}
                        onClick={() => navigate(`/anime/${anime.id}`)}
                      >
                        <div className="bg-card rounded-[10px] overflow-hidden h-full">
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img
                              src={getAnimeImage(anime.id, anime.thumbnail_url)}
                              alt={anime.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                            
                            {/* View Count Badge */}
                            <div className="absolute top-2 right-2 glass px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{(anime.view_count / 1000).toFixed(1)}k</span>
                            </div>
                            
                            {/* Genre Badge */}
                            {anime.genre && (
                              <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${theme.gradient} text-white`}>
                                {anime.genre}
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-foreground text-sm line-clamp-1">
                              {anime.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              {anime.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className={`w-3 h-3 bg-gradient-to-r ${theme.gradient} bg-clip-text`} style={{ color: 'currentColor' }} />
                                  <span>{anime.rating}</span>
                                </div>
                              )}
                              {anime.episodes && (
                                <div className="flex items-center gap-1">
                                  <Film className="w-3 h-3" />
                                  <span>{anime.episodes} eps</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Similar Anime Recommendations */}
            {similarAnime.length > 0 && selectedGenre !== "All" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  You might also like
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {similarAnime.map((anime) => {
                    const theme = getGenreTheme(anime.genre);
                    return (
                      <div
                        key={anime.id}
                        className={`group cursor-pointer p-[2px] rounded-xl bg-gradient-to-br ${theme.gradient} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
                        onClick={() => navigate(`/anime/${anime.id}`)}
                      >
                        <div className="bg-card rounded-[10px] overflow-hidden h-full">
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img
                              src={getAnimeImage(anime.id, anime.thumbnail_url)}
                              alt={anime.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-foreground text-sm line-clamp-1">
                              {anime.title}
                            </h3>
                            <p className={`text-xs font-medium bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mt-1`}>
                              {anime.genre}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
