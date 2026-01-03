import AnimeCard from "@/components/AnimeCard";
import anime1 from "@/assets/anime-1.jpg";
import anime2 from "@/assets/anime-2.jpg";
import anime3 from "@/assets/anime-3.jpg";
import anime4 from "@/assets/anime-4.jpg";
import anime5 from "@/assets/anime-5.jpg";
import anime6 from "@/assets/anime-6.jpg";

interface AnimeSectionProps {
  title: string;
  subtitle?: string;
}

const animeData = [
  { title: "Dragon's Flame", image: anime1, rating: 9.1, episodes: 24, genre: "Action" },
  { title: "Midnight Blade", image: anime2, rating: 8.9, episodes: 12, genre: "Fantasy" },
  { title: "Spirit Mage Academy", image: anime3, rating: 8.7, episodes: 48, genre: "Adventure" },
  { title: "Neon Ghost Protocol", image: anime4, rating: 9.3, episodes: 13, genre: "Sci-Fi" },
  { title: "Steel Wing Zero", image: anime5, rating: 8.8, episodes: 50, genre: "Mecha" },
  { title: "Summer's End", image: anime6, rating: 9.0, episodes: 12, genre: "Slice of Life" },
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
            View All →
          </a>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {animeData.map((anime, index) => (
            <div
              key={anime.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AnimeCard {...anime} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimeSection;
