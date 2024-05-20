import React from "react";
import { DeletePlaylistButton } from "./DeletePlaylistButton";
import { Playlist } from "@/types";
import { LibraryMediaItem } from "./LibraryMediaItem";
import { useRouter } from "@/navigation";
interface PlaylistItemProps {
  playlist: Playlist;
}
export const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/playlists/${id}`);
  };
  return (
    <div className="flex items-center justify-between group" key={playlist.id}>
      <div className="w-full  group-hover:w-[calc(100%-25px)]">
        <LibraryMediaItem
          className="group-hover:bg-gradient-to-r  group-hover:transition group-hover:from-neutral-900/80 group-hover:to-neutral-800"
          key={playlist.id}
          onClick={() => handleClick(playlist.id)}
          data={playlist}
        ></LibraryMediaItem>
      </div>
      <div className="hidden transition group-hover:flex  w-[25px] items-center justify-center">
        <DeletePlaylistButton
          playlistId={playlist.id}
          imgPath={playlist.image_path}
          size={16}
        ></DeletePlaylistButton>
      </div>
    </div>
  );
};
