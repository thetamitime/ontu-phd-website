interface SelectFieldProps {
  label: string;
  options: string[];
  optionValue: string;
  onOptionChange: (value: string) => void;
  hasType?: boolean;
  typeValue?: string;
  typeOptions?: string[];
  onTypeChange?: (value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  optionValue,
  onOptionChange,
  hasType,
  typeValue,
  typeOptions,
  onTypeChange,
}) => {
  return (
    <fieldset className="fieldset flex flex-row gap-2 text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>

      {hasType && (
        <select
          className="select select-bordered w-fit"
          name="typeField"
          value={typeValue}
          onChange={(e) => onTypeChange?.(e.target.value)}
        >
          {typeOptions?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      <select
        className="select select-bordered w-full"
        name="knowledgeField"
        value={optionValue}
        onChange={(e) => onOptionChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </fieldset>
  );
};
