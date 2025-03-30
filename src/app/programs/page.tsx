"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { programs } from "../../lib/json/Programs.json";
import { ProgramCard } from "@/ui/components/ProgramCards";
import { v4 as uuidv4 } from "uuid";

export default function ProgramsPage() {
  return (
    <Suspense>
      <ProgramPageBody />
    </Suspense>
  );
}

const ProgramPageBody = () => {
  const searchParams = useSearchParams().toString().substring(5); //find degree of program from URL
  const filteredPrograms = programs.filter(
    (prog) => prog.degree === searchParams,
  );

  return (
    <>
      <h2 className="header">
        {searchParams.toString() === "phd"
          ? "Програми аспірантури"
          : "Програми докторантури"}
      </h2>
      <div className="wrapper gap-6">
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={uuidv4()}
            id={program.id}
            title={program.title}
            fieldOfKnowledge={program.fieldOfKnowledge}
            specialty={program.specialty}
          ></ProgramCard>
        ))}
      </div>
    </>
  );
};
