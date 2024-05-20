// import { getSongsByPlaylistId } from "@/actions/getSongsByPlaylistId";
import { useGetSongIdsByPlaylistId } from "@/hooks/useGetSongIdsByPlaylistId";
import { cn } from "@/libs/helpers";
import { usePathname } from "@/navigation";
import { Playlist } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

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
  const [isAdded, setIsAdded] = useState(false);
  const { songIds } = useGetSongIdsByPlaylistId(playlist.id);
  const pathname = usePathname();
  const color =
    pathname == "/liked"
      ? "bg-sky-800/95 hover:bg-sky-500/95"
      : pathname.startsWith("/search")
      ? "bg-stone-600/95 hover:bg-stone-400/95"
      : pathname.startsWith("/playlists")
      ? "bg-teal-800/95 hover:bg-teal-500/95"
      : "bg-cyan-800/95 hover:bg-cyan-500/95";
  const removeSongFromPlaylist = async () => {
    const { error } = await supabaseClient
      .from("playlists_songs")
      .delete()
      .eq("song_id", songId)
      .eq("playlist_id", playlist.id);
    if (error) {
      toast.error("error");
    }
    toast.success("Song removed from playlist " + playlist.title);
  };

  useEffect(() => {
    songIds?.includes(songId) ? setIsAdded(true) : setIsAdded(false);
  }, [songIds, songId]);
  const handleClick = async () => {
    if (!isAdded) {
      const { data, error } = await supabaseClient
        .from("playlists_songs")
        .select("*")
        .eq("playlist_id", playlist.id)
        .eq("song_id", songId);
      const { error: supabaseError } = await supabaseClient
        .from("playlists_songs")
        .insert([{ playlist_id: playlist.id, song_id: songId }]);
      if (supabaseError) {
        return toast.error(supabaseError.message);
      }
      toast.success("Added to playlist " + playlist.title);
      router.refresh();
    } else {
      removeSongFromPlaylist();
      router.refresh();
    }
  };

  return (
    <div
      className={cn(
        " h-[32px] flex items-center px-2 py-1 text-neutral-200 hover:text-neutral-800 font-medium",
        color
      )}
      onClick={handleClick}
    >
      <div className="truncate overflow-hidden w-full">{playlist.title}</div>
      <div className="">
        {isAdded ? <IoIosCheckmarkCircleOutline size={18} /> : ""}
      </div>
    </div>
  );
};
