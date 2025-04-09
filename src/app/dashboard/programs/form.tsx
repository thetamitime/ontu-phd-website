"use client";

import { LinkIcon } from "lucide-react";
import { createFormHook, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProgramById, updateProgram } from "@/lib/api/programs";
import React, { useEffect, useRef, useState } from "react";
// import { getFieldsByDegree, getSpecialitiesByField } from "@/lib/api/fields";
// import { getDocuments } from "@/lib/api/documents";
import { ProgramFormValues, programSchema } from "@/lib/schemas/programSchema";
import {
  Checkbox,
  FieldInfo,
  InputField,
  NumberInput,
  OptionsRadioInput,
  SelectField,
  SubscribeButton,
  TextAreaInput,
  TextAreaInputInline,
} from "@/ui/components";
import { getFieldsByDegree, getSpecialitiesByField } from "@/lib/api/fields";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";

//=============Form Context=============
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
    FieldInfo,
  },
  formComponents: {
    SubscribeButton,
  },
});

//=============Program Form (Edit and Create)=============
export default function ProgramForm({ programId }: { programId?: number }) {
  const isEdit = Boolean(programId); //set mode of program

  //check if form is visible to perform fetch
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
    queryFn: () => getProgramById(programId!.toString()),
    enabled: isEdit && isVisible,
    refetchOnWindowFocus: false,
  });

  const form = useAppForm({
    defaultValues: {
      name: program?.name ?? "",
      degree: program?.degree ?? "phd",
      accredited: program?.accredited ?? true,
      fieldOfStudy: program?.fieldOfStudy ?? { code: "", name: "" },
      speciality: program?.speciality ?? { code: "", name: "" },
      form: program?.form ?? ["очна (денна)"],
      purpose: program?.purpose ?? undefined,
      years: program?.years ?? undefined,
      credits: program?.credits ?? undefined,
      // programCharacteristics: program?.programCharacteristics ?? {
      //   area: {
      //     aim: "",
      //     object: "",
      //     methods: "",
      //     instruments: "",
      //     theory: "",
      //   },
      //   features: "",
      //   focus: "",
      // },
      descriptions: program?.descriptions ?? undefined,
      objects: program?.objects ?? undefined,
      directions: program?.directions ?? undefined,
      linkFaculty: program?.linkFaculty ?? undefined,
      //programDocumentId: program?.programDocumentId ?? undefined,
    } as ProgramFormValues,
    validators: {
      onChange: programSchema,
      onBlur: programSchema,
    },
    onSubmit: ({ value }) => {
      console.log("onSubmit", value);
      handleFormSubmit(value);
    },
  });

  const degree = useStore(form.store, (state) => state.values.degree);
  const { data: fields } = useQuery({
    queryKey: ["fields", degree],
    queryFn: () => getFieldsByDegree(degree ?? "phd"),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fieldsWithoutDegree = fields?.map(({ degree, ...rest }) => rest);

  const field = useStore(form.store, (state) => state.values.fieldOfStudy);

  const { data: specialities } = useQuery({
    queryKey: ["specialities", field],
    queryFn: () => getSpecialitiesByField(field?.code ?? ""),
    enabled: field && isVisible,
    refetchOnWindowFocus: false,
  });

  // const { data: documents } = useQuery({
  //   queryKey: ["documents", programId],
  //   queryFn: () => getDocuments("Entry"),
  //   enabled: isVisible,
  //   refetchOnWindowFocus: false,
  // });

  const mutation = useMutation({
    mutationFn: (data: ProgramFormValues) =>
      isEdit ? updateProgram(programId!, data) : createProgram(data),
    onSuccess: () => alert(isEdit ? "Оновлено!" : "Створено!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  const handleFormSubmit = async (values: ProgramFormValues) => {
    const result = programSchema.safeParse(values);

    if (!result.success) {
      // Handle validation errors
      console.log("Validation failed:", result.error.errors);
      // Optionally display errors to the user
      return; // Stop submission if validation fails
    }

    // Proceed with the mutation if validation passes
    const updatedProgram = isEdit ? { id: programId, ...values } : values;

    console.log("Form submitted with values:", updatedProgram);
    mutation.mutate(values);
  };

  console.log(form.state.values);

  return (
    <div ref={observerRef} className="mx-auto h-fit w-full">
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
                if (value === program!.degree) {
                  form.setFieldValue("fieldOfStudy", program!.fieldOfStudy);
                  form.setFieldValue("speciality", program!.speciality);
                } else {
                  form.setFieldValue("fieldOfStudy", { code: "", name: "" });
                  form.setFieldValue("speciality", { code: "", name: "" });
                }

                if (value === "doc") {
                  form.setFieldValue("purpose", undefined);
                  form.setFieldValue("years", undefined);
                  form.setFieldValue("credits", undefined);

                  form.setFieldValue(
                    "descriptions",
                    program?.descriptions ?? " ",
                  );
                  form.setFieldValue("objects", program?.objects ?? " ");
                  form.setFieldValue("directions", program?.directions ?? []);
                  //form.setFieldValue("programCharacteristics", undefined);
                } else {
                  form.setFieldValue("purpose", program?.purpose ?? " ");
                  form.setFieldValue("years", program?.years ?? 4);
                  form.setFieldValue("credits", program?.credits ?? 1);

                  form.setFieldValue("descriptions", undefined);
                  form.setFieldValue("objects", undefined);
                  form.setFieldValue("directions", undefined);
                  // form.setFieldValue("programCharacteristics", {
                  //   area: {
                  //     aim: "",
                  //     object: "",
                  //     methods: "",
                  //     instruments: "",
                  //     theory: "",
                  //   },
                  //   features: "",
                  //   focus: "",
                  // });
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
            onChange: () => {
              form.setFieldValue("speciality", {
                code: "",
                name: "",
              });
            },
          }}
        >
          {(field) => (
            <field.SelectField
              label="Галузь знань"
              options={fieldsWithoutDegree ?? [{ code: "", name: "" }]}
            />
          )}
        </form.AppField>

        {/*/!* Speciality *!/*/}
        <form.AppField name={"speciality"}>
          {(field) => (
            <field.SelectField
              label="Cпеціальність"
              options={specialities || [{ code: "", name: "" }]}
              disabled={form.getFieldValue("fieldOfStudy.code") === ""}
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
                const value: string[] = field.state.value || [];

                const toggleValue = (val: string) => {
                  const newValue = value.includes(val)
                    ? value.filter((v) => v !== val)
                    : [...value, val];
                  field.handleChange(newValue);
                };

                return (
                  <>
                    <div className="join">
                      {/* Очна */}
                      <label className="w-24">
                        <input
                          type="checkbox"
                          className="peer hidden"
                          value="очна (денна)"
                          checked={value.includes("очна (денна)")}
                          onChange={() => toggleValue("очна (денна)")}
                        />
                        <span
                          className={`join-item btn peer-checked:btn-primary w-full ${field.state.meta.errors.length > 0 && "border-error border-e-0"}`}
                        >
                          Очна
                        </span>
                      </label>

                      {/* Заочна */}
                      <label className="w-24">
                        <input
                          type="checkbox"
                          className="peer hidden"
                          value="заочна"
                          checked={value.includes("заочна")}
                          onChange={() => toggleValue("заочна")}
                        />
                        <span
                          className={`join-item btn peer-checked:btn-primary w-full ${field.state.meta.errors.length > 0 && "border-error border-s-0"}`}
                        >
                          Заочна
                        </span>
                      </label>
                    </div>

                    {field.state.meta.errors.length
                      ? field.state.meta.errors
                          .map((err) => err.message)
                          .map((mess, i) => (
                            <FieldInfo key={i} message={mess} />
                          ))
                      : null}
                  </>
                );
              }}
            </form.AppField>
          </fieldset>

          {/* Years */}
          {degree === "phd" && (
            <form.AppField name={"years"}>
              {(field) => <field.NumberInput label={"Кількість років"} />}
            </form.AppField>
          )}

          {/* Credits */}
          {degree === "phd" && (
            <form.AppField name={"credits"}>
              {(field) => <field.NumberInput label={"Кількість кредитів"} />}
            </form.AppField>
          )}
        </div>

        {degree === "phd" ? (
          <>
            {/* Purpose of program */}
            <form.AppField name={"purpose"}>
              {(field) => {
                console.log(field.state.value);
                return (
                  <field.TextAreaInput
                    label={"Основна мета"}
                    className="h-40"
                  />
                );
              }}
            </form.AppField>

            {/*<fieldset className="fieldset gap-0 text-base">*/}
            {/*  <legend className="fieldset-legend text-base-content/50 pb-0 font-medium">*/}
            {/*    Характеристики програми*/}
            {/*  </legend>*/}

            {/*  <fieldset className="fieldset text-base">*/}
            {/*    <legend className="fieldset-legend text-base-content/50 font-medium">*/}
            {/*      Предметна область*/}
            {/*    </legend>*/}

            {/*    /!* Area Fields *!/*/}
            {/*    <form.AppField name="programCharacteristics.area.object">*/}
            {/*      {(field) => (*/}
            {/*        <field.TextAreaInputInline label={"Об'єкт вивчення"} />*/}
            {/*      )}*/}
            {/*    </form.AppField>*/}

            {/*    <form.AppField name="programCharacteristics.area.aim">*/}
            {/*      {(field) => (*/}
            {/*        <field.TextAreaInputInline label={"Цілі навчання"} />*/}
            {/*      )}*/}
            {/*    </form.AppField>*/}

            {/*    <form.AppField name="programCharacteristics.area.theory">*/}
            {/*      {(field) => (*/}
            {/*        <field.TextAreaInputInline label={"Теоретичний зміст"} />*/}
            {/*      )}*/}
            {/*    </form.AppField>*/}

            {/*    <form.AppField name="programCharacteristics.area.instruments">*/}
            {/*      {(field) => (*/}
            {/*        <field.TextAreaInputInline*/}
            {/*          label={"Інструменти та обладнання"}*/}
            {/*        />*/}
            {/*      )}*/}
            {/*    </form.AppField>*/}

            {/*    <form.AppField name="programCharacteristics.area.methods">*/}
            {/*      {(field) => (*/}
            {/*        <field.TextAreaInputInline*/}
            {/*          label={"Методи, методики та технології"}*/}
            {/*        />*/}
            {/*      )}*/}
            {/*    </form.AppField>*/}
            {/*  </fieldset>*/}

            {/*  <fieldset className="fieldset text-base">*/}
            {/*    <form.AppField name="programCharacteristics.focus">*/}
            {/*      {(field) => (*/}
            {/*        <field.TextAreaInput label={"Основний фокус програми"} />*/}
            {/*      )}*/}
            {/*    </form.AppField>*/}
            {/*  </fieldset>*/}

            {/*  <fieldset className="fieldset text-base">*/}
            {/*    <form.AppField name="programCharacteristics.features">*/}
            {/*      {(field) => (*/}
            {/*        <field.TextAreaInput label={"Особливості програми"} />*/}
            {/*      )}*/}
            {/*    </form.AppField>*/}
            {/*  </fieldset>*/}
            {/*</fieldset>*/}
          </>
        ) : (
          <>
            <form.AppField name={"descriptions"}>
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
                    {field.state.value?.map((_, i) => {
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
          {(field) => {
            return (
              <field.InputField
                label={"Сайт кафедри"}
                placeholder="https://"
                icon={<LinkIcon size={16} />}
              />
            );
          }}
        </form.AppField>

        {/* File selection */}
        {/*<form.AppField name={"programDocumentId"}>*/}
        {/*  {(field) => (*/}
        {/*    <input*/}
        {/*      type="file"*/}
        {/*      className="file-input"*/}
        {/*      onChange={(e) => {*/}
        {/*        const file = e.target.files ? e.target.files[0] : null;*/}
        {/*        console.log(file);*/}
        {/*        form.setFieldValue("programDocumentId", file);*/}
        {/*      }}*/}
        {/*    />*/}
        {/*    // <field.SelectField*/}
        {/*    //   label="Документ програми"*/}
        {/*    //   options={documents || []}*/}
        {/*    // />*/}
        {/*  )}*/}
        {/*</form.AppField>*/}

        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </form>
    </div>
  );
}
