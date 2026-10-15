export type EmptyStateProps = {
    className?: string;
    title?: string;
    description?: string;
};
export default function EmptyState({ className = "", title = "아직 응답이 없어요", description = "초대장 링크를 공유하면 응답이 여기에 쌓여요." }: EmptyStateProps) { return <div className={`flex w-full flex-col items-center gap-inline-md rounded-card bg-surface-subtle px-page-horizontal py-section-lg text-center ${className}`}><h3 className="text-heading-md text-text-strong">{title}</h3><p className="text-body-md text-text-tertiary">{description}</p></div>; }
