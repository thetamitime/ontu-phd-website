import React, { ReactNode } from "react";
import { PageContent } from "@/ui/components/drawer/PageContent";
import { SidebarContent } from "@/ui/components/drawer/SidebarContent";

interface DrawerProps {
  children: ReactNode; // Accepts any valid React child elements
}

export const Drawer = ({ children }: DrawerProps) => {
  const pageContent = React.Children.toArray(children).find(
    (child: ReactNode) =>
      React.isValidElement(child) && child.type === PageContent,
  );

  const sidebarContent = React.Children.toArray(children).find(
    (child: ReactNode) =>
      React.isValidElement(child) && child.type === SidebarContent,
  );

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* render the PageContent inside the drawer */}
        {pageContent}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-200 text-base-content flex min-h-full w-[40%] flex-col gap-4 p-8">
          {/* render the SidebarContent inside the sidebar */}
          {sidebarContent}
        </div>
      </div>
    </div>
  );
};
