import { apiError } from "@/lib/api-error";
import { createRsvp, getInvitation } from "@/lib/supabase";
import { isInvitationId, parseRsvp } from "@/lib/validation";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!isInvitationId(id)) {
      return Response.json({ error: "초대장을 찾을 수 없어요." }, { status: 404 });
    }
    const input = parseRsvp(await request.json());
    if (!await getInvitation(id)) {
      return Response.json({ error: "초대장을 찾을 수 없어요." }, { status: 404 });
    }
    const rsvp = await createRsvp(id, input);
    return Response.json({ rsvp }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
