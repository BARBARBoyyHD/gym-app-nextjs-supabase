import { GET } from '@/app/api/courses/get/route';
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/middleware/rate-limit-middleware';

// Mock the Supabase client
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

// Mock the rate limit middleware
jest.mock('@/middleware/rate-limit-middleware', () => ({
  checkRateLimit: jest.fn(),
}));

// Mock the response utility functions
jest.mock('@/utils/response', () => ({
  errorResponse: jest.fn(),
  successResponse: jest.fn(),
}));

describe('Courses API Route', () => {
  let mockSupabaseClient: {
    from: jest.Mock;
  };
  let mockRequest: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock Supabase client
    mockSupabaseClient = {
      from: jest.fn(() => ({
        select: jest.fn(),
      })),
    };

    (createClient as jest.Mock).mockResolvedValue(mockSupabaseClient);

    // Mock rate limit check to pass by default
    (checkRateLimit as jest.Mock).mockResolvedValue(null);

    // Create mock request object
    mockRequest = {
      url: 'http://localhost:3000/api/courses/get',
    } as NextRequest;
  });

  it('should return grouped courses when groupByCategory=true is provided', async () => {
    // Mock the Supabase query response
    const mockCoursesData = [
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
        title: 'HIIT Training',
        description: 'High intensity interval training',
        category: 'HIIT',
        thumbnail_url: 'https://example.com/hiit.jpg',
        created_at: '2023-01-02T00:00:00Z',
        video_embed_url: 'https://youtube.com/hiit',
      },
    ];

    const mockQueryResult = {
      data: mockCoursesData,
      error: null,
      count: 2,
    };

    const mockSelect = jest.fn().mockReturnValue(mockQueryResult);
    const mockFrom = {
      select: mockSelect,
    };

    (mockSupabaseClient.from as jest.Mock).mockReturnValue(mockFrom);

    // Create request with groupByCategory=true
    const request = {
      url: 'http://localhost:3000/api/courses/get?groupByCategory=true',
    } as NextRequest;

    const result = await GET(request);
    const resultData = await result.json();

    expect(mockSupabaseClient.from).toHaveBeenCalledWith('courses');
    expect(mockSelect).toHaveBeenCalledWith(
      'id, title, description, category, thumbnail_url, created_at, video_embed_url',
      { count: 'exact', head: false }
    );
    expect(result.status).toBe(200);
    expect(resultData.success).toBe(true);
    expect(resultData.grouped_by).toBe('category');
    expect(resultData.data).toEqual({
      Yoga: [mockCoursesData[0]],
      HIIT: [mockCoursesData[1]],
    });
  });

  it('should return paginated courses when groupByCategory is not provided', async () => {
    // Mock the Supabase query response for paginated results
    const mockCoursesData = [
      {
        id: '1',
        title: 'Yoga Basics',
        description: 'Learn basic yoga poses',
        category: 'Yoga',
        thumbnail_url: 'https://example.com/yoga.jpg',
        created_at: '2023-01-01T00:00:00Z',
        video_embed_url: 'https://youtube.com/yoga',
      },
    ];

    const mockQueryResult = {
      data: mockCoursesData,
      error: null,
      count: 1,
    };

    const mockRange = jest.fn().mockReturnThis();
    const mockOrder = jest.fn().mockReturnThis();
    const mockSelect = jest.fn().mockReturnValue({
      range: mockRange,
      order: mockOrder,
    });
    const mockFrom = {
      select: mockSelect,
    };

    // Mock the final result after range and order
    (mockRange as jest.Mock).mockImplementation(() => mockQueryResult);
    (mockOrder as jest.Mock).mockImplementation(() => mockQueryResult);

    (mockSupabaseClient.from as jest.Mock).mockReturnValue(mockFrom);

    // Create request without groupByCategory
    const request = {
      url: 'http://localhost:3000/api/courses/get?page=1&limit=10',
    } as NextRequest;

    const result = await GET(request);
    const resultData = await result.json();

    expect(mockSupabaseClient.from).toHaveBeenCalledWith('courses');
    expect(result.status).toBe(200);
    expect(resultData.success).toBe(true);
    expect(resultData.data).toEqual(mockCoursesData);
    expect(resultData.page).toBe(1);
    expect(resultData.limit).toBe(10);
    expect(resultData.total_pages).toBe(1);
  });

  it('should return error response when Supabase query fails', async () => {
    const mockError = new Error('Database error');
    const mockQueryResult = {
      data: null,
      error: mockError,
      count: null,
    };

    const mockSelect = jest.fn().mockReturnValue(mockQueryResult);
    const mockFrom = {
      select: mockSelect,
    };

    (mockSupabaseClient.from as jest.Mock).mockReturnValue(mockFrom);

    // Import the error response function directly
    const { errorResponse } = jest.requireMock('@/utils/response');
    (errorResponse as jest.Mock).mockReturnValue(new Response(
      JSON.stringify({ success: false, message: 'Database error' }),
      { status: 500 }
    ));

    const result = await GET(mockRequest);

    expect(mockErrorResponse.errorResponse).toHaveBeenCalledWith({
      success: false,
      status: 500,
      message: 'Database error',
    });
    expect(result.status).toBe(500);
  });

  it('should handle rate limiting', async () => {
    const mockRateLimitResult = new Response(
      JSON.stringify({ success: false, message: 'Too many requests' }),
      { status: 429 }
    );

    const { checkRateLimit } = jest.requireMock('@/middleware/rate-limit-middleware');
    (checkRateLimit as jest.Mock).mockResolvedValue(mockRateLimitResult);

    const result = await GET(mockRequest);

    expect(checkRateLimit).toHaveBeenCalled();
    expect(result).toBe(mockRateLimitResult);
  });

  it('should apply search filter when provided', async () => {
    const mockCoursesData = [
      {
        id: '1',
        title: 'Yoga Basics',
        description: 'Learn basic yoga poses',
        category: 'Yoga',
        thumbnail_url: 'https://example.com/yoga.jpg',
        created_at: '2023-01-01T00:00:00Z',
        video_embed_url: 'https://youtube.com/yoga',
      },
    ];

    const mockQueryResult = {
      data: mockCoursesData,
      error: null,
      count: 1,
    };

    const mockOr = jest.fn().mockReturnThis();
    const mockRange = jest.fn().mockReturnThis();
    const mockOrder = jest.fn().mockReturnThis();
    const mockSelect = jest.fn().mockReturnValue({
      or: mockOr,
      range: mockRange,
      order: mockOrder,
    });

    // Mock the final result after or, range and order
    (mockOr as jest.Mock).mockImplementation(() => mockQueryResult);
    (mockRange as jest.Mock).mockImplementation(() => mockQueryResult);
    (mockOrder as jest.Mock).mockImplementation(() => mockQueryResult);

    const mockFrom = {
      select: mockSelect,
    };

    (mockSupabaseClient.from as jest.Mock).mockReturnValue(mockFrom);

    // Create request with search parameter
    const request = {
      url: 'http://localhost:3000/api/courses/get?search=yoga',
    } as NextRequest;

    const result = await GET(request);

    expect(mockOr).toHaveBeenCalledWith(
      'title.ilike.%yoga%,description.ilike.%yoga%,category.ilike.%yoga%'
    );
    expect(result.status).toBe(200);
  });
});