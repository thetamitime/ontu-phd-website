"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { getProgramById } from "@/lib/api/programs";
import { useEffect, useRef, useState } from "react";
import { Program } from "@/lib/types/programs";
import { TextInput } from "@/ui/components/form/TextInput";
import { OptionsRadioInput } from "@/ui/components/form/OptionsRadioInput";
import { Checkbox } from "@/ui/components/form/Checkbox";
import { SelectField } from "@/ui/components/form/SelectField";
import { getFieldsByDegree } from "@/lib/api/fields";

export default function ProgramForm({ programId }: { programId: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const { data: program } = useQuery({
    queryKey: ["program", programId],
    queryFn: () => getProgramById(programId),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const { data: fields } = useQuery({
    queryKey: ["fields", program?.degree],
    queryFn: () => getFieldsByDegree(program?.degree || ""),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const form = useForm({
    defaultValues: {
      name: program?.name || "",
      degree: program?.degree || "phd",
      accredited: program?.accredited || false,
      fieldOfStudy: program?.fieldOfStudy || null,
    },
    onSubmit: ({ value }) => {
      console.log("Submitted values: ", value);
    },
  });

  console.log(fields);

  return (
    <div ref={observerRef} className="mx-auto flex w-full flex-1 flex-col">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* Program name */}
        <form.Field name={"name"}>
          {(field) => (
            <TextInput
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              title="Назва програми"
            />
          )}
        </form.Field>

        {/* Choose degree and check accreditation */}
        <div className="flex items-center justify-between">
          <form.Field name={"degree"}>
            {(field) => (
              <OptionsRadioInput
                legend="Ступінь"
                className="flex items-center gap-3 text-base"
                name={field.name}
                changeValue={field.state.value}
                possibleValues={[
                  { label: "Аспірантура", value: "phd" },
                  { label: "Докторантура", value: "doc" },
                ]}
                onChange={(value) => field.handleChange(value)}
              />
            )}
          </form.Field>

          <form.Field name={"accredited"}>
            {(field) => (
              <Checkbox
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                title="Програму акредитовано"
              />
            )}
          </form.Field>
        </div>

        {/* Fields of study */}
        <form.Field name={"fieldOfStudy"}>
          {(field) => (
            <fieldset className="fieldset flex flex-row gap-2 text-base">
              <legend className="fieldset-legend text-base-content/50 font-medium">
                Галузь знань
              </legend>

              <select
                className="select select-bordered w-full"
                name="typeField"
                value={JSON.stringify(field.state.value)}
                onChange={(e) => field.handleChange(JSON.parse(e.target.value))}
              >
                {fields?.map((field, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      name: field.name,
                      code: field.code,
                    })}
                  >
                    {field.code} {field.name}
                  </option>
                ))}
              </select>
            </fieldset>
          )}
        </form.Field>
      </form>
      {/*<h2 className="text-xl font-bold">*/}
      {/*  Технологія хлібопекарських продуктів...*/}
      {/*</h2>*/}

      {/*<form*/}
      {/*  onSubmit={(e) => {*/}
      {/*    e.preventDefault();*/}
      {/*    form.handleSubmit(handleFormSubmit);*/}
      {/*  }}*/}
      {/*  className="space-y-6"*/}
      {/*>*/}
      {/*  <div>*/}
      {/*    <label>Галузь знань</label>*/}
      {/*    /!*<SelectField*!/*/}
      {/*    /!*  options={["f1", "f3"]}*!/*/}
      {/*    /!*  value={form.values.fieldOfStudy}*!/*/}
      {/*    /!*  onChange={(e) => setFieldValue("fieldOfStudy", e.target.value)}*!/*/}
      {/*  </div>*/}

      {/*  <div className="flex flex-row gap-2">*/}
      {/*    <fieldset className="fieldset flex w-full flex-col gap-2 text-base">*/}
      {/*      <legend className="fieldset-legend text-base-content/50 font-medium">*/}
      {/*        Форма навчання*/}
      {/*      </legend>*/}
      {/*      <div className="join w-full">*/}
      {/*        <label className="w-full">*/}
      {/*          <input*/}
      {/*            type="checkbox"*/}
      {/*            value="Очна"*/}
      {/*            checked={form.values.studyForm.includes("Очна")}*/}
      {/*            onChange={() =>*/}
      {/*              setFieldValue(*/}
      {/*                "studyForm",*/}
      {/*                form.values.studyForm.includes("Очна")*/}
      {/*                  ? form.values.studyForm.filter(*/}
      {/*                      (v: string) => v !== "Очна",*/}
      {/*                    )*/}
      {/*                  : [...form.values.studyForm, "Очна"],*/}
      {/*              )*/}
      {/*            }*/}
      {/*          />*/}
      {/*          <p className="btn bg-base-100 join-item">Очна</p>*/}
      {/*        </label>*/}
      {/*        <label className="w-full">*/}
      {/*          <input*/}
      {/*            type="checkbox"*/}
      {/*            value="Заочна"*/}
      {/*            checked={form.values.studyForm.includes("Заочна")}*/}
      {/*            onChange={() =>*/}
      {/*              setFieldValue(*/}
      {/*                "studyForm",*/}
      {/*                form.values.studyForm.includes("Заочна")*/}
      {/*                  ? form.values.studyForm.filter(*/}
      {/*                      (v: string) => v !== "Заочна",*/}
      {/*                    )*/}
      {/*                  : [...form.values.studyForm, "Заочна"],*/}
      {/*              )*/}
      {/*            }*/}
      {/*          />*/}
      {/*          <p className="btn bg-base-100 join-item">Заочна</p>*/}
      {/*        </label>*/}
      {/*      </div>*/}
      {/*    </fieldset>*/}

      {/*    <fieldset className="fieldset flex w-full flex-row gap-2 text-base">*/}
      {/*      <legend className="fieldset-legend text-base-content/50 font-medium">*/}
      {/*        Кількість років*/}
      {/*      </legend>*/}
      {/*      /!*<input*!/*/}
      {/*      /!*  type="number"*!/*/}
      {/*      /!*  value={form.values.years}*!/*/}
      {/*      /!*  onChange={(e) => setFieldValue("years", Number(e.target.value))}*!/*/}
      {/*      /!*  className="input w-full"*!/*/}
      {/*      /!*  min={1}*!/*/}
      {/*      /!*  max={6}*!/*/}
      {/*    </fieldset>*/}

      {/*    <fieldset className="fieldset flex w-full flex-row gap-2 text-base">*/}
      {/*      <legend className="fieldset-legend text-base-content/50 font-medium">*/}
      {/*        Кількість кредитів*/}
      {/*      </legend>*/}
      {/*      /!*<input*!/*/}
      {/*      /!*  type="number"*!/*/}
      {/*      /!*  value={form.values.credits}*!/*/}
      {/*      /!*  onChange={(e) => setFieldValue("credits", Number(e.target.value))}*!/*/}
      {/*      /!*  className="input w-full"*!/*/}
      {/*      /!*  min={1}*!/*/}
      {/*    </fieldset>*/}
      {/*  </div>*/}

      {/*  <fieldset className="fieldset text-base">*/}
      {/*    <legend className="fieldset-legend text-base-content/50 font-medium">*/}
      {/*      Основна мета*/}
      {/*    </legend>*/}
      {/*    /!*<textarea*!/*/}
      {/*    /!*  value={form.values.mainGoal}*!/*/}
      {/*    /!*  onChange={(e) => setFieldValue("mainGoal", e.target.value)}*!/*/}
      {/*    /!*  className="textarea h-24 w-full"*!/*/}
      {/*    /!*  placeholder="Введіть мету програми"*!/*/}
      {/*  </fieldset>*/}

      {/*  <fieldset className="fieldset text-base">*/}
      {/*    <legend className="fieldset-legend text-base-content/50 font-medium">*/}
      {/*      Сайт кафедри*/}
      {/*    </legend>*/}
      {/*    <label className="input w-full">*/}
      {/*      <LinkIcon size={16} />*/}
      {/*      /!*<input*!/*/}
      {/*      /!*  type="url"*!/*/}
      {/*      /!*  value={form.values.departmentUrl}*!/*/}
      {/*      /!*  onChange={(e) => setFieldValue("departmentUrl", e.target.value)}*!/*/}
      {/*      /!*  placeholder="https://"*!/*/}
      {/*      /!*  pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"*!/*/}
      {/*      /!*  title="Must be valid URL"*!/*/}
      {/*    </label>*/}
      {/*  </fieldset>*/}

      {/*  <fieldset className="fieldset gap-4">*/}
      {/*    <legend className="fieldset-legend text-base-content/50 font-medium">*/}
      {/*      Характеристики програми*/}
      {/*    </legend>*/}

      {/*    <label className="fieldset-label flex-col items-start">*/}
      {/*      Предметна область*/}
      {/*      /!*<textarea*!/*/}
      {/*      /!*  value={form.values.subjectArea}*!/*/}
      {/*      /!*  onChange={(e) => setFieldValue("subjectArea", e.target.value)}*!/*/}
      {/*      /!*  className="textarea h-24 w-full"*!/*/}
      {/*      /!*  placeholder="Предметна область"*!/*/}
      {/*    </label>*/}

      {/*    <label className="fieldset-label flex-col items-start">*/}
      {/*      Основний фокус програми*/}
      {/*      /!*<textarea*!/*/}
      {/*      /!*  value={form.values.programFocus}*!/*/}
      {/*      /!*  onChange={(e) => setFieldValue("programFocus", e.target.value)}*!/*/}
      {/*      /!*  className="textarea h-24 w-full"*!/*/}
      {/*      /!*  placeholder="Основний фокус програми"*!/*/}
      {/*    </label>*/}

      {/*    <label className="fieldset-label flex-col items-start">*/}
      {/*      Особливості програми*/}
      {/*      /!*<textarea*!/*/}
      {/*      /!*  value={form.values.programFeatures}*!/*/}
      {/*      /!*  onChange={(e) => setFieldValue("programFeatures", e.target.value)}*!/*/}
      {/*      /!*  className="textarea h-24 w-full"*!/*/}
      {/*      /!*  placeholder="Особливості програми"*!/*/}
      {/*  </fieldset>*/}

      {/*  <button type="submit" className="btn btn-primary">*/}
      {/*    Submit*/}
      {/*  </button>*/}
      {/*</form>*/}
    </div>
  );
}
