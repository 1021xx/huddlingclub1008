import { InputError } from "./validation";

export function apiError(error: unknown): Response {
  if (error instanceof InputError) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  if (error instanceof SyntaxError) {
    return Response.json({ error: "올바른 JSON 내용을 보내 주세요." }, { status: 400 });
  }
  // 환경변수나 사용자 입력이 응답/로그에 노출되지 않게 일반 메시지만 반환합니다.
  return Response.json(
    { error: "저장하지 못했어요. 잠시 후 다시 시도해 주세요." },
    { status: 503 },
  );
}
