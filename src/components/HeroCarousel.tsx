import { useState, useEffect } from "react";
import { Play, Plus, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-anime.jpg";
import anime1 from "@/assets/anime-1.jpg";
import anime2 from "@/assets/anime-2.jpg";
import anime3 from "@/assets/anime-3.jpg";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  rating: number;
  episodes: number;
  genres: string;
  year: number;
  description: string;
}

const slides: HeroSlide[] = [
  {
    id: "1",
    title: "Shadow",
    subtitle: "Warrior",
    image: heroImage,
    rating: 9.2,
    episodes: 24,
    genres: "Action, Fantasy",
    year: 2024,
    description:
      "In a world where shadows hold unimaginable power, one warrior rises to challenge the darkness. Follow the epic journey of redemption, sacrifice, and the eternal battle between light and shadow.",
  },
  {
    id: "2",
    title: "Dragon's",
    subtitle: "Flame",
    image: anime1,
    rating: 9.1,
    episodes: 24,
    genres: "Action, Adventure",
    year: 2024,
    description:
      "Ancient dragons awaken from their slumber, and only those with the flame within can stand against the coming storm. An epic saga of power, destiny, and fire.",
  },
  {
    id: "3",
    title: "Midnight",
    subtitle: "Blade",
    image: anime2,
    rating: 8.9,
    episodes: 12,
    genres: "Fantasy, Drama",
    year: 2024,
    description:
      "Under the pale moonlight, a lone swordsman walks the path of vengeance. His blade cuts through darkness, seeking the truth hidden in the shadows of the night.",
  },
  {
    id: "4",
    title: "Spirit",
    subtitle: "Academy",
    image: anime3,
    rating: 8.7,
    episodes: 48,
    genres: "Adventure, School",
    year: 2024,
    description:
      "At the most prestigious academy for spirit wielders, young students discover their powers and forge bonds that will shape the future of the magical realm.",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={`${slide.title} ${slide.subtitle}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div
          className={`max-w-2xl pt-16 transition-all duration-500 ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Now Streaming</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-4 text-shadow-glow">
            {slide.title}
            <span className="gradient-text"> {slide.subtitle}</span>
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-foreground font-medium">{slide.rating}</span>
            </div>
            <span>•</span>
            <span>{slide.episodes} Episodes</span>
            <span>•</span>
            <span>{slide.genres}</span>
            <span>•</span>
            <span>{slide.year}</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
            {slide.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="hero" size="xl">
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </Button>
            <Button variant="glass" size="xl">
              <Plus className="w-5 h-5" />
              Add to List
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;
