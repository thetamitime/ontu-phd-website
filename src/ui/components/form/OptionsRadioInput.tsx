interface DegreeRadioGroupProps {
  legend: string;
  name: string;
  changeValue: string;
  possibleValues: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  className?: string;
}

export const OptionsRadioInput: React.FC<DegreeRadioGroupProps> = ({
  legend,
  name,
  changeValue,
  possibleValues,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {legend}
      </legend>
      <div className="join">
        {possibleValues.map((item, index) => (
          <input
            key={index}
            className="join-item btn"
            type="radio"
            name={name}
            value={item.value}
            checked={changeValue === item.value}
            aria-label={item.label}
            onChange={(e) => onChange(e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};
