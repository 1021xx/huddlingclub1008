"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import InvitationCover from "@/components/InvitationCover";
import Label from "@/components/Label";
import NavBar from "@/components/NavBar";
import SectionHeader from "@/components/SectionHeader";
import Textarea from "@/components/Textarea";
import CopyLinkField from "@/components/CopyLinkField";
import SuccessIcon from "@/components/SuccessIcon";
import HostNav from "@/components/HostNav";

export default function CreateScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [body, setBody] = useState("");
  const [publishedId, setPublishedId] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [publishedOrigin, setPublishedOrigin] = useState("");
  const titleTooLong = title.split("\n").length > 2;
  const canPublish = [title, date, location, body].every(value => value.trim()) && !titleTooLong;

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPublish || pending) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, location, body }),
      });
      const result = await response.json();
      if (response.status === 401) {
        router.push("/login?next=%2Fcreate");
        return;
      }
      if (!response.ok) {
        setError(result.error || "초대장을 발행하지 못했어요. 다시 시도해 주세요.");
        return;
      }
      if (typeof result.invitation?.id !== "string") throw new Error("Invalid response");
      setPublishedOrigin(window.location.origin);
      setPublishedId(result.invitation.id);
      window.scrollTo({ top: 0 });
    } catch {
      setError("초대장을 발행하지 못했어요. 연결을 확인하고 다시 시도해 주세요.");
    } finally {
      setPending(false);
    }
  }

  if (publishedId) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-invitation bg-surface-default">
        <NavBar title="발행 완료" />
        <div className="flex flex-col gap-section-lg px-page-horizontal pb-cover-inset">
          <HostNav />
          <div className="flex flex-col items-center gap-stack-sm py-section-lg text-center">
            <SuccessIcon />
            <SectionHeader
              showSubtitle={false}
              title="초대장이 발행됐어요!"
              description="아래 두 링크를 복사해 두세요."
            />
          </div>
          <CopyLinkField title="초대장 링크" url={`${publishedOrigin}/i/${publishedId}`} description="게스트에게 공유하는 초대장 링크예요." />
          <CopyLinkField title="응답 현황 링크" url={`${publishedOrigin}/i/${publishedId}/responses`} description="초대장을 만든 계정으로 로그인해야 볼 수 있어요." />
          <Button
            size="lg"
            className="w-full"
            onClick={() => router.push(`/i/${publishedId}`)}
          >내 초대장 보기</Button>
          <p className="text-caption-md text-text-tertiary">초대장이 저장됐어요. 링크로 언제든 다시 확인할 수 있어요.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-invitation bg-surface-default">
      <NavBar title="초대장 만들기" />
      <div className="px-page-horizontal py-control-compact"><HostNav /></div>
      <form id="create-invitation" onSubmit={publish} aria-busy={pending} className="create-content space-y-section-lg px-page-horizontal pt-control-compact">
        <fieldset disabled={pending} className="space-y-stack-lg">
          <Textarea
            label="제목"
            name="title"
            maxLength={200}
            rows={2}
            placeholder={"예) 허들링 클럽 2번째\n오프라인 밋업"}
            helper={titleTooLong ? "제목은 최대 2줄로 입력해 주세요." : "엔터로 줄을 나눌 수 있어요 · 최대 2줄"}
            showHelper
            value={title}
            aria-invalid={titleTooLong}
            onChange={event => setTitle(event.target.value)}
          />
          <Input label="일시" name="date" maxLength={200} placeholder="예) 2026년 11월 14일 (토) 09:00" value={date} onChange={event => setDate(event.target.value)} />
          <Input label="장소" name="location" maxLength={500} placeholder="예) 세종 남극 기지" value={location} onChange={event => setLocation(event.target.value)} />
          <Textarea label="본문" name="body" maxLength={10000} rows={4} value={body} onChange={event => setBody(event.target.value)} />
        </fieldset>
        {error && <p role="alert" className="text-caption-md text-feedback-error">{error}</p>}

        <section aria-labelledby="preview-label" className="flex h-create-preview min-h-none flex-col gap-inline-md">
          <Label id="preview-label" label="미리보기" required={false} />
          <div
            role="region"
            aria-label="초대장 미리보기"
            tabIndex={0}
            className="min-h-none flex-1 overflow-y-auto overscroll-contain rounded-control border-[length:var(--border-width-default)] border-border-subtle focus-visible:component-focus"
          >
            <InvitationCover title={title} date={date} location={location} className="[&_h2]:whitespace-pre-wrap [&_h2]:break-words [&_p]:whitespace-pre-wrap [&_p]:break-words" />
            <div className="flex flex-col items-center gap-stack-md px-page-horizontal py-cover-inset">
              <Image type="flag" alt="깃발" />
              <SectionHeader
                showSubtitle={false}
                showTitle={false}
                description={<span className="block whitespace-pre-wrap break-words text-body-compact">{body}</span>}
              />
            </div>
            <div className="px-page-horizontal pb-section-lg pt-stack-lg">
              <div className="space-y-control-compact rounded-card bg-surface-subtle p-page-horizontal [&_span]:whitespace-pre-wrap [&_span]:break-words">
                <InfoRow label="일시" value={date} />
                <InfoRow label="장소" value={location} />
              </div>
            </div>
          </div>
          <p className="text-caption-md text-text-tertiary">입력하는 내용이 바로 미리보기에 반영돼요.</p>
        </section>
      </form>

      <footer className="create-footer fixed bottom-0 left-1/2 z-10 w-full max-w-invitation -translate-x-1/2 bg-surface-default px-page-horizontal pt-page-horizontal">
        <Button type="submit" form="create-invitation" size="lg" className="w-full" disabled={!canPublish || pending}>{pending ? "발행하는 중…" : "발행하기"}</Button>
      </footer>
    </main>
  );
}
