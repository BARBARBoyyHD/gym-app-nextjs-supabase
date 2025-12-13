"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// Define the specific fields returned by the courses API get endpoint
export interface CourseListResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  video_embed_url?: string;
  created_at: string;
}

export const columns: ColumnDef<CourseListResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const idString = typeof id === "string" ? id : String(id);
      return (
        <div className="font-medium text-white">
          {idString.substring(0, 8)}...
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-white">{row.getValue("title") as string}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      // Truncate description if too long
      const truncated =
        description.length > 50
          ? description.substring(0, 50) + "..."
          : description;
      return <div className="text-white">{truncated}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white/70 hover:text-white"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-white">{row.getValue("category") as string}</div>
      );
    },
  },
  {
    accessorKey: "video_embed_url",
    header: "Video",
    cell: ({ row }) => {
      const videoEmbedUrl = row.getValue("video_embed_url") as string;
      return (
        <div className="text-white">
          {videoEmbedUrl ? (
            <a
              href={videoEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View Video
            </a>
          ) : (
            "No video"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAtValue = row.getValue("created_at");
      const dateStr =
        typeof createdAtValue === "string"
          ? createdAtValue
          : String(createdAtValue);
      const date = new Date(dateStr);
      return (
        <div className="text-white">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(course.id)}
            >
              Copy Course ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("openEditCourseModal", { detail: course.id })
                )
              }
            >
              Edit Course
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("openDeleteCourseModal", {
                    detail: course.id,
                  })
                )
              }
            >
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
