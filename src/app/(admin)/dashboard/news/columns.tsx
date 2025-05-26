"use client";

import { ColumnDef } from "@tanstack/react-table";
import { News } from "@/lib/types/news";
import { deleteNews } from "@/lib/api/news";
import { SortableHeader } from "@/ui/components/tables/SortableHeader";
import { Actions } from "@/ui/components/tables/Actions";

type NewsColumn = News;

export const columns = (
  setSelectedNewsId: (id: number) => void,
): ColumnDef<NewsColumn>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="ID" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column} title="Новина" />,
  },
  {
    accessorKey: "mainTag",
    header: ({ column }) => (
      <SortableHeader column={column} title="Головний тег" />
    ),
  },
  {
    id: "actions",
    header: "Дії",
    cell: ({ row }) => {
      return (
        <Actions
          data={row.original}
          onEditAction={() => {
            const drawerCheckbox = document.getElementById("my-drawer");
            if (drawerCheckbox) {
              (drawerCheckbox as HTMLInputElement).checked = true;
            }
            setSelectedNewsId(row.original.id);
          }}
          onDeleteAction={() => {
            deleteNews(row.original.id);
            window.location.reload();
          }}
        />
      );
    },
  },
];
