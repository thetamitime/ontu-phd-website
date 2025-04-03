import { getProgramsByDegree } from "@/lib/api/programs";
import { Title } from "@/ui/components/Title";
import { ProgramCardLarge } from "@/ui/components";

export default async function ProgramsPage() {
  const programsPhd = await getProgramsByDegree("phd");
  const programsDoc = await getProgramsByDegree("doc");

  return (
    <>
      <h2 className="header">Наші програми</h2>
      <div className="mb-10 flex flex-col gap-20">
        <div>
          <Title text="Аспірантура" />
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programsPhd.map((item) => (
              <ProgramCardLarge key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div>
          <Title text="Докторантура" />
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programsDoc.map((item) => (
              <ProgramCardLarge key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
