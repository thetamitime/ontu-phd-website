import React from "react";
import { SmallCardWithNumber } from "@/ui/components/cards/SmallCardWithNumber";
import { Program } from "@/lib/types/programs";
import { InfoBox } from "@/ui/components/misc/InfoBox";

type MainSectionProps = Omit<
  Program,
  | "id"
  | "nameCode"
  | "institute"
  | "programCharacteristics"
  | "directions"
  | "linkFaculties"
  | "programDocumentId"
>;

export const MainSection: React.FC<MainSectionProps> = ({
  name,
  degree,
  speciality,
  form,
  fieldOfStudy,
  purpose,
  years,
  credits,
  descriptions,
  objects,
  accredited,
}) => {
  return (
    <section>
      {/* Program name */}
      <h2 className="header mb-0 text-start md:w-[80%]">{name}</h2>

      {/* Field and Specialty badges */}
      <div className="flex flex-wrap gap-2 pt-2 pb-6">
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${fieldOfStudy.code} ${fieldOfStudy.name}`}
        </div>
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${speciality.code} ${speciality.name}`}
        </div>
      </div>

      {/* Accreditation notice */}
      {!accredited && (
        <InfoBox
          className="mb-5"
          size={24}
          body="Увага! Акредитацію програми заплановано на 2026-2027 роки."
        />
      )}

      {/* Form of study */}
      {form && (
        <p>
          <b>Форма навчання:</b> {form.length > 1 ? form.join(" та ") : form[0]}
        </p>
      )}

      {/* Basic info based on degree */}
      {degree === "phd" ? (
        <PhdView purpose={purpose} credits={credits || 0} years={years || 0} />
      ) : (
        <DocView
          descriptions={descriptions}
          objects={objects}
          fieldOfStudy={fieldOfStudy}
        />
      )}
    </section>
  );
};

type PhdViewProps = Pick<Program, "purpose"> & {
  years: number;
  credits: number;
};

const PhdView = ({ purpose, years, credits }: PhdViewProps) => {
  return (
    <>
      <p>
        <b>Основна мета програми:</b> {purpose}
      </p>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {/* Years */}
        <SmallCardWithNumber num={years} caption="тривалість навчання" />
        {/* Credits */}
        <SmallCardWithNumber num={credits} caption="кількість кредитів" />
        {/* Qualification */}
        <div className="card card-sm card-border border-base-300 overflow-hidden md:col-span-2">
          <div className="card-body bg-base-100 items-center px-8 pb-2">
            <p className="text-base">
              Після завершення навчання вам буде присуджено науковий ступінь
              <strong> доктора філософії</strong>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

type DocViewProps = Pick<Program, "descriptions" | "objects" | "fieldOfStudy">;

const DocView = ({ descriptions, objects, fieldOfStudy }: DocViewProps) => {
  const getDegreeLabel = () => {
    if (fieldOfStudy.name.includes("Економічні науки")) {
      return "економічних наук";
    } else if (fieldOfStudy.name.includes("Технічні науки")) {
      return "технічних наук";
    }
    return "";
  };

  const degreeLabel = getDegreeLabel();

  return (
    <>
      <p>
        <span className="inline font-bold">Oпис: </span>
        <span className="inline font-normal lowercase">{descriptions}</span>
      </p>
      {objects && objects?.length > 1 && (
        <p>
          <span className="inline font-bold">Об&#39;єкти спеціальності: </span>
          <span className="inline font-normal lowercase">{objects}</span>
        </p>
      )}

      {/* Qualification */}
      <div className="card card-sm card-border border-base-300 mt-6 overflow-hidden md:col-span-2">
        <div className="card-body bg-base-100 items-center px-8 pb-2">
          <p className="text-base">
            Після завершення навчання вам буде присуджено науковий ступінь
            <strong> доктора {degreeLabel ? ` ${degreeLabel}.` : ""}</strong>
          </p>
        </div>
      </div>
    </>
  );
};
