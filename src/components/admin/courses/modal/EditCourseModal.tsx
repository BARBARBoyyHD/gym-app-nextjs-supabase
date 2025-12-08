"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetSingleData, useUpdateData } from "@/hooks/use-Fetch";
import { updateCourseSchema } from "@/lib/validation/coursesValidate";
import { Course } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course_id: string;
  onEditSuccess: () => void;
}

const EditCourseModal = ({ isOpen, onClose, course_id, onEditSuccess }: EditCourseModalProps) => {
  const { data: course, isError } = useGetSingleData<Course>(
    course_id,
    "/api/admin/courses/get",
    `course-${course_id}`
  );

  const { mutate: updateCourse, isPending } = useUpdateData<Course>(
    "/api/admin/courses/put",
    "courses"
  );

  const form = useForm<z.infer<typeof updateCourseSchema>>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      video_embed_url: "",
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        video_embed_url: course.video_embed_url || "",
      });
    }
  }, [course, form]);

  if (isError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-dark-secondary border border-white/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Edit Course</DialogTitle>
          </DialogHeader>
          <div className="text-white/70">
            Error loading course data
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const onSubmit = async (values: z.infer<typeof updateCourseSchema>) => {
    updateCourse(
      {
        id: course_id,
        updates: {
          ...values,
          video_embed_url: values.video_embed_url || null, // Convert empty string to null
        }
      },
      {
        onSuccess: () => {
          toast.success("Course updated successfully");
          onEditSuccess();
          onClose();
        },
        onError: (error) => {
          toast.error("Failed to update course", {
            description: error.message || "An error occurred while updating the course"
          });
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-secondary border border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Edit Course</DialogTitle>
          <DialogDescription className="text-white/70">
            Update the details below to modify the course.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter course title" 
                      {...field} 
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter course description" 
                      {...field} 
                      className="bg-black/30 border-white/20 text-white min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Category</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter course category" 
                      {...field} 
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="video_embed_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Video Embed URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter video embed URL (optional)" 
                      {...field} 
                      className="bg-black/30 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-white/20 text-white hover:bg-white/10"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-brand hover:bg-brand/90 text-black"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update Course"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { EditCourseModal };