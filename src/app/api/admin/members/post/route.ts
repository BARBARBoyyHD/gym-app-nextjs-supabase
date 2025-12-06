import { postHandler } from "@/handlers/postHandlers";
import { memberSchema } from "@/lib/validation/membersValidate";
import { errorResponse } from "@/utils/response";
import { ZodError } from "zod";
import { NextRequest } from "next/server";

// Handler for creating a new member
export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();

    // Validate the input data using Zod schema
    const validatedData = memberSchema.parse(rawData);

    return postHandler({
      table: "members", // Changed to 'users' table since members are stored there
      data: validatedData,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      }));

      return errorResponse({
        success: false,
        status: 400,
        message: "Validation failed",
        errors: error.issues,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "Error creating member",
    });
  }
}
