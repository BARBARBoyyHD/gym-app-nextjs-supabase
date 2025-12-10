import { render, screen } from '@testing-library/react';
import VideoEmbed from '@/components/courses/VideoEmbed';
import '@testing-library/jest-dom';

describe('VideoEmbed', () => {
  const mockVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const mockTitle = 'Test Video';

  it('renders the embedded video iframe with correct src', () => {
    render(<VideoEmbed videoUrl={mockVideoUrl} title={mockTitle} />);

    // Check that an iframe is rendered
    const iframe = screen.getByTitle(mockTitle);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });

  it('converts YouTube watch URL to embed URL', () => {
    render(<VideoEmbed videoUrl={mockVideoUrl} title={mockTitle} />);

    const iframe = screen.getByTitle(mockTitle);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed/dQw4w9WgXcQ'));
  });

  it('converts YouTube short URL to embed URL', () => {
    const shortUrl = 'https://youtu.be/dQw4w9WgXcQ';
    render(<VideoEmbed videoUrl={shortUrl} title={mockTitle} />);

    const iframe = screen.getByTitle(mockTitle);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed/dQw4w9WgXcQ'));
  });

  it('renders with default dimensions', () => {
    render(<VideoEmbed videoUrl={mockVideoUrl} title={mockTitle} />);

    const container = screen.getByTitle(mockTitle).parentElement;
    expect(container).toHaveAttribute('style', expect.stringContaining('width: 100%'));
    expect(container).toHaveAttribute('style', expect.stringContaining('height: 400px'));
  });

  it('renders with custom dimensions when props are provided', () => {
    render(<VideoEmbed videoUrl={mockVideoUrl} title={mockTitle} width="800px" height="600px" />);

    const container = screen.getByTitle(mockTitle).parentElement;
    expect(container).toHaveAttribute('style', expect.stringContaining('width: 800px'));
    expect(container).toHaveAttribute('style', expect.stringContaining('height: 600px'));
  });

  it('shows fallback message when no video URL is provided', () => {
    render(<VideoEmbed videoUrl="" title={mockTitle} />);

    expect(screen.getByText('No video available')).toBeInTheDocument();
  });
});