import { ApplyDocuments } from "@/lib/types";
import { notFound } from "next/navigation";

export async function getApplyDocuments(degree: string) {
  const res = await fetch(
    `http://localhost:5124/api/applydocuments?name=${degree}`,
    {
      cache: "force-cache",
    },
  );

  const applyDocuments: ApplyDocuments = await res.json();
  if (!applyDocuments) notFound();
  return applyDocuments;
}
