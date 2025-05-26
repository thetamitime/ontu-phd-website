"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/lib/api/news";
import { Drawer, PageContent, SidebarContent } from "@/ui/components";
import { PlusCircleIcon, X } from "lucide-react";
import { Modal } from "@/ui/dashboard/Modal";
import { DataTable } from "@/ui/components/tables/DataTable";
import { columns } from "@/app/(admin)/dashboard/news/columns";
import NewsForm from "@/app/(admin)/dashboard/news/form";

export default function NewsPage() {
  const [selectedNewsId, setSelectedNewsId] = useState<number>();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data: news } = useQuery({
    queryKey: ["news"],
    queryFn: getAllNews,
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
            <Modal label={"Створити нову програму"} onClose={closeModal}>
              <NewsForm />
            </Modal>
          )}
          <DataTable columns={columns(setSelectedNewsId)} data={news ?? []} />
        </div>
      </PageContent>
      <SidebarContent>
        <label htmlFor="my-drawer" className="cursor-pointer">
          <X />
        </label>
        <NewsForm key={selectedNewsId} newsId={selectedNewsId || 0} />
      </SidebarContent>
    </Drawer>
  );
}
