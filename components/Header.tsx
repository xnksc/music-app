"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Button } from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { usePlayer } from "@/hooks/usePlayer";
import { MdLibraryMusic } from "react-icons/md";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const player = usePlayer();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  return (
    <div
      // className={twMerge("h-fit bg-gradient-to-b from-cyan-800 p-5", className)}
      className={twMerge("h-fit p-5 ", className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center"></div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className=" rounded-full p-2 bg-white items-center justify-center hover:opacity-80 transition"
          >
            <HiHome className="text-black" size={20}></HiHome>
          </button>
          <button
            onClick={() => router.push("/search")}
            className=" rounded-full p-2 bg-white items-center justify-center hover:opacity-80 transition"
          >
            <BiSearch className="text-black" size={20}></BiSearch>
          </button>
          <button
            onClick={() => router.push("/playlists")}
            className=" rounded-full p-2 bg-white items-center justify-center hover:opacity-80 transition"
          >
            <MdLibraryMusic className="text-black" size={20}></MdLibraryMusic>
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt></FaUserAlt>
              </Button>
            </div>
          ) : (
            <>
              <div className="">
                <Button
                  onClick={() => {
                    onOpen();
                  }}
                  className="bg-emerald-400 px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
