import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authConfig, authConfigured } from "./config";

export async function createAuthClient() {
  const store = await cookies();
  const { url, key } = authConfig();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(values) {
        try {
          values.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server Components cannot write cookies; proxy handles refresh.
        }
      },
    },
  });
}

export async function currentUser() {
  if (!authConfigured()) return null;
  const client = await createAuthClient();
  const { data, error } = await client.auth.getUser();
  return error ? null : data.user;
}

export async function requireUser(next: string) {
  const user = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}
