-- Create anime videos table for video playback
CREATE TABLE public.anime_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  video_path TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  preview_video_url TEXT,
  description TEXT,
  rating DECIMAL(3,1) DEFAULT 0,
  episodes INTEGER DEFAULT 1,
  genre TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.anime_videos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read anime videos (public content)
CREATE POLICY "Anyone can view anime videos" 
ON public.anime_videos 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_anime_videos_updated_at
BEFORE UPDATE ON public.anime_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();