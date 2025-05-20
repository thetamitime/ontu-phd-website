import { DefenseEvent } from "@/lib/types/defences";
import { notFound } from "next/navigation";
import { DefenceFormValues } from "@/lib/schemas/defenceSchema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllDefences = async () => {
  const res = await fetch(`${API_BASE_URL}/api/defenses`);

  const defences: DefenseEvent[] = await res.json();
  if (!defences) notFound();
  return defences;
};

export const getDefencesByDegree = async (degree: "phd" | "doc") => {
  const res = await fetch(`${API_BASE_URL}/api/Defenses/degree/${degree}`);

  const defences: DefenseEvent[] = await res.json();
  if (!defences) notFound();
  return defences;
};

export const getDefenceById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/defenses/${id}`);

  const defence: DefenseEvent = await res.json();
  if (!defence) notFound();
  return defence;
};

export async function createDefence(updatedDefence: DefenceFormValues) {
  try {
    console.log("Defence before POST", updatedDefence);

    const response = await fetch(`${API_BASE_URL}/api/defenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDefence),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Failed to create defense. Status: ${response.status}, Message: ${errorText}`,
      );
    }

    const result = await response.json();
    console.log("Defense created successfully:", result);
    return result;
  } catch (error: unknown) {
    console.error("Error during defense create:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create defense: ${error.message}`);
    }
  }
}

export async function updateDefence(
  id: number,
  updatedProgram: DefenceFormValues,
) {
  const response = await fetch(`${API_BASE_URL}/api/defenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProgram),
  });

  if (!response.ok) {
    const message = await response.text();
    console.error("Update failed:", message);
    throw new Error(`Failed to update defence: ${message}`);
  }

  const data = await response.json();
  console.log("Update successful:", data);
  return data;
}

export const deleteDefence = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/defenses/${id}`, {
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
};
