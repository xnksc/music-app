import React from "react";
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
export const useGetSongIdsByPlaylistId = (playlistId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [songIds, setSongIds] = useState<string[] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if (!playlistId) {
      return;
    }
    setIsLoading(true);

    const fetchSongIds = async () => {
      const { data, error } = await supabaseClient
        .from("playlists_songs")
        .select("*")
        .eq("playlist_id", playlistId)
        .order("created_at", { ascending: false });
      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      const songIds = data?.map((item) => item.song_id);
      setSongIds(songIds); // 5 6 8
      setIsLoading(false);
    };
    fetchSongIds();
  }, [playlistId, supabaseClient]);
  return useMemo(
    () => ({
      isLoading,
      songIds,
    }),
    [isLoading, songIds]
  );
};
