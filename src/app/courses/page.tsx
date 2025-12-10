"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCategorySection from "@/components/courses/CourseCategorySection";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  created_at: string;
  video_embed_url: string;
}

interface GroupedCourses {
  [category: string]: Course[];
}

const CoursesPage = () => {
  const [groupedCourses, setGroupedCourses] = useState<GroupedCourses>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch courses data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/courses/get?groupByCategory=true");
        
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        
        const data = await response.json();
        if (data.success) {
          setGroupedCourses(data.data);
          // Extract categories from the grouped data
          const allCategories = Object.keys(data.data);
          setCategories(allCategories);
        } else {
          throw new Error(data.message || "Failed to fetch courses");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === "all" 
    ? groupedCourses 
    : { [selectedCategory]: groupedCourses[selectedCategory] || [] };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-white">
        <Navbar />
        <main className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Courses</h1>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-dark text-white">
        <Navbar />
        <main className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Courses</h1>
            <div className="bg-[#1a1a1a] rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-red-500 mb-4">Error Loading Courses</h2>
              <p className="text-white/70 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-brand hover:bg-brand-hover text-black font-bold py-2 px-6 rounded transition duration-300"
              >
                Retry
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
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Courses</h1>
          <p className="text-center text-white/70 mb-12">Explore our collection of fitness and wellness courses</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              className={`px-4 py-2 rounded-full transition duration-300 ${
                selectedCategory === "all"
                  ? "bg-brand text-black"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              All Courses
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  selectedCategory === category
                    ? "bg-brand text-black"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Sections */}
          {Object.entries(filteredCourses).map(([category, courses]) => (
            <CourseCategorySection
              key={category}
              category={category}
              courses={courses}
            />
          ))}

          {Object.keys(filteredCourses).length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl text-white/70">No courses found</h3>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;