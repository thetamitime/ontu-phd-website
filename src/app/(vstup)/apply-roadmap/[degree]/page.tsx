import Timeline from "@/ui/components/Timeline";
import { timeline } from "../../../../lib/json/timeline.json";

export default async function Roadmap({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;
  const typedTimeline = timeline.find((x) => x.type === degree);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <Timeline events={typedTimeline.events} />;
}
