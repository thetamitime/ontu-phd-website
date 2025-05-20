import React from "react";
import { useFieldContext } from "@/lib/hooks/useFieldContext";
import { useStore } from "@tanstack/react-form";
import { FieldInfo } from "@/ui/components";

interface DateTimeInputProps {
  label: string;
}

//TODO: fix how data is kept in postgresql
function formatForDatetimeLocal(input: string | undefined | null) {
  if (!input) return "";
  const date = new Date(input);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  ...rest
}) => {
  const field = useFieldContext<string>(); // Assuming the field state is a string
  const errors = useStore(field.store, (state) => state.meta.errors);
  const hasError = errors.length > 0;

  return (
    <fieldset className="fieldset w-full text-base">
      <legend className={`fieldset-legend text-base-content/50 font-medium`}>
        {label}
      </legend>

      <label className={`input w-full ${hasError && "input-error"}`}>
        <input
          type="datetime-local"
          value={formatForDatetimeLocal(field.state.value)}
          onChange={(e) => field.handleChange(e.target.value)}
          {...rest}
        />
      </label>

      {field.state.meta.errors.length
        ? Array.from(
            new Set(field.state.meta.errors.map((err) => err.message)),
          ).map((mess, i) => <FieldInfo key={i} message={mess} />)
        : null}
    </fieldset>
  );
};
