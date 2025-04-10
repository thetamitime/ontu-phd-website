"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";

export const ThemeToggle = () => {
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
};
