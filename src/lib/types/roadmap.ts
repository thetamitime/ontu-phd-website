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
