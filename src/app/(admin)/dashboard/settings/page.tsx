"use client";

import { useAuth } from "@/lib/utils/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { createFormHook } from "@tanstack/react-form";
import { SubscribeButton } from "@/ui/components";
import { fieldContext, formContext } from "@/lib/hooks/useFieldContext";
import { ProfilePicture } from "@/lib/types/dashboard";

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
  const { uploadAvatar } = useAuth();

  const form = useAppForm({
    defaultValues: {
      file: null,
    } as ProfilePicture,
    onSubmit: ({ value }) => {
      if (value.file) mutation.mutate(value.file);
      window.location.reload(); //router doesnt work
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      form.setFieldValue("file", files[0]);
    } else {
      form.setFieldValue("file", null);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: File) => uploadAvatar(data),
    onSuccess: () => alert("Додано аватар!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="file">
        {() => (
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Pick a file</legend>
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
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
