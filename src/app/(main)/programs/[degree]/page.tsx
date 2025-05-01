import { ProgramCardLarge } from "@/ui/components";
import { getProgramsByDegree } from "@/lib/api/programs";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ degree: "phd" | "doc" }>;
}) {
  const { degree } = await params;
  const programsByDegree = await getProgramsByDegree(degree);

  console.log(programsByDegree);

  return (
    <>
      <h2 className="header">
        {degree === "phd" ? "Програми аспірантури" : "Програми докторантури"}
      </h2>
      <div className="flex-wrapper">
        {programsByDegree.map((program) => (
          <ProgramCardLarge
            key={program.id}
            degree={degree}
            id={program.id}
            name={program.name}
            fieldOfStudy={program.fieldOfStudy}
            speciality={program.speciality}
          />
        ))}
      </div>
    </>
  );
}
