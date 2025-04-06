import { useFieldContext } from "@/app/dashboard/programs/form";
import { InputHTMLAttributes } from "react";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const NumberInput = ({ label, ...rest }: NumberInputProps) => {
  const field = useFieldContext<number>();

  return (
    <fieldset className="fieldset flex w-full flex-row gap-2 text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      <input
        type="number"
        className="input w-full"
        value={field.state.value}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        {...rest} // Spread the remaining props here
      />
    </fieldset>
  );
};
