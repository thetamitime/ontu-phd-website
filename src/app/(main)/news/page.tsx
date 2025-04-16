import { getAllNews } from "@/lib/api/news";
import { NewsCardSmall } from "@/ui/components";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h2 className="header">Усі новини</h2>
      {news.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((item) => (
            <NewsCardSmall
              key={item.id}
              id={item.id}
              thumbnailPath={item.thumbnailPath}
              publicationDate={item.publicationDate}
              title={item.title}
              mainTag={item.mainTag}
            />
          ))}
        </div>
      ) : (
        <div className="text-base-content/50 flex h-screen items-center justify-center">
          <p className="w-full text-center">Новин поки нема :(</p>
        </div>
      )}
    </>
  );
}
