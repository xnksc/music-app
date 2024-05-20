import { getLikedSongs } from "@/actions/getLikedSongs";
import { Header } from "@/components/Header";
import Image from "next/image";
import { LikedSongsContent } from "./components/LikedSongsContent";
import { FaHeart } from "react-icons/fa";
import { getTranslations } from "next-intl/server";

export const revalidate = 0;
const Liked = async () => {
  const { songs, createdAt } = await getLikedSongs();
  const t = await getTranslations("Playlist");
  return (
    <div
      className="bg-neutral-800 w-full h-full overflow-y-auto overflow-hidden scrollbar-thin scrollbar-track-sky-800/20 scrollbar-thumb-sky-700/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-corner-rounded-full"
    >
      <Header className="bg-gradient-to-b from-sky-600">
        <div className="mt-1">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative flex h-32 w-32 lg:w-40 lg:h-40">
              <Image
                className="object-cover rounded-md"
                fill
                src="/images/cyan-gradient.png"
                alt="img"
              ></Image>
              <div className="transition opacity-90 flex self-center justify-center hover:scale-105 w-full">
                <FaHeart size={40} className="text-[#DFF5FF]"></FaHeart>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">
                {t("playlist")}
              </p>
              <h1 className="text-white text-4xl sm:text-4xl lg:text-5xl font-bold">
                {t("favorites")}
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
