import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getPlaylistById = async (id: string): Promise<Playlist> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError);
  }
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
  }
  return (data as Playlist) || undefined;
};
