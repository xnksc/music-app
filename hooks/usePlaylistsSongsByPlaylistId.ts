// import { PlaylistSong } from "@/types";
// import { useSessionContext } from "@supabase/auth-helpers-react";
// import { useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";

// export const useGetPlaylistsSongsByPlaylistId = (playlistId: string) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [playlistsSongs, setPlaylistsSongs] = useState<
//     PlaylistSong[] | undefined
//   >(undefined);
//   const { supabaseClient } = useSessionContext();
//   useEffect(() => {
//     if (!playlistId) {
//       return;
//     }
//     setIsLoading(true);

//     const fetchPlaylistsSongs = async () => {
//       const { data, error } = await supabaseClient
//         .from("playlists_songs")
//         .select("*")
//         .eq("playlist_id", playlistId)
//         .order("created_at", { ascending: false });
//       if (error) {
//         setIsLoading(false);
//         return toast.error(error.message);
//       }
//       setPlaylistsSongs(data as PlaylistSong[]); // 5 6 8
//       setIsLoading(false);
//     };
//     fetchPlaylistsSongs();
//   }, [playlistId, supabaseClient]);
//   return useMemo(
//     () => ({
//       isLoading,
//       playlistsSongs,
//     }),
//     [isLoading, playlistsSongs]
//   );
// };
