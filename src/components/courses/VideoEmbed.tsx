import { convertYouTubeUrl } from "@/utils/youtube";

interface VideoEmbedProps {
  videoUrl: string;
  title: string;
  width?: string;
  height?: string;
}

const VideoEmbed = ({ videoUrl, title, width = "100%", height = "400px" }: VideoEmbedProps) => {
  const embedUrl = convertYouTubeUrl(videoUrl);

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