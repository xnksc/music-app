import { Playlist } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PlaylistMenuItemProps {
  songId: string;
  playlist: Playlist;
}

export const PlaylistMenuItem = ({
  songId,
  playlist,
}: PlaylistMenuItemProps) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleClick = async () => {
    const { data, error } = await supabaseClient
      .from("playlists_songs")
      .select("*")
      .eq("playlist_id", playlist.id)
      .eq("song_id", songId);
    if (data && data.length > 0) {
      return toast.error("This song has already added!");
    }
    const { error: supabaseError } = await supabaseClient
      .from("playlists_songs")
      .insert([{ playlist_id: playlist.id, song_id: songId }]);
    if (supabaseError) {
      return toast.error(supabaseError.message);
    }
    toast.success("Song added to playlist!");
    router.refresh();
  };

  return (
    <div
      className="hover:bg-cyan-600 h-[32px] truncate px-2 py-1 rounded-md text-neutral-200 hover:text-neutral-800 font-medium"
      onClick={handleClick}
    >
      {playlist.title}
    </div>
  );
};
