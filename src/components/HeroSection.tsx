import { Play, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-anime.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Featured Anime"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl pt-16 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Now Streaming</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-4 text-shadow-glow">
            Shadow
            <span className="gradient-text"> Warrior</span>
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-foreground font-medium">9.2</span>
            </div>
            <span>•</span>
            <span>24 Episodes</span>
            <span>•</span>
            <span>Action, Fantasy</span>
            <span>•</span>
            <span>2024</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
            In a world where shadows hold unimaginable power, one warrior rises to challenge the darkness. 
            Follow the epic journey of redemption, sacrifice, and the eternal battle between light and shadow.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="hero" size="xl">
              <Play className="w-5 h-5 fill-current" />
              Xem Ngay
            </Button>
            <Button variant="glass" size="xl">
              <Plus className="w-5 h-5" />
              Thêm Vào DS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
