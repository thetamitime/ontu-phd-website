import { useFormContext } from "@/lib/hooks/useFieldContext";

export const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          className="btn btn-soft btn-primary"
          disabled={isSubmitting}
          type="submit"
        >
          {label}
        </button>
      )}
    </form.Subscribe>
  );
};
