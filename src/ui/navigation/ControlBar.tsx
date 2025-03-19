"use client";

import { FC, useEffect, useState } from "react";
import { Moon, SunMedium, UserRound } from "lucide-react";
import { useTheme } from "next-themes";

export const ControlBar: FC = () => {
  return (
    <div className="bg-neutral flex items-center justify-end gap-2 sm:px-0 md:px-10">
      <ThemeToggle />
      <LoginLink />
    </div>
  );
};

function LoginLink() {
  return (
    <button className="btn btn-soft btn-xs text-base-content flex items-center gap-2 rounded-none px-3 py-2 text-xs">
      <UserRound className="md:size-4" />
      Вхід
    </button>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dracula" ? "winter" : "dracula";
    setTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
    document.querySelector("html")?.setAttribute("data-theme", theme!);
  }, [theme]);

  if (!mounted) return null;

  return theme === "dracula" ? (
    <div onClick={toggleTheme}>
      <SunMedium className="text-neutral-content cursor-pointer sm:size-6 md:size-5" />
    </div>
  ) : (
    <div onClick={toggleTheme}>
      <Moon className="text-neutral-content cursor-pointer sm:size-6 md:size-5" />
    </div>
  );
}
