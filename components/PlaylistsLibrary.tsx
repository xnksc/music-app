import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { Playlist } from "@/types";

import { usePlaylistModal } from "@/hooks/useAddPlaylistModal";
import { PlaylistItem } from "./PlaylistItem";

interface PlaylistsLibraryProps {
  playlists: Playlist[];
}

export const PlaylistsLibrary = ({ playlists }: PlaylistsLibraryProps) => {
  const authModal = useAuthModal();
  const playlistModal = usePlaylistModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return playlistModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-between sticky top-0
       bg-gradient-to-b from-neutral-900 to-neutral-800 z-10 px-5 pt-4 pb-2"
      >
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26}></TbPlaylist>
          <p className="text-neutral-400 font-medium text-md">Playlists</p>
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
      <div className="flex flex-col h-full px-3 snap-y overflow-y-auto gap-y-2">
        {playlists.map((playlist) => {
          return (
            <div
              className="flex items-center snap-start justify-between group"
              key={playlist.id}
            >
              <PlaylistItem playlist={playlist}></PlaylistItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};
