import { Sword, Sparkles, Ghost, Rocket, Heart, Zap, Skull, Laugh } from "lucide-react";

const genres = [
  { name: "Action", icon: Sword, color: "from-red-500 to-orange-500" },
  { name: "Fantasy", icon: Sparkles, color: "from-purple-500 to-pink-500" },
  { name: "Horror", icon: Ghost, color: "from-gray-600 to-gray-800" },
  { name: "Sci-Fi", icon: Rocket, color: "from-cyan-500 to-blue-500" },
  { name: "Romance", icon: Heart, color: "from-pink-500 to-rose-500" },
  { name: "Supernatural", icon: Zap, color: "from-yellow-500 to-amber-500" },
  { name: "Thriller", icon: Skull, color: "from-emerald-600 to-teal-700" },
  { name: "Comedy", icon: Laugh, color: "from-orange-400 to-yellow-400" },
];

const GenreSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk text-foreground mb-8 text-center">
          Browse by <span className="gradient-text">Genre</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {genres.map((genre, index) => {
            const Icon = genre.icon;
            return (
              <div
                key={genre.name}
                className="group relative rounded-xl overflow-hidden cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`aspect-square bg-gradient-to-br ${genre.color} p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                  <Icon className="w-8 h-8 text-white/90" />
                  <span className="text-white font-medium text-sm text-center">
                    {genre.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
