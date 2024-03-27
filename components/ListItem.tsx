"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
interface ListItemProps {
  image: string;
  href: string;
  name: string;
}
export const ListItem = ({ href, image, name }: ListItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };
  const icon =
    name === "Favorites Songs" ? (
      <FaHeart size={30} className="text-[#DFF5FF]"></FaHeart>
    ) : (
      <MdLibraryMusic size={30} className="text-[#DFF5FF]"></MdLibraryMusic>
    );
  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] flex min-w-[64px] ">
        <Image
          className="object-cover rounded-md"
          fill
          src={image}
          alt="img"
        ></Image>
        <div className="transition opacity-90 flex self-center justify-center hover:scale-105 w-full">
          {icon}
        </div>
      </div>
      <p className="font-medium truncate py-5">{name}</p>
    </button>
  );
};
