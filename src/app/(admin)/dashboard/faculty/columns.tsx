"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/ui/components/tables/SortableHeader";
import { Actions } from "@/ui/components/tables/Actions";
import { Employee } from "@/lib/types/employees";

type EmployeeColumn = Employee;

export const columns = (
  setSelectedFacultyId: (id: number) => void,
): ColumnDef<EmployeeColumn>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} title="ID" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Людина" />,
  },
  {
    accessorKey: "position",
    header: ({ column }) => <SortableHeader column={column} title="Позиція" />,
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
            setSelectedFacultyId(row.original.id);
          }}
          onDeleteAction={() => {
            //deleteNews(row.original.id);
            window.location.reload();
          }}
        />
      );
    },
  },
];
