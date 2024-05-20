"use client";

import { useGetSongById } from "@/hooks/useGetSongById";
import { useLoadSongUrl } from "@/hooks/useLoadSongUrl";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerContent } from "./PlayerContent";
import { Playlist } from "@/types";
import { cn } from "@/libs/helpers";
import { usePathname } from "@/navigation";

interface PlayerProps {
  playlists: Playlist[];
}

export const Player = ({ playlists }: PlayerProps) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);
  const pathname = usePathname();
  const color =
    pathname == "/liked"
      ? "to-sky-700/30"
      : pathname.startsWith("/search")
      ? "to-stone-500/30"
      : pathname.startsWith("/playlists")
      ? "to-teal-700/30"
      : "to-cyan-700/30";
  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed flex bottom-0 bg-neutral-800 bg-gradient-to-b from-neutral-800 to-cyan-800/30 w-full mb-0 pb-0 pt-1 h-[90px] px-4",
        color
      )}
    >
      <PlayerContent
        song={song}
        songUrl={songUrl}
        playlists={playlists}
      ></PlayerContent>
    </div>
  );
};
