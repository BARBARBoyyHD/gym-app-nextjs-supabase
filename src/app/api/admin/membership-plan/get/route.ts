import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getHandler } from '@/handlers/getHandlers';

// GET /api/membership-plan/get
export async function GET(request: NextRequest) {
  const client = await createClient();

  // Extract query parameters for pagination, search, etc.
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  const search = searchParams.get('search') || undefined;
  const sortBy = searchParams.get('sortBy') || 'created_at';
  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';

  // Using the generic getHandler to fetch membership plans
  return await getHandler({
    table: 'membership_plans', // Supabase table name
    column: '*',
    client,
    search,
    searchColumns: ['name', 'description'], // Columns to search against
    page,
    limit,
    sortBy,
    sortOrder,
  });
}