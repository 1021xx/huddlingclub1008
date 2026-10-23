import type { Metadata } from "next";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import SectionHeader from "@/components/SectionHeader";
import { currentUser } from "@/lib/auth/server";
import { authConfigured, safeNext } from "@/lib/auth/config";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "호스트 로그인 | Huddling Club", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  const next = safeNext(params.next);
  if (await currentUser()) redirect(next);
  const configured = authConfigured();
  return (
    <main className="mx-auto min-h-dvh w-full max-w-invitation bg-surface-default">
      <NavBar title="Huddling Club" />
      <div className="space-y-section-lg px-page-horizontal pb-cover-inset pt-section-lg">
        <SectionHeader subtitle="For hosts" title="호스트 로그인" description="등록된 호스트 계정으로 로그인해 주세요. 참석 응답은 초대장을 만든 호스트만 볼 수 있어요." />
        {!configured && <p role="status" className="rounded-control bg-surface-subtle p-stack-md text-body-md text-text-tertiary">로그인 연결을 준비 중이에요. 연결 설정이 완료되면 로그인할 수 있어요.</p>}
        {params.error && <p role="alert" className="text-body-md text-feedback-error">인증 링크가 만료되었거나 유효하지 않아요. 등록된 이메일과 비밀번호로 로그인해 주세요.</p>}
        <LoginForm next={next} configured={configured} />
        <p className="text-center text-caption-md text-text-tertiary">초대받은 게스트는 로그인 없이 참석 여부를 보낼 수 있어요.</p>
      </div>
    </main>
  );
}
