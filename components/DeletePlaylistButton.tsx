import { useAuthModal } from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoRemoveCircleOutline } from "react-icons/io5";
interface DeletePlaylistProps {
  imgPath: string;
  className?: string;
  playlistId: string;
  size?: number;
}
export const DeletePlaylistButton = ({
  playlistId,
  size = 20,
  imgPath,
}: DeletePlaylistProps) => {
  const { onClose, isOpen } = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const pathname = usePathname();
  const onDeletePlaylist = async () => {
    try {
      const { error } = await supabaseClient
        .from("playlists")
        .delete()
        .eq("id", playlistId);
      if (isOpen) {
        onClose();
      }
      if (pathname === `/playlists/${playlistId}`) {
        router.push("/");
      }

      router.refresh();
      const { error: imgFileError } = await supabaseClient.storage
        .from("images")
        .remove([imgPath]);
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="items-center ">
      <IoRemoveCircleOutline
        className=" cursor-pointer items-center text-neutral-400 hover:text-neutral-100 justify-self-center"
        size={size}
        onClick={onDeletePlaylist}
      ></IoRemoveCircleOutline>
    </div>
  );
};
