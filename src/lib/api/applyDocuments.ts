import { ApplyDocuments } from "@/lib/types";
import { notFound } from "next/navigation";

export async function getApplyDocuments(degree: string) {
  const res = await fetch(
    `http://192.168.0.160:5124/api/applydocuments?name=${degree}`,
  );

  const applyDocuments: ApplyDocuments = await res.json();
  if (!applyDocuments) notFound();
  return applyDocuments;
}
