import { useFieldContext } from "@/app/dashboard/programs/form";
import { InputHTMLAttributes } from "react";

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
      <label className={"input w-full"}>
        {icon}
        <input
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          {...rest}
        />
      </label>
    </fieldset>
  );
};
