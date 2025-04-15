"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/ui/dashboard/Sidebar";
import Navbar from "@/ui/dashboard/Navbar";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import ChangePasswordForm from "@/app/(admin)/dashboard/change-password-form";
import { Modal } from "@/ui/dashboard/Modal";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mustChangePassword, setMustChangePassword] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const mustChangeCookie = cookies.find((c) =>
      c.startsWith("mustChangePassword="),
    );
    if (mustChangeCookie) {
      const value = mustChangeCookie.split("=")[1];
      setMustChangePassword(value === "true");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {mustChangePassword && (
          <Modal label="Обов'язкова зміна паролю">
            <ChangePasswordForm />
          </Modal>
        )}

        <div
          className={`${
            !isSidebarOpen ? "row-start-2" : "col-start-2"
          } 2xl:bg-base-200 px-10 py-8`}
        >
          {children}
        </div>
      </div>
    </QueryClientProvider>
  );
}
