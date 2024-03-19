import React, { memo } from "react";
import { TbPlaylist } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useUploadModal } from "@/hooks/useUploadModal";
import { Playlist, Song } from "@/types";
import { MediaItem } from "./MediaItem";
import useOnPlaySong from "@/hooks/useOnPlaySong";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { DeleteSong } from "./DeleteSong";
import { SongsList } from "./SongsList";
import { PlaylistsMenu } from "./PlaylistsMenu";

interface LibraryProps {
  songs: Song[];
  playlists: Playlist[];
}

export const Library = ({ songs, playlists }: LibraryProps) => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();
  const onPlay = useOnPlaySong(songs);
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className=" bg-gradient-to-b from-neutral-900 to-neutral-800 flex items-center justify-between sticky top-0  z-10 px-5 pt-4 pb-2">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26}></TbPlaylist>
          <p className="text-neutral-400 font-medium text-md">Library</p>
        </div>
        <FaPlus
          className="text-neutral-400 
          cursor-pointer
        hover:text-white
        transition"
          onClick={onClick}
          size={20}
        />
      </div>
      <div className="flex flex-col h-full px-3 overflow-y-auto gap-y-2">
        {songs.map((song) => {
          return (
            <div
              className="flex items-center justify-between group"
              key={song.id}
            >
              <div className="w-full group-hover:w-[calc(100%-50px)]">
                <MediaItem
                  className=" group-hover:bg-gradient-to-r group-hover:transition group-hover:from-neutral-900/80 group-hover:to-neutral-800"
                  isPlayer={false}
                  onClick={(id) => onPlay(id)}
                  key={song.id}
                  data={song}
                ></MediaItem>
              </div>
              <div className="hidden transition group-hover:flex opacity-60 hover:opacity-100 w-[25px] items-center justify-center">
                <PlaylistsMenu
                  songId={song.id}
                  playlists={playlists}
                  size={20}
                ></PlaylistsMenu>
              </div>
              <div className="hidden transition group-hover:flex opacity-60 hover:opacity-100 w-[25px] items-center justify-center">
                <DeleteSong
                  songId={song.id}
                  songPath={song.song_path}
                  imgPath={song.image_path}
                ></DeleteSong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
