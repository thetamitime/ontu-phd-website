"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  degree?: string;
  forPath: string;
  title: string | undefined;
}

export const Breadcrumbs = ({ degree, forPath, title }: BreadcrumbsProps) => {
  const previousPath =
    forPath === "/programs"
      ? `Програми ${degree === "phd" ? "аспірантури" : "докторантури"}`
      : "Новини";

  return (
    <div className="breadcrumbs max-w-[88svw] py-4 lg:max-w-full">
      <ul>
        <li>
          <Link href="/">Головна</Link>
        </li>
        <li>
          <Link href={forPath + `/${degree}`}>{previousPath}</Link>
        </li>
        <li>{title}</li>
      </ul>
    </div>
  );
};
