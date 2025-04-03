import { ProgramDegree } from "@/lib/types/programs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProgramCardSmallProps = ProgramDegree;

export const ProgramCardLarge: React.FC<ProgramCardSmallProps> = ({
  id,
  degree,
  name,
  fieldOfStudy,
  speciality,
}) => {
  return (
    <div className="card bg-base-100 card-border border-base-300 w-80">
      <div className="card-body items-start justify-between">
        <div className="text-sm">
          <p className="text-base-content pb-2 uppercase">{`${fieldOfStudy.code} ${fieldOfStudy.name}`}</p>
          <p className="text-base-content/40 font-medium">
            {`${speciality?.code} ${speciality?.name}`}
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
};
