"use client";

import { createFormHook, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { DefenceFormValues, defenceSchema } from "@/lib/schemas/defenceSchema";
import {
  FieldInfo,
  InputField,
  SelectField,
  SubscribeButton,
  TextAreaInput,
  DateTimeInput,
  OptionsRadioInput,
} from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";
import {
  createDefence,
  getDefenceById,
  updateDefence,
} from "@/lib/api/defence";
import { getShortProgramsByDegree } from "@/lib/api/programs";

//=============Form Context=============
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    DateTimeInput,
    InputField,
    SelectField,
    TextAreaInput,
    OptionsRadioInput,
    FieldInfo,
  },
  formComponents: {
    SubscribeButton,
  },
});

//=============Defence Form (Edit and Create)=============
export default function DefenceForm({ defenceId }: { defenceId?: number }) {
  const isEdit = Boolean(defenceId);

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

  const { data: defence } = useQuery({
    queryKey: ["defence", defenceId],
    queryFn: () => getDefenceById(defenceId!.toString()),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const defaultProgram = {
    //id: 1000,
    name: "",
    fieldOfStudy: {
      code: "",
      name: "",
    },
    speciality: {
      code: "",
      name: "",
    },
  };

  const defaultMember = {
    position: "Голова ради",
    members: [
      {
        nameSurname: "",
        title: "",
        toolTip: "",
      },
    ],
  };

  const form = useAppForm({
    defaultValues: {
      defenseTitle: defence?.defenseTitle ?? "",
      candidateDegree: defence?.candidateDegree ?? "phd",
      candidateNameSurname: defence?.candidateNameSurname ?? "",
      address: defence?.address ?? "",
      program: isEdit ? defence?.program : defaultProgram,
      defenseDate: defence?.defenseDate ?? "",
      publicationDate: defence?.publicationDate ?? "",
      scienceTeachers: isEdit ? defence?.scienceTeachers : [],
      members: isEdit ? defence?.members : [defaultMember],
      placeholder: isEdit ? defence?.placeholder : undefined,
      message: isEdit ? defence?.message : "",
    } as DefenceFormValues,
    validators: {
      onSubmit: defenceSchema,
    },
    onSubmit: ({ value }) => {
      console.log("onSubmit", value);
      handleFormSubmit(value);
      window.location.reload();
    },
  });

  const currentDegree = useStore(
    form.store,
    (state) => state.values.candidateDegree,
  );

  const { data: programs } = useQuery({
    queryKey: ["programs", currentDegree],
    queryFn: () => getShortProgramsByDegree(currentDegree),
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (data: DefenceFormValues) =>
      isEdit ? updateDefence(defenceId!, data) : createDefence(data),
    onSuccess: () => alert(isEdit ? "Оновлено!" : "Створено!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  const handleFormSubmit = async (values: DefenceFormValues) => {
    const result = defenceSchema.safeParse(values);

    if (!result.success) {
      console.error("Validation failed:", result.error.errors);
      return;
    }

    // extract programId from the program object
    const programId = values.program?.id;

    // construct the updatedDefence with programId only
    const updatedDefence = { ...values, programId };

    // remove the full program object if it exists
    delete updatedDefence.program;

    console.log("Form submitted with values:", updatedDefence);
    mutation.mutate(updatedDefence);
  };

  return (
    <div ref={observerRef} className="mx-auto h-fit w-full">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form current", form.state.values);
          form.validate("submit");
          form.handleSubmit();
          console.log("Form validated", form.state.errors);
        }}
      >
        {/* Candidate degree */}
        <form.AppField
          name={"candidateDegree"}
          listeners={{
            onChange: ({ value }) => {
              form.setFieldValue("program", defaultProgram);
              console.log("Current program", form.state.values.program);

              if (value === "doc") {
                form.setFieldValue("scienceTeachers", undefined);
                form.setFieldValue("members", undefined);

                form.setFieldValue("placeholder", "");
              } else {
                form.setFieldValue("placeholder", undefined);

                form.setFieldValue(
                  "scienceTeachers",
                  defence?.scienceTeachers || [""],
                );
                form.setFieldValue(
                  "members",
                  defence?.members || [defaultMember],
                );
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

        {/* Defence title */}
        <form.AppField name={"defenseTitle"}>
          {(field) => (
            <field.InputField label="Назва дисертації" type={"text"} />
          )}
        </form.AppField>

        {/* Candidate info */}
        <form.AppField name={"candidateNameSurname"}>
          {(field) => (
            <field.InputField label="П.І.Б. захисника" type={"text"} />
          )}
        </form.AppField>

        {/* Address */}
        <form.AppField name={"address"}>
          {(field) => <field.InputField label="Адреса" type={"text"} />}
        </form.AppField>

        {/* Program */}
        {/* TODO: fix error not displaying */}
        <form.AppField name={"program"}>
          {(field) => (
            <>
              <field.SelectField
                label="Програма"
                options={programs || []}
                getOptionLabel={(option) => option.name}
              />

              {}
            </>
          )}
        </form.AppField>

        {/* Science teachers */}
        {currentDegree === "phd" && (
          <form.AppField name="scienceTeachers" mode="array">
            {(field) => (
              <>
                <legend className="fieldset-legend text-base-content/50 pb-0 font-medium">
                  Наукові керівники
                </legend>

                {field.state.value?.map((_, i) => {
                  return (
                    <form.AppField key={i} name={`scienceTeachers[${i}]`}>
                      {(subField) => (
                        <field.InputField
                          label={`Керівник ${i + 1}`}
                          labelStyle="text-sm"
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
                  Додати керівника
                </button>

                {field.state.meta.errors.length
                  ? field.state.meta.errors
                      .map((err) => err?.message)
                      .map((mess, i) => (
                        <FieldInfo key={i} message={mess ?? ""} />
                      ))
                  : null}
              </>
            )}
          </form.AppField>
        )}

        {/* Rada members */}
        {currentDegree === "phd" && (
          <div>
            <form.AppField name={"members"} mode="array">
              {(field) => (
                <>
                  <legend className="fieldset-legend text-base-content/50 pb-0 font-medium">
                    Склад спеціалізованої ради
                  </legend>

                  {["Голова ради", "Рецезенти", "Офіційні опоненти"].map(
                    (positionLabel) =>
                      field.state.value
                        ?.map((member, realIndex) => ({ member, realIndex }))
                        .filter(
                          ({ member }) => member.position === positionLabel,
                        )
                        .map(({ realIndex }) => (
                          <div
                            key={`${positionLabel}-${realIndex}`}
                            className="grid grid-cols-[0.3fr_auto] gap-x-4"
                          >
                            <legend className="fieldset-legend text-base-content/50 row-span-full self-start pb-0 font-medium">
                              {positionLabel}
                            </legend>

                            <div className="col-start-2 flex flex-col">
                              <form.AppField
                                key={`${positionLabel}-members-${realIndex}`}
                                name={`members[${realIndex}].members`}
                                mode="array"
                              >
                                {(subField) => (
                                  <>
                                    {subField.state.value?.map((_, j) => (
                                      <div
                                        key={`${positionLabel}-Member-${j}`}
                                        className="grid gap-2"
                                      >
                                        <form.AppField
                                          name={`members[${realIndex}].members[${j}].nameSurname`}
                                        >
                                          {(nameField) => (
                                            <nameField.InputField
                                              label={`${positionLabel === "Голова ради" ? "Голова" : "Рецензент"} ${j + 1}`}
                                              labelStyle="text-sm"
                                              value={nameField.state.value}
                                              onChange={(e) =>
                                                nameField.handleChange(
                                                  e.target.value,
                                                )
                                              }
                                            />
                                          )}
                                        </form.AppField>

                                        <form.AppField
                                          name={`members[${realIndex}].members[${j}].title`}
                                        >
                                          {(titleField) => (
                                            <titleField.InputField
                                              label="Ступінь"
                                              labelStyle="text-sm"
                                              value={titleField.state.value}
                                              onChange={(e) =>
                                                titleField.handleChange(
                                                  e.target.value,
                                                )
                                              }
                                            />
                                          )}
                                        </form.AppField>

                                        <form.AppField
                                          name={`members[${realIndex}].members[${j}].toolTip`}
                                        >
                                          {(toolTipField) => (
                                            <toolTipField.InputField
                                              label="Спеціальність"
                                              labelStyle="text-sm"
                                              value={toolTipField.state.value}
                                              onChange={(e) =>
                                                toolTipField.handleChange(
                                                  e.target.value,
                                                )
                                              }
                                            />
                                          )}
                                        </form.AppField>

                                        <div className="divider my-0"></div>
                                      </div>
                                    ))}
                                    <button
                                      onClick={() =>
                                        subField.pushValue({
                                          nameSurname: "",
                                          title: "",
                                          toolTip: "",
                                        })
                                      }
                                      type="button"
                                      className="btn btn-soft btn-block"
                                    >
                                      Додати людину
                                    </button>
                                  </>
                                )}
                              </form.AppField>
                            </div>
                          </div>
                        )),
                  )}
                </>
              )}
            </form.AppField>
          </div>
        )}

        {/* Rada Code */}
        {currentDegree === "doc" && (
          <form.AppField name={"placeholder"}>
            {(field) => <field.InputField label="Код ради" />}
          </form.AppField>
        )}

        {/* Dates */}
        <fieldset className="flex flex-row gap-4">
          {/* Date of defence */}
          <form.AppField name={"defenseDate"}>
            {(field) => <field.DateTimeInput label="Дата захисту" />}
          </form.AppField>

          {/* Date of defence */}
          <form.AppField name={"publicationDate"}>
            {(field) => <field.DateTimeInput label="Дата публікації" />}
          </form.AppField>
        </fieldset>

        {/* Message */}
        <form.AppField name={"message"}>
          {(field) => <field.TextAreaInput label={"Повідомлення"} />}
        </form.AppField>

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
