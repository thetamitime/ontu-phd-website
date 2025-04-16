"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { DefenseEvent } from "@/lib/types/defences";
import React, { useEffect } from "react";
import { DefenceCard } from "@/ui/components";
import { Pagination } from "@/ui/components/Pagination";

type CardRow = DefenseEvent & { degree: string };

export const DefenceCardsTable = ({ data }: { data: CardRow[] }) => {
  const columns: ColumnDef<CardRow>[] = [
    {
      accessorKey: "defenceCard",
      cell: ({ row }) => <DefenceCard {...row.original} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  const pageIndex = table.getState().pagination.pageIndex;

  // after changing page - move view up
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pageIndex]);

  return (
    <div className="flex w-full flex-col items-end justify-center">
      <Pagination table={table} />

      <div className="w-full">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Pagination table={table} />
    </div>
  );
};

export default DefenceCardsTable;
