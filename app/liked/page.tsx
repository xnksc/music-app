import { getLikedSongs } from "@/actions/getLikedSongs";
import { Header } from "@/components/Header";
import Image from "next/image";
import { LikedSongsContent } from "./components/LikedSongsContent";

export const revalidate = 0;
const Liked = async () => {
  const { songs, createdAt } = await getLikedSongs();
  return (
    <div
      className="bg-neutral-800 w-full h-full overflow-y-auto overflow-hidden scrollbar-thin scrollbar-track-sky-800/20 scrollbar-thumb-sky-700/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-corner-rounded-full"
    >
      <Header className="bg-gradient-to-b from-sky-600">
        <div className="mt-1">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:w-40 lg:h-40">
              <Image fill alt="favourites" src="/images/like.png"></Image>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-4xl lg:text-5xl font-bold">
                Favourite songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedSongsContent
        songs={songs}
        createdAt={createdAt!}
      ></LikedSongsContent>
    </div>
  );
};

export default Liked;
