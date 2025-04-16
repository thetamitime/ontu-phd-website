export interface News {
  id: number;
  title: string;
  summary: string;
  mainTag: string;
  publicationDate: string;
  thumbnailPath: string;
  otherTags: string[];
  photos: string[];
  body: string;
}

export type LatestNews = Pick<
  News,
  "id" | "title" | "mainTag" | "summary" | "publicationDate" | "thumbnailPath"
>;

export type NewsBody = Omit<News, "summary" | "thumbnailPath">;
