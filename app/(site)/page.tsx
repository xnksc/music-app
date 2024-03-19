import { getSongs } from "@/actions/getSongs";
import { Header } from "@/components/Header";
import { ListItem } from "@/components/ListItem";
import { PageContent } from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div
      className="bg-neutral-800 w-full h-full overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-cyan-800/20 scrollbar-thumb-cyan-700/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-corner-rounded-full"
    >
      <Header className="bg-gradient-to-b from-cyan-700/80 to-neutral-800">
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome!</h1>
          <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-3 md:gap-x-5 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
            <ListItem
              href="liked"
              image="/images/like.png"
              name="Favorites Songs"
            ></ListItem>
            <ListItem
              href="playlists"
              image="/images/like.png"
              name="Playlists"
            ></ListItem>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest</h1>
        </div>
        <PageContent songs={songs}></PageContent>
      </div>
    </div>
  );
}
