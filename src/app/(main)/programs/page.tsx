import { getProgramsByDegree } from "@/lib/api/programs";
import { Title, ProgramCardLarge } from "@/ui/components";
import { Suspense } from "react";

export default async function ProgramsPage() {
  const programsPhd = await getProgramsByDegree("phd");
  const programsDoc = await getProgramsByDegree("doc");

  return (
    <>
      <h2 className="header">Наші програми</h2>
      <div className="section mb-5">
        <div className="mb-5">
          <Title text="Аспірантура" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={<p>Loading feed...</p>}>
              {programsPhd.map((item) => (
                <ProgramCardLarge key={item.id} {...item} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
      <div className="section">
        <div>
          <Title text="Докторантура" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programsDoc.map((item) => (
              <ProgramCardLarge key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
