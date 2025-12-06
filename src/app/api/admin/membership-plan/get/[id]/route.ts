import { NextRequest } from 'next/server';
import { createClient } from '@/src/lib/supabase/server';
import { getSingleHandler } from '@/src/handlers/getHandlers';

// GET /api/membership-plan/get/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await createClient();
  const { id } = params;

  // Using the generic getSingleHandler to fetch a specific membership plan
  return await getSingleHandler({
    table: 'membership_plans', // Supabase table name
    column: '*',
    id,
    client,
  });
}