export interface Program {
  id: number;
  degree: string;
  name: string;
  nameCode?: string;
  accredited: boolean;
  fieldOfStudy: FieldOfStudy;
  speciality: Speciality;
  form: string[];
  purpose?: string;
  years?: number;
  credits?: number;
  programCharacteristics?: ProgramCharacteristics;
  description?: string;
  objects?: string;
  directions?: string[];
  linkFaculty: string;
  linkFile: string;
}

export type ProgramField = Pick<Program, "id" | "degree" | "fieldOfStudy">;

export type ProgramDegree = Pick<
  Program,
  "id" | "degree" | "name" | "fieldOfStudy" | "speciality"
>;

export interface FieldOfStudy {
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
  features: string[];
}
