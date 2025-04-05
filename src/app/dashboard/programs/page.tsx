import { getAllPrograms } from "@/lib/api/programs";
import { columns } from "@/app/dashboard/programs/columns";
import { DataTable } from "@/ui/components/tables/DataTable";
import { PlusCircleIcon, X } from "lucide-react";
import { Drawer } from "@/ui/components/drawer/Drawer";
import { SidebarContent } from "@/ui/components/drawer/SidebarContent";
import { PageContent } from "@/ui/components/drawer/PageContent";
import ProgramForm from "@/app/dashboard/programs/form";

export default async function ProgramsPage() {
  const programs = await getAllPrograms();

  return (
    <Drawer>
      <PageContent>
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Програми</h2>
            <button className="btn">
              <PlusCircleIcon size={16} />
              Створити нову програму
            </button>
          </div>
          <DataTable columns={columns} data={programs} />
        </div>
      </PageContent>
      <SidebarContent>
        <label htmlFor="my-drawer" className="cursor-pointer">
          <X />
        </label>
        <ProgramForm program={undefined} />
        <div className="mt-6 flex justify-end gap-4">
          <button className="btn">Відмінити</button>
          <button className="btn btn-soft btn-primary">Зберегти зміни</button>
        </div>
      </SidebarContent>
    </Drawer>
  );
}
