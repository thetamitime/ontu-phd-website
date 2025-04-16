"use client";

import React from "react";
import { Table } from "@tanstack/react-table";

interface PaginationProps<T> {
  table: Table<T>;
}

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  return (
    <div className="join">
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          className={`join-item btn ${i === currentPage ? "btn-active" : ""}`}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
