import { useFieldContext } from "@/app/dashboard/programs/form";
import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "text" | "url";
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  icon,
  ...rest
}) => {
  const field = useFieldContext<string>(); // Assuming the field state is a string

  return (
    <fieldset className="fieldset text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>
      <label className={"input validator w-full"}>
        {icon}
        <input
          type={type}
          value={field.state.value}
          required
          onChange={(e) => field.handleChange(e.target.value)}
          {...rest}
        />
      </label>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <div className="validator-hint mt-0 hidden">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </div>
      ) : null}
    </fieldset>
  );
};
