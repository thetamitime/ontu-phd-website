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
