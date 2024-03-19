import { Header } from "@/components/Header";
import { getPlaylistById } from "@/actions/getPlaylistById";
import PlaylistImage from "@/components/PlaylistImage";
import { getSongsByPlaylistId } from "@/actions/getSongsByPlaylistId";
import { PlaylistSongs } from "./components/PlaylistSongs";

interface PlaylistIdParams {
  params: {
    playlistId: string;
  };
}
export const revalidate = 0;
const PlaylistId = async ({ params }: PlaylistIdParams) => {
  const playlist = await getPlaylistById(params.playlistId);
  const songs = await getSongsByPlaylistId(params.playlistId);
  return (
    <div
      className="bg-neutral-800 w-full h-full overflow-y-auto overflow-hidden scrollbar-thin scrollbar-track-cyan-800/20 scrollbar-thumb-cyan-700/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-corner-rounded-full"
    >
      <Header className="bg-gradient-to-b from-sky-600">
        <div className="mt-1">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-[128px] w-[128px] lg:w-[192px] lg:h-[192px]">
              <PlaylistImage playlist={playlist}></PlaylistImage>
            </div>
            <div className="flex flex-col gap-y-2 max-w-full md:max-w-[calc(100%-148px)] lg:max-w-[calc(100%-212px)] mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white lg:min-h-16 md:min-h-12 truncate text-4xl sm:text-4xl lg:text-6xl font-bold">
                {playlist?.title}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <PlaylistSongs
        playlistId={params.playlistId}
        songs={songs}
      ></PlaylistSongs>
    </div>
  );
};

export default PlaylistId;
