import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/slices/authenticationSlice";
import { analyticsByQuiz } from "../../api/quizService";
import styles from "./Analytics.module.css";

function Analytics() {
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => selectUserData(state)?._id);

  useEffect(() => {
    setLoading(true);

    // IIFE (Immediately Invoked Function Expression)
    (async () => {
      try {
        if (userId) {
          const response = await analyticsByQuiz(userId);
        }
      } catch (error) {
        toast.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const tableConfigurationInfo = useReactTable({
    response,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const createTable = (
    <>
      <table>
        <thead>
          {tableConfigurationInfogetHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {tableConfigurationInfogetRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <div>
        <button onClick={() => tableConfigurationInfosetPageIndex(0)}>
          First page
        </button>
        <button
          disabled={!tableConfigurationInfogetCanPreviousPage()}
          onClick={() => tableConfigurationInfopreviousPage()}
        >
          Previous page
        </button>
        <button
          disabled={!tableConfigurationInfogetCanNextPage()}
          onClick={() => tableConfigurationInfonextPage()}
        >
          Next page
        </button>
        <button
          onClick={() =>
            tableConfigurationInfosetPageIndex(
              tableConfigurationInfogetPageCount() - 1
            )
          }
        >
          Last page
        </button>
      </div>
    </>
  );

  return loading ? "Loading..." : <section>{createTable}</section>;
}

export default Analytics;
