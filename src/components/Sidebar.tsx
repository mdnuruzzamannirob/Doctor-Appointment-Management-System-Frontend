"use client";

import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { SideLinkGroup, SideLinkItem } from "@/app/doctor/layout";

interface SidebarProps {
  sideLinks: SideLinkGroup[];
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const Sidebar = ({ sideLinks, isExpanded, setIsExpanded }: SidebarProps) => {
  const pathname = usePathname();
  const [isSidebarHovered, setSidebarHover] = useState(false);

  // recursive renderer
  const renderLinks = (items: SideLinkItem[], level = 0) => {
    return items.map((link) => (
      <div key={link.name} className="flex flex-col">
        <Link
          onClick={(e) => e.preventDefault()}
          href={link.href}
          className={cn(
            "border flex items-center text-muted-foreground border-transparent gap-2 rounded-sm h-8",
            isExpanded ? "justify-normal px-[5px]" : "size-8 justify-center",
            level > 0 && "ml-4", // indent children
            pathname.includes(link?.href)
              ? "bg-white border-neutral-200 text-neutral-800"
              : "hover:text-neutral-800 hover:bg-black/[3%]"
          )}
        >
          <span className="size-5 min-w-5">{link.icon}</span>
          {isExpanded && (
            <span className="text-sm font-medium">{link.name}</span>
          )}
        </Link>

        {/* {link.children && link.children.length > 0 && (
          <div className="flex flex-col">
            {renderLinks(link.children, level + 1)}
          </div>
        )} */}
      </div>
    ));
  };

  return (
    <aside
      className={cn(
        "h-dvh fixed p-4 rounded-r-xl  border-r border-slate-200 bg-slate-100 z-10 transition-all duration-300 space-y-4 ease-in-out",
        isExpanded ? "w-60" : "w-16 cursor-w-resize"
      )}
      onMouseEnter={() => setSidebarHover(true)}
      onMouseLeave={() => setSidebarHover(false)}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <div
        onClick={(e) => e.preventDefault()}
        className="flex relative items-center justify-between gap-3"
      >
        <Link href="/" className="flex size-fit items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="size-8 min-w-8"
          />
          {isExpanded && (
            <span className="text-lg font-bold text-[#208acd] ">Medicare</span>
          )}
        </Link>

        <button
          onClick={() => setIsExpanded(false)}
          className={cn(
            "size-8 flex rounded-full border border-slate-200 bg-white items-center text-slate-500 hover:text-slate-600 justify-center",
            !isExpanded && "hidden"
          )}
        >
          <TbLayoutSidebarLeftCollapse className="size-5" />
        </button>

        {isSidebarHovered && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className={cn(
              "size-8 rounded-full border border-slate-200 flex items-center absolute top-1/2 -translate-y-1/2 -right-8 justify-center hover:text-slate-600 text-slate-500 bg-white",
              isExpanded && "hidden"
            )}
          >
            <IoIosArrowForward className="size-5" />
          </button>
        )}
      </div>

      {/* divider */}
      <div className="border-b"></div>

      {/* Sidebar Links */}
      <div onClick={(e) => e.preventDefault()} className="flex flex-col gap-4">
        {sideLinks.map((group: SideLinkGroup) => (
          <div key={group.group} className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold truncate text-slate-500 mb-1 ml-2">
              {group.group}
            </p>

            {renderLinks(group.items)}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
