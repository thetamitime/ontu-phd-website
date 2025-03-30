import React from "react";

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
  // avoid extra space if it starts with ","
  const formattedDescription = description?.startsWith(",")
    ? description
    : ` ${description}`;

  // regex for underlining "за наявністю" & "за необхідністю"
  const highlightRegex = /(за наявністю|за необхідністю)/g;
  const descriptionParts = formattedDescription.split(highlightRegex);

  // split title into bold & non-bold parts based on parenthesis
  const titleParts = title.split(/(\(.*?\))/g);

  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">{number}</p>
      <p className="w-[95%]">
        {titleParts.map((part, index) => (
          <span
            key={index}
            className={
              part.startsWith("(") && part.endsWith(")") ? "" : "font-bold"
            }
          >
            {part}
            {/* avoid extra space */}
            {titleParts[index + 1]?.startsWith(",") ? "" : " "}
          </span>
        ))}
        {descriptionParts.map((part, index) =>
          highlightRegex.test(part) ? <u key={index}>{part}</u> : part,
        )}
        {isLast ? "." : ";"}
      </p>
    </div>
  );
};
