import React from "react";
import { FieldInfo } from "@/ui/components";
import { useFieldContext } from "@/lib/hooks/useFieldContext";
import { useStore } from "@tanstack/react-form";

export const SelectField = ({
  label,
  options,
  disabled,
}: {
  label: string;
  options: any[];
  disabled?: boolean;
}) => {
  const field = useFieldContext();
  const hasError = field.state.meta.errors.length > 0;
  const errors = useStore(field.store, (state) => state.meta.errors);

  // create empty value of field.state
  const resetFieldState = Object.keys(field.state.value as object).reduce(
    (acc, key) => {
      acc[key] = "";
      return acc;
    },
    {} as { [key: string]: string },
  );

  return (
    <fieldset className="fieldset gap-2 text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      <select
        className={`select select-bordered w-full ${hasError && "border-error"}`}
        name={field.name}
        value={field.state.value ? JSON.stringify(field.state.value) : ""}
        onChange={(e) => field.handleChange(JSON.parse(e.target.value))}
        disabled={disabled}
        required
      >
        <option value={JSON.stringify(resetFieldState)} disabled>
          Оберіть {label.toLowerCase()}
        </option>

        {options?.map((option, index) => (
          <option key={index} value={JSON.stringify(option)}>
            {option.code} {option.name}
          </option>
        ))}
      </select>

      {!disabled && hasError
        ? errors
            .map((err) => err.message)
            .map((mess, i) => <FieldInfo key={i} message={mess} />)
        : null}
    </fieldset>
  );
};
