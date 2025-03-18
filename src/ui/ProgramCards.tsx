import { Program } from "@/lib/types";
import Link from "next/link";

type ProgramShortened = Pick<
  Program,
  "id" | "degree" | "fieldOfKnowledge" | "link"
>;

export function ProgramCardSmall({
  id,
  fieldOfKnowledge,
  degree,
  link,
}: ProgramShortened) {
  return (
    <div className="card card-border border-base-300 bg-base-100 w-78" key={id}>
      <div className="card-body">
        <p className="text-base-content/80 text-base">
          {degree === "Phd" ? "Доктор філософії" : "Доктор наук"}
        </p>
        <h3 className="card-title font-semibold"> {fieldOfKnowledge} </h3>
        <a
          target="_blank"
          href={link}
          className="link md:link-hover text-base-content/40 mt-3"
        >
          Усі програми
        </a>
      </div>
    </div>
  );
}
