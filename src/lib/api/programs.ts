import { notFound } from "next/navigation";
import { ProgramField, Program, ProgramDegree } from "@/lib/types/programs";

export async function getAllPrograms() {
  const res = await fetch(`http://localhost:5124/api/programs`);

  const programs: Program[] = await res.json();
  if (!programs) notFound();
  return programs;
}

export async function getProgramsByDegree(degree: string) {
  const res = await fetch(
    `http://localhost:5124/api/programs/degrees?degree=${degree}`,
  );

  const programs: ProgramDegree[] = await res.json();
  if (!programs) notFound();
  return programs;
}

export async function getProgramById(id: string) {
  const res = await fetch(`http://localhost:5124/api/programs/${id}`);

  const program: Program = await res.json();
  if (!program) notFound();
  return program;
}

export async function getProgramFields() {
  const res = await fetch("http://localhost:5124/api/programs/fields");

  const field: ProgramField[] = await res.json();
  if (!field) notFound();
  return field;
}
