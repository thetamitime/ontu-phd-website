import { notFound } from "next/navigation";
import { Roadmap } from "@/lib/types/roadmap";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRoadmap(type: string) {
  const res = await fetch(`${API_BASE_URL}/api/roadmaps?type=${type}`);

  const roadmap: Roadmap = await res.json();
  if (!roadmap) notFound();
  return roadmap;
}
