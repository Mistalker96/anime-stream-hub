import { Play, Star } from "lucide-react";

interface AnimeCardProps {
  title: string;
  image: string;
  rating: number;
  episodes: number;
  genre: string;
}

const AnimeCard = ({ title, image, rating, episodes, genre }: AnimeCardProps) => {
  return (
    <div className="group relative rounded-xl overflow-hidden anime-card-glow cursor-pointer">
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Rating Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 glass rounded-full px-2 py-1">
        <Star className="w-3 h-3 text-primary fill-primary" />
        <span className="text-xs font-medium text-foreground">{rating}</span>
      </div>

      {/* Play Button (appears on hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
          <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{episodes} EP</span>
          <span>•</span>
          <span>{genre}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
