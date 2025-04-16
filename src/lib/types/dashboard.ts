export interface Stats {
  programsCount: number;
  employeesCount: number;
  defensesCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface ProfilePicture {
  file: File | null;
}
