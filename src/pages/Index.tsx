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
        title="Đang Thịnh Hành" 
        subtitle="Anime được xem nhiều nhất tuần này"
      />
      <GenreSection />
      <AnimeSection 
        title="Mới Phát Hành" 
        subtitle="Các tập mới vừa cập nhật"
      />
      <Footer />
    </main>
  );
};

export default Index;
