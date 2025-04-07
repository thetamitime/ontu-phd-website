import { LatestNews } from "@/lib/types/news";
import Link from "next/link";
import { formattedDate } from "@/lib/functions";
import Image from "next/image";

type NewsCardSmallProps = Omit<LatestNews, "summary">;

export const Small: React.FC<NewsCardSmallProps> = ({
  id,
  mainTag,
  title,
  thumbnail,
  date,
}) => {
  const displayDate = formattedDate(date);

  return (
    <div
      className="card card-sm card-border border-base-300 bg-base-100"
      key={id}
    >
      <figure>
        <Image
          src={`/${thumbnail}`}
          alt="Thumbnail"
          className="h-64 w-full object-cover"
          width={1000}
          height={1000}
        />
      </figure>
      <div className="card-body">
        <div className="badge badge-soft badge-secondary"> {mainTag} </div>
        <Link className="link link-hover mb-4" href={`/news/${id}`}>
          <h4 className="card-title text-lg font-semibold">{title}</h4>
        </Link>
        <div className="flex grow-1">
          <p className="text-base-content/80 mt-auto text-sm">{displayDate}</p>
        </div>
      </div>
    </div>
  );
};
