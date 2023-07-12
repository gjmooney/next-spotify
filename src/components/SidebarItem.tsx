import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex flex-row h-auto items-center w-full gap-x-4 font-medium cursor-pointer hover:text-white transition text-stone-400 py-1",
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p>
        <label className="truncate w-full cursor-pointer">{label}</label>
      </p>
    </Link>
  );
};

export default SidebarItem;
