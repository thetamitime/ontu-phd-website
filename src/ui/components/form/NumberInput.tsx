import React, { InputHTMLAttributes } from "react";
import { FieldInfo } from "@/ui/components";
import { useFieldContext } from "@/lib/hooks/useFieldContext";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const NumberInput = ({ label, ...rest }: NumberInputProps) => {
  const field = useFieldContext<number | null>();
  const hasError = field.state.meta.errors.length > 0;
  console.log("credits", field.state.value);

  return (
    <fieldset className="fieldset w-full gap-2 text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      <input
        type="number"
        className={`input w-full ${hasError && "input-error"}`}
        {...rest}
        value={field.state.value ?? ""}
        onChange={(e) =>
          field.handleChange(e.target.value ? Number(e.target.value) : null)
        }
      />

      {hasError
        ? field.state.meta.errors
            .map((err) => err.message)
            .map((mess, i) => <FieldInfo key={i} message={mess} />)
        : null}
    </fieldset>
  );
};
