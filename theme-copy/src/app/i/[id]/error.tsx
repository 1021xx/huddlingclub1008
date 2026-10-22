"use client";

import Link from "next/link";
import Button from "@/components/Button";

export default function InvitationError() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-invitation flex-col justify-center gap-stack-lg bg-surface-default px-page-horizontal text-center">
      <h1 className="text-heading-lg text-text-strong">초대장을 불러오지 못했어요</h1>
      <p className="text-body-md text-text-secondary">연결을 확인하고 잠시 후 다시 시도해 주세요.</p>
      <Button size="lg" onClick={() => window.location.reload()}>다시 시도하기</Button>
      <Link href="/create" className="text-body-md text-text-primary underline">초대장 만들기</Link>
    </main>
  );
}
