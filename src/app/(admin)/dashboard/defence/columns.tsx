"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/ui/components/tables/SortableHeader";
import { Actions } from "@/ui/components/tables/Actions";
import { DefenseEvent } from "@/lib/types/defences";
import { deleteDefence } from "@/lib/api/defence";

type DefenseColumn = DefenseEvent;

export const columns = (
  setSelectedDefenceId: (id: number) => void,
): ColumnDef<DefenseColumn>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="ID" />,
  },
  {
    accessorKey: "defenseTitle",
    header: ({ column }) => (
      <SortableHeader column={column} title="Назва дисертації" />
    ),
  },
  {
    accessorKey: "candidateNameSurname",
    header: ({ column }) => (
      <SortableHeader column={column} title="Кандидат наук" />
    ),
  },
  {
    accessorKey: "candidateDegree",
    header: ({ column }) => (
      <SortableHeader column={column} title="Ступінь освіти" />
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
            setSelectedDefenceId(row.original.id);
          }}
          onDeleteAction={() => {
            deleteDefence(row.original.id);
            window.location.reload();
          }}
        />
      );
    },
  },
];
