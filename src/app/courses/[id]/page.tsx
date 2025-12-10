"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/courses/VideoEmbed";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  created_at: string;
  video_embed_url: string;
}

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/get/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        
        const data = await response.json();
        if (data.success) {
          setCourse(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch course");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-white">
        <Navbar />
        <main className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background-dark text-white">
        <Navbar />
        <main className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-red-500 mb-4">Error Loading Course</h2>
              <p className="text-white/70 mb-6">{error || "Course not found"}</p>
              <button 
                onClick={() => window.location.href = "/courses"}
                className="bg-brand hover:bg-brand-hover text-black font-bold py-2 px-6 rounded transition duration-300"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-white">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
            {/* Video Embed Section */}
            <div className="mb-8">
              {course.video_embed_url ? (
                <VideoEmbed 
                  videoUrl={course.video_embed_url} 
                  title={course.title} 
                  height="500px"
                />
              ) : (
                <div className="bg-gray-800 aspect-video flex items-center justify-center">
                  <span className="text-gray-400">No video available</span>
                </div>
              )}
            </div>
            
            {/* Course Information */}
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                <span className="bg-brand text-black text-sm font-bold px-3 py-1 rounded">
                  {course.category}
                </span>
              </div>
              
              <p className="text-white/70 text-lg mb-6">{course.description}</p>
              
              <div className="flex items-center text-sm text-gray-400">
                <span>Added: {new Date(course.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;