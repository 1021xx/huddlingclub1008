import Link from "next/link";

export default function ResponsesNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-invitation flex-col justify-center gap-stack-lg bg-surface-default px-page-horizontal text-center">
      <h1 className="text-heading-lg text-text-primary">응답 현황을 볼 수 없어요</h1>
      <p className="text-body-md text-text-tertiary">초대장을 만든 계정으로 로그인했는지 확인해 주세요. 초대장이 없거나 다른 호스트의 초대장이면 응답을 조회할 수 없어요.</p>
      <Link href="/host" className="text-body-md text-action-primary underline">내 초대장으로 돌아가기</Link>
    </main>
  );
}
