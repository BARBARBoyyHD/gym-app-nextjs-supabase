import { errorResponse, successResponse } from "@/utils/response";
import { createClient } from "@/lib/supabase/server";

interface DeleteHandlerProps {
  id: string | number;
  table: string;

}

export async function deleteHandler({
  id,
  table,
}: DeleteHandlerProps) {
  if (!id || !table) {
    return errorResponse({
      success: false,
      status: 400,
      message: "Missing required fields: id or table",
    });
  }

  const supabase = await createClient();

  try {
    // 1️⃣ Delete record from table directly
    // Supabase delete operation will not throw an error if the row doesn't exist.
    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq("id", id);

    if (deleteError) throw new Error(deleteError.message);

    // Note: If you absolutely need to confirm a row was deleted, 
    // the .delete() call can return `count` or `data` depending on options.
    // For a standard REST API, a successful operation here (no deleteError) 
    // is usually enough for a 200/204 response.

    return successResponse({
      success: true,
      status: 200,
      message: "Data deleted successfully",
      data: { id },
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