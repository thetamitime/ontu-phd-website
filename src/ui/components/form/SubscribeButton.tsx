import { useFormContext } from "@/lib/hooks/useFieldContext";

export const SubscribeButton = ({
  label,
  className,
  ...rest
}: {
  label: string;
  className?: string;
}) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          className={`${className} btn btn-soft btn-primary`}
          disabled={isSubmitting}
          {...rest}
        >
          {isSubmitting ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            label
          )}
        </button>
      )}
    </form.Subscribe>
  );
};
