"use client";
import { useLoadImage } from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import Image from "next/image";
import { memo } from "react";
interface PlaylistImageProps {
  playlist: Playlist;
}

const PlaylistImage = ({ playlist }: PlaylistImageProps) => {
  const img = useLoadImage(playlist);
  return (
    <div className="w-full h-full">
      <Image
        alt="playlist"
        src={img || "/music-app/public/images/like.png"}
        fill
      />
    </div>
  );
};

export default memo(PlaylistImage);
