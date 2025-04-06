import { useFieldContext } from "@/app/dashboard/programs/form";

export const TextAreaInputInline = ({ label }: { label: string }) => {
  const field = useFieldContext<string>();

  return (
    <label className="text-base-content/50 flex w-full items-center justify-center gap-2 text-sm font-medium">
      <span className="w-36">{label}</span>
      <textarea
        value={field.state.value}
        className="textarea text-base-content w-full font-normal"
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
      />
    </label>
  );
};
