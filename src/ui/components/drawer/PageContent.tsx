import React, { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

export const PageContent = ({ children }: PageContentProps) => {
  return <div>{children}</div>;
};
