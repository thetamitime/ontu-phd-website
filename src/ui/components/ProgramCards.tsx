import { Program } from "@/lib/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProgramShortenedSmall = Pick<
  Program,
  "id" | "degree" | "fieldOfKnowledge" | "link"
>;

type ProgramShortened = Pick<
  Program,
  "id" | "fieldOfKnowledge" | "title" | "specialty"
>;

export function ProgramCardSmall({
  id,
  fieldOfKnowledge,
  degree,
  link,
}: ProgramShortenedSmall) {
  return (
    <div className="card card-border border-base-300 bg-base-100 w-78" key={id}>
      <div className="card-body">
        <p className="text-base-content/80 text-base">
          {degree === "Phd" ? "Доктор філософії" : "Доктор наук"}
        </p>
        <h4 className="card-title font-semibold"> {fieldOfKnowledge} </h4>
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

export function ProgramCard({
  id,
  fieldOfKnowledge,
  specialty,
  title,
}: ProgramShortened) {
  return (
    <div className="card bg-base-100 card-border border-base-300 w-80">
      <div className="card-body items-start justify-between">
        <div className="text-sm">
          <p className="text-base-content pb-2 uppercase">{fieldOfKnowledge}</p>
          <p className="text-base-content/40 font-medium">{specialty}</p>
        </div>
        <h3 className="text-base-content h-full text-xl font-bold">{title}</h3>
        <div className="card-actions justify-end self-stretch">
          <Link
            href={`/programs/${id}`}
            className="link md:link-hover text-base-content/40 mt-3"
          >
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
