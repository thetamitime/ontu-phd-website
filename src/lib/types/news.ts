export interface News {
  id: number;
  title: string;
  summary: string;
  mainTag: string;
  date: string;
  thumbnail: string;
  otherTags: string[];
  photos: string[];
  body: string;
}

export type LatestNews = Pick<
  News,
  "id" | "title" | "mainTag" | "summary" | "date" | "thumbnail"
>;

export type NewsBody = Omit<News, "summary" | "thumbnail">;
