"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import TopBar from "./TopBar";
import { SideLinkGroup } from "@/app/doctor/layout";

interface DashboardLayoutProps {
  sideLinks: SideLinkGroup[];
  children: ReactNode;
}

const DashboardLayout = ({ sideLinks, children }: DashboardLayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-dvh">
      <TopBar isExpanded={isExpanded} />
      <Sidebar
        sideLinks={sideLinks}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <main
        className={cn(
          "transition-all duration-300 pt-[73px] pb-4 pr-4 ease-in-out size-full",
          isExpanded ? "pl-64" : "pl-20"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
