import { ProgramField } from "@/lib/types/programs";

type ProgramCardSmallProps = ProgramField;

export const ProgramCardSmall: React.FC<ProgramCardSmallProps> = ({
  id,
  degree,
  fieldOfStudy,
}) => {
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
};
