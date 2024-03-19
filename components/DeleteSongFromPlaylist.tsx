import { useAuthModal } from "@/hooks/useAuthModal";
import { usePlayer } from "@/hooks/usePlayer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoRemoveCircleOutline } from "react-icons/io5";
interface DeleteSongFromPlaylistProps {
  className?: string;
  songId: string;
  playlistId: string;
}
export const DeleteSongFromPlaylist = ({
  songId,
  playlistId,
}: DeleteSongFromPlaylistProps) => {
  const { onClose, isOpen } = useAuthModal();
  const router = useRouter();
  const player = usePlayer();
  const supabaseClient = useSupabaseClient();
  const onDeleteSongFromPlaylist = async () => {
    try {
      const { error } = await supabaseClient
        .from("playlists_songs")
        .delete()
        .eq("song_id", songId)
        .eq("playlist_id", playlistId);
      if (isOpen) {
        onClose();
      }
      if (error) {
        toast.error("error");
      }
      if (player.activeId == songId) {
        player.reset();
      }
    } catch (error) {
      toast.error("error");
    }
    router.refresh();
  };

  return (
    <div className="opacity-75 hover:opacity-100 items-center">
      <IoRemoveCircleOutline
        className=" cursor-pointer items-center hover:opacity-100 justify-self-center"
        size={20}
        onClick={onDeleteSongFromPlaylist}
      ></IoRemoveCircleOutline>
    </div>
  );
};
