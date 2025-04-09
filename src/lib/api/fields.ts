import { Speciality } from "@/lib/types/programs";
import { notFound } from "next/navigation";
import { Field } from "@/lib/types/fields";

export async function getAllFields() {
  const res = await fetch("http://192.168.0.160:5124/api/SpecialityNFields");

  const field: Field[] = await res.json();
  if (!field) notFound();
  return field;
}

export async function getFieldsByDegree(degree: string) {
  const res = await fetch(
    `http://192.168.0.160:5124/api/SpecialityNFields?degree=${degree}`,
  );

  const fields: Field[] = await res.json();
  if (!fields) notFound();
  return fields;
}

export async function getSpecialitiesByField(code: string) {
  const res = await fetch(
    `http://192.168.0.160:5124/api/SpecialityNFields/${code}`,
  );

  const specialities: Speciality[] = await res.json();
  if (!specialities) notFound();
  return specialities;
}
