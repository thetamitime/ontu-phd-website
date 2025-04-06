import { useFieldContext } from "@/app/dashboard/programs/form";

interface DegreeRadioGroupProps {
  label: string;
  possibleValues: {
    label: string;
    value: string;
  }[];
  className?: string;
}

export const OptionsRadioInput: React.FC<DegreeRadioGroupProps> = ({
  label,
  possibleValues,
  className,
}) => {
  const field = useFieldContext();
  return (
    <div className={className}>
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {label}
      </legend>
      <div className="join">
        {possibleValues.map((item, index) => (
          <input
            key={index}
            className="join-item btn"
            type="radio"
            name={field.name}
            value={item.value}
            checked={field.state.value === item.value}
            aria-label={item.label}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};
