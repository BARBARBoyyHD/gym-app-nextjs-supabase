import { dashboardAnalyticsHandler } from '@/handlers/dashboardAnalyticsHandler';
import { successResponse, errorResponse } from '@/utils/response';

// Mock Supabase client
const mockSupabaseClient = {
  from: jest.fn(() => ({
    select: jest.fn(),
  })),
};

// Mock date for consistent testing
const mockDate = new Date('2023-05-15T10:00:00.000Z');
global.Date = jest.fn(() => mockDate) as any;

describe('dashboardAnalyticsHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return analytics with default month filter when no params provided', async () => {
    // Mock Supabase response for members count
    const mockMembersResponse = { count: 100, error: null };
    const mockMembersQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockMembersResponse) }),
    };
    
    // Mock Supabase response for memberships count
    const mockMembershipsResponse = { count: 80, error: null };
    const mockMembershipsQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockMembershipsResponse) }),
    };
    
    // Mock Supabase response for payments
    const mockPaymentsResponse = { data: [{ amount: 100 }, { amount: 200 }], error: null };
    const mockPaymentsQuery = {
      select: jest.fn().mockReturnValue({ gte: jest.fn().mockReturnValue({ lt: jest.fn().mockResolvedValue(mockPaymentsResponse) }) }),
    };
    
    // Mock Supabase response for new members
    const mockNewMembersResponse = { count: 10, error: null };
    const mockNewMembersQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockNewMembersResponse) }),
    };
    
    // Mock Supabase response for expired memberships
    const mockExpiredMembershipsResponse = { count: 5, error: null };
    const mockExpiredMembershipsQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockExpiredMembershipsResponse) }),
    };
    
    // Mock Supabase response for courses
    const mockCoursesResponse = { count: 20, error: null };
    const mockCoursesQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockCoursesResponse) }),
    };

    // Mock the from method to return different query objects based on the table
    (mockSupabaseClient.from as jest.Mock)
      .mockImplementationOnce(() => mockMembersQuery) // members table
      .mockImplementationOnce(() => mockMembershipsQuery) // memberships table
      .mockImplementationOnce(() => mockPaymentsQuery) // payments table
      .mockImplementationOnce(() => mockNewMembersQuery) // members table again
      .mockImplementationOnce(() => mockExpiredMembershipsQuery) // memberships table again
      .mockImplementationOnce(() => mockCoursesQuery); // courses table

    const result = await dashboardAnalyticsHandler(mockSupabaseClient);

    expect(mockSupabaseClient.from).toHaveBeenCalledTimes(6); // All 6 tables queried
    expect(result).toEqual(
      successResponse({
        success: true,
        status: 200,
        message: "Dashboard analytics retrieved successfully",
        data: {
          totalMembers: 100,
          activeMemberships: 80,
          monthlyRevenue: 300, // 100 + 200
          newMembersThisMonth: 10,
          expiredMemberships: 5,
          totalCourses: 20,
        },
      })
    );
  });

  it('should return analytics with custom date range filter', async () => {
    const params = {
      dateFilterType: 'custom' as const,
      startDate: '2023-01-01',
      endDate: '2023-01-31',
    };

    // Mock Supabase response for members count
    const mockMembersResponse = { count: 50, error: null };
    const mockMembersQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockMembersResponse) }),
    };
    
    // Mock Supabase response for memberships count
    const mockMembershipsResponse = { count: 40, error: null };
    const mockMembershipsQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockMembershipsResponse) }),
    };
    
    // Mock Supabase response for payments
    const mockPaymentsResponse = { data: [{ amount: 50 }, { amount: 150 }], error: null };
    const mockPaymentsQuery = {
      select: jest.fn().mockReturnValue({ gte: jest.fn().mockReturnValue({ lt: jest.fn().mockResolvedValue(mockPaymentsResponse) }) }),
    };
    
    // Mock Supabase response for new members
    const mockNewMembersResponse = { count: 5, error: null };
    const mockNewMembersQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockNewMembersResponse) }),
    };
    
    // Mock Supabase response for expired memberships
    const mockExpiredMembershipsResponse = { count: 2, error: null };
    const mockExpiredMembershipsQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockExpiredMembershipsResponse) }),
    };
    
    // Mock Supabase response for courses
    const mockCoursesResponse = { count: 15, error: null };
    const mockCoursesQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockCoursesResponse) }),
    };

    // Mock the from method to return different query objects based on the table
    (mockSupabaseClient.from as jest.Mock)
      .mockImplementationOnce(() => mockMembersQuery) // members table
      .mockImplementationOnce(() => mockMembershipsQuery) // memberships table
      .mockImplementationOnce(() => mockPaymentsQuery) // payments table
      .mockImplementationOnce(() => mockNewMembersQuery) // members table again
      .mockImplementationOnce(() => mockExpiredMembershipsQuery) // memberships table again
      .mockImplementationOnce(() => mockCoursesQuery); // courses table

    const result = await dashboardAnalyticsHandler(mockSupabaseClient, params);

    expect(mockSupabaseClient.from).toHaveBeenCalledTimes(6); // All 6 tables queried
    expect(result).toEqual(
      successResponse({
        success: true,
        status: 200,
        message: "Dashboard analytics retrieved successfully",
        data: {
          totalMembers: 50,
          activeMemberships: 40,
          monthlyRevenue: 200, // 50 + 150
          newMembersThisMonth: 5,
          expiredMemberships: 2,
          totalCourses: 15,
        },
      })
    );
  });

  it('should return error for invalid custom date range', async () => {
    const params = {
      dateFilterType: 'custom' as const,
      startDate: '2023-01-01',
      // Missing endDate
    };

    const result = await dashboardAnalyticsHandler(mockSupabaseClient, params);

    expect(result).toEqual(
      errorResponse({
        success: false,
        status: 400,
        message: "Custom date range requires both startDate and endDate parameters",
      })
    );
  });

  it('should return error when there is a database error', async () => {
    const mockError = new Error('Database error');
    const mockErrorResponse = { count: null, error: mockError };
    const mockMembersQuery = {
      select: jest.fn().mockReturnValue({ count: jest.fn().mockResolvedValue(mockErrorResponse) }),
    };

    (mockSupabaseClient.from as jest.Mock)
      .mockImplementationOnce(() => mockMembersQuery); // members table

    const result = await dashboardAnalyticsHandler(mockSupabaseClient);

    expect(result).toEqual(
      errorResponse({
        success: false,
        status: 500,
        message: "Dashboard analytics error: Error: Database error",
      })
    );
  });
});