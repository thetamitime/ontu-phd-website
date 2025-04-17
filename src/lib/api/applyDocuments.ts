import { notFound } from "next/navigation";
import { ApplyDocument } from "@/lib/types/documents";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getApplyDocuments(degree: string) {
  const res = await fetch(`${API_BASE_URL}/api/applydocuments/name/${degree}`);

  const applyDocuments: ApplyDocument = await res.json();
  if (!applyDocuments) notFound();
  return applyDocuments;
}
