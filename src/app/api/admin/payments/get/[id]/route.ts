import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSingleHandler } from '@/handlers/getHandlers';

// GET /api/payments/get/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await createClient();
  const { id } = params;

  // Using the generic getSingleHandler to fetch a specific payment
  return await getSingleHandler({
    table: 'payments', // Supabase table name
    column: '*',
    id,
    client,
  });
}