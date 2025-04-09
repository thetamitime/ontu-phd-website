import { useFieldContext } from "@/lib/hooks/useFieldContext";
import React, { TextareaHTMLAttributes } from "react";
import { FieldInfo } from "@/ui/components";

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
  const hasError = field.state.meta.errors.length > 0;

  return (
    <fieldset className="fieldset text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      <textarea
        className={`${className} textarea w-full ${hasError && "textarea-error"}`}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        {...rest}
      />

      {hasError
        ? field.state.meta.errors
            .map((err) => err.message)
            .map((mess, i) => <FieldInfo key={i} message={mess} />)
        : null}
    </fieldset>
  );
};
