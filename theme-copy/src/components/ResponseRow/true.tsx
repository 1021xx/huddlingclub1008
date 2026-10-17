import AttendanceBadge, { type AttendanceBadgeProps } from "../AttendanceBadge";
export default function ResponseRowTrue({ className = "", name = "김허들", meta = "010-****-1234 · 굿즈 M", status = "yes" }: {
    className?: string;
    name?: string;
    meta?: string;
    status?: AttendanceBadgeProps["status"];
}) { return <div className={`flex min-h-response-row w-full items-center gap-stack-sm rounded-card border-[length:var(--border-width-default)] border-border-subtle bg-surface-default p-stack-md ${className}`}><div className="min-w-none flex-1 space-y-inline-sm"><p className="text-label-lg text-text-primary">{name}</p>{meta && <p className="text-caption-md text-text-tertiary">{meta}</p>}</div><AttendanceBadge status={status}/></div>; }
