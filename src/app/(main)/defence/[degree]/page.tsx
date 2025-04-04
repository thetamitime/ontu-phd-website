import { DefenceCard } from "@/ui/components/";
import { getDefencesByDegree } from "@/lib/api/defence";

export default async function DefencePage({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;
  const defences = await getDefencesByDegree(degree);

  return defences.map((def) => (
    <DefenceCard key={def.id} {...def} degree={degree} />
  ));
}
