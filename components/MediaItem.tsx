"use client";

import { useLoadImage } from "@/hooks/useLoadImage";
import { Playlist, Song } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { ScrollableTitle } from "./ScrollableTitle";

interface MediaItemProps {
  data: Song | Playlist;
  onClick?: (id: string) => void;
  className?: string;
  isPlayer?: boolean;
  isLibrary?: boolean;
}

export const MediaItem = ({
  data,
  isPlayer = false,
  onClick,
  className,
  isLibrary = false,
}: MediaItemProps) => {
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
      {isLibrary ? (
        ""
      ) : (
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
          <Image
            fill
            src={imgUrl || "../public/images/like.png"}
            alt="song item"
            className="object-cover"
          ></Image>
        </div>
      )}

      <div className="flex flex-col  gap-y-1 overflow-hidden truncate">
        {isPlayer ? (
          <ScrollableTitle title={data.title}></ScrollableTitle>
        ) : (
          <p className=" text-white truncate">{data.title}</p>
        )}
        {"author" in data && (
          <p className="text-neutral-400 text-sm truncate">{data.author}</p>
        )}
      </div>
    </div>
  );
};
