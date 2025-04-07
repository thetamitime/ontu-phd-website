export interface Program {
  id: number;
  degree: string;
  name: string;
  nameCode?: string; //doc
  accredited: boolean;
  fieldOfStudy: FieldOfStudy;
  speciality: Speciality;
  form: string[];
  purpose?: string; //phd
  years?: number; //phd
  credits?: number; //phd
  programCharacteristics?: ProgramCharacteristics; //phd
  description?: string; //doc
  objects?: string; //doc
  directions?: string[]; //doc
  linkFaculty: string;
  linkFile: string;
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
  fieldCode: string;
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
  features: string[];
}
