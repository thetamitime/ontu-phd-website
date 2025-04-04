import React, { ReactNode } from "react";
import { PageContent } from "@/ui/components/drawer/PageContent";
import { SidebarContent } from "@/ui/components/drawer/SidebarContent";

interface DrawerProps {
  children: ReactNode; // Accepts any valid React child elements
}

const Drawer = ({ children }: DrawerProps) => {
  const pageContent = React.Children.toArray(children).find(
    (child: ReactNode) =>
      React.isValidElement(child) && child.type === PageContent,
  );

  const sidebarContent = React.Children.toArray(children).find(
    (child: ReactNode) =>
      React.isValidElement(child) && child.type === SidebarContent,
  );

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Render the PageContent inside the drawer */}
        {pageContent}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Render the SidebarContent inside the sidebar */}
          {sidebarContent}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
