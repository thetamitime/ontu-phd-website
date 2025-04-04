import { getDefencesByDegree } from "@/lib/api/defence";
import DefenceCardsTable from "@/ui/components/tables/DefenceCardsTable";

export default async function DefencePage({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;
  const defences = await getDefencesByDegree(degree);

  const dataWithDegree = defences.map((defence) => ({
    ...defence,
    degree,
  }));

  return <DefenceCardsTable data={dataWithDegree} />;
}
