"use client";

import { createFormHook } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProgram } from "@/lib/api/programs";
import React from "react";
import { FieldInfo, InputField, SubscribeButton } from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";
import { useAuth } from "@/lib/utils/AuthProvider";

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
export default function NewAdminForm({ className }: { className: string }) {
  const { isAuthenticated, getAdmins, createAdmin } = useAuth();

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => await getAdmins(),
    enabled: isAuthenticated,
  });

  console.log(admins);

  const form = useAppForm({
    defaultValues: {
      admins: [{ email: "", name: "" }],
    },
    onSubmit: ({ value }) => {
      console.log("onSubmit", value);
      value.admins.map((admin) => {
        mutation.mutate({ email: admin.email, name: admin.name });
      });
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => createAdmin(data),
    onSuccess: () => alert("Додано нового адміністратора!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  return (
    <div className={`${className} card bg-base-100 border-base-300 border`}>
      <form
        className="card-body"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form current", form.state.values);
          form.handleSubmit();
        }}
      >
        <form.AppField name="admins" mode="array">
          {(field) => (
            <>
              <legend className="card-title mb-3">Адміністратори</legend>
              {admins &&
                admins.map((admin, index) => (
                  <div key={index}>{admin.email}</div>
                ))}
              {field.state.value?.map((_, i) => (
                <form.AppField key={i} name={`admins[${i}]`} mode="object">
                  {(adminField) => (
                    <div className="mb-4 rounded border p-3">
                      <form.AppField name={`admins[${i}].email`}>
                        {(emailField) => (
                          <field.InputField
                            label="Email"
                            value={emailField.state.value}
                            onChange={(e) =>
                              emailField.handleChange(e.target.value)
                            }
                          />
                        )}
                      </form.AppField>

                      <form.AppField name={`admins[${i}].name`}>
                        {(nameField) => (
                          <field.InputField
                            label="Ім'я"
                            value={nameField.state.value}
                            onChange={(e) =>
                              nameField.handleChange(e.target.value)
                            }
                          />
                        )}
                      </form.AppField>

                      <button
                        type="button"
                        className="mt-2 text-red-500"
                        onClick={() => field.removeValue(i)}
                      >
                        Видалити
                      </button>
                    </div>
                  )}
                </form.AppField>
              ))}

              <button
                onClick={() => field.pushValue({ email: "", name: "" })}
                type="button"
              >
                Додати напрям
              </button>
            </>
          )}
        </form.AppField>

        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </form>
    </div>
  );
}
