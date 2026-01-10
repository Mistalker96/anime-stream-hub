import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Download,
  Settings,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  src: string;
  title?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const VideoPlayer = ({
  src,
  title,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [scale, setScale] = useState(1);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const scaleOptions = [
    { label: "Fit", value: 1 },
    { label: "Fill", value: 1.2 },
    { label: "Stretch", value: 1.5 },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      await container.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSpeedChange = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const handleDownload = () => {
    if (!src) return;
    const link = document.createElement("a");
    link.href = src;
    link.download = title || "video";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video bg-black w-full group"
    >
      {src ? (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
          onClick={togglePlay}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Play className="w-12 h-12 text-primary" />
          </div>
          <p className="text-muted-foreground text-lg">Video path not configured</p>
          <p className="text-muted-foreground/60 text-sm mt-2">
            Add video path in the database to enable playback
          </p>
        </div>
      )}

      {/* Controls Overlay */}
      {src && (
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4">
            <h3 className="text-foreground font-semibold truncate">{title}</h3>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center hover:bg-primary transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-primary-foreground" />
              ) : (
                <Play className="w-10 h-10 text-primary-foreground ml-1" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-12">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
              />
              <span className="text-xs text-muted-foreground w-12">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Skip Back */}
                <Button variant="ghost" size="icon" onClick={() => skip(-10)}>
                  <RotateCcw className="w-5 h-5" />
                </Button>

                {/* Previous */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                >
                  <SkipBack className="w-5 h-5" />
                </Button>

                {/* Play/Pause */}
                <Button variant="ghost" size="icon" onClick={togglePlay}>
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>

                {/* Next */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  disabled={!hasNext}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>

                {/* Skip Forward */}
                <Button variant="ghost" size="icon" onClick={() => skip(10)}>
                  <RotateCw className="w-5 h-5" />
                </Button>

                {/* Volume */}
                <div className="flex items-center gap-2 ml-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Settings Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {/* Speed Submenu */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span>Speed: {playbackSpeed}x</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {speedOptions.map((speed) => (
                          <DropdownMenuItem
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={playbackSpeed === speed ? "bg-primary/20" : ""}
                          >
                            {speed}x
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Scale Submenu */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span>Scale: {scaleOptions.find(s => s.value === scale)?.label}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {scaleOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleScaleChange(option.value)}
                            className={scale === option.value ? "bg-primary/20" : ""}
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Download */}
                <Button variant="ghost" size="icon" onClick={handleDownload}>
                  <Download className="w-5 h-5" />
                </Button>

                {/* Fullscreen */}
                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
