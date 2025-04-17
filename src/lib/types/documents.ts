interface Requirement {
  title: string;
  description: string;
}

export interface ApplyDocument {
  id: number;
  name: string;
  description: string;
  requirements: Requirement[];
  originalsRequired: Requirement[];
}

interface Document {
  id: number;
  programId: number;
  name: string;
  type: string;
  link: string;
}

export type Documents = Document[];
