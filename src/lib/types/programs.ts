export interface FieldOfStudy {
  code: string;
  name: string;
}

export interface Speciality {
  code: string;
  name: string;
}

interface ShortSpeciality extends Speciality {
  fieldCode: string;
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

export interface Program {
  id: number;
  degree: string;
  name: string;
  nameCode?: string;
  fieldOfStudy: FieldOfStudy;
  speciality: Speciality;
  shortSpeciality?: ShortSpeciality;
  form: string[];
  purpose?: string;
  years?: number;
  credits?: number;
  programCharacteristics?: ProgramCharacteristics;
  description?: string;
  programObjects: string;
  directions: string[];
  linkFaculty: string;
  linkFile: string;
}

export type Programs = Program[];
