import { News } from "@/lib/types/news";
import Link from "next/link";
import { formattedDate } from "@/lib/functions";

type NewsCardMediumProps = Pick<
  News,
  "id" | "title" | "summary" | "mainTag" | "date"
>;

export const Medium: React.FC<NewsCardMediumProps> = ({
  id,
  mainTag,
  title,
  summary,
  date,
}) => {
  const displayDate = formattedDate(date);

  return (
    <div className="card card-border border-base-300 bg-base-100" key={id}>
      <div className="card-body flex-none flex-wrap items-center justify-between py-4 md:flex-row">
        <div className="badge badge-soft badge-secondary"> {mainTag} </div>
        <div className="text-base-content/80 text-base">{displayDate}</div>
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
};
