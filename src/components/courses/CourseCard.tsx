import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  created_at: string;
  video_embed_url: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Function to convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';

    // Handle various YouTube URL formats
    let embedUrl = url;

    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed')) {
      return url;
    }

    // Convert various YouTube URL formats to embed URL
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    // Add common YouTube embed parameters for better control
    if (embedUrl.includes('youtube.com/embed/')) {
      embedUrl += '?rel=0&modestbranding=1&autoplay=0';
    }

    return embedUrl;
  };

  return (
    <Link href={`/courses/${course.id}`} className="block transform transition-transform duration-300 hover:scale-[1.02]">
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {course.video_embed_url ? (
          <div className="relative w-full h-48">
            <iframe
              src={getEmbedUrl(course.video_embed_url)}
              title={course.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative w-full h-48">
            {!imageError && course.thumbnail_url ? (
              <Image
                src={course.thumbnail_url}
                alt={course.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="bg-gray-700 w-full h-48 flex items-center justify-center">
                <span className="text-gray-400">No Image or Video</span>
              </div>
            )}
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
            <span className="bg-brand text-black text-xs font-bold px-2 py-1 rounded">
              {course.category}
            </span>
          </div>
          <p className="text-white/70 mb-4 line-clamp-3">{course.description}</p>
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