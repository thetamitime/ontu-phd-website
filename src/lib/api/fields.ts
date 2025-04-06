import { FieldOfStudy, ProgramField } from "@/lib/types/programs";
import { notFound } from "next/navigation";

export async function getAllFields() {
  const res = await fetch("http://localhost:5124/api/programs/fields");

  const field: ProgramField[] = await res.json();
  if (!field) notFound();
  return field;
}

export async function getFieldsByDegree(degree: string) {
  const res = await fetch(`/api/SpecialityNFields?degree=${degree}`);

  const fields: FieldOfStudy[] = await res.json();
  if (!fields) notFound();
  return fields;
}
