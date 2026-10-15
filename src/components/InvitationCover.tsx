import SectionHeader from "./SectionHeader";
import Image from "./Image";
export default function InvitationCover({ className = "", subtitle = "Huddling Club 2nd Meetup", title = "허들링 클럽 2번째\n오프라인 밋업", date = "2026년 11월 14일 (토) 09:00", location = "세종 남극 기지" }: {
    className?: string;
    subtitle?: string;
    title?: string;
    date?: string;
    location?: string;
}) { return <section className={`flex w-invitation max-w-full flex-col items-center gap-page-horizontal overflow-hidden bg-linear-to-b from-cover-start to-cover-end px-page-horizontal py-cover-inset ${className}`}><SectionHeader subtitle={subtitle} title={title} showDescription={false} inverse/><Image alt="숫자 2 풍선을 든 두 펭귄"/>{[["일시", date], ["장소", location]].map(([label, value]) => <div key={label} className="flex w-full flex-col items-center gap-inline-md"><span className="rounded-control bg-info-subtle px-inline-compact py-inline-xs text-caption-preserved text-info-strong">{label}</span><p className="text-center text-detail-preserved text-text-inverse">{value}</p></div>)}</section>; }
