import { ReactElement } from "react";

export interface News {
  id: number;
  category: string;
  date: Date;
  photo: string;
  title: string;
  description: string;
  link: string;
}

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
