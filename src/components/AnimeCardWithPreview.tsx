import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Star } from "lucide-react";

interface AnimeCardWithPreviewProps {
  id?: string;
  title: string;
  image: string;
  rating: number;
  episodes: number;
  genre: string;
  previewVideo?: string;
}

const AnimeCardWithPreview = ({
  id,
  title,
  image,
  rating,
  episodes,
  genre,
  previewVideo,
}: AnimeCardWithPreviewProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && previewVideo) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, which is fine
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (id) {
      navigate(`/watch/${id}`);
    }
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden anime-card-glow cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Image / Video Container */}
      <div className="aspect-[3/4] overflow-hidden">
        {/* Static Image */}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovering && previewVideo ? "opacity-0" : "opacity-100"
          } group-hover:scale-110`}
        />

        {/* Preview Video (shown on hover) */}
        {previewVideo && (
          <video
            ref={videoRef}
            src={previewVideo}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
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

export default AnimeCardWithPreview;
