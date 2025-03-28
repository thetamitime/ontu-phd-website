"use client";

import Link from "next/link";
import { useState } from "react";

export function Tabs() {
  const [isPhd, setIsPhd] = useState(true);

  return (
    <div role="tablist" className="tabs tabs-box bg-base-300 mb-2">
      <Link
        href={{ pathname: "", query: { type: "phd" } }}
        className={`tab ${isPhd && "tab-active"}`}
        onClick={() => setIsPhd(true)}
      >
        Аспіранту
      </Link>
      <Link
        href={{ pathname: "", query: { type: "doc" } }}
        className={`tab ${!isPhd && "tab-active"}`}
        onClick={() => setIsPhd(false)}
      >
        Доктору наук
      </Link>
    </div>
  );
}
