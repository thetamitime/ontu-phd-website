"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Programs() {
  return (
    <Suspense>
      <div>
        <Suspense fallback={null}>
          <ShowContent />
        </Suspense>
      </div>
    </Suspense>
  );
}

function ShowContent() {
  const searchParams = useSearchParams();

  return <main>{searchParams.toString() === "%2Fphd=" ? "PHD" : "DOC"}</main>;
}
