import { render, screen, waitFor } from '@testing-library/react';
import CourseDetailPage from '@/app/courses/[id]/page';
import '@testing-library/jest-dom';
import { useParams } from 'next/navigation';

// Mock the useParams hook to return a course ID
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn(),
}));

// Mock the components used in the page
jest.mock('@/components/Navbar', () => {
  const MockNavbar = () => <div data-testid="navbar">Navbar</div>;
  MockNavbar.displayName = 'MockNavbar';
  return MockNavbar;
});
jest.mock('@/components/Footer', () => {
  const MockFooter = () => <div data-testid="footer">Footer</div>;
  MockFooter.displayName = 'MockFooter';
  return MockFooter;
});
jest.mock('@/components/courses/VideoEmbed', () => ({
  __esModule: true,
  default: ({ title, videoUrl }: { title: string; videoUrl: string }) => {
    const MockVideoEmbed = () => (
      <div data-testid="video-embed" data-title={title}>
        Mock VideoEmbed: {title} - {videoUrl}
      </div>
    );
    MockVideoEmbed.displayName = 'MockVideoEmbed';
    return MockVideoEmbed;
  },
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('CourseDetailPage', () => {
  const mockCourse = {
    id: '1',
    title: 'Yoga Basics',
    description: 'Learn basic yoga poses',
    category: 'Yoga',
    thumbnail_url: 'https://example.com/yoga.jpg',
    created_at: '2023-01-01T00:00:00Z',
    video_embed_url: 'https://youtube.com/yoga',
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially', () => {
    // Mock fetch to not resolve immediately, so we can observe the loading state
    (global.fetch as jest.Mock).mockReturnValueOnce(new Promise(() => {})); // Never resolving promise

    render(<CourseDetailPage />);

    // Check for the loading spinner (animate-spin class is used in the spinner)
    const spinner = screen.getByRole('status') || screen.getByText(/spin/) || screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders course details when data is loaded', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockCourse })
    });

    render(<CourseDetailPage />);

    await waitFor(() => {
      // Check for the main course title
      expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
      
      // Check for the category badge
      expect(screen.getByText(mockCourse.category)).toBeInTheDocument();
      
      // Check for the course description
      expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
    });
  });

  it('renders embedded video when video_embed_url is present', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockCourse })
    });

    render(<CourseDetailPage />);

    await waitFor(() => {
      // Check that the VideoEmbed component is rendered
      expect(screen.getByTestId('video-embed')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ success: false, message: 'Failed to fetch course' })
    });

    render(<CourseDetailPage />);

    await waitFor(() => {
      // Check for error message
      expect(screen.getByText('Error Loading Course')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch course')).toBeInTheDocument();
    });
  });

  it('renders error state when course is not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: null })
    });

    render(<CourseDetailPage />);

    await waitFor(() => {
      // Check for error message
      expect(screen.getByText('Error Loading Course')).toBeInTheDocument();
      expect(screen.getByText('Course not found')).toBeInTheDocument();
    });
  });

  it('fetches data from the correct API endpoint', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockCourse })
    });

    (useParams as jest.Mock).mockReturnValue({ id: '123' });

    render(<CourseDetailPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/courses/get/123');
    });
  });
});