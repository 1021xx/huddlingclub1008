"use client";
import { useCallback, useState } from "react";
import { BotAvatar } from "bot-avatars";
export default function PartyBots({ compact = false }: { compact?: boolean }) {
  const [ghostColor, setGhostColor] = useState<string>();
  const resolveGhostColor = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    // Canvas avatars need the resolved color rather than a CSS var() string.
    setGhostColor(getComputedStyle(element).getPropertyValue("--color-party-ghost").trim());
  }, []);
  return <div ref={resolveGhostColor} className={compact ? "party-bots party-bots--compact" : "party-bots"}>
    <BotAvatar type="ghost" color={ghostColor} size={compact ? 76 : "var(--party-bot-ghost-size, 112px)"} theme="dark" face="mouth" shading="fabric" seed={0.2} />
    {!compact && <BotAvatar type="cat" color="#ff822d" size="var(--party-bot-cat-size, 96px)" theme="dark" shading="fabric" seed={0.7} hat="party" accessoryColor="#a878ee" />}
  </div>;
}
