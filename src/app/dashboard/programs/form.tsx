"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Program } from "@/lib/types/programs";

export default function ProgramForm({ program }: { program: Program }) {
  const form = useForm({
    defaultValues: {
      name: "Технології",
      age: 0,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="mx-auto flex w-full flex-1 flex-col gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <form.Field name={"name"}>
          {(field) => (
            <textarea
              className="textarea textarea-ghost disabled w-full p-0 text-2xl font-semibold"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={form.handleSubmit}
        >
          Submit
        </button>
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
