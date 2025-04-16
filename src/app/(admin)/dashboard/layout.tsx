"use client";

import { useState } from "react";
import Sidebar from "@/ui/dashboard/Sidebar";
import Navbar from "@/ui/dashboard/Navbar";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import ChangePasswordForm from "@/app/(admin)/dashboard/change-password-form";
import { Modal } from "@/ui/dashboard/Modal";
import { useAuth } from "@/lib/utils/AuthProvider";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { mustChangePassword } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
