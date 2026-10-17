export type StatCardProps = {
    className?: string;
    highlight?: boolean;
    label?: string;
    value?: string | number;
};
export default function StatCard({ className = "", highlight = false, label = "참석", value = "2명" }: StatCardProps) { return <div className={`flex w-stat-card max-w-full flex-col items-center gap-inline-sm rounded-card px-control-x py-stack-md ${highlight ? "bg-info-subtle" : "bg-surface-subtle"} ${className}`}><p className="text-caption-md text-text-secondary">{label}</p><p className={`text-title-lg ${highlight ? "text-info-strong" : "text-text-strong"}`}>{value}</p></div>; }
