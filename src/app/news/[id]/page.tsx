import React from "react";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { getNewsById } from "@/lib/api/news";
import { Carousel } from "@/ui/components/Carousel";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNewsById(id);
  const formattedDate = new Date(news.date).toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
          <div className="badge badge-soft h-fit">
            {news.otherTags.map((tag) => tag)}
          </div>
        </div>

        {/*Title*/}
        <h2 className="sub-header">{news.title}</h2>

        {/*Date*/}
        <p className="text-base-content/60 mt-2">{formattedDate}</p>

        {/* Photos */}
        <Carousel images={news.photos} />

        <div>
          <Markdown remarkPlugins={[remarkGfm]}>{news.body}</Markdown>
        </div>
      </article>
    </>
  );
}
