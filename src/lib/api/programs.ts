import { notFound } from "next/navigation";
import { Program, ProgramDegree, ProgramShort } from "@/lib/types/programs";
import { appendToFormData } from "@/lib/utils/append-data";
import { ProgramFormValues } from "@/lib/schemas/programSchema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPrograms() {
  const res = await fetch(`${API_BASE_URL}/api/programs`);

  const programs: Program[] = await res.json();
  if (!programs) notFound();
  return programs;
}

export async function getProgramsByDegree(degree: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/programs/degrees?degree=${degree}`,
  );

  const programs: ProgramDegree[] = await res.json();
  if (!programs) notFound();
  return programs;
}

export async function getProgramById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/programs/${id}`);

  const program: Program = await res.json();
  if (!program) notFound();
  return program;
}

export async function getShortProgramsByDegree(degree: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/programs/short?degree=${degree}`,
  );

  const programs: ProgramShort[] = await res.json();
  if (!programs) notFound();
  return programs;
}

export async function createProgram(updatedProgram: ProgramFormValues) {
  try {
    console.log("Program before POST", updatedProgram);

    const response = await fetch(`${API_BASE_URL}/api/programs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProgram),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to create/update program. Status: ${response.status}, Message: ${errorText}`,
      );
    }

    const result = await response.json();
    console.log("Program updated/created successfully:", result);
    return result;
  } catch (error: unknown) {
    console.error("Error during program update/create:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update/create program: ${error.message}`);
    }
  }
}

export async function updateProgram(
  id: number,
  updatedProgram: ProgramFormValues,
) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/programs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProgram),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to update program. Status: ${response.status}, Message: ${errorText}`,
      );
    }

    const result = await response.json();
    console.log("Відправлено:", result);
    return result;
  } catch (error: unknown) {
    console.error("Error during update program:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update program: ${error.message}`);
    }
  }
}

export async function deleteProgram(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/programs/${id}`, {
    method: "DELETE", // Use DELETE request for deletion
  });

  // Check if response status is OK (2xx range)
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(
      `Failed to delete program. Status: ${response.status}, Message: ${errorText}`,
    );
  }

  const result = await response.json();
  console.log("Program deleted successfully:", result);
  return result; // Return the parsed JSON result
}
