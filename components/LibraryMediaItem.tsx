"use client";

import { useLoadImage } from "@/hooks/useLoadImage";
import { Playlist, Song } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface LibraryMediaItemProps {
  data: Song | Playlist;
  onClick?: (id: string) => void;
  className?: string;
}

export const LibraryMediaItem = ({
  data,
  onClick,
  className,
}: LibraryMediaItemProps) => {
  const imgUrl = useLoadImage(data);
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "flex items-center gap-x-3 cursor-pointer  max-w-full rounded-md",
        className
      )}
    >
      <div className="relative rounded-[5px] h-[26px] min-w-[26px] overflow-hidden">
        <Image
          fill
          src={imgUrl || "../public/images/like.png"}
          alt="song item"
          className="object-cover"
        ></Image>
      </div>

      <div className="flex gap-x-1 overflow-hidden truncate">
        <p className=" text-neutral-300 group-hover:text-white truncate">
          {data.title}
        </p>
      </div>
    </div>
  );
};
