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
import { CourseListResponse } from "./table/CourseTableComponents";
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
import { columns } from "./table/CourseTableComponents";
import { EditCourseModal } from "./modal/EditCourseModal";
import { AddCourseModal } from "./modal/AddCourseModal";
import { DeleteCourseModal } from "./modal/DeleteCourseModal";

export default function CourseListComponents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit per page
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);

  // Create params object for the hook
  const queryParams: PaginationParams = {
    search,
    page,
    limit,
  };

  // Listen for the custom event to open the edit modal
  useEffect(() => {
    const handleOpenEditModal = (e: CustomEvent<string>) => {
      const courseId = e.detail;
      setEditingCourseId(courseId);
      setIsEditModalOpen(true);
    };

    const handleOpenDeleteModal = (e: CustomEvent<string>) => {
      const courseId = e.detail;
      setDeletingCourseId(courseId);
      setIsDeleteModalOpen(true);
    };

    // Define custom properties on window with appropriate type assertion
    (
      window as Window &
        typeof globalThis & {
          handleOpenEditModal: (e: CustomEvent<string>) => void;
          handleOpenDeleteModal: (e: CustomEvent<string>) => void;
        }
    ).handleOpenEditModal = handleOpenEditModal;
    (
      window as Window &
        typeof globalThis & {
          handleOpenEditModal: (e: CustomEvent<string>) => void;
          handleOpenDeleteModal: (e: CustomEvent<string>) => void;
        }
    ).handleOpenDeleteModal = handleOpenDeleteModal;

    window.addEventListener(
      "openEditCourseModal",
      handleOpenEditModal as EventListener
    );
    window.addEventListener(
      "openDeleteCourseModal",
      handleOpenDeleteModal as EventListener
    );

    return () => {
      window.removeEventListener(
        "openEditCourseModal",
        handleOpenEditModal as EventListener
      );
      window.removeEventListener(
        "openDeleteCourseModal",
        handleOpenDeleteModal as EventListener
      );
    };
  }, []);

  // Fetch courses data from API using the useGetData hook
  const {
    data: coursesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetData<CourseListResponse>({
    endpoint: "/api/admin/courses/get",
    queryKeyBase: "courses",
    params: queryParams,
  });

  // Refetch when search changes
  useEffect(() => {
    setPage(1); // Reset to first page when search changes
  }, [search]);

  // Prepare table data
  const tableData = coursesData?.data || [];
  const totalCourses = coursesData?.total_count || 0;
  const totalPages = Math.ceil(totalCourses / limit);

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
    refetch(); // Refresh the courses list after successful edit
  };

  // Handle add success - refresh data
  const handleAddSuccess = () => {
    refetch(); // Refresh the courses list after successful add
  };

  // Handle delete success - refresh data
  const handleDeleteSuccess = () => {
    refetch(); // Refresh the courses list after successful delete
  };

  if (isError) {
    return (
      <div className="m-6 p-6 bg-dark-secondary rounded-xl border border-brand/30">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Courses
          </h2>
          <p className="text-white/70 mb-4">
            {(error as Error)?.message || "Failed to load courses"}
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
          <h1 className="text-2xl font-bold">Courses Management</h1>
          <p className="text-white/70">View and manage all gym courses</p>
        </div>
        <Button
          variant="default"
          className="bg-brand hover:bg-brand/90 text-black"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Course
        </Button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <div className="grow">
            <Input
              type="text"
              placeholder="Search courses (title, description, category)..."
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

      {/* Courses Table */}
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
                      ? `No courses found matching "${search}"`
                      : "No courses found"}
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
        Showing {totalCourses > 0 ? (page - 1) * limit + 1 : 0} -{" "}
        {Math.min(page * limit, totalCourses)} of {totalCourses} courses
      </div>

      {/* Edit Course Modal */}
      {editingCourseId && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          course_id={editingCourseId}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSuccess={handleAddSuccess}
      />

      {/* Delete Course Modal */}
      {deletingCourseId && (
        <DeleteCourseModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          courseId={deletingCourseId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
