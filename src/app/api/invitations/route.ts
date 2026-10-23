import { apiError } from "@/lib/api-error";
import { createInvitation } from "@/lib/supabase";
import { parseInvitation } from "@/lib/validation";
import { currentUser } from "@/lib/auth/server";

export async function POST(request: Request) {
  try {
    if (!await currentUser()) return Response.json({ error: "로그인 후 초대장을 만들어 주세요." }, { status: 401 });
    const input = parseInvitation(await request.json());
    const invitation = await createInvitation(input);
    return Response.json({ invitation }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
