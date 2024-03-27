import { Header } from "@/components/Header";
import { getPlaylistById } from "@/actions/getPlaylistById";
import PlaylistImage from "@/components/PlaylistImage";
import { getSongsByPlaylistId } from "@/actions/getSongsByPlaylistId";
import { PlaylistSongs } from "./components/PlaylistSongs";
import { TimeAgoComponent } from "@/components/TimeAgoComponent";

interface PlaylistIdParams {
  params: {
    playlistId: string;
  };
}
export const revalidate = 0;
const PlaylistId = async ({ params }: PlaylistIdParams) => {
  const playlist = await getPlaylistById(params.playlistId);
  const { sortedSongs } = await getSongsByPlaylistId(params.playlistId);
  const { createdDate } = await getSongsByPlaylistId(params.playlistId);
  const date = new Date(playlist.created_at);
  const formatedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
  return (
    <div
      className="bg-neutral-800 w-full h-full overflow-y-auto overflow-hidden scrollbar-thin scrollbar-track-emerald-800/20 scrollbar-thumb-teal-600/50  scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    scrollbar-corner-rounded-full"
    >
      <Header className="bg-gradient-to-b from-teal-600">
        <div className="mt-1">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-x-5">
            <div className="relative h-[128px] w-[128px] lg:w-[192px] lg:h-[192px]">
              <PlaylistImage playlist={playlist}></PlaylistImage>
            </div>
            <div className="flex flex-col pt-3 gap-y-2 justify-between max-w-full md:max-w-[calc(100%-148px)] lg:max-w-[calc(100%-212px)] mt-4 md:mt-0">
              <div className="flex flex-col justify-center flex-grow">
                <p className="hidden md:block font-semibold text-sm">
                  Playlist
                </p>
                <h1 className="text-white lg:min-h-16 md:min-h-12 truncate text-4xl sm:text-6xl lg:text-8xl py-4 font-bold">
                  {playlist?.title}
                </h1>
              </div>

              <h1 className="text-center md:text-start text-neutral-300">
                {formatedDate}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <PlaylistSongs
        playlistId={params.playlistId}
        songs={sortedSongs}
        createdDate={createdDate!}
      ></PlaylistSongs>
    </div>
  );
};

export default PlaylistId;
