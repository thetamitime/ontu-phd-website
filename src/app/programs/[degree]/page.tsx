import { ProgramCard } from "@/ui/components/ProgramCards";
import { getProgramsByDegree } from "@/lib/api/programs";

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;
  const programsByDegree = await getProgramsByDegree(degree);

  return (
    <>
      <h2 className="header">
        {degree === "phd" ? "Програми аспірантури" : "Програми докторантури"}
      </h2>
      <div className="wrapper gap-6">
        {programsByDegree.map((program) => (
          <ProgramCard
            key={program.id}
            id={program.id}
            degree={degree}
            name={program.name}
            fieldOfStudy={program.fieldOfStudy}
            speciality={program.speciality}
          ></ProgramCard>
        ))}
      </div>
    </>
  );
}
