import React, { InputHTMLAttributes } from "react";
import { FieldInfo } from "@/ui/components";
import { useFieldContext } from "@/lib/hooks/useFieldContext";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  ...rest
}) => {
  const field = useFieldContext<string>(); // Assuming the field state is a string
  const hasError = field.state.meta.errors.length > 0;

  return (
    <fieldset className="fieldset text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      <label className={`input w-full ${hasError && "input-error"}`}>
        {icon}
        <input
          type="text"
          value={field.state.value}
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
