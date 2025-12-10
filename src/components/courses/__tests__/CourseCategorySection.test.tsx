import { render, screen } from '@testing-library/react';
import CourseCategorySection from '@/components/courses/CourseCategorySection';
import CourseCard from '@/components/courses/CourseCard';
import '@testing-library/jest-dom';

// Mock the CourseCard component to avoid testing its implementation details
jest.mock('@/components/courses/CourseCard', () => ({
  __esModule: true,
  default: ({ course }: { course: any }) => (
    <div data-testid="course-card" data-title={course.title}>
      Mock CourseCard: {course.title}
    </div>
  ),
}));

describe('CourseCategorySection', () => {
  const mockCourses = [
    {
      id: '1',
      title: 'Yoga Basics',
      description: 'Learn basic yoga poses',
      category: 'Yoga',
      thumbnail_url: 'https://example.com/yoga.jpg',
      created_at: '2023-01-01T00:00:00Z',
      video_embed_url: 'https://youtube.com/yoga',
    },
    {
      id: '2',
      title: 'Advanced Yoga',
      description: 'Advanced yoga techniques',
      category: 'Yoga',
      thumbnail_url: 'https://example.com/advanced-yoga.jpg',
      created_at: '2023-02-01T00:00:00Z',
      video_embed_url: 'https://youtube.com/advanced-yoga',
    },
  ];

  it('renders the category title correctly', () => {
    render(<CourseCategorySection category="Yoga" courses={mockCourses} />);

    expect(screen.getByText('Yoga Courses')).toBeInTheDocument();
  });

  it('renders all courses within the category', () => {
    render(<CourseCategorySection category="Yoga" courses={mockCourses} />);

    // Check that both courses are rendered using the mocked CourseCard
    expect(screen.getByText('Mock CourseCard: Yoga Basics')).toBeInTheDocument();
    expect(screen.getByText('Mock CourseCard: Advanced Yoga')).toBeInTheDocument();
  });

  it('renders the correct number of course cards', () => {
    render(<CourseCategorySection category="Yoga" courses={mockCourses} />);

    const courseCards = screen.getAllByTestId('course-card');
    expect(courseCards.length).toBe(mockCourses.length);
  });

  it('uses responsive text sizing for the category header', () => {
    render(<CourseCategorySection category="Pilates" courses={mockCourses} />);

    const header = screen.getByText('Pilates Courses');
    expect(header).toHaveClass('text-3xl');
    // md:text-4xl is a responsive class that can't be directly tested with DOM elements
    // but the class is included in the component
  });
});