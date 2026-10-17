import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import NavBar from "@/components/NavBar";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import ResponseRowTrue from "@/components/ResponseRow/true";
import { getMockInvitation } from "@/lib/mock";
import CopyInvitationButton from "./CopyInvitationButton";

export const metadata: Metadata = {
  title: "응답 현황 | Huddling Club",
  robots: { index: false, follow: false },
};

export default async function ResponsesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invitation = getMockInvitation(id);
  if (!invitation) notFound();
  const { responses } = invitation;
  const attending = responses.filter(response => response.status === "yes");
  const absent = responses.filter(response => response.status === "no");
  const total = attending.reduce((sum, response) => sum + 1 + response.companions, 0);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-invitation bg-surface-default">
      <NavBar title="응답 현황" />
      <div className="space-y-section-lg px-page-horizontal pb-cover-inset pt-page-horizontal">
        <SectionHeader subtitle="Responses" title={invitation.title} description={`${invitation.date} · ${invitation.location}`} />
        <div className="flex gap-inline-md">
          <StatCard className="min-w-none flex-1" label="참석" value={`${attending.length}명`} />
          <StatCard className="min-w-none flex-1" label="불참" value={`${absent.length}명`} />
          <StatCard className="min-w-none flex-1" label="참석 인원 합계" value={`${total}명`} highlight />
        </div>
        <p className="text-caption-md text-text-tertiary">참석 인원 합계 = 참석한 사람 + 동반 인원</p>
        <section aria-labelledby="response-list-title" className="space-y-inline-md">
          <h2 id="response-list-title" className="text-heading-md text-text-strong">응답 목록</h2>
          {responses.length === 0 ? <EmptyState /> : (
            <ul className="space-y-inline-md">
              {responses.map((response, index) => (
                <li key={index}>
                  <ResponseRowTrue
                    name={response.name}
                    status={response.status}
                    meta={response.status === "yes" ? `동반 ${response.companions}명` : ""}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
        <CopyInvitationButton id={id} />
        <p className="text-caption-md text-text-tertiary">실습용 가짜 데이터입니다. 실제 응답이나 호스트 인증과 연결되지 않아요.</p>
      </div>
    </main>
  );
}
