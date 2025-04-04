import { ProgramDegree } from "@/lib/types/programs";

export interface DefenseEvent {
  id: number;
  programId: number;
  nameSurname: string;
  defenseName: string;
  programInfo: ProgramDegree;
  scienceTeachers?: string[];
  dateOfDefense: string;
  address: string;
  description: string;
  members?: Member[];
  placeholder?: string;
  files: DefenseFile[];
  dateOfPublication: string;
}

interface DefenseFile {
  name: string;
  link: string;
  type: string;
}

export interface Member {
  position: string;
}
