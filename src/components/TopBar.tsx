import { cn } from "@/lib/utils";

interface TopBarProps {
  isExpanded: boolean;
}

const TopBar = ({ isExpanded }: TopBarProps) => {
  return (
    <header
      className={cn(
        "h-[57px] absolute top-0 p-4 bg-white transition-all duration-300 ease-in-out left-0 right-0 border-b flex items-center px-4",
        isExpanded ? "pl-64" : "pl-[72px]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <p>Logo</p>
        <p>Profile</p>
      </div>
    </header>
  );
};

export default TopBar;
