-- Add foreign key relationship between user_anime_lists and anime_videos
ALTER TABLE public.user_anime_lists
ADD CONSTRAINT user_anime_lists_anime_id_fkey
FOREIGN KEY (anime_id) REFERENCES public.anime_videos(id) ON DELETE CASCADE;

-- Add category column to user_anime_lists
ALTER TABLE public.user_anime_lists
ADD COLUMN category TEXT NOT NULL DEFAULT 'plan_to_watch';