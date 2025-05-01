import React from "react";
import { Breadcrumbs, Carousel } from "@/ui/components/";
import { getNewsById } from "@/lib/api/news";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createImagePath } from "@/lib/utils/createImagePath";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsById(id);

  const formattedDate = new Date(news.publicationDate).toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const photos = news.photoPaths.map((photo) => {
    photo = createImagePath("News", news.id, photo);
    return photo;
  });

  return (
    <>
      <Breadcrumbs forPath="/news" title={news.title} />

      <article className="flex flex-col pb-20 [&_p]:mb-2">
        {/* Tags */}
        <div className="mt-4 mb-2 flex flex-wrap gap-2">
          <div className="badge badge-primary badge-soft h-fit">
            {news.mainTag}
          </div>
          {news.otherTags.map((tag) => (
            <div key={tag} className="badge badge-soft h-fit">
              {tag}
            </div>
          ))}
        </div>

        {/*Title*/}
        <h2 className="sub-header">{news.title}</h2>

        {/*Date*/}
        <p className="text-base-content/60 mt-2">{formattedDate}</p>

        {/* Photos */}
        <Carousel images={photos} />

        <div>
          <Markdown remarkPlugins={[remarkGfm]}>{news.body}</Markdown>
        </div>
      </article>
    </>
  );
}
