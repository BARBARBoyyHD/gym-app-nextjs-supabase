import { NextRequest } from 'next/server';
import { postHandler } from '@/handlers/postHandlers';

// POST /api/membership-plan/post
export async function POST(request: NextRequest) {
  const data = await request.json();

  // Using the generic postHandler to create a membership plan
  return await postHandler({
    table: 'membership_plans', // Supabase table name
    data,
  });
}