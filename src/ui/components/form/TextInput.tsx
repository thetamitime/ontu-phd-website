import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  title: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value = "",
  onChange,
  title,
}) => {
  return (
    <fieldset className="fieldset text-base">
      <legend className="fieldset-legend text-base-content/50 font-medium">
        {title}
      </legend>
      <input
        type="text"
        className="input w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};
