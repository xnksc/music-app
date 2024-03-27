import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Playlist } from "@/types";
import { PlaylistMenuItem } from "./PlaylistMenuItem";
import { IoAddCircleOutline } from "react-icons/io5";
import { usePlaylistModal } from "@/hooks/useAddPlaylistModal";
import { cn } from "@/libs/helpers";
interface PlaylistsMenuProps {
  songId: string;
  playlists: Playlist[];
  size?: number;
  classNameBtn?: string;
  className?: string;
}
export const PlaylistsMenu = ({
  classNameBtn,
  className,
  songId,
  playlists,
  size = 20,
}: PlaylistsMenuProps) => {
  const playlistModal = usePlaylistModal();
  const handleClick = () => {
    if (playlists.length == 0) {
      playlistModal.onOpen();
    }
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "text-neutral-400 outline-none hover:text-neutral-100  transition",
            classNameBtn
          )}
        >
          <IoAddCircleOutline size={size} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            `text-black min-w-36 max-w-36 sm:min-w-48 md:min-w-56 max-h-[128px] overflow-y-auto  outline-none transition select-none bg-cyan-800/95 rounded-l-md scrollbar-thin  scrollbar-thumb-cyan-600/50  snap-y`,
            className
          )}
          sideOffset={5}
        >
          {playlists.map((playlist) => (
            <DropdownMenu.Item
              key={playlist.id}
              className="hover:outline-none snap-start select-none cursor-pointer"
            >
              <PlaylistMenuItem
                playlist={playlist}
                songId={songId}
              ></PlaylistMenuItem>
            </DropdownMenu.Item>
          ))}
          {playlists.length === 0 ? (
            <div className="">
              <p>No Playlists Found </p>
              <p onClick={handleClick}>Add New Playlist</p>
            </div>
          ) : (
            ""
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
