import React from "react";
import { useFieldContext } from "@/lib/hooks/useFieldContext";

export const Checkbox = ({ title }: { title: string }) => {
  const field = useFieldContext<boolean>();

  return (
    <fieldset className="fieldset text-base">
      <label className="fieldset-label text-base-content gap-3">
        <input
          type="checkbox"
          checked={field.state.value}
          className="checkbox"
          onChange={(e) => field.handleChange(e.target.checked)}
        />
        {title}
      </label>
    </fieldset>
  );
};
