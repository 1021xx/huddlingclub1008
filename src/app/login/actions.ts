"use server";

import { redirect } from "next/navigation";
import { authConfigured, safeNext } from "@/lib/auth/config";
import { createAuthClient } from "@/lib/auth/server";

export type AuthState = { error?: string };

export async function authenticate(_state: AuthState, form: FormData): Promise<AuthState> {
  if (!authConfigured()) return { error: "Supabase 연결 설정 후 로그인할 수 있어요." };
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const next = safeNext(form.get("next"));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 128) {
    return { error: "이메일과 비밀번호를 확인해 주세요." };
  }
  try {
    const client = await createAuthClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) return { error: "이메일 또는 비밀번호가 올바르지 않거나 이메일 인증이 필요해요." };
  } catch {
    return { error: "연결하지 못했어요. 잠시 후 다시 시도해 주세요." };
  }
  redirect(next);
}

export async function signOut() {
  const client = await createAuthClient();
  const { error } = await client.auth.signOut();
  if (error) throw new Error("로그아웃하지 못했어요. 다시 시도해 주세요.");
  redirect("/login");
}
