"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function CopyInvitationButton({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(new URL(`/i/${encodeURIComponent(id)}`, window.location.origin).href);
      setMessage("초대장 링크를 복사했어요.");
    } catch {
      setMessage("복사하지 못했어요. 초대장 페이지의 주소를 직접 복사해 주세요.");
    }
  }
  return (
    <div className="space-y-inline-md">
      <Button size="lg" className="w-full" onClick={copy}>초대장 링크 복사하기</Button>
      <p role="status" className="text-caption-md text-text-tertiary">{message}</p>
    </div>
  );
}
