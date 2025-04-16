//import Image from "next/image";
import { Employee } from "@/lib/types/employees";

export const FacultyCard: React.FC<Employee> = ({
  id,
  name,
  photoPath,
  position,
}) => {
  //TODO: fix path in api
  //const src = process.env.NEXT_PUBLIC_API_URL + "/" + photoPath;
  console.log(photoPath);

  return (
    <div
      className="card card-border border-base-300 bg-base-100 w-2xs"
      key={id}
    >
      <figure className="relative h-64 w-full">
        {/*<Image*/}
        {/*  src={src}*/}
        {/*  alt={`${name} - Фото`}*/}
        {/*  className="size-full object-cover"*/}
        {/*  width={300}*/}
        {/*  height={300}*/}
        {/*/>*/}
      </figure>
      <div className="card-body">
        <h4 className="card-title font-semibold"> {name} </h4>
        <p className="text-base-content/80 text-base">{position}</p>
      </div>
    </div>
  );
};
