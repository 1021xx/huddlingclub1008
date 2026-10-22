import "server-only";
import type { Invitation, InvitationInput, Rsvp, RsvpInput } from "./types";
import { isInvitationId } from "./validation";

class SupabaseError extends Error {
  constructor(readonly status: number, readonly code?: string) {
    super("Supabase 요청을 처리하지 못했습니다.");
  }
}

// Publishable key로 호출하므로 Supabase의 anon RLS 정책이 적용됩니다.
// 서비스 역할 키를 사용하거나 수정·삭제 요청을 보내지 않습니다.
async function request<T>(path: string, body?: unknown): Promise<T> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase 환경변수 설정을 확인해 주세요.");
  }

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      apikey: key,
      ...(body === undefined ? {} : {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new SupabaseError(response.status, error.code);
  }
  return response.json() as Promise<T>;
}

const invitationColumns = "id,title,date,location,body";
const rsvpColumns = "id,invitation_id,name,status,companions";

export async function getInvitation(id: string): Promise<Invitation | null> {
  if (!isInvitationId(id)) return null;
  const rows = await request<Invitation[]>(
    `invitations?id=eq.${id}&select=${invitationColumns}&limit=1`,
  );
  return rows[0] ?? null;
}

export async function getInvitationWithResponses(id: string) {
  const invitation = await getInvitation(id);
  if (!invitation) return null;
  const responses: Rsvp[] = [];
  // Supabase의 기본 반환 제한 때문에 응답이 누락되지 않도록 페이지별 조회합니다.
  for (let offset = 0; ; offset += 1000) {
    const page = await request<Rsvp[]>(
      `rsvps?invitation_id=eq.${id}&select=${rsvpColumns}&order=id&limit=1000&offset=${offset}`,
    );
    responses.push(...page);
    if (page.length < 1000) break;
  }
  return { ...invitation, responses };
}

export async function createInvitation(input: InvitationInput): Promise<Invitation> {
  const rows = await request<Invitation[]>(`invitations?select=${invitationColumns}`, input);
  if (!rows[0]) throw new Error("초대장을 저장하지 못했습니다.");
  return rows[0];
}

export async function createRsvp(invitationId: string, input: RsvpInput): Promise<Rsvp> {
  const rows = await request<Rsvp[]>(`rsvps?select=${rsvpColumns}`, {
    ...input,
    invitation_id: invitationId,
  });
  if (!rows[0]) throw new Error("응답을 저장하지 못했습니다.");
  return rows[0];
}
