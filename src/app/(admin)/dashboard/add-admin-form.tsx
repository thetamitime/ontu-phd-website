"use client";

import { createFormHook, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { FieldInfo, InputField, SubscribeButton } from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";
import { useAuth } from "@/lib/utils/AuthProvider";
import {
  AdminCredentials,
  newAdminSchema,
  NewAdminValues,
} from "@/lib/schemas/newAdminSchema";
import { AdminCard } from "@/ui/components/cards/AdminCard";

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
  const { getUser, isAuthenticated, getAdmins, createAdmin } = useAuth();

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => await getAdmins(),
    enabled: isAuthenticated,
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
    enabled: isAuthenticated,
  });
  const adminsWithoutUser =
    admins &&
    admins.filter((admin: AdminCredentials) => admin.name !== user.name);

  const form = useAppForm({
    defaultValues: {
      admins: null,
    } as NewAdminValues,
    validators: {
      onSubmit: newAdminSchema,
    },
    onSubmit: ({ value }) => {
      value.admins?.map((admin) => {
        mutation.mutate({ email: admin.email, name: admin.name });
      });
      window.location.reload(); //router doesnt work
    },
  });

  const newAdmins = useStore(form.store, (state) => state.values.admins);

  const mutation = useMutation({
    mutationFn: (data: AdminCredentials) => createAdmin(data),
    onSuccess: () => alert("Додано нового адміністратора!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  return (
    <div className={`${className} card bg-base-100 border-base-300 border`}>
      <div className="card-body gap-4">
        <legend className="card-title mb-3">Адміністратори</legend>

        {admins && <AdminCard admins={adminsWithoutUser} />}

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.AppField name="admins" mode="array">
            {(field) => (
              <>
                {field.state.value?.map((_, i) => {
                  return (
                    <div
                      className="card-body border-base-300 bg-base-200 rounded-2xl border py-2 pb-5.5"
                      key={i}
                    >
                      <form.AppField name={`admins[${i}].name`}>
                        {(nameField) => (
                          <field.InputField
                            label="Ім'я адміністратора"
                            value={nameField.state.value}
                            onChange={(e) =>
                              nameField.handleChange(e.target.value)
                            }
                          />
                        )}
                      </form.AppField>

                      <form.AppField name={`admins[${i}].email`}>
                        {(emailField) => (
                          <field.InputField
                            label="Пошта адміністратора"
                            value={emailField.state.value}
                            onChange={(e) =>
                              emailField.handleChange(e.target.value)
                            }
                          />
                        )}
                      </form.AppField>

                      <button
                        onClick={() => field.removeValue(i)}
                        type="button"
                        className="btn btn-soft btn-error mt-3 w-fit self-end"
                      >
                        Видалити
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={() => field.pushValue({ email: "", name: "" })}
                  type="button"
                  className="btn btn-soft"
                >
                  Додати адміністратора
                </button>
              </>
            )}
          </form.AppField>

          {newAdmins && newAdmins?.length > 0 && (
            <form.AppForm>
              <form.SubscribeButton label="Зберегти" />
            </form.AppForm>
          )}
        </form>
      </div>
    </div>
  );
}
