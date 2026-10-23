export function authConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export function authConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase 환경변수를 설정해 주세요.");
  return { url, key };
}

export function safeNext(value: unknown) {
  if (typeof value !== "string") return "/create";
  if (value === "/create" || value === "/host") return value;
  return /^\/i\/[0-9a-f-]{36}\/responses$/i.test(value) ? value : "/create";
}
