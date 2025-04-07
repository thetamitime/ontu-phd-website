import { notFound } from "next/navigation";
import { ProgramField, Program, ProgramDegree } from "@/lib/types/programs";

export async function getAllPrograms() {
  const res = await fetch(`http://192.168.0.160:5124/api/programs`);

  const programs: Program[] = await res.json();
  if (!programs) notFound();
  return programs;
}

export async function getProgramsByDegree(degree: string) {
  const res = await fetch(
    `http://192.168.0.160:5124/api/programs/degrees?degree=${degree}`,
  );

  const programs: ProgramDegree[] = await res.json();
  if (!programs) notFound();
  return programs;
}

export async function getProgramById(id: string) {
  const res = await fetch(`http://192.168.0.160:5124/api/programs/${id}`);

  const program: Program = await res.json();
  if (!program) notFound();
  return program;
}

export async function getProgramFields() {
  const res = await fetch("http://192.168.0.160:5124/api/programs/fields");

  const field: ProgramField[] = await res.json();
  if (!field) notFound();
  return field;
}

export async function updateProgram(id: number, updatedProgram: any) {
  try {
    const formData = new FormData();

    // Iterate over the fields in updatedProgram and append to FormData
    for (const key in updatedProgram) {
      if (updatedProgram.hasOwnProperty(key)) {
        const value = updatedProgram[key];

        // Check if value is an object (like 'fieldOfStudy') and break it into subfields
        if (value && typeof value === "object") {
          for (const subKey in value) {
            if (value.hasOwnProperty(subKey)) {
              // Append subKey as a part of the parent key, like fieldOfStudy[code], fieldOfStudy[name]
              formData.append(`${key}[${subKey}]`, value[subKey]);
            }
          }
        } else {
          // Otherwise, append the value as is
          formData.append(key, value);
        }
      }
    }

    const response = await fetch(
      `http://192.168.0.160:5124/api/programs/${id}`,
      {
        method: "PUT",
        body: formData, // Use FormData directly
      },
    );

    // Check if response status is OK (2xx range)
    if (!response.ok) {
      // Log the response status and text for debugging
      const errorText = await response.text();
      console.error("Error response:", errorText);

      // Throw error with status and body of the response
      throw new Error(
        `Failed to update program. Status: ${response.status}, Message: ${errorText}`,
      );
    }

    // Return the response JSON if successful
    const result = await response.json();
    console.log(result);
    return response.json();
  } catch (error: any) {
    // Log error stack for debugging
    console.error("Error during update program:", error);
    throw new Error(`Failed to update program: ${error.message}`);
  }
}
