import { PlaylistSong, Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

export const getSongsByPlaylistId = async (
  id: string
): Promise<{ sortedSongs: Song[]; createdDate: string[] | undefined }> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    return Promise.reject(new Error("Error to get data"));
  }

  const { data, error } = await supabase
    .from("playlists_songs")
    .select("*")
    .eq("playlist_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    toast("error");
  }

  const songIds = data?.map((item) => item.song_id);
  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .in("id", songIds!);
  if (error) {
    console.log(error);
  }
  const sortedSongs = songsData!.sort((a, b) => {
    const indexA = songIds!.indexOf(a.id);
    const indexB = songIds!.indexOf(b.id);
    return indexA - indexB;
  });
  const plalistsSongsDate = data?.map((item) => item.created_at);

  return { sortedSongs, createdDate: plalistsSongsDate };
};
