import React, { InputHTMLAttributes } from "react";
import { FieldInfo } from "@/ui/components";
import { useFieldContext } from "@/lib/hooks/useFieldContext";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FileInput = ({ label, multiple, ...rest }: FileInputProps) => {
  const field = useFieldContext<File | File[] | null>();
  const hasError = field.state.meta.errors.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      field.handleChange(multiple ? [] : null);
      return;
    }

    field.handleChange(multiple ? Array.from(files) : files[0]);
  };

  return (
    <fieldset className="fieldset w-full gap-2 text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      <input
        type="file"
        className={`file-input w-full ${hasError ? "input-error" : ""}`}
        multiple={multiple}
        {...rest}
        onChange={handleChange}
      />

      {hasError &&
        field.state.meta.errors.map((err, i) => (
          <FieldInfo key={i} message={err.message} />
        ))}
    </fieldset>
  );
};
