"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Roadmap, RoadmapItem } from "@/lib/types";

//custom query to get window size
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    // Check if window is available
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default function Timeline({ roadmap }: { roadmap: Roadmap }) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // check current status for children styling
  const checkStatus = (status: string, prevStatus: string | null) => {
    let classNames = "";

    if (status === "NotStarted") {
      classNames = "";
    } else if (status === "Ontime") {
      classNames = "step-accent";
    } else if (status === "Completed") {
      classNames = "step-success";
    }

    // сheck if previous status is 'Completed' and apply class to current item
    if (prevStatus === "Completed" && status !== "NotStarted") {
      classNames = "before:!bg-success " + classNames;
    }

    return classNames;
  };

  return (
    <ul
      className={`${
        isLargeScreen
          ? "steps steps-vertical hidden lg:inline-grid"
          : "flex flex-col gap-6 lg:hidden"
      }`}
    >
      {roadmap.map((item: RoadmapItem, index) => {
        const prevItemStatus = index > 0 ? roadmap[index - 1].status : null;
        const statusClass = checkStatus(item.status, prevItemStatus);

        return (
          <TimelineItem
            key={item.id}
            dataStart={item.dataStart}
            dataEnd={item.dataEnd}
            additionalTime={item.additionalTime}
            description={item.description}
            statusClass={statusClass}
          />
        );
      })}
    </ul>
  );
}

type TimelineItemProps = Pick<
  RoadmapItem,
  "dataStart" | "dataEnd" | "additionalTime" | "description"
> & { statusClass: string };

const TimelineItem = ({
  dataStart,
  dataEnd,
  additionalTime,
  description,
  statusClass,
}: TimelineItemProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // format date field correctly
  const dateStart = new Date(dataStart).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateEnd =
    dataEnd &&
    new Date(dataEnd as string).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const extraTime = additionalTime ? `(${additionalTime})` : "";
  const fullDate = `${dateStart} ${dateEnd !== null ? `- ${dateEnd}` : ""} ${extraTime}`;

  return (
    <li
      data-content=""
      key={uuidv4()}
      className={`${isLargeScreen && `step ${statusClass}`}`}
    >
      <div
        className={`bg-base-100 border-base-300 flex w-full flex-col gap-3 rounded-xl border p-6 text-start ${isLargeScreen && "ml-8 max-w-4xl"}`}
      >
        <p className="text-sm md:text-base">{fullDate}</p>
        <p className="text-base md:text-lg">{description}</p>
      </div>
    </li>
  );
};
