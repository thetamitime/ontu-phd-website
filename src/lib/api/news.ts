import { LatestNews, NewsFull } from "@/lib/types";
import { notFound } from "next/navigation";

export async function getAllNews() {
  const res = await fetch(`http://localhost:5124/api/news`);

  const news: NewsFull[] = await res.json();
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

  const news: NewsFull = await res.json();
  if (!news) notFound();
  return news;
}
