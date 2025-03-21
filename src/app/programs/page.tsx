"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { programs } from "../../lib/json/Programs.json";
import { ProgramCard } from "@/ui/components/ProgramCards";
import { v4 as uuidv4 } from "uuid";

export default function Programs() {
  const searchParams = useSearchParams().toString().slice(3, -1); //find degree of program from URL
  const filteredPrograms = programs.filter(
    (prog) => prog.degree === searchParams,
  );

  return (
    <Suspense>
      <main className="section pb-20">
        <h2 className="header w-[90%] md:w-full">
          {searchParams.toString() === "phd"
            ? "Програми аспірантури"
            : "Програми докторантури"}
        </h2>
        <div className="wrapper my-auto mt-0 w-[90%] gap-6">
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
      </main>
    </Suspense>
  );
}
