export interface Program {
  id: number;
  degree: "phd" | "doc";
  name: string;
  // nameCode?: string; //doc
  accredited: boolean;
  fieldOfStudy: FieldOfStudy;
  speciality: Speciality;
  form: string[];
  purpose?: string; //phd
  years?: number; //phd
  credits?: number; //phd
  programCharacteristics?: ProgramCharacteristics; //phd
  descriptions?: string; //doc
  objects?: string; //doc
  directions?: string[]; //doc
  linkFaculty: string;
  //programDocumentId: File;
}

export type ProgramField = Pick<Program, "id" | "degree" | "fieldOfStudy">;

export type ProgramDegree = Pick<
  Program,
  "id" | "degree" | "name" | "fieldOfStudy" | "speciality"
>;

interface FieldOfStudy {
  code: string;
  name: string;
}

export interface Speciality {
  code: string;
  name: string;
}

interface ProgramCharacteristicsArea {
  object: string;
  aim: string;
  theory: string;
  methods: string;
  instruments: string;
}

export interface ProgramCharacteristics {
  area: ProgramCharacteristicsArea;
  focus: string;
  features: string;
}
