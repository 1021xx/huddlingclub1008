import { apiError } from "@/lib/api-error";
import { createInvitation } from "@/lib/supabase";
import { parseInvitation } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const input = parseInvitation(await request.json());
    const invitation = await createInvitation(input);
    return Response.json({ invitation }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
