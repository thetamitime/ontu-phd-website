import { ProgramShort } from "@/lib/types/programs";

export interface DefenseEvent {
  id: number;
  candidateDegree: "phd" | "doc";
  candidateNameSurname: string;
  defenseTitle: string;
  program: ProgramShort;
  scienceTeachers?: string[];
  defenseDate: string;
  address: string;
  message?: string;
  members?: Member[];
  placeholder?: string;
  //files: DefenseFile[];
  publicationDate: string;
}

// interface DefenseFile {
//   name: string;
//   link: string;
//   type: string;
// }

export interface Member {
  position: string;
  members: {
    nameSurname: string;
    title: string;
    toolTip: string;
  }[];
}
