import { useFormContext } from "@/app/dashboard/programs/form";

export const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button className="btn btn-soft btn-primary" disabled={isSubmitting}>
          {label}
        </button>
      )}
    </form.Subscribe>
  );
};
