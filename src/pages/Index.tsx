import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import AnimeSection from "@/components/AnimeSection";
import GenreSection from "@/components/GenreSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <AnimeSection 
        title="Trending Now" 
        subtitle="Most watched anime this week"
      />
      <GenreSection />
      <AnimeSection 
        title="New Releases" 
        subtitle="Fresh episodes just dropped"
      />
      <Footer />
    </main>
  );
};

export default Index;
