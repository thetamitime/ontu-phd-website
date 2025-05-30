"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Drawer, PageContent, SidebarContent } from "@/ui/components";
import { PlusCircleIcon, X } from "lucide-react";
import { Modal } from "@/ui/dashboard/Modal";
import { DataTable } from "@/ui/components/tables/DataTable";
import { columns } from "@/app/(admin)/dashboard/faculty/columns";
import { getAllEmployees } from "@/lib/api/employees";

export default function FacultyPage() {
  const [selectedPageId, setSelectedPageId] = useState<number>();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data: faculty } = useQuery({
    queryKey: ["faculty"],
    queryFn: getAllEmployees,
  });

  return (
    <Drawer>
      <PageContent>
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Новини</h2>
            <button className="btn" onClick={openModal}>
              <PlusCircleIcon size={16} />
              Додати нову новину
            </button>
          </div>
          {isModalOpen && (
            <Modal label={"Додати нову людину"} onClose={closeModal}>
              {/*<FacultyForm />*/}
              <div> test </div>
            </Modal>
          )}
          <DataTable
            columns={columns(setSelectedPageId)}
            data={faculty ?? []}
          />
        </div>
      </PageContent>
      <SidebarContent>
        <label htmlFor="my-drawer" className="cursor-pointer">
          <X />
        </label>
        {/*<FacultyForm key={selectedPageId} newsId={selectedPageId || 0} />*/}
      </SidebarContent>
    </Drawer>
  );
}
