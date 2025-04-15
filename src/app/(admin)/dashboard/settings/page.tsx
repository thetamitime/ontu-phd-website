"use client";

import { useAuth } from "@/lib/utils/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFormHook, useStore } from "@tanstack/react-form";
import { SubscribeButton } from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";

//=============Form Context=============
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {
    SubscribeButton,
  },
});

export default function SettingsPage() {
  const { isAuthenticated, getUser, uploadAvatar } = useAuth();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
    enabled: isAuthenticated,
  });

  const form = useAppForm({
    defaultValues: {
      file: null,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
      window.location.reload(); //router doesnt work
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => uploadAvatar(data),
    onSuccess: () => alert("Додано аватар!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  const file = useStore(form.store, (state) => state.values.file);
  console.log(file);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="file">
        {(field) => (
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Pick a file</legend>
            <input
              type="file"
              className="file-input"
              onChange={(e) => field.handleChange(e.target.files[0])}
            />
            <label className="fieldset-label">Max size 2MB</label>
          </fieldset>
        )}
      </form.AppField>

      <form.AppForm>
        <SubscribeButton label={"Save"} />
      </form.AppForm>
    </form>
  );
}
