"use client";
import React, { useEffect, useState } from "react";
import { MediaItem } from "@/components/MediaItem";
import useOnPlaySong from "@/hooks/useOnPlaySong";
import { FaPlay } from "react-icons/fa6";
import { LikeBtn } from "@/components/LikeBtn";
import { Song } from "@/types";
import { DeleteSongFromPlaylist } from "@/components/DeleteSongFromPlaylist";
import { PiListNumbersLight } from "react-icons/pi";
import { TimeAgoComponent } from "@/components/TimeAgoComponent";

interface PlaylistSongsProps {
  playlistId: string;
  songs: Song[];
  createdDate: string[];
}
export const PlaylistSongs = ({
  songs,
  playlistId,
  createdDate,
}: PlaylistSongsProps) => {
  const onPlay = useOnPlaySong(songs);
  const [firstSongId, setFirstSongId] = useState("");
  useEffect(() => {
    setFirstSongId(songs[0]?.id);
  }, [songs]);

  if (songs.length <= 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs available
      </div>
    );
  }

  return (
    <div className="bg-neutral-800 w-full overflow-y-auto overflow-hidden">
      <div
        className="cursor-pointer flex justify-start px-6 py-1"
        onClick={() => onPlay(firstSongId)}
      >
        <button
          className="transition  rounded-full flex items-center
           bg-teal-500/80 p-4 drop-shadow-md translate hover:scale-110 hover:bg-teal-500"
        >
          <FaPlay className="text-neutral-800"></FaPlay>
        </button>
      </div>
      <div className="flex flex-col gap-y-2 w-full snap-y p-6">
        <div className="grid grid-cols-6 gap-x-4 text-neutral-400">
          <div className="sm:col-span-4 col-span-3 flex items-center">
            <PiListNumbersLight className="hidden xs:w-[48px] xs:block" />
            <h1 className="">Song</h1>
          </div>
          <h1 className="col-span-2 sm:col-span-1">Added</h1>
        </div>
        <div className="w-full h-[1px] bg-neutral-600/90 mb-2"></div>
        {songs!.map((song, i) => {
          return (
            <div
              className="hover:bg-gradient-to-r grid grid-cols-6  cursor-pointer hover:from-neutral-900/80 hover:to-neutral-800 items-center rounded-md gap-x-4 w-full"
              key={song.id}
            >
              <div
                className="flex flex-1 items-center sm:col-span-4 col-span-3"
                onClick={() => onPlay(song.id)}
              >
                <div className="text-neutral-400 min-w-[48px] min-h-[48px]  hidden xs:flex items-center justify-center">
                  {i + 1}{" "}
                </div>

                <MediaItem data={song}></MediaItem>
              </div>
              <TimeAgoComponent
                className="col-span-2 sm:col-span-1 text-sm text-neutral-400"
                dateStr={createdDate[i]}
              ></TimeAgoComponent>

              <div className="flex justify-end gap-x-3">
                <DeleteSongFromPlaylist
                  className="text-neutral-400 opacity-100"
                  songId={song.id}
                  playlistId={playlistId}
                ></DeleteSongFromPlaylist>
                <LikeBtn songId={song.id} size={20}></LikeBtn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
