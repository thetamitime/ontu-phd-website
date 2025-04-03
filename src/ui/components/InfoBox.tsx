import { Info } from "lucide-react";

export const InfoBox = ({
  body,
  size,
  className,
}: {
  body: string;
  size: number;
  className: string;
}) => {
  return (
    <div
      className={`bg-warning text-warning-content flex flex-row items-center gap-5 rounded-xl px-5 py-4 ${className}`}
    >
      <Info size={size} />
      <p className="mb-0! w-full">{body}</p>
    </div>
  );
};
