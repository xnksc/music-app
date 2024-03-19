import { getSongsByTitle } from "@/actions/getSongsByTitle";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchInput";
import { SearchContent } from "./components/SearchContent";
import { getPlaylists } from "@/actions/getPlaylists";
export const revalidate = 0;

interface SearchProps {
  searchParams: {
    title: string;
    author: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  const playlists = await getPlaylists();
  return (
    <div
      className="bg-neutral-800 h-full w-full  overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-cyan-800/20 scrollbar-thumb-cyan-700/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-corner-rounded-full snap-y"
    >
      <Header className=" from-gray-800 gap-y-2 flex flex-col">
        <h1 className="text-white text-3xl font-semibold">Search</h1>
        <SearchInput></SearchInput>
      </Header>
      <SearchContent songs={songs} playlists={playlists}></SearchContent>
    </div>
  );
};

export default Search;
