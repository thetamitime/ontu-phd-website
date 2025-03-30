import { notFound } from "next/navigation";
import { Documents } from "@/lib/types";

export async function getDocuments(type: string) {
  const res = await fetch(`http://localhost:5124/api/documents?type=${type}`);

  const documents: Documents = await res.json();
  if (!documents) notFound();
  return documents;
}
