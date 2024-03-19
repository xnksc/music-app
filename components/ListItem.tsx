"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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
  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px] ">
        <Image
          className="object-cover rounded-md"
          fill
          src={image}
          alt="img"
        ></Image>
      </div>
      <p className="font-medium truncate py-5">{name}</p>
    </button>
  );
};
