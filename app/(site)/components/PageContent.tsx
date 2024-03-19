"use client";

import { SongItem } from "@/components/SongItem";
import useOnPlaySong from "@/hooks/useOnPlaySong";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

export const PageContent = ({ songs }: PageContentProps) => {
  const onPlaySong = useOnPlaySong(songs);
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400 ">Not available</div>;
  }

  return (
    <div className="mt-4  gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {songs.map((item) => (
        <SongItem
          onClick={(id: string) => onPlaySong(id)}
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
};
