"use client";

import { LinkIcon } from "lucide-react";
import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProgramById, updateProgram } from "@/lib/api/programs";
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
import { SubscribeButton } from "@/ui/components/form/SubscribeButton";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
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
  formComponents: {
    SubscribeButton,
  },
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
    queryFn: () => getProgramById(programId.toString()),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const form = useAppForm({
    defaultValues: {
      name: program?.name || "",
      // nameCode: program?.nameCode || "",
      degree: program?.degree || "phd",
      accredited: program?.accredited || false,
      fieldOfStudy: {
        code: program?.fieldOfStudy?.code || "",
        name: program?.fieldOfStudy?.name || "",
      },
      speciality: {
        code: program?.speciality?.code || "",
        name: program?.speciality?.name || "",
        fieldCode: program?.fieldOfStudy?.code || "",
      },
      form: program?.form || ["очна (денна)"],
      description: program?.description || "",
      directions: program?.directions || [],
      purpose: program?.purpose || "",
      objects: program?.objects || "",
      years: program?.years || 0,
      credits: program?.credits || 0,
      programCharacteristics: {
        area: {
          object: program?.programCharacteristics?.area?.object || "",
          aim: program?.programCharacteristics?.area?.aim || "",
          theory: program?.programCharacteristics?.area?.theory || "",
          methods: program?.programCharacteristics?.area?.methods || "",
          instruments: program?.programCharacteristics?.area?.instruments || "",
        },
        focus: program?.programCharacteristics?.focus || "",
        features: program?.programCharacteristics?.features || [],
      },
      linkFaculty: program?.linkFaculty || "/",
      // file: program?.linkFile || "/",
    },
    onSubmit: ({ value }) => {
      console.log("Submitted values: ", value);
      handleFormSubmit(value);
    },
  });

  const degree = useStore(form.store, (state) => state.values.degree);
  const { data: fields } = useQuery({
    queryKey: ["fields", degree],
    queryFn: () => getFieldsByDegree(degree || ""),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const fieldsWithoutDegree = fields?.map(({ degree, ...rest }) => rest);

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

  const mutation = useMutation({
    mutationFn: (updatedField) => updateProgram(programId, updatedField),
    onSuccess: () => {
      alert("Program updated successfully!");
    },
    onError: (error) => {
      alert("Error updating program: " + error.message);
    },
  });

  const handleFormSubmit = async (formData) => {
    const updatedProgram = {
      id: program.id,
      ...formData,
    };

    console.log("Upfated values: ", updatedProgram);
    mutation.mutate(updatedProgram);
  };

  return (
    <div ref={observerRef} className="mx-auto flex w-full flex-1 flex-col">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
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
                  //form.setFieldValue("purpose", program?.purpose || "");
                } else {
                  form.setFieldValue("fieldOfStudy", { code: "", name: "" });
                  // form.setFieldValue("speciality", {
                  //   code: "",
                  //   name: "",
                  //   fieldCode: form.getFieldValue("fieldOfStudy.code"),
                  // });
                }

                // if (value === "doc") {
                //   form.setFieldValue("years", 0);
                //   form.setFieldValue("credits", 0);
                // } else {
                //   form.setFieldValue("years", program?.years || 1);
                //   form.setFieldValue("credits", program?.credits || 1);
                // }
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
            onChange: () => {
              form.setFieldValue("speciality", {
                code: "",
                name: "",
                fieldCode: form.getFieldValue("fieldOfStudy.code"),
              });
            },
          }}
        >
          {(field) => (
            <field.SelectField
              label="Галузь знань"
              options={fieldsWithoutDegree || []}
            />
          )}
        </form.AppField>

        {/* Speciality */}
        <form.AppField name={"speciality"}>
          {(field) => (
            <field.SelectField
              label="Cпеціальність"
              options={specialities || []}
              disabled={form.getFieldValue("fieldOfStudy.code") === ""}
            />
          )}
        </form.AppField>

        {/*/!* Flex displaying form, years and credits *!/*/}
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

        {degree === "phd" ? (
          <>
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
                  {(field) => (
                    <field.TextAreaInputInline label={"Цілі навчання"} />
                  )}
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
          </>
        ) : (
          <>
            <form.AppField name={"description"}>
              {(field) => <field.TextAreaInput label={"Опис"} />}
            </form.AppField>

            <form.AppField name={"objects"}>
              {(field) => (
                <field.TextAreaInput label={"Об'єкти спеціальності"} />
              )}
            </form.AppField>

            <form.AppField name="directions" mode="array">
              {(field) => {
                return (
                  <>
                    <legend className="fieldset-legend text-base-content/50 font-medium">
                      Напрямки досліджень
                    </legend>
                    {field.state.value.map((_, i) => {
                      return (
                        <form.AppField key={i} name={`directions[${i}]`}>
                          {(subField) => (
                            <field.TextAreaInputInline
                              label={`Напрям ${i}`}
                              value={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                            />
                          )}
                        </form.AppField>
                      );
                    })}
                    <button onClick={() => field.pushValue("")} type="button">
                      Додати напрям
                    </button>
                  </>
                );
              }}
            </form.AppField>
          </>
        )}

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

        {/*/!* File selection *!/*/}
        {/*<form.AppField name={"linkFile"}>*/}
        {/*  {(field) => (*/}
        {/*    <field.SelectField*/}
        {/*      label="Документ програми"*/}
        {/*      options={documents || []}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</form.AppField>*/}

        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </form>
    </div>
  );
}
