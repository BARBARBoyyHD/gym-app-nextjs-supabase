import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  created_at: string;
  video_embed_url: string;
}

interface CourseCategorySectionProps {
  category: string;
  courses: Course[];
}

const CourseCategorySection = ({
  category,
  courses,
}: CourseCategorySectionProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="text-brand">{category}</span> Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseCategorySection;
