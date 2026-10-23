import assert from "node:assert/strict";
import { createServerClient } from "@supabase/ssr";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const base = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
for (const name of ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "SMOKE_HOST_EMAIL", "SMOKE_HOST_PASSWORD", "SMOKE_OTHER_EMAIL", "SMOKE_OTHER_PASSWORD"]) {
  assert.ok(process.env[name], `설정 필요: ${name} (docs/auth-testing.md 참고)`);
}

async function login(prefix) {
  const jar = new Map();
  const client = createServerClient(url, key, {
    cookies: {
      getAll: () => [...jar].map(([name, value]) => ({ name, value })),
      setAll: values => values.forEach(({ name, value }) => jar.set(name, value)),
    },
  });
  const { data, error } = await client.auth.signInWithPassword({ email: process.env[`${prefix}_EMAIL`], password: process.env[`${prefix}_PASSWORD`] });
  assert.equal(error, null, "테스트 계정 로그인 실패 (이메일 인증 및 비밀번호 확인)");
  return { id: data.user.id, token: data.session.access_token, cookie: [...jar].map(([n, v]) => `${n}=${encodeURIComponent(v)}`).join("; ") };
}
function post(path, body, user) {
  return fetch(`${base}${path}`, { method: "POST", headers: { "Content-Type": "application/json", ...(user ? { Cookie: user.cookie } : {}) }, body: JSON.stringify(body), redirect: "manual" });
}
function direct(path, user, options = {}) {
  return fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, { ...options, headers: { apikey: key, ...(user ? { Authorization: `Bearer ${user.token}` } : {}), ...options.headers } });
}

const host = await login("SMOKE_HOST");
const other = await login("SMOKE_OTHER");
assert.notEqual(host.id, other.id, "A와 B는 다른 계정이어야 합니다.");
const input = { title: `권한 확인 ${new Date().toISOString()}`, date: "2026년 11월 14일", location: "테스트", body: "인증·권한 검증" };
assert.equal((await post("/api/invitations", input)).status, 401, "비로그인 생성 차단");
assert.equal((await post("/api/invitations", { title: "" }, host)).status, 400);
const created = await post("/api/invitations", { ...input, host_id: other.id }, host);
assert.equal(created.status, 201, "초대장 생성 실패: SQL 적용 확인");
const { invitation } = await created.json();
const owned = await direct(`invitations?id=eq.${invitation.id}&select=host_id`, host);
assert.equal((await owned.json())[0].host_id, host.id, "클라이언트 소유자 위조 무시");
const responsesUrl = `${base}/i/${invitation.id}/responses`;
const loggedOut = await fetch(responsesUrl, { redirect: "manual" });
assert.equal(loggedOut.status, 307, "비로그인 현황 조회 차단");
assert.equal(new URL(loggedOut.headers.get("location"), base).pathname, "/login");
assert.equal((await fetch(`${base}/i/${invitation.id}`)).status, 200, "공개 초대장");
for (const rsvp of [{ name: "권한 확인 참석자", status: "yes", companions: 2 }, { name: "권한 확인 불참자", status: "no", companions: 0 }]) {
  const saved = await post(`/api/invitations/${invitation.id}/rsvps`, rsvp);
  assert.equal(saved.status, 201, "비로그인 응답 제출");
  assert.equal((await saved.json()).success, true);
}
const ownerPage = await fetch(responsesUrl, { headers: { Cookie: host.cookie } });
assert.equal(ownerPage.status, 200);
const html = await ownerPage.text();
assert.ok(html.includes("권한 확인 참석자") && html.includes("권한 확인 불참자"));
assert.ok(html.includes("3명"), "동반 인원 포함 통계");
const deniedPage = await fetch(responsesUrl, { headers: { Cookie: other.cookie } });
const deniedHtml = await deniedPage.text();
// Streaming may commit HTTP 200 before Next.js renders its not-found UI.
assert.ok(deniedHtml.includes("응답 현황을 볼 수 없어요"), "다른 사용자 조회 불가 안내");
assert.ok(!deniedHtml.includes("권한 확인 참석자"), "다른 사용자에게 응답 노출 금지");
const query = `rsvps?invitation_id=eq.${invitation.id}&select=name`;
const ownerRows = await direct(query, host);
assert.equal(ownerRows.status, 200);
assert.equal((await ownerRows.json()).length, 2, "RLS: 호스트 직접 조회");
const otherRows = await direct(query, other);
assert.equal(otherRows.status, 200);
assert.deepEqual(await otherRows.json(), [], "RLS: 다른 사용자 차단");
assert.ok([401, 403].includes((await direct(query)).status), "RLS: 비로그인 직접 조회 차단");
for (const user of [undefined, other]) {
  const forged = await direct("invitations", user, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...input, host_id: host.id }) });
  assert.ok([401, 403].includes(forged.status), "RLS: 비로그인 생성 및 소유자 위조 차단");
}
assert.equal((await post(`/api/invitations/${invitation.id}/rsvps`, { name: "오류", status: "yes", companions: -1 })).status, 400);
console.log(`테스트 초대장: ${base}/i/${invitation.id}`);
console.log("PASS: 로그인, 소유권, 공개 응답, 호스트 통계, 비로그인·타인 조회 차단, 직접 REST RLS 검증");
