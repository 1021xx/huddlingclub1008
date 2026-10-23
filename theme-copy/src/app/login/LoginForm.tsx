"use client";

import { useActionState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { authenticate } from "./actions";

export default function LoginForm({ next, configured }: { next: string; configured: boolean }) {
  const [state, action, pending] = useActionState(authenticate, {});
  return (
    <form action={action} aria-busy={pending} className="space-y-stack-lg">
      <input type="hidden" name="next" value={next} />
      <fieldset disabled={pending || !configured} className="space-y-stack-md">
        <Input label="이메일" name="email" type="email" autoComplete="email" placeholder="hello@example.com" maxLength={254} />
        <Input label="비밀번호" name="password" type="password" autoComplete="current-password"
          placeholder="비밀번호를 입력해 주세요" minLength={1} maxLength={128} />
      </fieldset>
      {state.error && <p role="alert" className="text-body-md text-feedback-error">{state.error}</p>}
      <Button type="submit" size="lg" disabled={pending || !configured} className="w-full">
        {pending ? "잠시만 기다려 주세요…" : "로그인"}
      </Button>
    </form>
  );
}
