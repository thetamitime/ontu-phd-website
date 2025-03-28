"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";

interface TimelineProps {
  events: {
    date_range: string;
    event: string;
  }[];
}

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

export default function Timeline({ events }: TimelineProps) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <ul
      className={`${
        isLargeScreen
          ? "steps steps-vertical hidden lg:inline-grid"
          : "flex flex-col gap-6 lg:hidden"
      }`}
    >
      {events.map((step) => (
        <li
          data-content=""
          key={uuidv4()}
          className={`${isLargeScreen && "step step-primary"}`}
        >
          <div
            className={`bg-base-100 border-base-300 flex w-full flex-col gap-3 rounded-xl border p-6 text-start ${isLargeScreen && "ml-8 max-w-4xl"}`}
          >
            <p className="text-sm md:text-base">{step.date_range}</p>
            <p className="text-base md:text-lg">{step.event}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
