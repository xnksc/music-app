import { useAuthModal } from "@/hooks/useAuthModal";
import { cn } from "@/libs/helpers";
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
  className,
}: DeleteSongFromPlaylistProps) => {
  const { onClose, isOpen } = useAuthModal();
  const router = useRouter();
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
    } catch (error) {
      toast.error("error");
    }
    router.refresh();
  };

  return (
    <div className="items-center">
      <IoRemoveCircleOutline
        className={cn(
          "cursor-pointer items-center text-neutral-400 hover:text-neutral-100 justify-self-center",
          className
        )}
        size={20}
        onClick={onDeleteSongFromPlaylist}
      ></IoRemoveCircleOutline>
    </div>
  );
};
