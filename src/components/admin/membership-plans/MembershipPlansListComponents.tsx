"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetData } from "@/hooks/use-Fetch";
import { PaginationParams } from "@/types/queryTypes";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { columns } from "./table/MembershipPlansTableComponent";
import { EditMembershipModal } from "./modal/EditMembershipModal";
import { AddMembershipModal } from "./modal/AddMembershipModal";

// Define the type matching the API response
interface MembershipPlanRow {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration_day: number;
  created_at: string;
}

export default function MembershipPlansListComponents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit per page
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Create params object for the hook
  const queryParams: PaginationParams = {
    search,
    page,
    limit,
  };

  // Listen for the custom event to open the edit modal
  useEffect(() => {
    const handleOpenEditModal = (e: CustomEvent) => {
      const planId = e.detail as number;
      setEditingPlanId(planId);
      setIsEditModalOpen(true);
    };

    window.addEventListener(
      "openEditMembershipPlanModal",
      handleOpenEditModal as EventListener
    );

    return () => {
      window.removeEventListener(
        "openEditMembershipPlanModal",
        handleOpenEditModal as EventListener
      );
    };
  }, []);

  // Fetch membership plans data from API using the useGetData hook
  const {
    data: plansData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetData<MembershipPlanRow>({
    endpoint: "/api/admin/membership-plan/get",
    queryKeyBase: "membership-plans",
    params: queryParams,
  });

  // Refetch when search changes
  useEffect(() => {
    setPage(1); // Reset to first page when search changes
  }, [search]);

  // Prepare table data
  const tableData = plansData?.data || [];
  const totalPlans = plansData?.total_count || 0;
  const totalPages = Math.ceil(totalPlans / limit);

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    pageCount: totalPages,
    manualPagination: true, // Since we're managing pagination manually
    onPaginationChange: () => {}, // We'll handle pagination separately
  });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const totalPages = plansData ? Math.ceil(plansData.total_count / limit) : 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  // Handle edit success - refresh data
  const handleEditSuccess = () => {
    refetch(); // Refresh the membership plans list after successful edit
  };

  if (isError) {
    return (
      <div className="m-6 p-6 bg-dark-secondary rounded-xl border border-brand/30">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Membership Plans
          </h2>
          <p className="text-white/70 mb-4">
            {(error as Error)?.message || "Failed to load membership plans"}
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-brand hover:bg-brand/90 text-black"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-6 p-6 bg-dark-secondary rounded-xl border border-brand/30">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Membership Plans Management</h1>
          <p className="text-white/70">
            View and manage all gym membership plans
          </p>
        </div>
        <Button
          variant="default"
          className="bg-brand hover:bg-brand/90 text-black"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Plan
        </Button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <div className="grow">
            <Input
              type="text"
              placeholder="Search plans (name or description)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black/30 border border-white/20 focus:border-brand focus:ring-brand/30"
            />
          </div>
          <Button
            type="submit"
            className="bg-brand hover:bg-brand/90 text-black"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Membership Plans Table */}
      <div className="rounded-lg border border-white/20">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent border-b border-white/20"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-white/70">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="border-b border-white/10">
                    <TableCell>
                      <Skeleton className="h-4 w-16 bg-white/20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32 bg-white/20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40 bg-white/20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 bg-white/20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-28 bg-white/20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-28 bg-white/20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 bg-white/20" />
                    </TableCell>
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-white/10 hover:bg-white/5"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {search
                      ? `No plans found matching "${search}"`
                      : "No membership plans found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) handlePageChange(page - 1);
                  }}
                  className={`${
                    page <= 1 ? "opacity-50 pointer-events-none" : ""
                  } text-white hover:text-brand`}
                />
              </PaginationItem>

              {/* Page numbers */}
              {Array.from(
                {
                  length: Math.min(5, totalPages),
                },
                (_, i) => {
                  let pageNum: number;

                  if (totalPages <= 5) {
                    // If total pages <= 5, show all pages
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    // If current page is in first 3, show 1-5
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    // If current page is in last 3, show last 5
                    pageNum = totalPages - 4 + i;
                  } else {
                    // Otherwise, show 2 before and 2 after current page
                    pageNum = page - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNum);
                        }}
                        isActive={page === pageNum}
                        className={`${
                          page === pageNum
                            ? "bg-brand text-black"
                            : "text-white hover:bg-brand/20"
                        }`}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) handlePageChange(page + 1);
                  }}
                  className={`${
                    page >= totalPages ? "opacity-50 pointer-events-none" : ""
                  } text-white hover:text-brand`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Results Info */}
      <div className="mt-4 text-sm text-white/70">
        Showing {totalPlans > 0 ? (page - 1) * limit + 1 : 0} -{" "}
        {Math.min(page * limit, totalPlans)} of {totalPlans} plans
      </div>

      {/* Edit Membership Plan Modal */}
      {editingPlanId !== null && (
        <EditMembershipModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          membershipPlanId={editingPlanId}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {/* Add Membership Plan Modal */}
      <AddMembershipModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSuccess={handleEditSuccess} // Using same handler to refresh data
      />
    </div>
  );
}
