import { notFound } from "next/navigation";
import { LatestNews, News, NewsBody } from "@/lib/types/news";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllNews() {
  const res = await fetch(`${API_BASE_URL}/api/news`);

  const news: News[] = await res.json();
  if (!news) notFound();
  return news;
}

export async function getLatestNews() {
  const res = await fetch(`${API_BASE_URL}/api/news/latest`);

  const news: LatestNews[] = await res.json();
  if (!news) notFound();
  return news;
}

export async function getNewsById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/news/${id}`);

  const news: NewsBody = await res.json();
  if (!news) notFound();
  return news;
}
