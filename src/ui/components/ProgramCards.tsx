import { Program } from "@/lib/types/programs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProgramShortenedSmall = Pick<Program, "id" | "degree" | "fieldOfStudy">;

type ProgramShortened = Pick<
  Program,
  "id" | "fieldOfStudy" | "name" | "shortSpeciality" | "degree"
>;

export function ProgramCardSmall({
  id,
  fieldOfStudy,
  degree,
}: ProgramShortenedSmall) {
  return (
    <div className="card card-border border-base-300 bg-base-100 w-78" key={id}>
      <div className="card-body">
        <p className="text-base-content/80 grow-0 text-base">
          {degree === "phd" ? "Доктор філософії" : "Доктор наук"}
        </p>
        <h4 className="card-title font-semibold">{fieldOfStudy.name}</h4>
      </div>
    </div>
  );
}

export function ProgramCard({
  id,
  degree,
  fieldOfStudy,
  shortSpeciality,
  name,
}: ProgramShortened) {
  return (
    <div className="card bg-base-100 card-border border-base-300 w-80">
      <div className="card-body items-start justify-between">
        <div className="text-sm">
          <p className="text-base-content pb-2 uppercase">{`${fieldOfStudy.code} ${fieldOfStudy.name}`}</p>
          <p className="text-base-content/40 font-medium">
            {`${shortSpeciality?.code} ${shortSpeciality?.name}`}
          </p>
        </div>
        <h3 className="text-base-content h-full text-xl font-bold">{name}</h3>
        <div className="card-actions justify-end self-stretch">
          <Link
            href={`/programs/${degree}/${id}`}
            className="link md:link-hover text-base-content/40 mt-3"
          >
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
