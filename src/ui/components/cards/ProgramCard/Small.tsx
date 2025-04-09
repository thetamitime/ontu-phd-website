import { Field } from "@/lib/types/fields";

type ProgramCardSmallProps = Omit<Field, "code">;

export const Small: React.FC<ProgramCardSmallProps> = ({ degree, name }) => {
  return (
    <div className="card card-border border-base-300 bg-base-100 w-78">
      <div className="card-body">
        <p className="text-base-content/80 grow-0 text-base">
          {degree === "phd" ? "Доктор філософії" : "Доктор наук"}
        </p>
        <h4 className="card-title font-semibold">{name}</h4>
      </div>
    </div>
  );
};
