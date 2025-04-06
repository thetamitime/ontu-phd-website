"use client";

import { LinkIcon } from "lucide-react";
import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { getProgramById } from "@/lib/api/programs";
import React, { useEffect, useRef, useState } from "react";
import { OptionsRadioInput } from "@/ui/components/form/OptionsRadioInput";
import { Checkbox } from "@/ui/components/form/Checkbox";
import { SelectField } from "@/ui/components/form/SelectField";
import { getFieldsByDegree, getSpecialitiesByField } from "@/lib/api/fields";
import { getDocuments } from "@/lib/api/documents";
import { NumberInput } from "@/ui/components/form/NumberInput";
import { TextAreaInput } from "@/ui/components/form/TextAreaInput";
import { TextAreaInputInline } from "@/ui/components/form/TextAreaInputInline";
import { InputField } from "@/ui/components/form/InputField";

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    OptionsRadioInput,
    Checkbox,
    SelectField,
    NumberInput,
    TextAreaInput,
    TextAreaInputInline,
  },
  formComponents: {},
});

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

  const form = useAppForm({
    defaultValues: {
      name: program?.name || "",
      degree: program?.degree || "phd",
      accredited: program?.accredited || false,
      fieldOfStudy: program?.fieldOfStudy || null,
      speciality: program?.speciality || null,
      form: program?.form || ["очна (денна)"],
      years: program?.years || 0,
      credits: program?.credits || 0,
      purpose: program?.purpose || "",
      programCharacteristics: program?.programCharacteristics || [],
      linkFaculty: program?.linkFaculty || "/",
      linkFile: program?.linkFile || "/",
    },
    onSubmit: ({ value }) => {
      console.log("Submitted values: ", value);
    },
  });

  const degree = useStore(form.store, (state) => state.values.degree);
  const { data: fields } = useQuery({
    queryKey: ["fields", degree],
    queryFn: () => getFieldsByDegree(degree || ""),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const field = useStore(form.store, (state) => state.values.fieldOfStudy);
  const { data: specialities } = useQuery({
    queryKey: ["specialities", field],
    queryFn: () => getSpecialitiesByField(field?.code || ""),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const { data: documents } = useQuery({
    queryKey: ["documents", programId],
    queryFn: () => getDocuments("Entry"),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const met = useStore(
    form.store,
    (state) => state.values.programCharacteristics,
  );
  console.log("met", met);
  return (
    <div ref={observerRef} className="mx-auto flex w-full flex-1 flex-col">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* Program name */}
        <form.AppField name={"name"}>
          {(field) => <field.InputField label="Назва програми" type={"text"} />}
        </form.AppField>

        {/* Choose degree and check accreditation */}
        <div className="flex items-center justify-between">
          <form.AppField
            name={"degree"}
            listeners={{
              onChange: ({ value }) => {
                if (value === program?.degree) {
                  form.setFieldValue("fieldOfStudy", program?.fieldOfStudy);
                  form.setFieldValue("speciality", program?.speciality);
                } else {
                  form.setFieldValue("fieldOfStudy", null);
                  form.setFieldValue("speciality", null);
                }

                if (value === "doc") {
                  form.setFieldValue("years", 0);
                  form.setFieldValue("credits", 0);
                  form.setFieldValue("purpose", "");
                } else {
                  form.setFieldValue("years", program?.years || 1);
                  form.setFieldValue("credits", program?.credits || 1);
                }
              },
            }}
          >
            {(field) => (
              <field.OptionsRadioInput
                label="Ступінь"
                className="flex items-center gap-3 text-base"
                possibleValues={[
                  { label: "Аспірантура", value: "phd" },
                  { label: "Докторантура", value: "doc" },
                ]}
              />
            )}
          </form.AppField>

          <form.AppField name={"accredited"}>
            {(field) => <field.Checkbox title="Програму акредитовано" />}
          </form.AppField>
        </div>

        {/* Fields of study */}
        <form.AppField
          name={"fieldOfStudy"}
          listeners={{
            onChange: ({ value }) => {
              console.log(`Speciality changed to: ${value}, resetting degree`);
              form.setFieldValue("speciality", null);
            },
          }}
        >
          {(field) => (
            <field.SelectField label="Галузь знань" options={fields || []} />
          )}
        </form.AppField>

        {/* Speciality */}
        <form.AppField name={"speciality"}>
          {(field) => (
            <field.SelectField
              label="Cпеціальність"
              options={specialities || []}
              disabled={
                form.getFieldValue("speciality") === null &&
                form.getFieldValue("fieldOfStudy") === null
              }
            />
          )}
        </form.AppField>

        {/* Flex displaying form, years and credits */}
        <div className="flex flex-row gap-5">
          <fieldset className="fieldset flex flex-col gap-2 text-base">
            <legend className="fieldset-legend text-base-content/50 font-medium">
              Форма навчання
            </legend>

            <form.AppField name={"form"} mode={"array"}>
              {(field) => {
                return (
                  <div className="join">
                    {/* First checkbox */}
                    <form.Field name={`form[0]`}>
                      {(subField) => {
                        return (
                          <label className="w-24">
                            <input
                              type="checkbox"
                              className="peer hidden"
                              value="очна (денна)"
                              checked={subField.state.value === "очна (денна)"}
                              onChange={(e) => {
                                subField.handleChange(
                                  e.target.checked ? "очна (денна)" : "",
                                );
                                console.log(field.state.value);
                              }}
                            />
                            <span className="join-item btn peer-checked:btn-primary w-full">
                              Очна
                            </span>
                          </label>
                        );
                      }}
                    </form.Field>

                    {/* Second checkbox */}
                    <form.Field name={`form[1]`}>
                      {(subField) => {
                        return (
                          <label className="w-24">
                            <input
                              type="checkbox"
                              className="peer hidden"
                              value="заочна"
                              checked={subField.state.value === "заочна"}
                              onChange={(e) => {
                                subField.handleChange(
                                  e.target.checked ? "заочна" : "",
                                );
                                console.log(field.state.value);
                              }}
                            />
                            <span className="join-item btn peer-checked:btn-primary w-full">
                              Заочна
                            </span>
                          </label>
                        );
                      }}
                    </form.Field>
                  </div>
                );
              }}
            </form.AppField>
          </fieldset>

          <form.AppField name={"years"}>
            {(field) => (
              <field.NumberInput
                label={"Кількість років"}
                disabled={field.state.value === 0}
              />
            )}
          </form.AppField>

          <form.AppField name={"credits"}>
            {(field) => (
              <field.NumberInput
                label={"Кількість кредитів"}
                disabled={field.state.value === 0}
              />
            )}
          </form.AppField>
        </div>

        {/* Purpose of program */}
        <form.AppField name={"purpose"}>
          {(field) => (
            <field.TextAreaInput label={"Основна мета"} className="h-40" />
          )}
        </form.AppField>

        <fieldset className="fieldset gap-0 text-base">
          <legend className="fieldset-legend text-base-content/50 pb-0 font-medium">
            Характеристики програми
          </legend>

          <fieldset className="fieldset text-base">
            <legend className="fieldset-legend text-base-content/50 font-medium">
              Предметна область
            </legend>

            {/* Area Fields */}
            <form.AppField name="programCharacteristics.area.object">
              {(field) => (
                <field.TextAreaInputInline label={"Об'єкт вивчення"} />
              )}
            </form.AppField>

            <form.AppField name="programCharacteristics.area.aim">
              {(field) => <field.TextAreaInputInline label={"Цілі навчання"} />}
            </form.AppField>

            <form.AppField name="programCharacteristics.area.theory">
              {(field) => (
                <field.TextAreaInputInline label={"Теоретичний зміст"} />
              )}
            </form.AppField>

            <form.AppField name="programCharacteristics.area.instruments">
              {(field) => (
                <field.TextAreaInputInline
                  label={"Інструменти та обладнання"}
                />
              )}
            </form.AppField>

            <form.AppField name="programCharacteristics.area.methods">
              {(field) => (
                <field.TextAreaInputInline
                  label={"Методи, методики та технології"}
                />
              )}
            </form.AppField>
          </fieldset>

          <fieldset className="fieldset text-base">
            <form.AppField name="programCharacteristics.focus">
              {(field) => (
                <field.TextAreaInput label={"Основний фокус програми"} />
              )}
            </form.AppField>
          </fieldset>

          <fieldset className="fieldset text-base">
            <form.AppField name="programCharacteristics.features">
              {(field) => (
                <field.TextAreaInput label={"Особливості програми"} />
              )}
            </form.AppField>
          </fieldset>
        </fieldset>

        {/* Input for faculty link */}
        <form.AppField name={"linkFaculty"}>
          {(field) => (
            <field.InputField
              label={"Сайт кафедри"}
              type={"url"}
              placeholder="https://"
              icon={<LinkIcon size={16} />}
            />
          )}
        </form.AppField>

        {/* File selection */}
        <form.AppField name={"linkFile"}>
          {(field) => (
            <field.SelectField
              label="Документ програми"
              options={documents || []}
            />
          )}
        </form.AppField>
      </form>
    </div>
  );
}
