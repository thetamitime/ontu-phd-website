import { notFound } from "next/navigation";
import { LatestNews, News, NewsBody } from "@/lib/types/news";
import { ProgramFormValues } from "@/lib/schemas/programSchema";
import { NewsFormValues } from "@/lib/schemas/newsSchema";
import { toFormData } from "@/lib/utils/toFormData";

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

export async function getFullNewsById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/news/full/${id}`);

  const news: News = await res.json();
  if (!news) notFound();
  return news;
}

export const createNews = async (newNews: NewsFormValues) => {
  const response = await fetch(`${API_BASE_URL}/api/news/`, {
    method: "POST",
    body: toFormData(newNews),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(
      `Failed to create news. Status: ${response.status}, Message: ${errorText}`,
    );
  }

  const result = await response.json();
  console.log("News updated successfully:", result);
  return result;
};

export const updateNews = async (id: number, updatedNews: NewsFormValues) => {
  const response = await fetch(`${API_BASE_URL}/api/news/${id}`, {
    method: "PUT",
    body: toFormData(updatedNews),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(
      `Failed to update news. Status: ${response.status}, Message: ${errorText}`,
    );
  }

  const result = await response.json();
  console.log("News updated successfully:", result);
  return result;
};

export const deleteNews = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/news/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(
      `Failed to delete news. Status: ${response.status}, Message: ${errorText}`,
    );
  }

  const result = await response.json();
  console.log("News deleted successfully:", result);
  return result;
};
