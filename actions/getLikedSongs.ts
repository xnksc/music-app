import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getLikedSongs = async (): Promise<{
  songs: Song[];
  createdAt: number[] | undefined;
}> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });
  if (error || !data) {
    return { songs: [], createdAt: [] };
  }

  const songs = data.map((item) => ({
    ...item.songs,
  }));
  const createdTime = data.map((item) => item.created_at);

  return { songs, createdAt: createdTime };
};
