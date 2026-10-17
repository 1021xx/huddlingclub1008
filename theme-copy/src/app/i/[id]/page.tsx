import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import InvitationCover from "@/components/InvitationCover";
import { getMockInvitation } from "@/lib/mock";
import { notFound } from "next/navigation";
import AttendanceForm from "./AttendanceForm";

export const metadata: Metadata = {
  title: "초대장 | Huddling Club",
  robots: { index: false, follow: false },
};

export default async function InvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invitation = getMockInvitation(id);
  if (!invitation) notFound();
  const { title, date, location, body } = invitation;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-invitation bg-surface-default">
      <nav className="party-site-nav" aria-label="주요 메뉴"><Link href="/">HUDDLING CLUB ✦</Link><Link href="/create">초대장 만들기 ↗</Link></nav>
      <h1 className="sr-only">{title}</h1>
      <InvitationCover
        title={title}
        date={date}
        location={location}
        className="[&_h2]:whitespace-pre-wrap [&_h2]:break-words [&_p]:whitespace-pre-wrap [&_p]:break-words"
      />
      <section aria-label="초대 글" className="flex flex-col items-center gap-stack-md px-page-horizontal py-cover-inset">
        <Image type="flag" alt="깃발" />
        <p className="w-full whitespace-pre-wrap break-words text-center text-invitation-body text-text-primary">{body}</p>
      </section>
      <section aria-label="행사 정보" className="px-page-horizontal pb-section-lg pt-stack-lg">
        <div className="space-y-control-compact rounded-card bg-surface-subtle p-page-horizontal [&_span]:whitespace-pre-wrap [&_span]:break-words">
          <InfoRow label="일시" value={date} />
          <InfoRow label="장소" value={location} />
        </div>
      </section>
      <section aria-label="참석 신청" className="bg-background-subtle px-page-horizontal pb-section-xl pt-section-lg">
        <AttendanceForm />
      </section>
      <footer className="party-footer"><p>A LITTLE SPOOKY. A LOT OF FUN.</p><div><Link href="/create">초대장 만들기</Link><Link href={`/i/${id}/responses`}>응답 현황 보기 ↗</Link></div></footer>
    </main>
  );
}
