"use client";

import { useLoadImage } from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { PlayBtn } from "./PlayBtn";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}
export const SongItem = ({ data, onClick }: SongItemProps) => {
  const imgData = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-500/5 cursor-pointer transition hover:bg-neutral-500/15 p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imgData || "../public/images/like.png"}
          fill
          alt="img"
        ></Image>
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-1 w-full truncate">
          {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayBtn></PlayBtn>
      </div>
    </div>
  );
};
