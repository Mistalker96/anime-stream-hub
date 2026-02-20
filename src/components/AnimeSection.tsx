import AnimeCardWithPreview from "@/components/AnimeCardWithPreview";
import { animeImageMap } from "@/lib/animeImageMap";

interface AnimeSectionProps {
  title: string;
  subtitle?: string;
}

const animeData = [
  { 
    id: "ab19eaf5-8457-4c5d-8556-4bda30f98e74",
    title: "Solo Leveling", 
    image: animeImageMap["ab19eaf5-8457-4c5d-8556-4bda30f98e74"], 
    rating: 9.6, 
    episodes: 12, 
    genre: "Action",
    previewVideo: "/videos/solo-leveling-ep1.mp4"
  },
  { 
    id: "33333333-3333-3333-3333-333333333333",
    title: "Jujutsu Kaisen", 
    image: animeImageMap["33333333-3333-3333-3333-333333333333"], 
    rating: 9.2, 
    episodes: 48, 
    genre: "Supernatural",
    previewVideo: "/videos/jujutsu-kaisen-ep1.mp4"
  },
  { 
    id: "dddd1111-1111-1111-1111-111111111111",
    title: "Death Note", 
    image: animeImageMap["dddd1111-1111-1111-1111-111111111111"], 
    rating: 9.4, 
    episodes: 37, 
    genre: "Thriller",
    previewVideo: ""
  },
  { 
    id: "ffff1111-1111-1111-1111-111111111111",
    title: "Hunter x Hunter", 
    image: animeImageMap["ffff1111-1111-1111-1111-111111111111"], 
    rating: 9.5, 
    episodes: 148, 
    genre: "Adventure",
    previewVideo: ""
  },
  { 
    id: "bbbb1111-1111-1111-1111-111111111111",
    title: "Tokyo Ghoul", 
    image: animeImageMap["bbbb1111-1111-1111-1111-111111111111"], 
    rating: 8.7, 
    episodes: 48, 
    genre: "Horror",
    previewVideo: ""
  },
  { 
    id: "cccc1111-1111-1111-1111-111111111111",
    title: "Your Lie in April", 
    image: animeImageMap["cccc1111-1111-1111-1111-111111111111"], 
    rating: 9.2, 
    episodes: 22, 
    genre: "Romance",
    previewVideo: ""
  },
  { 
    id: "aaaa1111-1111-1111-1111-111111111111",
    title: "Mushoku Tensei", 
    image: animeImageMap["aaaa1111-1111-1111-1111-111111111111"], 
    rating: 9.0, 
    episodes: 23, 
    genre: "Fantasy",
    previewVideo: ""
  },
  { 
    id: "eeee1111-1111-1111-1111-111111111111",
    title: "Gintama", 
    image: animeImageMap["eeee1111-1111-1111-1111-111111111111"], 
    rating: 9.3, 
    episodes: 367, 
    genre: "Comedy",
    previewVideo: ""
  },
];

const AnimeSection = ({ title, subtitle }: AnimeSectionProps) => {
  return (
    <section className="py-16" id="browse">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <a
            href="#"
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium hidden md:block"
          >
            Xem Tất Cả →
          </a>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {animeData.map((anime, index) => (
            <div
              key={anime.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AnimeCardWithPreview {...anime} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimeSection;
