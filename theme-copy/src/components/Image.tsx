import PartyBots from "./PartyBots";
export type ImageProps = { type?: "character" | "flag"; alt?: string; className?: string };
export default function Image({ type = "character", className = "" }: ImageProps) {
  return <div className={`party-image ${className}`}>{type === "flag" ? <span className="party-spark" aria-hidden="true">✦</span> : <PartyBots />}</div>;
}
