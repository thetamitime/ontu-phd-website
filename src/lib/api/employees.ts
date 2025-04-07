import { notFound } from "next/navigation";
import { Employees } from "@/lib/types";

export async function getAllEmployees() {
  const res = await fetch(`http://192.168.0.160:5124/api/employees`);

  const employees: Employees = await res.json();
  if (!employees) notFound();
  return employees;
}
