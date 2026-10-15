export type InfoRowProps = {
    className?: string;
    label?: string;
    type?: "inline" | "spread";
    value?: string;
};
export default function InfoRow({ className = "", label = "일시", type = "inline", value = "2026년 11월 14일 (토) 09:00" }: InfoRowProps) { const spread = type === "spread"; return <div className={`flex items-center gap-control-compact ${spread ? "w-full" : ""} ${className}`}><span className={`shrink-0 text-text-secondary ${spread ? "text-body-md" : "text-label-lg"}`}>{label}</span>{!spread && <span aria-hidden="true" className="h-guide-row w-hairline shrink-0 bg-border-default"/>}<span className={`min-w-none text-text-strong ${spread ? "flex-1 text-right text-label-md" : "text-label-lg"}`}>{value}</span></div>; }
