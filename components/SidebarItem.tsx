import { Link } from "@/navigation";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  active,
  href,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex flex-row h-auto items-center gap-x-4 font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1",
        active && "text-white"
      )}
    >
      <Icon size={26}></Icon>
      <p className="truncate w-full ">{label}</p>
    </Link>
  );
};
