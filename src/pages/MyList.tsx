import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Trash2, Play, Star, Film, FolderPlus } from "lucide-react";
import BackButton from "@/components/BackButton";
import Navbar from "@/components/Navbar";
// AI-generated images matching anime titles
import dragonsFlame from "@/assets/anime-dragons-flame.jpg";
import midnightBlade from "@/assets/anime-midnight-blade.jpg";
import spiritMageAcademy from "@/assets/anime-spirit-mage-academy.jpg";
import neonGhostProtocol from "@/assets/anime-neon-ghost-protocol.jpg";
import steelWingZero from "@/assets/anime-steel-wing-zero.jpg";
import summersEnd from "@/assets/anime-summers-end.jpg";

interface AnimeInList {
  id: string;
  anime_id: string;
  category: string;
  anime: {
    id: string;
    title: string;
    thumbnail_url: string | null;
    rating: number | null;
    episodes: number | null;
    genre: string | null;
  } | null;
}

type CategoryType = "all" | "plan_to_watch" | "watching" | "dropped";

const categories: { key: CategoryType; label: string }[] = [
  { key: "all", label: "Tất Cả" },
  { key: "plan_to_watch", label: "Dự Định Xem" },
  { key: "watching", label: "Đang Xem" },
  { key: "dropped", label: "Đã Bỏ" },
];

// AI-generated images mapped by title keywords
const getAnimeImageByTitle = (title: string | undefined): string => {
  if (!title) return dragonsFlame;
  
  const lowerTitle = title.toLowerCase();
  
  // Match by keywords in title
  if (lowerTitle.includes("dragon") || lowerTitle.includes("flame") || lowerTitle.includes("fire")) {
    return dragonsFlame;
  }
  if (lowerTitle.includes("blade") || lowerTitle.includes("midnight") || lowerTitle.includes("sword") || lowerTitle.includes("dark")) {
    return midnightBlade;
  }
  if (lowerTitle.includes("spirit") || lowerTitle.includes("mage") || lowerTitle.includes("magic") || lowerTitle.includes("academy") || lowerTitle.includes("school")) {
    return spiritMageAcademy;
  }
  if (lowerTitle.includes("neon") || lowerTitle.includes("ghost") || lowerTitle.includes("cyber") || lowerTitle.includes("protocol") || lowerTitle.includes("tech")) {
    return neonGhostProtocol;
  }
  if (lowerTitle.includes("steel") || lowerTitle.includes("wing") || lowerTitle.includes("mecha") || lowerTitle.includes("robot") || lowerTitle.includes("zero")) {
    return steelWingZero;
  }
  if (lowerTitle.includes("summer") || lowerTitle.includes("romance") || lowerTitle.includes("love") || lowerTitle.includes("heart") || lowerTitle.includes("end")) {
    return summersEnd;
  }
  
  // Default fallback - cycle through images based on title hash
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const images = [dragonsFlame, midnightBlade, spiritMageAcademy, neonGhostProtocol, steelWingZero, summersEnd];
  return images[hash % images.length];
};

const MyList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myList, setMyList] = useState<AnimeInList[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");

  useEffect(() => {
    if (user) {
      fetchMyList();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchMyList = async () => {
    const { data, error } = await supabase
      .from("user_anime_lists")
      .select(`
        id,
        anime_id,
        category,
        anime:anime_videos (
          id,
          title,
          thumbnail_url,
          rating,
          episodes,
          genre
        )
      `)
      .eq("user_id", user?.id);

    if (!error && data) {
      setMyList(data as unknown as AnimeInList[]);
    }
    setLoading(false);
  };

  const handleRemove = async (listId: string) => {
    const { error } = await supabase
      .from("user_anime_lists")
      .delete()
      .eq("id", listId);

    if (!error) {
      fetchMyList();
    }
  };

  const handleCategoryChange = async (listId: string, newCategory: string) => {
    const { error } = await supabase
      .from("user_anime_lists")
      .update({ category: newCategory })
      .eq("id", listId);

    if (!error) {
      fetchMyList();
    }
  };

  const filteredList =
    activeCategory === "all"
      ? myList
      : myList.filter((item) => item.category === activeCategory);

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <Navbar />
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold font-space-grotesk">My List</h1>
          </div>
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Đăng nhập để xem danh sách của bạn</p>
            <Button variant="hero" onClick={() => navigate("/auth")}>
              Đăng Nhập
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold font-space-grotesk">
            My <span className="gradient-text">List</span>
          </h1>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={activeCategory === cat.key ? "hero" : "glass"}
              size="sm"
              onClick={() => setActiveCategory(cat.key)}
              className="rounded-full"
            >
              {cat.label}
              {cat.key !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({myList.filter((item) => item.category === cat.key).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-pulse text-primary text-xl">Đang tải...</div>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              {activeCategory === "all"
                ? "Danh sách của bạn đang trống"
                : `Không có anime trong "${categories.find((c) => c.key === activeCategory)?.label}"`}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Thêm anime vào danh sách bằng cách nhấn "Thêm Vào Danh Sách" trên bất kỳ trang anime nào
            </p>
            <Button variant="hero" onClick={() => navigate("/")}>
              Duyệt Anime
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="relative rounded-xl overflow-hidden group border border-border/50"
              >
                {/* Background with gradient overlay */}
                <div className="absolute inset-0">
                  <img
                    src={item.anime?.thumbnail_url || getAnimeImageByTitle(item.anime?.title)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <div className="aspect-video relative">
                    <img
                      src={item.anime?.thumbnail_url || getAnimeImageByTitle(item.anime?.title)}
                      alt={item.anime?.title || "Anime"}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                      <Button
                        variant="hero"
                        size="lg"
                        onClick={() => navigate(`/watch/${item.anime_id}?ep=1`)}
                        className="scale-90 group-hover:scale-100 transition-transform"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        Xem
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 relative">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                        {item.anime?.title || "Anime Không Xác Định"}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {item.anime?.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-primary fill-primary" />
                            <span>{item.anime.rating}</span>
                          </div>
                        )}
                        {item.anime?.episodes && (
                          <div className="flex items-center gap-1">
                            <Film className="w-3 h-3" />
                            <span>{item.anime.episodes} tập</span>
                          </div>
                        )}
                        {item.anime?.genre && (
                          <span className="text-xs">{item.anime.genre.split(",")[0]}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                    {/* Category Selector */}
                    <div className="flex gap-1 flex-wrap">
                      {categories
                        .filter((c) => c.key !== "all")
                        .map((cat) => (
                          <button
                            key={cat.key}
                            onClick={() => handleCategoryChange(item.id, cat.key)}
                            className={`text-xs px-2 py-1 rounded-full transition-colors backdrop-blur-sm ${
                              item.category === cat.key
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-muted/80 text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;