"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProgramDegree } from "@/lib/types/programs";
import { SortableHeader } from "@/ui/components/tables/SortableHeader";
import { ProgramActions } from "@/ui/components/tables/Actions";
import { deleteProgram } from "@/lib/api/programs";
import { useMutation } from "@tanstack/react-query";

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
        <ProgramActions
          program={row.original}
          onEditAction={() => {
            const drawerCheckbox = document.getElementById("my-drawer");
            if (drawerCheckbox) {
              (drawerCheckbox as HTMLInputElement).checked = true;
            }
            // Call the setSelectedProgramId function passed from the parent
            setSelectedProgramId(row.original.id);
          }}
          onDeleteAction={(id) => {
            const { mutateAsync: deleteMutation } = useMutation({
              mutationFn: deleteProgram,
              onSuccess: () => {
                alert("Програму успішно видалено!");
                // Optionally trigger a table refresh or state update here
              },
              onError: (err: Error) => {
                alert("Помилка при видаленні програми: " + err.message);
              },
            });

            deleteMutation(id);
          }}
        />
      );
    },
  },
];
