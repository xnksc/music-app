import { Song } from "@/types";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import React from "react";
import { MediaItem } from "./MediaItem";
import { DeleteSong } from "./DeleteSong";
import useOnPlaySong from "@/hooks/useOnPlaySong";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
interface SongsListProps {
  songs: Song[];
}
export const SongsList = ({ songs }: SongsListProps) => {
  const onPlay = useOnPlaySong(songs);
  return (
    <ScrollArea.Root className=" h-full rounded overflow-y-auto bg-neutral-400">
      <ScrollArea.Viewport className="w-full h-full rounded">
        <div className="py-[15px] px-5">
          {songs.map((song) => {
            return (
              <div className="flex items-center group" key={song.id}>
                <MediaItem
                  className="w-[86%] group-hover:bg-gradient-to-r group-hover:from-neutral-900/80 group-hover:to-neutral-800"
                  isPlayer={false}
                  onClick={(id) => onPlay(id)}
                  key={song.id}
                  data={song}
                ></MediaItem>
                <div className="hidden transition group-hover:flex opacity-60 hover:opacity-100 w-[14%] items-center justify-center">
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
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex " orientation="vertical">
        <ScrollArea.Thumb className="flex-1" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-red-500" />
    </ScrollArea.Root>
  );
};
