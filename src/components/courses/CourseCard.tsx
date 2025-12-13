import VideoEmbed from "@/components/courses/VideoEmbed";
import { convertYouTubeUrl } from "@/utils/youtube";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  video_embed_url: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="block transform transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full" style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}>
          {course.video_embed_url ? (
            <div className="absolute inset-0">
              <VideoEmbed
                videoUrl={course.video_embed_url}
                title={course.title}
                width="100%"
                height="100%"
              />
              {/* Play button overlay if there's a video to play */}
              {course.video_embed_url && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center hover:bg-opacity-90 transition-all">
                    <svg
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No Video Available</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white mb-2">
              {course.title}
            </h3>
            <span className="bg-brand text-black text-xs font-bold px-2 py-1 rounded">
              {course.category}
            </span>
          </div>
          <p className="text-white/70 mb-4 line-clamp-3">
            {course.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {new Date(course.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
