import { LatestNews } from "@/lib/types/news";
import Link from "next/link";
import { formattedDate } from "@/lib/functions";
import Image from "next/image";

type NewsCardLargeProps = LatestNews;

export const Large: React.FC<NewsCardLargeProps> = ({
  id,
  title,
  mainTag,
  publicationDate,
  thumbnailPath,
  summary,
}) => {
  const displayDate = formattedDate(publicationDate);
  const src = process.env.NEXT_PUBLIC_API_URL + thumbnailPath;

  return (
    <div
      className="card card-border border-base-300 bg-base-100 h-full"
      key={id}
    >
      <div className="card-body flex-none flex-row items-center justify-between py-4">
        <div className="badge badge-soft badge-secondary"> {mainTag} </div>
        <div className="text-base-content/80 text-base">{displayDate}</div>
      </div>
      <figure>
        <Image
          src={src}
          alt={`Новина за тегом ${mainTag} - ${title}`}
          className="max-h-[26rem] w-full object-cover"
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
};
