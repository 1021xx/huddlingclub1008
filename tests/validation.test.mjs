import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Node 20에서도 실행할 수 있도록 순수 검증 모듈만 메모리에서 변환합니다.
const source = await readFile(new URL("../src/lib/validation.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { InputError, isInvitationId, parseInvitation, parseRsvp } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

const invitation = { title: "함께해요", date: "2026년 10월 31일", location: "서울", body: "초대합니다." };

test("초대장은 공백을 정리하고 허용된 컬럼만 저장한다", () => {
  assert.deepEqual(parseInvitation({ ...invitation, title: " 함께해요 ", id: "injected" }), invitation);
});

test("빈 필드, 잘못된 객체, 세 줄 제목은 거부한다", () => {
  for (const value of [null, [], "text", { ...invitation, body: " " }, { ...invitation, title: "가\n나\n다" }]) {
    assert.throws(() => parseInvitation(value), InputError);
  }
});

test("참석·불참과 동반 0명을 허용한다", () => {
  for (const status of ["yes", "no"]) {
    assert.deepEqual(parseRsvp({ name: " 게스트 ", status, companions: 0 }), {
      name: "게스트", status, companions: 0,
    });
  }
});

test("잘못된 참석 여부와 DB에 저장할 수 없는 동반 인원을 거부한다", () => {
  for (const companions of [-1, 1.5, "1", null, NaN, Infinity, 2147483648]) {
    assert.throws(() => parseRsvp({ name: "게스트", status: "yes", companions }), InputError);
  }
  assert.throws(() => parseRsvp({ name: " ", status: "yes", companions: 0 }), InputError);
  assert.throws(() => parseRsvp({ name: "게스트", status: "maybe", companions: 0 }), InputError);
});

test("초대장 ID는 UUID만 허용한다", () => {
  assert.equal(isInvitationId("12345678-1234-1234-1234-123456789abc"), true);
  for (const id of ["demo", "", "123&select=*", "../rsvps"]) {
    assert.equal(isInvitationId(id), false);
  }
});
