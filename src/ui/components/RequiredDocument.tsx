interface RequirementProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export const RequiredDocument = ({
  number,
  title,
  description,
  isLast = false,
}: RequirementProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">{number}</p>
      <p className="w-[95%]">
        <span className="font-bold">{title}</span>
        {description
          ? `${description}${isLast ? "." : ";"}`
          : isLast
            ? "."
            : ";"}
      </p>
    </div>
  );
};
