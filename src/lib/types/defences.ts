import { ProgramDegree } from "@/lib/types/programs";

export interface DefenseEvent {
  id: number;
  programId: number;
  candidateNameSurname: string;
  defenseTitle: string;
  program: ProgramDegree;
  scienceTeachers?: string[];
  defenseDate: string;
  address: string;
  message?: string;
  members?: Member[];
  placeholder?: string;
  files: DefenseFile[];
  publicationDate: string;
}

interface DefenseFile {
  name: string;
  link: string;
  type: string;
}

export interface Member {
  position: string;
  members: {
    nameSurname: string;
    title: string;
    toolTip: string;
  }[];
}
