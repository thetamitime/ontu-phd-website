import { notFound } from "next/navigation";
import { Program, ProgramDegree } from "@/lib/types/programs";

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

export async function updateProgram(id: number, updatedProgram: any) {
  try {
    const formData = new FormData();

    // Recursively flatten the object and append fields to FormData
    function appendFormData(prefix: string, value: any) {
      if (value && typeof value === "object" && !(value instanceof File)) {
        // Handle nested objects by recursively flattening them
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            appendFormData(`${prefix}[${subKey}]`, value[subKey]);
          }
        }
      } else {
        // Append simple key-value pair to FormData
        formData.append(prefix, value);
      }
    }

    // Iterate over the fields in updatedProgram and apply the recursive function
    for (const key in updatedProgram) {
      if (updatedProgram.hasOwnProperty(key)) {
        const value = updatedProgram[key];
        if (value === undefined) continue;
        console.log(value);

        appendFormData(key, updatedProgram[key]);
      }
    }

    const response = await fetch(`${API_BASE_URL}/api/programs/${id}`, {
      method: "PUT",
      body: formData, // Use FormData directly
    });

    // Check if response status is OK (2xx range)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to update program. Status: ${response.status}, Message: ${errorText}`,
      );
    }

    const result = await response.json();
    console.log("Відправлено:", result);
    return result; // Return the parsed JSON result
  } catch (error: any) {
    console.error("Error during update program:", error);
    throw new Error(`Failed to update program: ${error.message}`);
  }
}

export async function createProgram(updatedProgram: any) {
  try {
    const formData = new FormData();

    // Recursively flatten the object and append fields to FormData
    function appendFormData(prefix: string, value: any) {
      if (value && typeof value === "object" && !(value instanceof File)) {
        // Handle nested objects by recursively flattening them
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            appendFormData(`${prefix}[${subKey}]`, value[subKey]);
          }
        }
      } else {
        // Append simple key-value pair to FormData
        formData.append(prefix, value);
      }
    }

    // Iterate over the fields in updatedProgram and apply the recursive function
    Object.keys(updatedProgram).forEach((key) => {
      const value = updatedProgram[key];
      if (value !== undefined) {
        appendFormData(key, value);
      }
    });

    const response = await fetch(
      `${API_BASE_URL}/api/programs`, // POST request (no need for id in URL for POST)
      {
        method: "POST", // Use POST for creating a new program or updating as a new entry
        body: formData, // Use FormData directly
      },
    );

    // Check if response status is OK (2xx range)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to create/update program. Status: ${response.status}, Message: ${errorText}`,
      );
    }

    const result = await response.json();
    console.log("Program updated/created successfully:", result);
    return result; // Return the parsed JSON result
  } catch (error: any) {
    console.error("Error during program update/create:", error);
    throw new Error(`Failed to update/create program: ${error.message}`);
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
