import { getAllPrograms } from "@/lib/api/programs";
import { columns } from "@/app/dashboard/programs/columns";
import { DataTable } from "@/ui/components/tables/DataTable";
import { PlusCircleIcon } from "lucide-react";
import Drawer from "@/ui/components/drawer/Drawer";
import { SidebarContent } from "@/ui/components/drawer/SidebarContent";
import { PageContent } from "@/ui/components/drawer/PageContent";

export default async function ProgramsPage() {
  const programs = await getAllPrograms();

  console.log(programs);
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
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Програми</h2>
            <button className="btn">
              <PlusCircleIcon size={16} />
              Створити нову програму
            </button>
          </div>
        </div>
      </SidebarContent>
    </Drawer>
  );
}
