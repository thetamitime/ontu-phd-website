"use client";

import { FC } from "react";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/ui/components/ThemeToggle";

export const ControlBar: FC = () => {
  return (
    <div className="bg-neutral flex items-center justify-end gap-2 sm:px-0 md:px-10">
      <ThemeToggle />
      <LoginLink />
    </div>
  );
};

const LoginLink = () => {
  return (
    <Link
      href="/dashboard"
      className="btn btn-soft btn-xs text-base-content flex items-center gap-2 rounded-none px-3 py-2 text-xs"
    >
      <UserRound className="md:size-4" />
      Вхід
    </Link>
  );
};
