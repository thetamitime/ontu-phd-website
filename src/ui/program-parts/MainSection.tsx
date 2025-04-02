import React from "react";
import { SmallCardWithNumber } from "@/ui/components/SmallCardWithNumber";
import { Program } from "@/lib/types/programs";

export const MainSection: React.FC<Program> = ({ ...props }) => {
  return (
    <section id="main">
      {/* Program Name */}
      <h2 className="header mt-2 mb-0 text-start md:w-[80%]">{props.name}</h2>
      {/* Field and Specialty Badges */}
      <div className="flex flex-wrap gap-2 pt-2 pb-6">
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${props.fieldOfStudy.code} ${props.fieldOfStudy.name}`}
        </div>
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${props.speciality.code} ${props.speciality.name}`}
        </div>
      </div>
      {/* Form of study */}
      <p>
        <b>Форма навчання:</b>{" "}
        {props.form.length > 1 ? props.form.join(" та ") : props.form[0]}
      </p>
      {/* Purpose of program */}
      <p>
        <b>Основна мета програми:</b> {props.purpose}
      </p>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:inline-grid md:grid-cols-[auto_1fr] md:grid-rows-2">
        {/* Years */}
        {props.years !== undefined && (
          <SmallCardWithNumber
            num={props.years}
            caption="тривалість навчання"
          />
        )}
        {/* Credits */}
        {props.credits !== undefined && (
          <div className="md:row-start-2">
            <SmallCardWithNumber
              num={props.credits}
              caption="кількість кредитів"
            />
          </div>
        )}
      </div>
    </section>
  );
};
