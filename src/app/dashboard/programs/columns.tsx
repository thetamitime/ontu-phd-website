"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProgramDegree } from "@/lib/types/programs";
import { SortableHeader } from "@/ui/components/tables/SortableHeader";
import { ProgramActions } from "@/ui/components/tables/Actions";

type ProgramsColumn = ProgramDegree;

export const columns: ColumnDef<ProgramsColumn>[] = [
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
    cell: ({ row }) => (
      <ProgramActions
        program={row.original}
        onEditAction={(id) => console.log("Edit", id)}
        onDeleteAction={(id) => console.log("Delete", id)}
      />
    ),
  },
];
