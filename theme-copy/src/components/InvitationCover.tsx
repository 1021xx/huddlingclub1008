import NextImage from "next/image";
import PartyBots from "./PartyBots";
import BorderBeam from "./BorderBeam";
export default function InvitationCover({
  className = "", subtitle = "HUDDLING CLUB · HALLOWEEN NIGHT",
  title = "허들링 클럽\n할로윈 파티", date = "2026년 10월 31일 (토) 19:00",
  location = "허들링 아지트 · 서울",
}: { className?: string; subtitle?: string; title?: string; date?: string; location?: string }) {
  return <section className={`halloween-cover relative flex w-invitation max-w-full flex-col items-center overflow-hidden px-page-horizontal ${className}`}>
    <div className="party-edition text-caption-md"><span aria-hidden="true" /><span className="party-edition-date">{date.trim() || "일시를 입력해 주세요"}</span><span>VOL. 03</span></div>
    <p className="party-eyebrow">{subtitle}</p>
    <p className="party-wordmark" aria-hidden="true">TRICK OR<br /><span>TOGETHER.</span></p>
    <h2 className="party-title">{title || "우리의 할로윈 파티"}</h2>
    <div className="party-photo">
      <NextImage src="/halloween/pumpkin.jpg" alt="보랏빛 연기 속에서 빛나는 할로윈 호박" fill priority sizes="(max-width: 375px) 100vw, 335px" />
      <span className="party-photo-sticker">YOU&apos;RE<br />INVITED ↗</span>
      <BorderBeam />
    </div>
    <div className="party-mascots"><PartyBots /><span>무서운 건 잠깐,<br />즐거운 건 밤새.</span></div>
    <div className="party-ticket">
      {[["WHEN", date], ["WHERE", location]].map(([label, value]) => <div key={label}><span>{label}</span><p>{value || "곧 알려드릴게요"}</p></div>)}
    </div>
    <p className="party-cover-foot">COME AS YOU ARE. OR AS SOMEONE ELSE. ✦</p>
  </section>;
}
