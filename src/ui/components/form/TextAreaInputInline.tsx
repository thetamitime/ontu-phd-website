import { useFieldContext } from "@/lib/hooks/useFieldContext";
import React, { TextareaHTMLAttributes } from "react";
import { FieldInfo } from "@/ui/components";

interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextAreaInputInline: React.FC<TextAreaInputProps> = ({
  label,
  ...rest
}) => {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <label className="text-base-content/50 flex w-full items-center justify-center gap-2 text-sm">
      <span className="w-36 font-medium">{label}</span>

      <div className="flex w-full flex-col gap-1.5">
        <textarea
          value={field.state.value}
          className={`${hasError && "textarea-error"} textarea text-base-content w-full font-normal`}
          onChange={(e) => {
            field.handleChange(e.target.value);
          }}
          {...rest}
        />

        {hasError
          ? field.state.meta.errors
              .map((err) => err.message)
              .map((mess, i) => <FieldInfo key={i} message={mess} />)
          : null}
      </div>
    </label>
  );
};
