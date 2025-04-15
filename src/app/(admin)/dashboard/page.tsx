"use client";

import { NotebookTabs } from "lucide-react";
import { TodoList } from "@/ui/dashboard/TodoList";
import { LogList } from "@/ui/dashboard/LogList";
import { useAuth } from "@/lib/utils/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import NewAdminForm from "@/app/(admin)/dashboard/add-admin-form";

export default function DashboardPage() {
  const { getStats, isAuthenticated } = useAuth();

  console.log("Logged in:", isAuthenticated);
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => await getStats(),
    enabled: isAuthenticated,
  });

  return (
    <div className="grid h-full grid-cols-[1fr_0.4fr] grid-rows-[auto_1fr] gap-5">
      <div className="flex gap-5">
        <div className="stats border-base-300 bg-base-100 w-full border">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <NotebookTabs />
            </div>
            <div className="stat-title">Програми</div>
            <div className="stat-value">
              {stats ? stats.programsCount : null}
            </div>
          </div>
        </div>
        <div className="stats border-base-300 bg-base-100 w-full border">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <NotebookTabs />
            </div>
            <div className="stat-title">Співробітники</div>
            <div className="stat-value">
              {stats ? stats.employeesCount : null}
            </div>
          </div>
        </div>
        <div className="stats border-base-300 bg-base-100 w-full border">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <NotebookTabs />
            </div>
            <div className="stat-title">Документи</div>
            <div className="stat-value">24</div>
          </div>
        </div>
        <div className="stats border-base-300 bg-base-100 w-full border">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <NotebookTabs />
            </div>
            <div className="stat-title">Дисертації</div>
            <div className="stat-value">
              {stats ? stats.defensesCount : null}
            </div>
          </div>
        </div>
      </div>
      <NewAdminForm className="row-span-2 self-start" />
      <LogList />
    </div>
  );
}
