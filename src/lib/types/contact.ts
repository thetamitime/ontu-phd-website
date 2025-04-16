import { ReactElement } from "react";

export interface Contact {
  icon: ReactElement;
  title: string;
  caption: string;
  href?: string;
}
