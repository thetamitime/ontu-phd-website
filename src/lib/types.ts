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
