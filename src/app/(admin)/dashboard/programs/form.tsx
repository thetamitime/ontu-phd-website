"use client";

import { LinkIcon } from "lucide-react";
import { createFormHook, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProgram,
  getProgramById,
  updateProgram,
} from "@/lib/api/programs";
import React, { useEffect, useRef, useState } from "react";
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
import { getAllInstitutes } from "@/lib/api/institutes";

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
  const isEdit = Boolean(programId);

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
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const { data: institutes } = useQuery({
    queryKey: ["institutes"],
    queryFn: () => getAllInstitutes(),
    refetchOnWindowFocus: false,
  });

  const defaultProgramCharacteristics = {
    area: {
      object: "",
      aim: "",
      theory: "",
      methods: "",
      instruments: "",
    },
    focus: "",
    features: "",
  };
  const form = useAppForm({
    defaultValues: {
      name: isEdit ? program?.name : "",
      degree: isEdit ? program?.degree : "phd",
      accredited: program?.accredited ?? true,
      institute: institutes?.find(
        (inst) => inst.name === program?.institute,
      ) ?? { id: 0, name: "" },
      fieldOfStudy: program?.fieldOfStudy ?? { code: "", name: "" },
      speciality: program?.speciality ?? { code: "", name: "" },
      form: program?.form ?? ["очна (денна)"],
      purpose: isEdit ? (program?.purpose ?? undefined) : "",
      years: isEdit ? (program?.years ?? 4) : 4,
      credits: isEdit ? (program?.credits ?? 45) : 45,
      programCharacteristics: isEdit
        ? program?.programCharacteristics
        : defaultProgramCharacteristics,
      descriptions: program?.descriptions ?? undefined,
      objects: isEdit ? (program?.objects ?? undefined) : undefined,
      directions: isEdit ? (program?.directions ?? undefined) : undefined,
      linkFaculties: isEdit ? program?.linkFaculties : [{ name: "", link: "" }],
      // programDocumentId: program?.programDocumentId ?? undefined,
    } as ProgramFormValues,
    validators: {
      onSubmit: programSchema,
    },
    onSubmit: ({ value }) => {
      console.log("onSubmit", value);
      handleFormSubmit(value);
      window.location.reload();
    },
  });

  const degree = useStore(form.store, (state) => state.values.degree);
  const { data: fields } = useQuery({
    queryKey: ["fields", degree],
    queryFn: () => getFieldsByDegree(degree ?? "phd"),
    refetchOnWindowFocus: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fieldsWithoutDegree = fields?.map(({ degree, ...rest }) => rest);

  const field = useStore(form.store, (state) => state.values.fieldOfStudy);
  const { data: specialities } = useQuery({
    queryKey: ["specialities", field],
    queryFn: () => getSpecialitiesByField(field?.code ?? ""),
    enabled: !!field,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (data: ProgramFormValues) =>
      isEdit ? updateProgram(programId!, data) : createProgram(data),
    onSuccess: () => alert(isEdit ? "Оновлено!" : "Створено!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  const handleFormSubmit = async (values: ProgramFormValues) => {
    const result = programSchema.safeParse(values);

    if (!result.success) {
      console.error("Validation failed:", result.error.errors);
      return;
    }

    const updatedProgram = isEdit ? { id: programId, ...values } : values;

    console.log("Form submitted with values:", updatedProgram);
    mutation.mutate(values);
  };

  // console.log(
  //   "ERR",
  //   useStore(form.store, (state) => state.errors),
  // );

  return (
    <div ref={observerRef} className="mx-auto h-fit w-full">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form current", form.state.values);
          form.validate("submit");
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
                if (isEdit && value === program?.degree) {
                  form.setFieldValue("fieldOfStudy", program!.fieldOfStudy);
                  form.setFieldValue("speciality", program!.speciality);
                }

                if (!isEdit || value !== program?.degree) {
                  // degree was changed back to original in create mode -> restore fields if they existed
                  form.setFieldValue("fieldOfStudy", { code: "", name: "" });
                  form.setFieldValue("speciality", { code: "", name: "" });
                }

                if (value === "doc") {
                  form.setFieldValue("years", undefined);
                  form.setFieldValue("credits", undefined);
                  form.setFieldValue("purpose", undefined);
                  form.setFieldValue("programCharacteristics", undefined);

                  form.setFieldValue("directions", [""]);
                  form.setFieldValue("descriptions", " ");
                  form.setFieldValue("objects", "");
                } else {
                  form.resetField("descriptions");
                  form.resetField("directions");
                  form.resetField("objects");
                }

                form.validateAllFields("change");
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

        {/* Institute */}
        <form.AppField name={"institute"}>
          {(field) => (
            <field.SelectField
              label="Інститут"
              options={institutes || []}
              getOptionLabel={(option) => `${option.name}`}
            />
          )}
        </form.AppField>

        {/*Fields of study*/}
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
              getOptionLabel={(option) => `${option.code} ${option.name}`}
            />
          )}
        </form.AppField>

        {/* Speciality */}
        <form.AppField name={"speciality"}>
          {(field) => (
            <field.SelectField
              label="Cпеціальність"
              options={specialities || [{ code: "", name: "" }]}
              disabled={form.getFieldValue("fieldOfStudy.code") === ""}
              getOptionLabel={(option) => `${option.code} ${option.name}`}
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
                          .map((err) => err?.message)
                          .map((mess, i) => (
                            <FieldInfo key={i} message={mess ?? ""} />
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
          <div>
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
          </div>
        ) : (
          <div>
            <form.AppField name={"descriptions"}>
              {(field) => <field.TextAreaInput label={"Опис"} />}
            </form.AppField>

            <form.AppField name={"objects"}>
              {(field) => (
                <field.TextAreaInput label={"Об'єкти спеціальності"} />
              )}
            </form.AppField>

            <form.AppField name="directions" mode="array">
              {(field) => (
                <>
                  <legend className="fieldset-legend text-base-content/50 font-medium">
                    Напрямки досліджень
                  </legend>

                  {field.state.value?.map((_, i) => {
                    return (
                      <form.AppField key={i} name={`directions[${i}]`}>
                        {(subField) => (
                          <field.TextAreaInputInline
                            label={`Напрям ${i + 1}`}
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                          />
                        )}
                      </form.AppField>
                    );
                  })}
                  <button
                    onClick={() => field.pushValue("")}
                    type="button"
                    className="btn btn-soft btn-block"
                  >
                    Додати напрям
                  </button>
                </>
              )}
            </form.AppField>
          </div>
        )}

        {/* Input for faculty link */}
        <form.AppField name="linkFaculties" mode="array">
          {(field) => (
            <>
              <legend className="fieldset-legend text-base-content/50 font-medium">
                Посилання
              </legend>
              {field.state.value?.map((_, i) => {
                return (
                  <div key={i}>
                    <form.AppField name={`linkFaculties[${i}].name`}>
                      {(nameField) => (
                        <field.InputField
                          label={"Підпис посилання"}
                          labelStyle="text-sm"
                          value={nameField.state.value}
                          onChange={(e) =>
                            nameField.handleChange(e.target.value)
                          }
                        />
                      )}
                    </form.AppField>
                    <form.AppField name={`linkFaculties[${i}].link`}>
                      {(linkField) => (
                        <field.InputField
                          label={"Посилання"}
                          labelStyle="text-sm"
                          placeholder="https://"
                          icon={<LinkIcon size={16} />}
                          value={linkField.state.value}
                          onChange={(e) =>
                            linkField.handleChange(e.target.value)
                          }
                        />
                      )}
                    </form.AppField>
                  </div>
                );
              })}
              <button
                onClick={() => field.pushValue({ name: "", link: "" })}
                type="button"
                className="btn btn-soft"
              >
                Додати посилання
              </button>
            </>
          )}
        </form.AppField>

        {/*  /!* File selection *!/*/}
        {/*  <form.AppField name={"programDocumentId"}>*/}
        {/*    {(field) => (*/}
        {/*      <input*/}
        {/*        type="file"*/}
        {/*        multiple={true}*/}
        {/*        className="file-input"*/}
        {/*        onChange={(e) => {*/}
        {/*          const file = e.target.files ? e.target.files[0] : null;*/}
        {/*          form.setFieldValue("programDocumentId", file);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*      // <field.SelectField*/}
        {/*      //   label="Документ програми"*/}
        {/*      //   options={public-information || []}*/}
        {/*      // />*/}
        {/*    )}*/}
        {/*  </form.AppField>*/}
        <form.AppForm>
          <form.SubscribeButton
            label="Зберегти"
            className="btn btn-soft mt-2 self-end"
          />
        </form.AppForm>
      </form>
    </div>
  );
}
