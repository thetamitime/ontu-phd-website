import React from "react";

interface CheckboxProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  title: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  title,
}) => {
  return (
    <fieldset className="fieldset text-base">
      <label className="fieldset-label text-base-content gap-3">
        <input
          type="checkbox"
          checked={value} // Ensuring value is strictly checked (boolean true)
          className="checkbox"
          onChange={(e) => onChange(e.target.checked)}
        />
        {title}
      </label>
    </fieldset>
  );
};
