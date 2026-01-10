-- Create comments table for anime reviews
CREATE TABLE public.anime_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anime_id UUID NOT NULL REFERENCES public.anime_videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create episodes table
CREATE TABLE public.anime_episodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anime_id UUID NOT NULL REFERENCES public.anime_videos(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  video_path TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.anime_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anime_episodes ENABLE ROW LEVEL SECURITY;

-- Comments policies
CREATE POLICY "Anyone can view comments" 
ON public.anime_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create comments" 
ON public.anime_comments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.anime_comments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.anime_comments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Episodes policies (public read)
CREATE POLICY "Anyone can view episodes" 
ON public.anime_episodes 
FOR SELECT 
USING (true);

-- Create trigger for comments timestamps
CREATE TRIGGER update_anime_comments_updated_at
BEFORE UPDATE ON public.anime_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();