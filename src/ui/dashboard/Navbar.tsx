import { ArrowRightFromLine, Menu } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/ui/components/ThemeToggle";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  return (
    <div className={`navbar bg-base-300 px-4 ${!isSidebarOpen && "w-screen"}`}>
      <div className="flex-1">
        <label className="btn btn-ghost swap p-2">
          <input type="checkbox" onClick={toggleSidebar} />
          <Menu className="swap-off" />
          <ArrowRightFromLine className="swap-on" />
        </label>
      </div>
      <div className="flex flex-none flex-row gap-4">
        <div className="swap">
          <ThemeToggle />
        </div>
        <div className="avatar">
          <div className="avatar w-10 rounded-full">
            <Image
              alt="User Profile"
              src="/files/uploads/profiles/1/profile.jpg"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
