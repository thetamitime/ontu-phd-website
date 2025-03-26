"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Breadcrumbs() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const router = useRouter();
  console.log(router);

  return (
    pathNames.length > 1 && (
      <div className="breadcrumbs py-4">
        <ul>
          <li>
            <Link href="/">Головна</Link>
          </li>
          {pathNames
            .reverse()
            .slice(1)
            .map((pathName) => (
              <li key={pathName}>
                <a onClick={() => router.back()}>{pathName}</a>
              </li>
            ))}
          <li>{pathNames[0]}</li>
        </ul>
      </div>
    )
  );
}
