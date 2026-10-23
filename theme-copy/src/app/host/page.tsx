import Link from "next/link";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import HostNav from "@/components/HostNav";
import SectionHeader from "@/components/SectionHeader";
import { requireUser } from "@/lib/auth/server";
import { getHostInvitations } from "@/lib/supabase";

export const metadata: Metadata = { title: "내 초대장 | Huddling Club", robots: { index: false, follow: false } };

export default async function HostPage() {
  const user = await requireUser("/host");
  const invitations = await getHostInvitations();
  return (
    <main className="mx-auto min-h-dvh w-full max-w-invitation bg-surface-default">
      <NavBar title="내 초대장" />
      <div className="space-y-stack-lg px-page-horizontal pb-cover-inset pt-page-horizontal">
        <HostNav />
        <SectionHeader subtitle="Host" title="내가 만든 만남" description="초대장과 참석 응답을 한곳에서 확인하세요." />
        <p className="break-all text-caption-md text-text-tertiary">{user.email} 계정으로 로그인했어요.</p>
        <Link href="/create" className="flex h-button-lg items-center justify-center rounded-control bg-action-primary text-label-lg text-text-inverse">새 초대장 만들기</Link>
        {invitations.length === 0 ? <p className="py-stack-lg text-body-md text-text-tertiary">아직 만든 초대장이 없어요. 첫 만남을 준비해 보세요.</p> : (
          <ul className="space-y-stack-md">
            {invitations.map(invitation => (
              <li key={invitation.id} className="space-y-stack-sm rounded-card bg-surface-subtle p-page-horizontal">
                <h2 className="whitespace-pre-wrap break-words text-heading-md text-text-primary">{invitation.title}</h2>
                <p className="break-words text-body-md text-text-tertiary">{invitation.date} · {invitation.location}</p>
                <div className="flex flex-wrap gap-stack-md text-label-md text-action-primary">
                  <Link href={`/i/${invitation.id}`} className="underline underline-offset-4 focus-visible:component-focus">초대장 보기</Link>
                  <Link href={`/i/${invitation.id}/responses`} className="underline underline-offset-4 focus-visible:component-focus">응답 현황</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
