-- Create user_anime_lists table for "My List" feature
CREATE TABLE public.user_anime_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  anime_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, anime_id)
);

-- Enable RLS
ALTER TABLE public.user_anime_lists ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_anime_lists
CREATE POLICY "Users can view their own list"
ON public.user_anime_lists
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own list"
ON public.user_anime_lists
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own list"
ON public.user_anime_lists
FOR DELETE
USING (auth.uid() = user_id);

-- Add view_count column to anime_videos table
ALTER TABLE public.anime_videos ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_view_count(anime_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE anime_videos SET view_count = view_count + 1 WHERE id = anime_uuid;
END;
$$;