import { FieldOfStudy, ProgramField, Speciality } from "@/lib/types/programs";
import { notFound } from "next/navigation";

export async function getAllFields() {
  const res = await fetch("http://localhost:5124/api/programs/fields");

  const field: ProgramField[] = await res.json();
  if (!field) notFound();
  return field;
}

export async function getFieldsByDegree(degree: string) {
  const res = await fetch(
    `http://localhost:5124/api/SpecialityNFields?degree=${degree}`,
  );

  const fields: FieldOfStudy[] = await res.json();
  if (!fields) notFound();
  return fields;
}

export async function getSpecialitiesByField(code: string) {
  const res = await fetch(
    `http://localhost:5124/api/SpecialityNFields/${code}`,
  );

  const specialities: Speciality[] = await res.json();
  if (!specialities) notFound();
  return specialities;
}
