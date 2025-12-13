/**
 * Convert various YouTube URL formats to embed URL
 * @param url - YouTube URL in any format (watch, embed, short link)
 * @returns Embed URL ready for iframe
 */
export function convertYouTubeUrl(url: string): string {
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
}