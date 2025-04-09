import { ApplyDocuments } from "@/lib/types";
import { notFound } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getApplyDocuments(degree: string) {
  const res = await fetch(`${API_BASE_URL}/api/applydocuments?name=${degree}`);

  const applyDocuments: ApplyDocuments = await res.json();
  if (!applyDocuments) notFound();
  return applyDocuments;
}
