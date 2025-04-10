import { Speciality } from "@/lib/types/programs";
import { notFound } from "next/navigation";
import { Field } from "@/lib/types/fields";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllFields() {
  const res = await fetch(`${API_BASE_URL}/api/SpecialityNFields`);

  const field: Field[] = await res.json();
  if (!field) notFound();
  return field;
}

export async function getFieldsByDegree(degree: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/SpecialityNFields?degree=${degree}`,
  );

  const fields: Field[] = await res.json();
  if (!fields) notFound();
  return fields;
}

export async function getSpecialitiesByField(code: string) {
  const res = await fetch(`${API_BASE_URL}/api/SpecialityNFields/${code}`);

  const specialities: Speciality[] = await res.json();
  if (!specialities) notFound();
  return specialities;
}
