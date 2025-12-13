import { render, screen } from '@testing-library/react';
import CourseCard from '@/components/courses/CourseCard';
import '@testing-library/jest-dom';

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'Yoga Basics',
    description: 'Learn basic yoga poses and techniques',
    category: 'Yoga',
    thumbnail_url: 'https://example.com/yoga.jpg',
    created_at: '2023-01-01T00:00:00Z',
    video_embed_url: 'https://youtube.com/yoga',
  };

  it('renders course information correctly', () => {
    render(<CourseCard course={mockCourse} />);

    // Check that the course title is rendered
    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();

    // Check that the course description is rendered
    expect(screen.getByText(mockCourse.description)).toBeInTheDocument();

    // Check that the category is rendered
    expect(screen.getByText(mockCourse.category)).toBeInTheDocument();

    // Check that the formatted date is rendered
    expect(screen.getByText('1/1/2023')).toBeInTheDocument();
  });

  it('renders course image when thumbnail_url is provided and no video_embed_url', () => {
    const courseWithoutVideo = {
      ...mockCourse,
      video_embed_url: '' // No video URL
    };
    render(<CourseCard course={courseWithoutVideo} />);

    const image = screen.getByRole('img', { name: courseWithoutVideo.title });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', courseWithoutVideo.thumbnail_url);
  });

  it('renders embedded video when video_embed_url is provided', () => {
    const courseWithVideo = {
      ...mockCourse,
      thumbnail_url: undefined // No thumbnail, should show video
    };
    render(<CourseCard course={courseWithVideo} />);

    // Should render an iframe for the embedded video
    const iframe = screen.getByTitle(courseWithVideo.title);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });

  it('renders fallback content when neither thumbnail nor video is provided', () => {
    const courseWithoutMedia = {
      ...mockCourse,
      thumbnail_url: undefined,
      video_embed_url: ''
    };
    render(<CourseCard course={courseWithoutMedia} />);

    // Should render the fallback div with "No Image or Video" text
    expect(screen.getByText('No Image or Video')).toBeInTheDocument();
  });

  it('renders category badge with correct styling', () => {
    render(<CourseCard course={mockCourse} />);

    const categoryBadge = screen.getByText(mockCourse.category);
    expect(categoryBadge).toHaveClass('bg-brand');
    expect(categoryBadge).toHaveClass('text-black');
  });
});