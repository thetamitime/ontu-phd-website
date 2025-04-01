import { News, NewsSingular } from "@/lib/types";
import { notFound } from "next/navigation";

export async function getLatestNews() {
  const res = await fetch("http://localhost:5124/api/news/latest");

  const news: News = await res.json();
  if (!news) notFound();
  return news;
}

export async function getNewsById(id: string) {
  const res = await fetch(`http://localhost:5124/api/news/${id}`);

  const news: NewsSingular = await res.json();
  if (!news) notFound();
  return news;
}
