import { useAuthModal } from "@/hooks/useAuthModal";
import { usePlayer } from "@/hooks/usePlayer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoRemoveCircleOutline } from "react-icons/io5";
interface DeleteSongProps {
  songPath: string;
  imgPath: string;
  className?: string;
  songId: string;
}
export const DeleteSong = ({ songId, songPath, imgPath }: DeleteSongProps) => {
  const { onClose, isOpen } = useAuthModal();
  const router = useRouter();
  const player = usePlayer();
  const supabaseClient = useSupabaseClient();
  const onDeleteSong = async () => {
    try {
      const { error } = await supabaseClient
        .from("songs")
        .delete()
        .eq("song_path", songPath);
      if (isOpen) {
        onClose();
      }
      if (player.activeId == songId) {
        player.reset();
      }
      router.refresh();
      const { error: songFileError } = await supabaseClient.storage
        .from("songs")
        .remove([songPath]);
      const { error: imgFileError } = await supabaseClient.storage
        .from("images")
        .remove([imgPath]);
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="hover:opacity-100 items-center">
      <IoRemoveCircleOutline
        className=" cursor-pointer items-center hover:opacity-100 justify-self-center"
        size={20}
        onClick={onDeleteSong}
      ></IoRemoveCircleOutline>
    </div>
  );
};
