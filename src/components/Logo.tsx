import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

//  logo color1 = #208acd
//  logo color2 = #47c8bb

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn("flex size-fit items-center space-x-2", className)}
    >
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <span className="text-2xl font-bold text-[#208acd]">Medicare</span>
    </Link>
  );
};

export default Logo;
