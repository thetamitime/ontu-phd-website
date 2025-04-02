import { ReactElement } from "react";

export interface NewsFull {
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

export type LatestNews = Omit<NewsFull, "otherTags" | "photos" | "body">;
export type News = Pick<
  NewsFull,
  "id" | "title" | "mainTag" | "date" | "thumbnail"
>;

export interface Contact {
  icon: ReactElement;
  title: string;
  caption: string;
  href?: string;
}

interface Requirement {
  title: string;
  description: string;
}

interface ApplyDocument {
  id: number;
  name: string;
  description: string;
  requirements: Requirement[];
  originalsRequired: Requirement[];
}

export type ApplyDocuments = ApplyDocument[];

interface Document {
  id: number;
  programId: number;
  name: string;
  type: string;
  link: string;
}

export type Documents = Document[];

export interface RoadmapItem {
  id: number;
  type: string;
  dataStart: string;
  dataEnd: string | null;
  additionalTime: string | null;
  description: string;
  status: string;
}

export type Roadmap = RoadmapItem[];

export interface Employee {
  id: number;
  name: string;
  position: string;
  photo: string;
}

export type Employees = Employee[];
