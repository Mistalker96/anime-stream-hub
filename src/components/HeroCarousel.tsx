import { useState, useEffect } from "react";
import { Play, Plus, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAnimeList } from "@/hooks/useAnimeList";
import onePieceBg from "@/assets/one-piece-bg.jpg";
import attackOnTitanBg from "@/assets/attack-on-titan-bg.jpg";
import jujutsuKaisenBg from "@/assets/jujutsu-kaisen-bg.jpg";
import fireForceBg from "@/assets/fire-force-bg.jpg";
import demonSlayerBg from "@/assets/demon-slayer-bg.jpg";
import myHeroAcademiaBg from "@/assets/my-hero-academia-bg.jpg";

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
    id: "11111111-1111-1111-1111-111111111111",
    title: "One",
    subtitle: "Piece",
    image: onePieceBg,
    rating: 9.5,
    episodes: 1100,
    genres: "Action, Adventure, Comedy",
    year: 1999,
    description:
      "Follow Monkey D. Luffy and his pirate crew in their epic adventure to find the legendary One Piece treasure and become the Pirate King. A journey of friendship, dreams, and battles across the Grand Line.",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "Attack on",
    subtitle: "Titan",
    image: attackOnTitanBg,
    rating: 9.4,
    episodes: 94,
    genres: "Action, Drama, Fantasy",
    year: 2013,
    description:
      "Humanity fights for survival against giant humanoid Titans that devour humans. Eren Yeager and his friends join the military to uncover the truth behind the Titans and reclaim their world.",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "Jujutsu",
    subtitle: "Kaisen",
    image: jujutsuKaisenBg,
    rating: 9.2,
    episodes: 48,
    genres: "Action, Supernatural, School",
    year: 2020,
    description:
      "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse. Navigate the dark world of curses, sorcery, and the battle between good and evil.",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    title: "Fire",
    subtitle: "Force",
    image: fireForceBg,
    rating: 8.8,
    episodes: 48,
    genres: "Action, Supernatural, Sci-Fi",
    year: 2019,
    description:
      "In a world where humans spontaneously combust, Special Fire Force Company 8 fights against Infernals. Shinra Kusakabe seeks the truth about his family and the source of these flames.",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    title: "Demon",
    subtitle: "Slayer",
    image: demonSlayerBg,
    rating: 9.3,
    episodes: 55,
    genres: "Action, Supernatural, Historical",
    year: 2019,
    description:
      "Tanjiro Kamado becomes a demon slayer to avenge his family and cure his sister Nezuko. Experience breathtaking animation and emotional storytelling in this tale of determination.",
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    title: "My Hero",
    subtitle: "Academia",
    image: myHeroAcademiaBg,
    rating: 8.9,
    episodes: 138,
    genres: "Action, Comedy, School",
    year: 2016,
    description:
      "In a world where 80% of the population has superpowers, Izuku Midoriya dreams of becoming a hero despite being born powerless. His life changes when he meets the greatest hero, All Might.",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const slide = slides[currentSlide];
  const { isInList, toggleList, loading } = useAnimeList(slide.id);

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
            <span className="text-sm text-muted-foreground">Anime Phổ Biến</span>
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
            <span>{slide.episodes}+ Tập</span>
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
            <Button variant="hero" size="xl" onClick={() => navigate(`/watch/${slide.id}?ep=1`)}>
              <Play className="w-5 h-5 fill-current" />
              Xem Ngay
            </Button>
            <Button 
              variant="glass" 
              size="xl" 
              onClick={toggleList}
              disabled={loading}
            >
              <Plus className={`w-5 h-5 transition-transform ${isInList ? "rotate-45" : ""}`} />
              {isInList ? "Đã Thêm" : "Thêm Vào Danh Sách"}
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