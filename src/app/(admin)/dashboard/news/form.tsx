"use client";

import { createFormHook, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  FieldInfo,
  InputField,
  SubscribeButton,
  TextAreaInput,
  DateTimeInput,
  FileInput,
} from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";
import { createNews, getFullNewsById, updateNews } from "@/lib/api/news";
import { NewsFormValues, newsSchema } from "@/lib/schemas/newsSchema";

//=============Form Context=============
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    DateTimeInput,
    InputField,
    TextAreaInput,
    FileInput,
  },
  formComponents: {
    SubscribeButton,
  },
});

//=============Defence Form (Edit and Create)=============
export default function NewsForm({ newsId }: { newsId?: number }) {
  const isEdit = Boolean(newsId);

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

  const { data: news } = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => getFullNewsById(newsId!.toString()),
    enabled: isVisible,
    refetchOnWindowFocus: false,
  });

  const form = useAppForm({
    defaultValues: {
      title: news?.title ?? "",
      summary: news?.summary ?? "",
      publicationDate: news?.publicationDate ?? "",
      mainTag: news?.mainTag ?? "",
      otherTags: news?.otherTags ?? [""],
      body: news?.body ?? "",
      thumbnailPath: undefined,
      photoPaths: undefined,
    } as NewsFormValues,
    validators: {
      onSubmit: newsSchema,
    },
    onSubmit: ({ value }) => {
      console.log("onSubmit", value);
      handleFormSubmit(value);
      //window.location.reload();
    },
  });

  const mutation = useMutation({
    mutationFn: (data: NewsFormValues) =>
      isEdit ? updateNews(newsId!, data) : createNews(data),
    onSuccess: () => alert(isEdit ? "Оновлено!" : "Створено!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  const handleFormSubmit = async (values: NewsFormValues) => {
    const result = newsSchema.safeParse(values);

    if (!result.success) {
      console.error("Validation failed:", result.error.errors);
      return;
    }

    console.log("Form submitted with values:", values);
    mutation.mutate(values);
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
        {/* News title */}
        <form.AppField name={"title"}>
          {(field) => <field.InputField label={"Назва"} type="text" />}
        </form.AppField>

        {/* Summary */}
        <form.AppField name={"summary"}>
          {(field) => <field.TextAreaInput label={"Короткий опис"} />}
        </form.AppField>

        {/* Main Tag */}
        <form.AppField name={"mainTag"}>
          {(field) => <field.InputField label={"Головний тег"} />}
        </form.AppField>

        <form.AppField name="otherTags" mode="array">
          {(field) => (
            <fieldset>
              <legend className="fieldset-legend text-base-content/50 pb-0 font-medium">
                Інші теги
              </legend>

              <div className={"flex w-full flex-row flex-wrap gap-x-5"}>
                {field.state.value?.map((_, i) => {
                  return (
                    <form.AppField key={i} name={`otherTags[${i}]`}>
                      {(subField) => (
                        <field.InputField
                          label={`Тег ${i + 1}`}
                          labelStyle={"text-sm"}
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                        />
                      )}
                    </form.AppField>
                  );
                })}
              </div>

              <button
                onClick={() => field.pushValue("")}
                type="button"
                className="btn btn-soft btn-block mt-3"
              >
                Додати тег
              </button>

              {field.state.meta.errors.length
                ? field.state.meta.errors
                    .map((err) => err?.message)
                    .map((mess, i) => (
                      <FieldInfo key={i} message={mess ?? ""} />
                    ))
                : null}
            </fieldset>
          )}
        </form.AppField>

        {/* Thumb */}
        <form.AppField name={"thumbnailPath"}>
          {(field) => <field.FileInput label="Титульна фото" />}
        </form.AppField>

        {/* Photos */}
        <form.AppField name={"photoPaths"}>
          {(field) => (
            <field.FileInput label="Інші фотографії" multiple={true} />
          )}
        </form.AppField>

        {/* Date of defence */}
        <form.AppField name={"publicationDate"}>
          {(field) => <field.DateTimeInput label="Дата публікації" />}
        </form.AppField>

        {/* Body */}
        <form.AppField name={"body"}>
          {(field) => (
            <field.TextAreaInput
              label={"Текст новини"}
              className={"min-h-60"}
            />
          )}
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
