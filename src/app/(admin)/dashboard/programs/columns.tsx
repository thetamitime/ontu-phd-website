"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProgramDegree } from "@/lib/types/programs";
import { SortableHeader } from "@/ui/components/tables/SortableHeader";
import { Actions } from "@/ui/components/tables/Actions";
import { deleteDefence } from "@/lib/api/defence";
import { deleteProgram } from "@/lib/api/programs";

type ProgramsColumn = ProgramDegree;

export const columns = (
  setSelectedProgramId: (id: number) => void,
): ColumnDef<ProgramsColumn>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="ID" />,
  },
  {
    accessorKey: "degree",
    header: ({ column }) => <SortableHeader column={column} title="Ступінь" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} title="Назва програми" />
    ),
  },
  {
    accessorKey: "fieldOfStudy",
    accessorFn: (row) => row.fieldOfStudy.name,
    header: ({ column }) => (
      <SortableHeader column={column} title="Галузь знань" />
    ),
    cell: ({ row }) => row.original.fieldOfStudy.name,
  },
  {
    accessorKey: "speciality",
    accessorFn: (row) => row.speciality.name,
    header: ({ column }) => (
      <SortableHeader column={column} title="Спеціальність" />
    ),
    cell: ({ row }) => row.original.speciality.name,
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
            // Call the setSelectedProgramId function passed from the parent
            setSelectedProgramId(row.original.id);
          }}
          onDeleteAction={() => {
            deleteProgram(row.original.id);
            window.location.reload();
          }}
        />
      );
    },
  },
];
