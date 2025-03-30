export interface Program {
  id: number;
  degree: string;
  title: string;
  fieldOfKnowledgeCode: string;
  fieldOfKnowledge: string;
  specialtyCode: string;
  specialty: string;
  modeOfStudy: string;
  durationOptions: number[];
  credits: string;
  tuitionFees: number[];
  description: string;
  link: string;
  documents: {
    docId: number;
    fileName: string;
    fileUrl: string;
  }[];
}

export interface News {
  id: number;
  category: string;
  date: Date;
  photo: string;
  title: string;
  description: string;
  link: string;
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
