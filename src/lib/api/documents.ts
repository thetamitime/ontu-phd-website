import { notFound } from "next/navigation";
import { Documents } from "@/lib/types/documents";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDocuments(type: string) {
  const res = await fetch(`${API_BASE_URL}/api/documents/type/${type}`);

  const documents: Documents = await res.json();
  if (!documents) notFound();
  return documents.sort((a, b) => a.id - b.id);
}
