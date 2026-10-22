import Link from "next/link";

export default function InvitationNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-invitation flex-col justify-center gap-stack-lg bg-surface-default px-page-horizontal text-center">
      <h1 className="text-heading-lg text-text-strong">초대장을 찾을 수 없어요</h1>
      <p className="text-body-md text-text-secondary">공유받은 링크가 올바른지 확인해 주세요.</p>
      <Link href="/create" className="text-body-md text-text-primary underline">초대장 만들기</Link>
    </main>
  );
}
