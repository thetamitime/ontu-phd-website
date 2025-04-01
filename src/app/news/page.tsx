import { getAllNews } from "@/lib/api/news";
import { NewsCardSmall } from "@/ui/components/NewsCards";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <main className="bg-base-200 grid grid-rows-[auto_1fr] px-6 md:px-10 lg:px-20">
      <div className="container xl:px-20">
        <h2 className="header">Усі новини</h2>
        <div className="wrapper justify-between gap-7">
          {news.map((item) => (
            <NewsCardSmall key={item.id} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}
