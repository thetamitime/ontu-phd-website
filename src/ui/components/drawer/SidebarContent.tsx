import React, { ReactNode } from "react";

interface SidebarContentProps {
  children: ReactNode;
}

export const SidebarContent = ({ children }: SidebarContentProps) => {
  return <div>{children}</div>;
};
