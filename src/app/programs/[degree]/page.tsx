import { programs } from "../../../lib/json/Programs.json";
import { ProgramCard } from "@/ui/components/ProgramCards";
import { v4 as uuidv4 } from "uuid";

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;
  const filteredPrograms = programs.filter((prog) => prog.degree === degree);

  return (
    <>
      <h2 className="header">
        {degree === "phd" ? "Програми аспірантури" : "Програми докторантури"}
      </h2>
      <div className="wrapper gap-6">
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={uuidv4()}
            id={program.id}
            degree={degree}
            title={program.title}
            fieldOfKnowledge={program.fieldOfKnowledge}
            specialty={program.specialty}
          ></ProgramCard>
        ))}
      </div>
    </>
  );
}
