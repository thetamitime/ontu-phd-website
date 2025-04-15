"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutTemplate } from "lucide-react";
import { useAuth } from "@/lib/utils/AuthProvider";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { href: "/dashboard", label: "Панель керування" },
    { href: "/dashboard/programs", label: "Програми" },
    { href: "/dashboard/defence", label: "Захист" },
    { href: "/dashboard/news", label: "Новини" },
    { href: "/dashboard/documents", label: "Документи" },
    { href: "/dashboard/faculty", label: "Співробітники" },
    { href: "/dashboard/settings", label: "Налаштування" },
    { href: "/dashboard/logout", label: "Вийти" },
  ];

  const mainMenuItems = menuItems.slice(0, -2);
  const restMenuItems = menuItems.slice(-2);

  return (
    <div
      className={`bg-base-300 row-span-2 flex flex-col gap-10 px-2 py-3 ${
        isSidebarOpen ? "" : "hidden"
      }`}
    >
      <h1 className="mx-auto mt-6 w-fit flex-none text-2xl font-bold">
        ONTU PHD
      </h1>
      <ul className="menu rounded-box w-56 grow gap-2 text-base">
        {mainMenuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`py-2 ${pathname === item.href ? "menu-active" : ""}`}
            >
              <LayoutTemplate size={20} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="menu rounded-box w-56 gap-2 text-base">
        {restMenuItems.map((item) => (
          <li key={item.href}>
            <Link
              onClick={item.label === "Вийти" ? logout : undefined}
              href={item.label === "Вийти" ? "" : item.href}
              className={`py-2 ${pathname === item.href ? "menu-active" : ""}`}
            >
              <LayoutTemplate size={20} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
