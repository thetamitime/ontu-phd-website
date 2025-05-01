"use client";

import { createFormHook } from "@tanstack/react-form";
import { useAuth } from "@/lib/utils/AuthProvider";
import { useRouter } from "next/navigation";
import { InputField, SubscribeButton } from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";
import React from "react";
import { Credentials, loginSchema } from "@/lib/schemas/loginSchema";

//=============Form Context=============
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
  },
  formComponents: {
    SubscribeButton,
  },
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } as Credentials,
    validators: {
      onSubmit: loginSchema,
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      try {
        login(value).then(() => {
          setLoginSuccess(true);
          router.push("/dashboard");
        });
      } catch {
        setLoginSuccess(false);
      }
    },
  });

  return (
    <main className="bg-base-200 flex h-screen items-center justify-center">
      <div className="card card-border border-base-300 bg-base-100 h-fit w-84 p-5">
        <div className="card-title">
          <h1>Вхід для адміністраторів</h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="card-body px-0 py-1">
            <form.AppField name="email">
              {(field) => <field.InputField label="Пошта" />}
            </form.AppField>

            <form.AppField name="password">
              {(field) => <field.InputField label="Пароль" />}
            </form.AppField>
          </div>

          {!loginSuccess && !form.state.isPristine && (
            <div className="alert alert-soft">Неправильно введено дані</div>
          )}

          <form.AppForm>
            <form.SubscribeButton label="Вхід" className="btn-block mt-4" />
          </form.AppForm>
        </form>
      </div>
    </main>
  );
}
