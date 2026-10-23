import type { InvitationInput, RsvpInput } from "./types";

export class InputError extends Error {}

export function isInvitationId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new InputError("입력 내용을 확인해 주세요.");
  }
  return value as Record<string, unknown>;
}

function requiredText(value: unknown, label: string, max: number): string {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max) {
    throw new InputError(`${label}을(를) 1~${max}자로 입력해 주세요.`);
  }
  return value.trim();
}

export function parseInvitation(value: unknown): InvitationInput {
  const input = record(value);
  const title = requiredText(input.title, "제목", 200);
  if (title.split("\n").length > 2) {
    throw new InputError("제목은 최대 2줄로 입력해 주세요.");
  }
  return {
    title,
    date: requiredText(input.date, "일시", 200),
    location: requiredText(input.location, "장소", 500),
    body: requiredText(input.body, "본문", 10000),
  };
}

export function parseRsvp(value: unknown): RsvpInput {
  const input = record(value);
  const name = requiredText(input.name, "이름", 100);
  if (input.status !== "yes" && input.status !== "no") {
    throw new InputError("참석 여부를 선택해 주세요.");
  }
  if (typeof input.companions !== "number" || !Number.isInteger(input.companions)
      || input.companions < 0 || input.companions > 2147483647) {
    throw new InputError("동반 인원은 0 이상의 정수로 입력해 주세요.");
  }
  return { name, status: input.status, companions: input.status === "no" ? 0 : input.companions };
}
