"use client";

import { MediaItem } from "@/components/MediaItem";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { Playlist } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PlaylistsContentProps {
  playlists: Playlist[];
}

export const PlaylistsContent = ({ playlists }: PlaylistsContentProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const { isLoading, user } = useUser();
  const handleClick = (id: string) => {
    router.push(`playlists/${id}`);
  };
  useEffect(() => {
    if (!isLoading && !user) {
      onOpen();
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (playlists.length === 0) {
    return <div className="mt-4 text-neutral-400 ">No added playlists</div>;
  }

  return (
    <div className="gap-y-2 flex flex-col w-full p-6">
      {playlists.map((item, i) => (
        <div
          className="hover:bg-gradient-to-r hover:from-neutral-900/80 hover:to-neutral-800 cursor-pointer flex items-center rounded-md gap-x-4 w-full"
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <div className="flex flex-1 items-center">
            <div className="text-neutral-400  px-5">{i + 1} </div>
            <MediaItem data={item}></MediaItem>
          </div>
        </div>
      ))}
    </div>
  );
};
