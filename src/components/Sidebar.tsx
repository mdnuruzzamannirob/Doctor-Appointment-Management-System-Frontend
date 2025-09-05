"use client";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { SideLinkGroup, SideLinkItem } from "@/app/doctor/layout";

interface SidebarProps {
  sideLinks: SideLinkGroup[];
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const Sidebar = ({ sideLinks, isExpanded, setIsExpanded }: SidebarProps) => {
  const pathname = usePathname();
  const [isSidebarHovered, setSidebarHover] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [hoveredParent, setHoveredParent] = useState<string | null>(null);

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderLinks = (items: SideLinkItem[], level = 0) => {
    return items.map((link) => {
      const isActive = pathname.includes(link.href);

      // Has children
      const hasChildren = link.children && link.children.length > 0;

      return (
        <div key={link.name} className="relative flex flex-col gap-2">
          {/* Parent button */}
          <button
            onClick={() => hasChildren && toggleGroup(link.name)}
            onMouseEnter={() => !isExpanded && setHoveredParent(link.name)}
            onMouseLeave={() => !isExpanded && setHoveredParent(null)}
            className={cn(
              "flex items-center gap-2 border border-transparent rounded-sm h-8  transition-colors duration-200",
              isExpanded ? "px-[5px]" : "w-8 justify-center",
              level > 0 && `pl-${level * 4}`, // Tailwind spacing per level
              isActive || openGroups[link.name]
                ? "bg-white border-neutral-200 text-neutral-800"
                : "hover:text-neutral-800 text-neutral-600 hover:bg-black/[3%]"
            )}
          >
            <span className="size-5">{link.icon}</span>
            {isExpanded && (
              <span className="flex-1 text-sm font-medium text-left">
                {link.name}
              </span>
            )}
            {hasChildren && isExpanded && (
              <span className="ml-auto">
                {openGroups[link.name] ? (
                  <IoIosArrowDown className="size-4" />
                ) : (
                  <IoIosArrowForward className="size-4" />
                )}
              </span>
            )}
          </button>

          {/* Vertical connector line */}
          {hasChildren && isExpanded && openGroups[link.name] && (
            <div className="relative flex flex-col">
              <div className="flex flex-col pl-3">
                {renderLinks(link.children!, level + 1)}
              </div>
            </div>
          )}

          {/* Popover for collapsed sidebar */}
          {!isExpanded && hoveredParent === link.name && hasChildren && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute left-full top-0 w-48  rounded-xl border bg-white shadow-lg p-3 z-20"
              >
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  {link.name}
                </p>
                <div className="flex flex-col gap-1">
                  {link.children!.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors",
                        pathname.includes(child.href) &&
                          "bg-slate-100 text-slate-800 font-medium"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      );
    });
  };

  return (
    <aside
      className={cn(
        "h-dvh fixed p-4 rounded-r-xl border-r border-slate-200 bg-slate-100 z-10 transition-all duration-300 space-y-4 ease-in-out",
        isExpanded ? "w-72" : "w-16"
      )}
      onMouseEnter={() => setSidebarHover(true)}
      onMouseLeave={() => setSidebarHover(false)}
    >
      {/* Resize zone (only when collapsed) */}
      {!isExpanded && (
        <div className="absolute inset-0" onClick={() => setIsExpanded(true)}>
          {/* Transparent layer behind everything */}
          <div className="absolute inset-0 cursor-w-resize" />
        </div>
      )}

      {/* Content sits above resize layer */}
      <div className="relative z-10">
        {/* Logo + Collapse */}
        <div className="flex relative items-center justify-between gap-3">
          <Link href="/" className="flex size-fit items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={28}
              height={28}
              className="size-8 min-w-8"
            />
            {isExpanded && (
              <span className="text-lg font-bold text-[#208acd]">Medicare</span>
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
              className="size-8 rounded-full border border-slate-200 flex items-center absolute top-1/2 -translate-y-1/2 -right-8 justify-center hover:text-slate-600 text-slate-500 bg-white"
            >
              <IoIosArrowForward className="size-5" />
            </button>
          )}
        </div>

        <div className="border-b my-2"></div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-4">
          {sideLinks.map((group: SideLinkGroup) => (
            <div key={group.group} className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold truncate text-slate-500 mb-1 ml-2">
                {group.group}
              </p>
              {renderLinks(group.items)}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
