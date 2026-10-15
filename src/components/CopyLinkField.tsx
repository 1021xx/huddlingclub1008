"use client";
import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
export default function CopyLinkField({ className = "", title = "초대장 링크", description = "게스트에게 공유하는 링크예요.", url = "" }: {
    className?: string;
    title?: string;
    description?: string;
    url?: string;
}) { const [message, setMessage] = useState(""); async function copy() { try {
    await navigator.clipboard.writeText(url);
    setMessage("링크를 복사했어요.");
}
catch {
    setMessage("복사하지 못했어요. 링크를 선택해 직접 복사해 주세요.");
} } return <section className={`flex w-full flex-col gap-inline-md rounded-card bg-surface-subtle p-stack-md ${className}`}><h3 className="text-label-lg text-text-strong">{title}</h3><div className="flex items-center gap-inline-md"><InputField aria-label={title} value={url} placeholder="…/i/k3f9x2a7" readOnly className="flex-1"/><Button onClick={copy} disabled={!url}>복사</Button></div><p className="text-caption-md text-text-tertiary">{description}</p><p role="status" className={message ? "text-caption-md text-text-tertiary" : "sr-only"}>{message}</p></section>; }
