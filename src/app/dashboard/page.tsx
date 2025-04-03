import { NotebookTabs } from "lucide-react";
import { TodoList } from "@/ui/dashboard/TodoList";
import { LogList } from "@/ui/dashboard/LogList";

export default function DashboardPage() {
  return (
    <div className="grid h-full grid-cols-[1.6fr_1fr] grid-rows-[auto_1fr] gap-5">
      <div className="flex gap-5">
        <div className="stats border-base-300 bg-base-100 w-full border">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <NotebookTabs />
            </div>
            <div className="stat-title">Програми</div>
            <div className="stat-value">12</div>
          </div>
        </div>
        <div className="stats border-base-300 bg-base-100 w-full border">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <NotebookTabs />
            </div>
            <div className="stat-title">Співробітники</div>
            <div className="stat-value">5</div>
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
            <div className="stat-value">12</div>
          </div>
        </div>
      </div>
      <TodoList className="row-span-2 self-start" />
      <LogList />
    </div>
  );
}
