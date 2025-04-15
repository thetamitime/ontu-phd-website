"use client";

import { createFormHook } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FieldInfo, InputField, SubscribeButton } from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";
import { useAuth } from "@/lib/utils/AuthProvider";
import { useRouter } from "next/navigation";

//=============Form Context=============
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    FieldInfo,
  },
  formComponents: {
    SubscribeButton,
  },
});

//=============Program Form (Edit and Create)=============
export default function ChangePasswordForm() {
  const { changePassword, logout } = useAuth();

  const form = useAppForm({
    defaultValues: {
      oldPassword: "admin",
      newPassword: "",
    },
    onSubmit: ({ value }) => {
      console.log("onSubmit", value);
      mutation.mutate(value);
      logout();
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => changePassword(data),
    onSuccess: () => alert("Пароль успішно змінено!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  return (
    <form
      className="flex w-92 flex-col gap-2"
      onSubmit={() => {
        console.log("Form current", form.state.values);
        form.handleSubmit();
      }}
    >
      <form.AppField name="oldPassword">
        {(field) => <field.InputField label={"Старий пароль"} />}
      </form.AppField>

      <form.AppField name="newPassword">
        {(field) => <field.InputField label={"Старий пароль"} />}
      </form.AppField>

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}
