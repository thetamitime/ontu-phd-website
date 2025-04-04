import Link from "next/link";
import { FileSymlink, SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { RadaCard } from "@/ui/components";
import { DefenseEvent } from "@/lib/types/defences";
import { formattedDate, formattedDateWithHours } from "@/lib/functions";

export const DefenceCard: React.FC<DefenseEvent & { degree: string }> = ({
  nameSurname,
  dateOfDefense,
  dateOfPublication,
  defenseName,
  description,
  address,
  files,
  members,
  placeholder,
  programInfo,
  scienceTeachers,
  degree,
}) => {
  const displayDateOfDefense = formattedDateWithHours(dateOfDefense);
  const displayDateOfPublication = formattedDate(dateOfPublication);

  const radaFile = files.find(({ type }) => type === "Rada");
  const filesAndLivesFiles = files.filter(
    ({ type, name }) =>
      (type === "Live" || type === "DES") && !name.includes("КЕП"),
  );
  const digitalSignatureFiles = files.filter(({ name }) =>
    name.includes("КЕП"),
  );

  return (
    <div className="mt-10 w-full">
      <h4 className="text-base-content/50">{nameSurname}</h4>
      <h3 className="sub-header my-2">{defenseName}</h3>
      <div className="flex flex-wrap gap-2 pt-2 pb-6">
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${programInfo.fieldOfStudy.code} ${programInfo.fieldOfStudy.name}`}
        </div>
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${programInfo.speciality.code} ${programInfo.speciality.name}`}
        </div>
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${programInfo.name}`}
        </div>
      </div>
      {degree === "phd" && (
        <p>
          <span className="font-semibold">Наукові керівники: </span>
          {scienceTeachers}{" "}
        </p>
      )}
      {/*<p>*/}
      {/*  {scienceTeachers &&*/}
      {/*    (scienceTeachers.length > 0*/}
      {/*      ? scienceTeachers.map((teacher) => teacher)*/}
      {/*      : scienceTeachers)}*/}
      {/*</p>*/}
      <p>
        <span className="font-semibold">Дата захисту: </span>
        {displayDateOfDefense}
      </p>
      <p>
        <span className="font-semibold">Адреса: </span> {address}
      </p>
      {degree === "phd" ? (
        <>
          <p className="mt-4 mb-2">
            Разова спеціалізована вчена рада з правом прийняття до розгляду та
            проведення разового захисту дисертаційної роботи {nameSurname} на
            здобуття ступеня доктора філософії в галузі знань{" "}
            {programInfo.fieldOfStudy.code} «{programInfo.fieldOfStudy.name}» за
            спеціальністю {programInfo.speciality.code} «
            {programInfo.speciality.name}» (ОНП «{programInfo.name}»).
          </p>
          <p className="mb-4 text-lg font-semibold">
            Склад спеціалізованої ради:
          </p>
          <div className="flex flex-col gap-4 lg:flex-row">
            {members?.map((member, index) => (
              <RadaCard key={index} position={member.position} />
            ))}
          </div>
          <Link
            className="btn btn-outline border-light-base-400 dark:border-base-400 mt-4 h-fit gap-4 py-2 text-base"
            href={radaFile?.link || "/"}
            target="_blank"
          >
            <p className="w-full">{radaFile?.name}</p>
            <FileSymlink size={24} />
          </Link>
        </>
      ) : (
        <p className="mt-4 mb-2">
          Захист відбудеться на засіданні спеціалізованої вченої ради{" "}
          {placeholder} в Одеському національному технологічному університеті.
        </p>
      )}

      <p className="my-4 text-lg font-semibold">Посилання</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="card">
          <div className="card-title text-base-content/50 mb-4 text-base">
            Файли та трансляції
          </div>
          <div className="card-body px-0 py-0 lg:grow-0">
            {filesAndLivesFiles.map((file, index) => (
              <Link
                key={index}
                className="btn btn-outline border-light-base-400 dark:border-base-400 h-fit gap-4 py-2 text-base lg:w-fit"
                href={file.link}
                target="_blank"
              >
                <p className="w-full">{file.name}</p>
                <SquareArrowOutUpRight size={24} />
              </Link>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title text-base-content/50 mb-4 text-base">
            Електронний підпис
          </div>
          <div className="card-body px-0 py-0 lg:grow-0">
            {digitalSignatureFiles.map((file, index) => (
              <Link
                key={index}
                className="btn btn-outline border-light-base-400 dark:border-base-400 h-fit gap-4 py-2 text-base lg:w-fit"
                href={file.link}
                target="_blank"
              >
                <p className="w-full">{file.name}</p>
                <SquareArrowOutUpRight size={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="text-base-content/30 mt-6 text-sm lg:text-right">
        Дата розміщення оголошення – {displayDateOfPublication}
      </p>
      <div className="divider after:bg-base-300 before:bg-base-300 mt-2 mb-10"></div>
    </div>
  );
};
