import { NextResponse, type NextRequest } from "next/server";
import { createAuthClient } from "@/lib/auth/server";
import { safeNext } from "@/lib/auth/config";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = safeNext(request.nextUrl.searchParams.get("next"));
  if (code) {
    try {
      const client = await createAuthClient();
      const { error } = await client.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(next, request.url));
    } catch { /* Show a recoverable error on the login page. */ }
  }
  return NextResponse.redirect(new URL("/login?error=confirmation", request.url));
}
