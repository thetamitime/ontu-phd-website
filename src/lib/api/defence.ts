import { DefenseEvent } from "@/lib/types/defences";
import { notFound } from "next/navigation";

export const getAllDefences = async () => {
  const res = await fetch("http://192.168.0.160:5124/api/defence");

  const defences: DefenseEvent[] = await res.json();
  if (!defences) notFound();
  return defences;
};

export const getDefencesByDegree = async (degree: string) => {
  const res = await fetch(
    `http://192.168.0.160:5124/api/defence/degree?degree=${degree}`,
  );

  const defences: DefenseEvent[] = await res.json();
  if (!defences) notFound();
  return defences;
};
