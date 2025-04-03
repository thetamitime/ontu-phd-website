import { getAllNews } from "@/lib/api/news";
import { NewsCardSmall } from "@/ui/components";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h2 className="header">Усі новини</h2>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {news.map((item) => (
          <NewsCardSmall
            key={item.id}
            id={item.id}
            thumbnail={item.thumbnail}
            date={item.date}
            title={item.title}
            mainTag={item.mainTag}
          />
        ))}
      </div>
    </>
  );
}
