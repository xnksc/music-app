import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSongsByPlaylistId = async (id: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    return [];
  }

  const { data, error } = await supabase
    .from("playlists_songs")
    .select("*")
    .eq("playlist_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }

  const songIds = data?.map((item) => {
    return item.song_id;
  });
  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .in("id", songIds!)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return (songsData as any) || [];
};
