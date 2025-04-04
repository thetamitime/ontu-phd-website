import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  title: string;
}

export const SortableHeader = <TData,>({
  column,
  title,
}: SortableHeaderProps<TData>) => (
  <button
    className="flex items-center gap-2"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <ArrowUpDown size={16} />
  </button>
);
