import { ReactElement } from "react";

export interface NewsSingular {
  id: number;
  title: string;
  summary: string;
  mainTag: string;
  otherTags: string[];
  date: string;
  thumbnail: string;
  photos: string[];
  body: string[];
}

export type News = NewsSingular[];

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
