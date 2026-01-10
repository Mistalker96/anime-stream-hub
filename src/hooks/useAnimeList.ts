import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useAnimeList = (animeId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isInList, setIsInList] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkIfInList = useCallback(async () => {
    if (!user || !animeId) return;

    const { data } = await supabase
      .from("user_anime_lists")
      .select("id")
      .eq("user_id", user.id)
      .eq("anime_id", animeId)
      .maybeSingle();

    setIsInList(!!data);
  }, [user, animeId]);

  useEffect(() => {
    checkIfInList();
  }, [checkIfInList]);

  const addToList = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add anime to your list.",
        variant: "destructive",
      });
      return false;
    }

    if (!animeId) return false;

    setLoading(true);
    const { error } = await supabase.from("user_anime_lists").insert({
      user_id: user.id,
      anime_id: animeId,
    });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already in list",
          description: "This anime is already in your list.",
        });
        setIsInList(true);
        return false;
      }
      toast({
        title: "Error",
        description: "Failed to add to list.",
        variant: "destructive",
      });
      return false;
    }

    setIsInList(true);
    toast({
      title: "Added to list",
      description: "Anime added to your list successfully!",
    });
    return true;
  };

  const removeFromList = async () => {
    if (!user || !animeId) return false;

    setLoading(true);
    const { error } = await supabase
      .from("user_anime_lists")
      .delete()
      .eq("user_id", user.id)
      .eq("anime_id", animeId);

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove from list.",
        variant: "destructive",
      });
      return false;
    }

    setIsInList(false);
    toast({
      title: "Removed from list",
      description: "Anime removed from your list.",
    });
    return true;
  };

  const toggleList = async () => {
    if (isInList) {
      return removeFromList();
    }
    return addToList();
  };

  return {
    isInList,
    loading,
    addToList,
    removeFromList,
    toggleList,
  };
};
