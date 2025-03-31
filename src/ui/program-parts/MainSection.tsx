import { CostsTable } from "@/ui/components/Tables";
import React from "react";
import { SmallCardWithNumber } from "@/ui/components/SmallCardWithNumber";
import { FieldOfStudy, Speciality } from "@/lib/types/programs";

interface MainSectionProps {
  programName: string;
  programField: FieldOfStudy;
  programSpecialty: Speciality;
  programForm: string[];
  programPurpose: string;
  programCredits: number;
  programDuration: number;
  programCosts: number[];
  programSum: number;
}

export const MainSection: React.FC<MainSectionProps> = ({
  programName,
  programField,
  programSpecialty,
  programForm,
  programPurpose,
  programCredits,
  programDuration,
  programCosts,
  programSum,
}) => {
  return (
    <section id="main">
      {/* Program Name */}
      <h2 className="header mt-2 mb-0 text-start md:w-[80%]">{programName}</h2>
      {/* Field and Specialty Badges */}
      <div className="flex flex-wrap gap-2 pt-2 pb-6">
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${programField.code} ${programField.name}`}
        </div>
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${programSpecialty.code} ${programSpecialty.name}`}
        </div>
      </div>
      {/* Form of study */}
      <p>
        <b>Форма навчання:</b>{" "}
        {programForm.length > 1 ? programForm.join(" та ") : programForm[0]}
      </p>
      {/* Purpose of program */}
      <p>
        <b>Основна мета програми:</b> {programPurpose}
      </p>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:inline-grid md:grid-cols-[auto_1fr] md:grid-rows-2">
        {/* Years */}
        <SmallCardWithNumber
          num={programDuration}
          caption="тривалість навчання"
        />
        {/* Credits */}
        <div className="md:row-start-2">
          <SmallCardWithNumber
            num={programCredits}
            caption="кількість кредитів"
          />
        </div>
        {/* Costs Table */}
        <div className="flex flex-col gap-4 pl-2 md:col-span-2 md:col-start-2 md:row-span-2">
          <h3 className="text-lg font-bold">
            Вартість навчання (2024/2025 н.р.)
          </h3>
          <div className="rounded-box border-base-content/5 w-full max-w-[100vw] flex-1 overflow-x-auto border md:max-w-full">
            <CostsTable costs={programCosts} sum={programSum} />
          </div>
        </div>
      </div>
    </section>
  );
};
