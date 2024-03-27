"use client";

import { LikeBtn } from "@/components/LikeBtn";
import { MediaItem } from "@/components/MediaItem";
import { TimeAgoComponent } from "@/components/TimeAgoComponent";
import { useAuthModal } from "@/hooks/useAuthModal";
import useOnPlaySong from "@/hooks/useOnPlaySong";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { PiListNumbersLight } from "react-icons/pi";

interface LikedSongsContentProps {
  songs: Song[];
  createdAt: number[];
}
export const LikedSongsContent = ({
  songs,
  createdAt,
}: LikedSongsContentProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlaySong(songs);
  const [firstSongId, setFirstSongId] = useState("");
  useEffect(() => {
    setFirstSongId(songs[0]?.id);
  }, [songs]);
  useEffect(() => {
    if (!isLoading && !user) {
      onOpen();
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found
      </div>
    );
  }
  return (
    <>
      <div
        className="cursor-pointer flex justify-start  px-6 py-1"
        onClick={() => onPlay(firstSongId)}
      >
        <button
          className="transition  rounded-full flex items-center
           bg-sky-500/80 p-4 drop-shadow-md translate hover:scale-110 hover:bg-sky-500"
        >
          <FaPlay className="text-neutral-800"></FaPlay>
        </button>
      </div>
      <div className="flex flex-col gap-y-2 w-full p-6">
        <div className="grid grid-cols-6 gap-x-4 text-neutral-400">
          <div className="sm:col-span-4 col-span-3 flex items-center">
            <PiListNumbersLight className="hidden xs:w-[48px] xs:block" />
            <h1 className="">Song</h1>
          </div>
          <h1 className="col-span-2 sm:col-span-1">Added</h1>
        </div>
        <div className="w-full h-[1px] bg-neutral-600/90 mb-2"></div>
        {songs.map((song, i) => {
          return (
            <div
              className="hover:bg-gradient-to-r grid grid-cols-6  cursor-pointer hover:from-neutral-900/80 hover:to-neutral-800 items-center rounded-md gap-x-4 w-full"
              key={song.id}
            >
              <div
                className="flex flex-1 items-center sm:col-span-4 col-span-3"
                onClick={() => onPlay(song.id)}
              >
                <div className="text-neutral-400 px-5">{i + 1} </div>
                <MediaItem data={song}></MediaItem>
              </div>
              <TimeAgoComponent
                className="col-span-2 sm:col-span-1 text-sm text-neutral-400"
                dateStr={createdAt[i]}
              ></TimeAgoComponent>
              <LikeBtn classname="flex justify-end" songId={song.id}></LikeBtn>
            </div>
          );
        })}
      </div>
    </>
  );
};
