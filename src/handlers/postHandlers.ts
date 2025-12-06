import { createClient } from "@/lib/supabase/server";
import { errorResponse, successResponse } from "@/utils/response";

interface PostHandlerProps<T> {
  table: string;
  data: T;
}

export async function postHandler<T>({ table, data }: PostHandlerProps<T>) {
  const supabase = await createClient();

  try {
    const { data: postData, error } = await supabase
      .from(table)
      .insert(data)
      .select();

    if (error) throw new Error(error.message);

    return successResponse({
      success: true,
      status: 200,
      message: "Success",
      data: postData,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}