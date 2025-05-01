import { notFound } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllInstitutes() {
  const res = await fetch(`${API_BASE_URL}/api/Institutes`);

  const institutes: { id: number; name: string }[] = await res.json();
  if (!institutes) notFound();
  return institutes;
}
