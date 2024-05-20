"use client";
import { usePathname, useRouter } from "@/navigation";
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Button } from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { usePlayer } from "@/hooks/usePlayer";
import { MdLibraryMusic } from "react-icons/md";
import { cn } from "@/libs/helpers";
import { useTranslations } from "next-intl";
import { LangMenu } from "./LangMenu";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const player = usePlayer();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();
    if (pathname.startsWith("/playlists") || pathname === "liked") {
      router.push("/");
    }
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  const btnCn =
    pathname == "/liked"
      ? "bg-[#4b4bbd] hover:bg-[#637de3]"
      : pathname.startsWith("/search")
      ? "bg-[#7E6363] hover:bg-[#c5b79d]"
      : pathname.startsWith("/playlists")
      ? "bg-[#186a70] hover:bg-[#3ca2ab]"
      : "";

  return (
    <div className={twMerge("h-fit p-5 ", className)}>
      <div className="w-full mb-4 flex  items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center"></div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className={cn(
              " rounded-full p-2 items-center justify-center hover:opacity-80 transition text-neutral-100 hover:text-neutral-700 bg-cyan-600 hover:bg-cyan-500 ",
              btnCn
            )}
          >
            <HiHome size={20}></HiHome>
          </button>
          <button
            onClick={() => router.push("/search")}
            className={cn(
              " rounded-full p-2  bg-cyan-600 hover:bg-cyan-500 items-center justify-center hover:opacity-80 transition text-neutral-100 hover:text-neutral-700",
              btnCn
            )}
          >
            <BiSearch size={20}></BiSearch>
          </button>
          <button
            onClick={() => router.push("/playlists")}
            className={cn(
              " rounded-full p-2  items-center justify-center hover:opacity-80 transition text-neutral-100 hover:text-neutral-700 bg-cyan-600 hover:bg-cyan-500 ",
              btnCn
            )}
          >
            <MdLibraryMusic size={20}></MdLibraryMusic>
          </button>
          <button
            onClick={() => router.push("/liked")}
            className={cn(
              " rounded-full p-2  items-center justify-center hover:opacity-80 transition text-neutral-100 hover:text-neutral-700 bg-cyan-600 hover:bg-cyan-500 ",
              btnCn
            )}
          >
               <FaHeart size={18} className="text-[#DFF5FF]"></FaHeart>
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          {user ? (
            <div className="flex gap-x-3 items-center">
              <Button
                onClick={handleLogout}
                className={cn(
                  "bg-cyan-700 hover:text-neutral-700 hover:bg-cyan-500 text-neutral-100 px-5 py-2",
                  btnCn
                )}
              >
                {t("logout")}
              </Button>

              <LangMenu
                className={cn(
                  "bg-cyan-700 hover:text-neutral-700 hover:bg-cyan-500 text-neutral-100 px-3 py-3",
                  btnCn
                )}
              ></LangMenu>

              <Button
                onClick={() => router.push("/account")}
                className={cn(
                  "bg-cyan-700 hover:text-neutral-700 hover:bg-cyan-500 text-neutral-100 px-3 py-3",
                  btnCn
                )}
              >
                <FaUserAlt></FaUserAlt>
              </Button>
            </div>
          ) : (
            <>
              <LangMenu
                className={cn(
                  "bg-cyan-700 hover:text-neutral-700 hover:bg-cyan-500 text-neutral-100 px-3 py-3",
                  btnCn
                )}
              ></LangMenu>
              <Button
                onClick={() => {
                  onOpen();
                }}
                className={cn(
                  "bg-cyan-700 hover:text-neutral-700 hover:bg-cyan-500 text-neutral-100 px-5 py-2",
                  btnCn
                )}
              >
                {t("login")}
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
