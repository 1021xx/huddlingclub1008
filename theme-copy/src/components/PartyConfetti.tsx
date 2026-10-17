"use client";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
/** UI Thing's canvas-confetti recommendation, adapted to React. */
export default function PartyConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fire = confetti.create(canvasRef.current, { resize: true });
    const timer = window.setTimeout(() => {
      const options = { particleCount: 75, spread: 70, startVelocity: 38, colors: ["#ff812f", "#ad79ff", "#f9deac"], disableForReducedMotion: true, ticks: 220 };
      fire({ ...options, angle: 65, origin: { x: 0, y: 0.7 } });
      fire({ ...options, angle: 115, origin: { x: 1, y: 0.7 } });
    }, 180);
    return () => { window.clearTimeout(timer); fire.reset(); };
  }, []);
  return <canvas ref={canvasRef} className="party-confetti" aria-hidden="true" />;
}
