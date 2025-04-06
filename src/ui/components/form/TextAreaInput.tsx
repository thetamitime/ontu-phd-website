import { useFieldContext } from "@/app/dashboard/programs/form";
import { TextareaHTMLAttributes } from "react";

interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  className?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  className,
  ...rest
}) => {
  const field = useFieldContext<string>();

  return (
    <fieldset className="fieldset text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>
      <textarea
        className={`${className} textarea w-full`}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        {...rest}
      />
    </fieldset>
  );
};
