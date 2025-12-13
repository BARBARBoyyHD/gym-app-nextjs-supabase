"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePostData } from "@/hooks/use-Fetch";
import { courseSchema } from "@/lib/validation/coursesValidate";
import { Course, CourseInput } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

const AddCourseModal = ({ isOpen, onClose, onAddSuccess }: AddCourseModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
     video_embed_url: "",
    },
  });

  const { mutate: addCourse } = usePostData<CourseInput>(
    "/api/admin/courses/post",
    "courses"
  );

  const onSubmit = async (values: z.infer<typeof courseSchema>) => {
    setIsSubmitting(true);
    
    addCourse(
      {
        ...values,
       video_embed_url: values.video_embed_url , // Convert empty string to null
      },
      {
        onSuccess: () => {
          toast.success("Course added successfully");
          form.reset();
          onAddSuccess();
          onClose();
        },
        onError: (error) => {
          toast.error("Failed to add course", {
            description: error.message || "An error occurred while adding the course"
          });
        },
        onSettled: () => {
          setIsSubmitting(false);
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-secondary border border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New Course</DialogTitle>
          <DialogDescription className="text-white/70">
            Fill in the details below to create a new course.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title *</FormLabel>
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
                  <FormLabel className="text-white">Description *</FormLabel>
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
                  <FormLabel className="text-white">Category *</FormLabel>
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
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-brand hover:bg-brand/90 text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Course"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { AddCourseModal };