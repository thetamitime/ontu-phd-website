import { DefenseEvent } from "@/lib/types/defences";
import { notFound } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllDefences = async () => {
  const res = await fetch(`${API_BASE_URL}/api/defence`);

  const defences: DefenseEvent[] = await res.json();
  if (!defences) notFound();
  return defences;
};

export const getDefencesByDegree = async (degree: "phd" | "doc") => {
  const res = await fetch(
    `${API_BASE_URL}/api/Defense/degree?degree=${degree}`,
  );

  const defences: DefenseEvent[] = await res.json();
  if (!defences) notFound();
  return defences;
};
