"use client";

import { AArrowDown, AArrowUp, UserRound } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/ui/components/misc/ThemeToggle";
import { useState } from "react";

export const ControlBar = () => {
  return (
    <div className="bg-neutral flex items-center justify-end gap-2 sm:px-0 md:px-10">
      <FontSizeControls />
      <ThemeToggle />
      <LoginLink />
    </div>
  );
};

const FontSizeControls = () => {
  const [fontSize, setFontSize] = useState(16);

  const updateFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta)); // limit between 12px and 24px
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  return (
    <div className="join">
      <button
        onClick={() => updateFontSize(-2)}
        className="btn btn-ghost btn-xs join-item text-neutral-content hover:text-base-content rounded-none"
        title="Зменшити шрифт"
      >
        <AArrowDown size={20} />
      </button>
      <button
        onClick={() => updateFontSize(2)}
        className="btn btn-ghost btn-xs join-item text-neutral-content hover:text-base-content rounded-none"
        title="Збільшити шрифт"
      >
        <AArrowUp size={20} />
      </button>
    </div>
  );
};

const LoginLink = () => {
  return (
    <Link
      href="/login"
      className="btn btn-soft btn-xs text-base-content flex items-center gap-2 rounded-none px-3 py-2 text-xs"
    >
      <UserRound className="md:size-4" />
      Вхід
    </Link>
  );
};
