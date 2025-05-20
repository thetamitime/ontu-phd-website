"use client";

import { Drawer, PageContent, SidebarContent } from "@/ui/components";
import { PlusCircleIcon, X } from "lucide-react";
import { Modal } from "@/ui/dashboard/Modal";
import { DataTable } from "@/ui/components/tables/DataTable";
import { columns } from "@/app/(admin)/dashboard/defence/columns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllDefences } from "@/lib/api/defence";
import DefenceForm from "@/app/(admin)/dashboard/defence/form";

export default function DefencePage() {
  const [selectedDefenseId, setSelectedDefenseId] = useState<number>();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data: defences } = useQuery({
    queryKey: ["defences"],
    queryFn: getAllDefences,
  });

  return (
    <Drawer>
      <PageContent>
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Дисертації</h2>
            <button className="btn" onClick={openModal}>
              <PlusCircleIcon size={16} />
              Додати новий захист
            </button>
          </div>
          {isModalOpen && (
            <Modal label={"Створити нову програму"} onClose={closeModal}>
              <DefenceForm />
            </Modal>
          )}
          <DataTable
            columns={columns(setSelectedDefenseId)}
            data={defences ?? []}
          />
        </div>
      </PageContent>
      <SidebarContent>
        <label htmlFor="my-drawer" className="cursor-pointer">
          <X />
        </label>
        <DefenceForm
          key={selectedDefenseId}
          defenceId={selectedDefenseId || 0}
        />
      </SidebarContent>
    </Drawer>
  );
}
