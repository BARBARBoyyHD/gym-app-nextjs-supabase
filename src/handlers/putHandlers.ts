import { errorResponse, successResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";

interface PutHandlerProps<T extends Record<string, unknown>> {
  table: string;
  id: string;
  message: string;
  data: T;
  newImageFile?: File;
}

export async function putHandler<T extends Record<string, unknown>>({
  table,
  id,
  data,
  message,
}: PutHandlerProps<T>) {
  
  try {
    const supabase = await createClient();

    // 1️⃣ Check if record exists

    const { data: findData, error: findError } = await supabase
      .from(table)
      .select("id")
      .eq("id", id)
      .single();

    if (findError || !findData) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Data not found",
      });
    }

    const updatedPayload: Record<string, unknown> = { ...data };

    // 3️⃣ Update record
    const { data: updatedData, error } = await supabase
      .from(table)
      .update(updatedPayload)
      .eq("id", id)
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    return successResponse({
      success: true,
      status: 200,
      message,
      data: updatedData,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "Unknown error occurred",
    });
  }
}