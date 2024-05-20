import { getPlaylists } from "@/actions/getPlaylists";
import { PlaylistsContent } from "./components/PlaylistsContent";
import { Header } from "@/components/Header";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
export const revalidate = 0;
const Playlists = async () => {
  const playlists = await getPlaylists();
  const t = await getTranslations("Home");
  return (
    <div
      className="bg-neutral-800 w-full h-full overflow-y-auto overflow-hidden scrollbar-thin scrollbar-track-emerald-800/20 scrollbar-thumb-teal-600/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-corner-rounded-full"
    >
      <Header className="bg-gradient-to-b from-teal-600">
        <div className="mt-1">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-40 lg:w-40">
              <Image fill alt="favourites" src="/images/like.png"></Image>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <h1 className="text-white text-4xl sm:text-4xl lg:text-5xl font-bold">
                {t("playlists")}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <PlaylistsContent playlists={playlists}></PlaylistsContent>
    </div>
  );
};

export default Playlists;
