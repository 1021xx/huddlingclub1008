export type AttendanceBadgeProps = {
    className?: string;
    status?: "yes" | "no";
};
export default function AttendanceBadge({ className = "", status = "yes" }: AttendanceBadgeProps) { return <span className={`inline-flex rounded-pill px-control-compact py-inline-sm text-label-md whitespace-nowrap ${status === "yes" ? "bg-info-subtle text-info-strong" : "bg-background-subtle text-text-secondary"} ${className}`}>{status === "yes" ? "참석" : "불참"}</span>; }
