"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteData } from "@/hooks/use-Fetch";
import { Course } from "@/types/course";
import { toast } from "sonner";

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  onDeleteSuccess: () => void;
}

export const DeleteCourseModal = ({ 
  isOpen, 
  onClose, 
  courseId, 
  onDeleteSuccess 
}: DeleteCourseModalProps) => {
  const { mutate: deleteCourse, isPending } = useDeleteData(
    "/api/admin/courses/delete",
    "courses"
  );

  const handleDelete = () => {
    deleteCourse(courseId, {
      onSuccess: () => {
        toast.success("Course deleted successfully");
        onDeleteSuccess();
        onClose();
      },
      onError: (error) => {
        toast.error("Failed to delete course", {
          description: error.message || "An error occurred while deleting the course"
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-secondary border border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Delete Course</DialogTitle>
          <DialogDescription className="text-white/70">
            Are you sure you want to delete this course? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? "Deleting..." : "Delete Course"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};