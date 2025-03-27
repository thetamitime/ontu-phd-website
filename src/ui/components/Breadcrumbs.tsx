"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { programs } from "../../lib/json/Programs.json";
import { Program } from "@/lib/types";

export function Breadcrumbs() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const id = pathNames[pathNames.length - 1];
  const program: Program | undefined = programs.find(
    (obj) => obj.id.toString() === id,
  );

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
                <Link
                  href={{
                    pathname: "/programs",
                    query: { degree: program?.degree },
                  }}
                >
                  Програми{" "}
                  {program?.degree === "phd" ? "аспірантури" : "докторантури"}
                </Link>
              </li>
            ))}
          <li>{pathNames[0]}</li>
        </ul>
      </div>
    )
  );
}
