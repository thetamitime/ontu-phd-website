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
  // avoid extra space if description starts with ","
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
      <p className="w-[90%] md:w-[95%]">
        {titleParts.map((part, index) => (
          <span
            key={index}
            className={
              part.startsWith("(") && part.endsWith(")") ? "" : "font-bold"
            }
          >
            {part}
            {/* avoid extra space unless the next part is not a comma */}
            {index < titleParts.length - 1 &&
            !titleParts[index + 1]?.startsWith(",")
              ? " "
              : ""}
          </span>
        ))}
        {/*
        // if part is empty prevent from adding extra space
        // else check for highlighted (underlined) parts
        */}
        {descriptionParts.map((part, index) =>
          part.trim() === "" ? null : highlightRegex.test(part) ? (
            <u key={index}>{part}</u>
          ) : (
            part
          ),
        )}
        {isLast ? "." : ";"}
      </p>
    </div>
  );
};
