import { useState, useEffect } from "react";

interface VideoEmbedProps {
  videoUrl: string;
  title: string;
  width?: string;
  height?: string;
}

const VideoEmbed = ({ videoUrl, title, width = "100%", height = "400px" }: VideoEmbedProps) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  
  useEffect(() => {
    if (!videoUrl) return;
    
    // Function to convert YouTube URL to embed URL
    const getEmbedUrl = (url: string) => {
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
    
    setEmbedUrl(getEmbedUrl(videoUrl));
  }, [videoUrl]);

  if (!embedUrl) {
    return (
      <div className="flex items-center justify-center bg-gray-800 rounded-lg" style={{ width, height }}>
        <p className="text-gray-400">No video available</p>
      </div>
    );
  }

  return (
    <div style={{ width, height }} className="relative overflow-hidden rounded-lg">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoEmbed;