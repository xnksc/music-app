"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { Box } from "./Box";
import { SidebarItem } from "./SidebarItem";
import { Library } from "./Library";
import { Playlist, Song } from "@/types";
import { usePlayer } from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import { PlaylistsLibrary } from "./PlaylistsLibrary";
import { FaHeart } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
  playlists: Playlist[];
}

export const Sidebar = ({ children, songs, playlists }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();
  const routes = useMemo(
    () => [
      {
        active: pathname == "/",
        label: "Home",
        href: "/",
        icon: HiHome,
      },
      {
        active: pathname === "/search",
        label: "Search",
        href: "/search",
        icon: BiSearch,
      },
      {
        active: pathname === "/liked",
        label: "Liked",
        href: "/liked",
        icon: FaHeart,
      },
      {
        active: pathname.startsWith("/playlists"),
        label: "Playlists",
        href: "/playlists",
        icon: MdLibraryMusic,
      },
    ],
    [pathname]
  );
  return (
    <div
      className={twMerge(
        "flex h-full",
        player.activeId && "h-[calc(100%-90px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full md:w-[230px] lg:w-[250px] pr-2">
        <Box className="rounded-br-md">
          <div className="flex flex-col gap-y-4 px-5 py-4 ">
            {routes.map((item) => {
              return <SidebarItem key={item.label} {...item}></SidebarItem>;
            })}
          </div>
        </Box>
        <Box className="overflow-y-auto scrollbar-none h-full rounded-r-md">
          <Library songs={songs} playlists={playlists}></Library>
        </Box>
        <Box className="overflow-y-auto scrollbar-none h-full rounded-tr-md">
          <PlaylistsLibrary playlists={playlists}></PlaylistsLibrary>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
