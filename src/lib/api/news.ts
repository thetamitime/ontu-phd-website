import { notFound } from "next/navigation";
import { LatestNews, News, NewsBody } from "@/lib/types/news";

export async function getAllNews() {
  const res = await fetch(`http://localhost:5124/api/news`);

  const news: News[] = await res.json();
  if (!news) notFound();
  return news;
}

export async function getLatestNews() {
  const res = await fetch("http://localhost:5124/api/news/latest");

  const news: LatestNews[] = await res.json();
  if (!news) notFound();
  return news;
}

export async function getNewsById(id: string) {
  const res = await fetch(`http://localhost:5124/api/news/${id}`);

  const news: NewsBody = await res.json();
  if (!news) notFound();
  return news;
}
