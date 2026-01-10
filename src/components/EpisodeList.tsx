import { Play } from "lucide-react";

interface Episode {
  id: string;
  episode_number: number;
  title: string;
  thumbnail_url: string | null;
  duration: string | null;
}

interface EpisodeListProps {
  episodes: Episode[];
  currentEpisode?: number;
  onEpisodeSelect: (episodeNumber: number) => void;
}

const EpisodeList = ({
  episodes,
  currentEpisode,
  onEpisodeSelect,
}: EpisodeListProps) => {
  // Generate placeholder episodes if none exist
  const displayEpisodes = episodes.length > 0
    ? episodes
    : Array.from({ length: 12 }, (_, i) => ({
        id: `placeholder-${i + 1}`,
        episode_number: i + 1,
        title: `Episode ${i + 1}`,
        thumbnail_url: null,
        duration: "24:00",
      }));

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-space-grotesk text-foreground">
        Episodes ({displayEpisodes.length})
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {displayEpisodes.map((episode) => (
          <button
            key={episode.id}
            onClick={() => onEpisodeSelect(episode.episode_number)}
            className={`relative group rounded-lg overflow-hidden transition-all duration-300 ${
              currentEpisode === episode.episode_number
                ? "ring-2 ring-primary"
                : "hover:ring-2 hover:ring-primary/50"
            }`}
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-secondary/50 flex items-center justify-center">
              {episode.thumbnail_url ? (
                <img
                  src={episode.thumbnail_url}
                  alt={episode.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-3xl font-bold text-muted-foreground/30">
                  {episode.episode_number}
                </div>
              )}

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
                </div>
              </div>

              {/* Duration Badge */}
              {episode.duration && (
                <div className="absolute bottom-1 right-1 bg-background/80 px-1.5 py-0.5 rounded text-xs text-foreground">
                  {episode.duration}
                </div>
              )}

              {/* Current Episode Badge */}
              {currentEpisode === episode.episode_number && (
                <div className="absolute top-1 left-1 bg-primary px-2 py-0.5 rounded text-xs text-primary-foreground font-medium">
                  Playing
                </div>
              )}
            </div>

            {/* Episode Info */}
            <div className="p-2 bg-secondary/30">
              <p className="text-sm font-medium text-foreground truncate">
                EP {episode.episode_number}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {episode.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
