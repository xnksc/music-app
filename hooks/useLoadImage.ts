"use client";
import { Playlist, Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type SongOrPlaylist = Song | Playlist;

export const useLoadImage = (data: SongOrPlaylist) => {
  const supabaseClient = useSupabaseClient();

  if (!data) {
    return null;
  }
  const { data: imgData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(data.image_path);

  return imgData.publicUrl;
};
