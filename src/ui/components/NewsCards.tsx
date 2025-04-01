import Image from "next/image";
import { NewsSingular } from "@/lib/types";
import Link from "next/link";

export function NewsCardLarge({
  id,
  title,
  summary,
  mainTag,
  otherTags,
  date,
  thumbnail,
  photos,
  body,
}: NewsSingular) {
  const formattedDate = new Date(date).toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      className="card card-border border-base-300 bg-base-100 h-full"
      key={id}
    >
      <div className="card-body flex-none flex-row items-center justify-between py-4">
        <div className="badge badge-soft badge-secondary"> {mainTag} </div>
        <div className="text-base-content/80 text-base">{formattedDate}</div>
      </div>
      <figure>
        <Image
          src={`/${thumbnail}`}
          alt={`Новина за тегом ${mainTag} - ${title}`}
          className="size-full object-cover"
          width={1000}
          height={1000}
        />
      </figure>
      <div className="card-body pb-0">
        <h4 className="card-title font-semibold"> {title} </h4>
        <p className="text-base">{summary}</p>
        <div className="card-actions">
          <Link
            className="link link-hover link-primary py-4"
            href={`/news/${id}`}
          >
            Продовжити читати
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NewsCardMedium({
  id,
  title,
  summary,
  mainTag,
  otherTags,
  date,
  thumbnail,
  photos,
  body,
}: NewsSingular) {
  const formattedDate = new Date(date).toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card card-border border-base-300 bg-base-100" key={id}>
      <div className="card-body flex-none flex-row items-center justify-between py-4">
        <div className="badge badge-soft badge-secondary"> {mainTag} </div>
        <div className="text-base-content/80 text-base">{formattedDate}</div>
      </div>
      <div className="card-body py-0">
        <h4 className="card-title font-semibold"> {title} </h4>
        <p className="line-clamp-3 text-base">{summary}</p>
        <div className="card-actions">
          <Link
            className="link link-hover link-primary py-4"
            href={`/news/${id}`}
          >
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
