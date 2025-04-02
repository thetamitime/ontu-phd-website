import Timeline from "@/ui/components/Timeline";
import { getRoadmap } from "@/lib/api/roadmap";

export default async function DefencePage({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;
  const roadmap = await getRoadmap(degree);

  return <Timeline roadmap={roadmap} />;
}
