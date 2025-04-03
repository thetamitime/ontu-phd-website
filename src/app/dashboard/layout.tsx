"use client";

import Link from "next/link";
import { ArrowLeftFromLine, LayoutTemplate, Menu } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/ui/components/ThemeToggle";
import { useState } from "react";
import Sidebar from "@/ui/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div
        className={`navbar bg-base-200 px-4 ${!isSidebarOpen && "w-screen"}`}
      >
        <div className="flex-1">
          <label className="btn btn-ghost swap p-2">
            <input type="checkbox" onClick={toggleSidebar} />
            <Menu className="swap-on" />
            <ArrowLeftFromLine className="swap-off" />
          </label>
        </div>
        <div className="flex flex-none flex-row gap-4">
          <div className="swap">
            <ThemeToggle />
          </div>
          <div className="avatar">
            <div className="avatar w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="/files/uploads/profiles/1/profile.jpg"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${!isSidebarOpen ? "row-start-2" : "col-start-2"}`}>
        {children}
      </div>
    </div>
  );
}
