"use client";

import React, { useEffect, useState } from "react";

import { MediaItem } from "@/components/MediaItem";
import useOnPlaySong from "@/hooks/useOnPlaySong";
import { FaPlay } from "react-icons/fa6";
import { LikeBtn } from "@/components/LikeBtn";
import { Song } from "@/types";
import { DeleteSongFromPlaylist } from "@/components/DeleteSongFromPlaylist";
interface PlaylistSongsProps {
  playlistId: string;
  songs: Song[];
}
export const PlaylistSongs = ({ songs, playlistId }: PlaylistSongsProps) => {
  const onPlay = useOnPlaySong(songs);
  const [firstSongId, setFirstSongId] = useState("");
  useEffect(() => {
    setFirstSongId(songs[0]?.id);
  }, [songs]);
  return (
    <div className="bg-neutral-800 w-full overflow-y-auto overflow-hidden">
      {songs.length > 0 ? (
        <div
          className="cursor-pointer flex justify-start  px-6 py-1"
          onClick={() => onPlay(firstSongId)}
        >
          <button
            className="transition  rounded-full flex items-center
           bg-sky-500/60 p-4 drop-shadow-md translate hover:scale-110 hover:bg-sky-500"
          >
            <FaPlay className="text-neutral-800"></FaPlay>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
          No songs available
        </div>
      )}
      <div className="flex flex-col gap-y-2 w-full p-6">
        {songs.map((song, i) => {
          return (
            <div
              className="hover:bg-gradient-to-r cursor-pointer hover:from-neutral-900/80 hover:to-neutral-800 flex items-center rounded-md gap-x-4 w-full"
              key={song.id}
            >
              <div
                className="flex flex-1 items-center"
                onClick={() => onPlay(song.id)}
              >
                <div className="text-neutral-400 px-5">{i + 1} </div>
                <MediaItem data={song}></MediaItem>
              </div>
              <DeleteSongFromPlaylist
                songId={song.id}
                playlistId={playlistId}
              ></DeleteSongFromPlaylist>
              <LikeBtn songId={song.id}></LikeBtn>
            </div>
          );
        })}
      </div>
    </div>
  );
};
