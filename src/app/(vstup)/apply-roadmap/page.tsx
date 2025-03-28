"use client";
import Timeline from "@/ui/components/Timeline";
import { timeline } from "../../../lib/json/timeline.json";
import { useSearchParams } from "next/navigation";

export default function Roadmap() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const typedTimeline = timeline.find((x) => x.type === type);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <Timeline events={typedTimeline.events} />;
}
