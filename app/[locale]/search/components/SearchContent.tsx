"use client";

import { LikeBtn } from "@/components/LikeBtn";
import { MediaItem } from "@/components/MediaItem";
import { PlaylistsMenu } from "@/components/PlaylistsMenu";
import useOnPlaySong from "@/hooks/useOnPlaySong";
import { Playlist, Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
  playlists: Playlist[];
}
export const SearchContent = ({ songs, playlists }: SearchContentProps) => {
  const onPlay = useOnPlaySong(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-5 text-neutral-400">
        No songs found :/
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => {
        return (
          <div
            key={song.id}
            className="flex snap-start items-center w-full cursor-pointer  hover:bg-gradient-to-r rounded-md hover:from-neutral-900/80 hover:to-neutral-800"
          >
            <div className="w-[calc(100%-65px)] pr-5">
              <MediaItem
                isPlayer={false}
                onClick={(id) => onPlay(id)}
                data={song}
              ></MediaItem>
            </div>
            <div className="flex justify-self-end gap-x-3 w-[65px]">
              <div className="">
                <PlaylistsMenu
                  className="mr-3"
                  playlists={playlists}
                  songId={song.id}
                ></PlaylistsMenu>
              </div>
              <div className="">
                <LikeBtn songId={song.id}></LikeBtn>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
