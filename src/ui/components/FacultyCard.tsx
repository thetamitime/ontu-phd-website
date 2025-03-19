import Image from "next/image";

type FacultyStaff = {
  id: number;
  name: string;
  photo: string;
  post: string;
};

export function FacultyCard({ id, name, photo, post }: FacultyStaff) {
  return (
    <div className="card card-border border-base-300 bg-base-100" key={id}>
      <figure className="relative size-64">
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
        <p className="text-base-content/80 text-base">{post}</p>
      </div>
    </div>
  );
}
