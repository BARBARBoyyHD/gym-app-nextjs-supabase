import { render, screen, waitFor } from '@testing-library/react';
import CoursesPage from '@/app/courses/page';
import '@testing-library/jest-dom';
import { SessionContextProvider } from 'use-supabase';

// Mock the components used in the page
jest.mock('@/components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('@/components/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('@/components/courses/CourseCategorySection', () => ({ 
  __esModule: true,
  default: ({ category, courses }: { category: string; courses: any[] }) => (
    <div data-testid="course-category-section" data-category={category}>
      {`Course Section: ${category} (${courses.length} courses)`}
    </div>
  ),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('CoursesPage', () => {
  const mockGroupedCourses = {
    Yoga: [
      {
        id: '1',
        title: 'Yoga Basics',
        description: 'Learn basic yoga poses',
        category: 'Yoga',
        thumbnail_url: 'https://example.com/yoga.jpg',
        created_at: '2023-01-01T00:00:00Z',
        video_embed_url: 'https://youtube.com/yoga',
      }
    ],
    'HIIT': [
      {
        id: '2',
        title: 'HIIT Training',
        description: 'High intensity interval training',
        category: 'HIIT',
        thumbnail_url: 'https://example.com/hiit.jpg',
        created_at: '2023-01-02T00:00:00Z',
        video_embed_url: 'https://youtube.com/hiit',
      }
    ]
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially', () => {
    // Mock fetch to not resolve immediately, so we can observe the loading state
    (global.fetch as jest.Mock).mockReturnValueOnce(new Promise(() => {})); // Never resolving promise

    render(<CoursesPage />);

    // Check for the loading spinner (animate-spin class is used in the spinner)
    const spinner = screen.getByRole('status') || screen.getByText(/spin/) || screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders courses grouped by category when data is loaded', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockGroupedCourses })
    });

    render(<CoursesPage />);

    await waitFor(() => {
      // Check for the main heading
      expect(screen.getByText('Our Courses')).toBeInTheDocument();
      
      // Check for filter buttons
      expect(screen.getByText('All Courses')).toBeInTheDocument();
      expect(screen.getByText('Yoga')).toBeInTheDocument();
      expect(screen.getByText('HIIT')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ success: false, message: 'Failed to fetch courses' })
    });

    render(<CoursesPage />);

    await waitFor(() => {
      // Check for error message
      expect(screen.getByText('Error Loading Courses')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch courses')).toBeInTheDocument();
    });
  });

  it('renders "No courses found" when groupedCourses is empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: {} })
    });

    render(<CoursesPage />);

    await waitFor(() => {
      expect(screen.getByText('No courses found')).toBeInTheDocument();
    });
  });

  it('fetches data from the correct API endpoint', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockGroupedCourses })
    });

    render(<CoursesPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/courses/get?groupByCategory=true');
    });
  });
});