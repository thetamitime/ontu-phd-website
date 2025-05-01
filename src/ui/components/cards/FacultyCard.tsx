import Image from "next/image";
import { Employee } from "@/lib/types/employees";
import { createImagePath } from "@/lib/utils/createImagePath";

export const FacultyCard: React.FC<Employee> = ({
  id,
  name,
  photoPath,
  position,
}) => {
  const photo = createImagePath("Employees", id, photoPath);

  return (
    <div
      className="card card-border border-base-300 bg-base-100 w-2xs"
      key={id}
    >
      <figure className="relative h-64 w-full">
        <Image
          src={photo}
          alt={`${name} - Фото`}
          className="size-full object-cover"
          width={300}
          height={300}
        />
      </figure>
      <div className="card-body">
        <h4 className="card-title font-semibold"> {name} </h4>
        <p className="text-base-content/80 text-base">{position}</p>
      </div>
    </div>
  );
};
