import Image from "next/image";
import { News } from "@/lib/types";
import Link from "next/link";

export function NewsCardLarge({
  id,
  category,
  date,
  photo,
  title,
  description,
  link,
}: News) {
  return (
    <div
      className="card card-border border-base-300 bg-base-100 h-full"
      key={id}
    >
      <div className="card-body flex-none flex-row items-center justify-between py-4">
        <div className="badge badge-soft badge-secondary"> {category} </div>
        <div className="text-base-content/80 text-base">
          {date.toLocaleString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <figure>
        <Image
          src={photo}
          alt={`Новина за тегом ${category} - ${title}`}
          className="size-full object-cover"
          width={1000}
          height={1000}
        />
      </figure>
      <div className="card-body pb-0">
        <h4 className="card-title font-semibold"> {title} </h4>
        <p className="text-base">{description}</p>
        <div className="card-actions">
          <Link className="link link-hover link-primary py-4" href={link}>
            Продовжити читати
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NewsCardMedium({
  id,
  category,
  date,
  title,
  description,
  link,
}: News) {
  return (
    <div className="card card-border border-base-300 bg-base-100" key={id}>
      <div className="card-body flex-none flex-row items-center justify-between py-4">
        <div className="badge badge-soft badge-secondary"> {category} </div>
        <div className="text-base-content/80 text-base">
          {date.toLocaleString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="card-body py-0">
        <h4 className="card-title font-semibold"> {title} </h4>
        <p className="line-clamp-3 text-base">{description}</p>
        <div className="card-actions">
          <Link className="link link-hover link-primary py-4" href={link}>
            Продовжити читати
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NewsCardSmall() {
  return <></>;
}
