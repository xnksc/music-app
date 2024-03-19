import { Song } from "@/types";
import { usePlayer } from "./usePlayer";
import { useAuthModal } from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlaySong = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlaySong = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setId(id);

    // Будет плейлист в текущей директории (избранное библиотека или поиск)
    player.setIds(songs.map((song) => song.id));
  };
  return onPlaySong;
};

export default useOnPlaySong;
