import { notFound } from "next/navigation";
import { Employees } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllEmployees() {
  const res = await fetch(`${API_BASE_URL}/api/employees`);

  const employees: Employees = await res.json();
  if (!employees) notFound();
  return employees;
}
