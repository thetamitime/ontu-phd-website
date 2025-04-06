import { useFieldContext } from "@/app/dashboard/programs/form";

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

  return (
    <fieldset className="fieldset flex flex-row gap-2 text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      <select
        className="select select-bordered w-full"
        name={field.name}
        value={field.state.value ? JSON.stringify(field.state.value) : ""}
        onChange={(e) => field.handleChange(JSON.parse(e.target.value))}
        disabled={disabled}
      >
        <option value="" disabled>
          Оберіть {label.toLowerCase()}
        </option>

        {options?.map((option, index) => (
          <option key={index} value={JSON.stringify(option)}>
            {option.code} {option.name}
          </option>
        ))}
      </select>
    </fieldset>
  );
};
