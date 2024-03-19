"use client";

import { useGetSongById } from "@/hooks/useGetSongById";
import { useLoadSongUrl } from "@/hooks/useLoadSongUrl";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerContent } from "./PlayerContent";
import { Playlist } from "@/types";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/libs/helpers";

interface PlayerProps {
  playlists: Playlist[];
}

export const Player = ({ playlists }: PlayerProps) => {
  const player = usePlayer();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed flex bottom-0 bg-neutral-800 bg-gradient-to-b from-neutral-800 to-cyan-800/30 w-full mb-0 pb-0 pt-1 h-[90px] px-4">
      <PlayerContent
        song={song}
        songUrl={songUrl}
        playlists={playlists}
      ></PlayerContent>
    </div>
  );
};
