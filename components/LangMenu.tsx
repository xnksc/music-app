"use client";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { usePathname, useRouter } from "../navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLocale } from "next-intl";
import { cn } from "@/libs/helpers";
import { GrLanguage } from "react-icons/gr";
export const LangMenu = ({ className }: { className: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isEng, setIsEng] = useState(true);
  useEffect(() => {
    locale === "en" ? setIsEng(true) : setIsEng(false);
  }, []);
  const onChangeLocale = (locale: string) => {
    router.replace(pathname, { locale: locale });
  };

  const contentCn =
    pathname == "/liked"
      ? "bg-[#463ca3] "
      : pathname.startsWith("/search")
      ? "bg-[#7E6363] "
      : pathname.startsWith("/playlists")
      ? "bg-[#186a70] "
      : "";
  const itemCn =
    pathname == "/liked"
      ? "hover:bg-[#637de3] pl-5 hover:text-neutral-700"
      : pathname.startsWith("/search")
      ? "hover:bg-[#c5b79d] pl-5 hover:text-neutral-700"
      : pathname.startsWith("/playlists")
      ? "hover:bg-[#3ca2ab] pl-5 hover:text-neutral-700"
      : "hover:bg-cyan-500 pl-5 hover:text-neutral-700";
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={cn(
              "rounded-full px-3 outline-none py-3 flex items-center justify-center ",
              className
            )}
            aria-label="options"
          >
            <GrLanguage />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={cn(
              " rounded-md overflow-y-auto outline-none transition select-none text-neutral-100 bg-cyan-600 text-sm",
              contentCn
            )}
            sideOffset={8}
          >
            <DropdownMenu.Item
              className={cn(
                " outline-none flex items-center px-2 py-1 text-neutral-200 cursor-pointer font-medium",
                isEng ? "" : itemCn
              )}
              onClick={() => onChangeLocale("en")}
            >
              <div className="flex items-center">
                {isEng ? <GoDotFill size={8} className="mr-1" /> : ""}
                EN
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={cn(
                "cursor-pointer outline-none flex items-center px-2 py-1 text-neutral-200 font-medium",
                !isEng ? "" : itemCn
              )}
              onClick={() => onChangeLocale("ru")}
            >
              <div className="flex items-center">
                {!isEng ? <GoDotFill size={8} className="mr-1" /> : ""}
                RU
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
