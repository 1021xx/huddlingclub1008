import assert from "node:assert/strict";

const base = process.env.SMOKE_BASE_URL || "http://localhost:3001";
async function post(path, body) {
  return fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// 잘못된 요청은 DB에 저장하지 않고 API에서 거부합니다.
assert.equal((await post("/api/invitations", { title: "" })).status, 400);
assert.equal((await post("/api/invitations/demo/rsvps", {})).status, 404);
assert.equal((await fetch(`${base}/api/invitations`, { method: "DELETE" })).status, 405);
const invalidJson = await fetch(`${base}/api/invitations`, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
});
assert.equal(invalidJson.status, 400);

const title = `Supabase 연결 확인 ${new Date().toISOString()}`;
const created = await post("/api/invitations", {
  title, date: "2026년 10월 31일 (토) 19:00", location: "연결 확인용", body: "초대장·참석 응답 저장을 확인하는 테스트입니다.",
});
assert.equal(created.status, 201, `초대장 저장 실패: ${await created.clone().text()}`);
const { invitation } = await created.json();
assert.ok(invitation.id);
console.log(`확인용 초대장: ${base}/i/${invitation.id}`);

const empty = await (await fetch(`${base}/i/${invitation.id}/responses`)).text();
assert.ok(empty.includes("아직"), "응답 전 빈 목록 표시 확인");
for (const rsvp of [
  { name: "연결 확인 참석자", status: "yes", companions: 2 },
  { name: "연결 확인 불참자", status: "no", companions: 0 },
]) {
  const saved = await post(`/api/invitations/${invitation.id}/rsvps`, rsvp);
  assert.equal(saved.status, 201, "참석 응답 저장");
  assert.equal((await saved.json()).rsvp.invitation_id, invitation.id);
}
const page = await fetch(`${base}/i/${invitation.id}`);
assert.equal(page.status, 200);
assert.ok((await page.text()).includes(title));
const responses = await fetch(`${base}/i/${invitation.id}/responses`);
assert.equal(responses.status, 200);
const html = await responses.text();
assert.ok(html.includes("연결 확인 참석자"));
assert.ok(html.includes("연결 확인 불참자"));
assert.ok(html.includes("3명"), "참석자 1명 + 동반 2명 통계");
const invalid = await post(`/api/invitations/${invitation.id}/rsvps`, {
  name: "잘못된 응답", status: "yes", companions: -1,
});
assert.equal(invalid.status, 400);
console.log("PASS: 입력 검증, 초대장 저장·조회, 빈 목록, 참석·불참 저장, 새 요청에서 응답 조회·통계");
