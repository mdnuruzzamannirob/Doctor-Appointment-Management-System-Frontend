"use client";

import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {
  LuCalendar,
  LuLayoutDashboard,
  LuSettings,
  LuUsers,
} from "react-icons/lu";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sideLinks = [
    {
      name: "Dashboard",
      href: "/doctor/dashboard",
      icon: <LuLayoutDashboard className="size-full" />,
    },
    {
      name: "Appointments",
      href: "/doctor/appointments",
      icon: <LuCalendar className="size-full" />,
    },
    {
      name: "Patients",
      href: "/doctor/patients",
      icon: <LuUsers className="size-full" />,
    },
    {
      name: "Settings",
      href: "/doctor/settings",
      icon: <LuSettings className="size-full" />,
    },
  ];
  return (
    <div
      className={cn(
        "h-dvh border-r transition-all duration-200 ease-in-out",
        isExpanded ? "w-60" : "w-14"
      )}
    >
      <div className="flex relative items-center justify-between gap-3 p-4">
        <Link href="/" className="flex size-fit items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="size-6 min-w-6"
          />
          {isExpanded && (
            <span className="text-lg font-bold text-[#208acd] leading-0">
              Medicare
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsExpanded(false)}
          className={cn("cursor-pointer", !isExpanded && "hidden")}
        >
          <HiOutlineMenuAlt3 className="size-6 text-muted-foreground" />
        </button>
        <button
          onClick={() => setIsExpanded(true)}
          className={cn(
            "size-7 rounded-full border border-neutral-200 flex items-center absolute top-1/2 -translate-y-1/2 -right-5 justify-center hover:bg-muted bg-white cursor-pointer",
            isExpanded && "hidden"
          )}
        >
          <IoIosArrowForward className="size-5 text-muted-foreground" />
        </button>
      </div>

      {/* Divider */}
      <div className="border-t"></div>

      {/* Sidebar Links */}
      <div className="flex flex-col p-3 gap-1.5">
        {sideLinks?.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "group flex items-center px-1.5 gap-2 rounded              hover:bg-[#208acd]/10 h-8"
            )}
          >
            <span className="size-5 min-w-5 text-neutral-800 group-hover:text-[#208acd]">
              {link.icon}
            </span>
            {isExpanded && (
              <span className="text-neutral-800 text-sm font-medium group-hover:text-[#208acd]">
                {link.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
