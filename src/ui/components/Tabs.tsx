"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Tabs() {
  const [isPhd, setIsPhd] = useState(true);
  const path = usePathname();
  const previousPath = path.split("/")[1];
  const degree = path.split("/")[2];

  // set initial state based on the URL when the component mounts
  useEffect(() => {
    if (degree === "doc") {
      setIsPhd(false);
    }
  }, [degree]);

  return (
    <div role="tablist" className="tabs tabs-box bg-base-300 mb-2">
      <Link
        href={`/${previousPath}/phd`}
        className={`tab ${isPhd && "tab-active"}`}
        onClick={() => setIsPhd(true)}
      >
        Аспіранту
      </Link>
      <Link
        prefetch={true}
        href={`/${previousPath}/doc`}
        className={`tab ${!isPhd && "tab-active"}`}
        onClick={() => setIsPhd(false)}
      >
        Доктору наук
      </Link>
    </div>
  );
}
