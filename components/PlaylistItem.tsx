import React, { useMemo } from "react";
import { MediaItem } from "./MediaItem";
import { DeletePlaylistButton } from "./DeletePlaylistButton";
import { Playlist } from "@/types";
import { useRouter } from "next/navigation";
interface PlaylistItemProps {
  playlist: Playlist;
}
export const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  const router = useRouter();
  const playlistComponent = useMemo(() => {
    const handleClick = (id: string) => {
      router.push(`/playlists/${id}`);
    };
    return (
      <MediaItem
        className="group-hover:bg-gradient-to-r  group-hover:transition group-hover:from-neutral-900/80 group-hover:to-neutral-800"
        isPlayer={false}
        key={playlist.id}
        onClick={() => handleClick(playlist.id)}
        data={playlist}
      ></MediaItem>
    );
  }, [playlist, router]);
  const deletePlaylistComponent = useMemo(() => {
    return (
      <DeletePlaylistButton
        playlistId={playlist.id}
        imgPath={playlist.image_path}
      ></DeletePlaylistButton>
    );
  }, [playlist.id, playlist.image_path]);
  return (
    <div className="flex w-full  snap-start">
      <div className="w-full group-hover:w-[calc(100%-36px)]">
        {playlistComponent}
      </div>
      <div className="hidden transition group-hover:flex opacity-60 hover:opacity-100 w-[36px] items-center justify-center">
        {deletePlaylistComponent}
      </div>
    </div>
  );
};
