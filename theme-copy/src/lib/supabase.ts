import "server-only";
import type { Invitation, InvitationInput, Rsvp, RsvpInput } from "./types";
import { isInvitationId } from "./validation";
import { createAuthClient, currentUser } from "./auth/server";

class SupabaseError extends Error {
  constructor(readonly status: number, readonly code?: string) {
    super("Supabase 요청을 처리하지 못했습니다.");
  }
}

// Publishable key로 호출하므로 Supabase의 anon RLS 정책이 적용됩니다.
// 서비스 역할 키를 사용하거나 수정·삭제 요청을 보내지 않습니다.
async function request<T>(path: string, body?: unknown, minimal = false): Promise<T> {
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
        Prefer: minimal ? "return=minimal" : "return=representation",
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
  return minimal ? undefined as T : response.json() as Promise<T>;
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
  if (!isInvitationId(id)) return null;
  const user = await currentUser();
  if (!user) return null;
  const client = await createAuthClient();
  const { data: invitation, error } = await client.from("invitations")
    .select(invitationColumns).eq("id", id).eq("host_id", user.id).maybeSingle();
  if (error) throw new Error("초대장을 조회하지 못했습니다.");
  if (!invitation) return null;
  const responses: Rsvp[] = [];
  // Supabase의 기본 반환 제한 때문에 응답이 누락되지 않도록 페이지별 조회합니다.
  for (let offset = 0; ; offset += 1000) {
    const { data: page, error } = await client.from("rsvps").select(rsvpColumns)
      .eq("invitation_id", id).order("id").range(offset, offset + 999);
    if (error) throw new Error("응답을 조회하지 못했습니다.");
    responses.push(...page);
    if (page.length < 1000) break;
  }
  return { ...invitation, responses };
}

export async function createInvitation(input: InvitationInput): Promise<Invitation> {
  const user = await currentUser();
  if (!user) throw new Error("로그인이 필요합니다.");
  const client = await createAuthClient();
  const { data, error } = await client.from("invitations")
    .insert({ ...input, host_id: user.id }).select(invitationColumns).single();
  if (error || !data) throw new Error("초대장을 저장하지 못했습니다.");
  return data;
}

export async function createRsvp(invitationId: string, input: RsvpInput): Promise<void> {
  // Anonymous guests may insert, but cannot SELECT even their submitted row.
  await request<void>("rsvps", {
    ...input,
    invitation_id: invitationId,
  }, true);
}

export async function getHostInvitations(): Promise<Invitation[]> {
  const user = await currentUser();
  if (!user) return [];
  const client = await createAuthClient();
  const { data, error } = await client.from("invitations").select(invitationColumns)
    .eq("host_id", user.id).order("id");
  if (error) throw new Error("초대장 목록을 조회하지 못했습니다.");
  return data;
}
