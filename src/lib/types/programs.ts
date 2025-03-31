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

export interface ProgramCompetence {
  overallCompetence: string[];
  specialCompetence: string[];
  integralCompetence: string;
}

export interface Component {
  id: number;
  programId: number;
  componentType: string;
  componentName: string;
  componentCredits: number;
  componentHours: number;
  controlForm: string[];
}

export interface Job {
  id: number;
  code: string;
  title: string;
}

export interface Program {
  id: number;
  degree: string;
  name: string;
  nameEng: string;
  fieldOfStudy: FieldOfStudy;
  speciality: Speciality;
  form: string[];
  purpose: string;
  years: number;
  credits: number;
  sum: number;
  costs: number[];
  programCharacteristics: ProgramCharacteristics;
  programCompetence: ProgramCompetence;
  results: string[];
  linkFaculty: string;
  linkFile: string;
  components: Component[];
  jobs: Job[];
}

export type Programs = Program[];
