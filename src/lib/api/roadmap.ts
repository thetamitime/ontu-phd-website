import { notFound } from "next/navigation";
import { Roadmap } from "@/lib/types";

export async function getRoadmap(type: string) {
  const res = await fetch(`http://localhost:5124/api/roadmaps?type=${type}`);

  const roadmap: Roadmap = await res.json();
  if (!roadmap) notFound();
  return roadmap;
}
