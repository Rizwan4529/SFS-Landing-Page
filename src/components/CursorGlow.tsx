import { useEffect, useRef } from "react";

const LERP = 0.075;
const GLOW_SIZE = 350;

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const glow = glowRef.current;

    if (!glow || reduceMotion || coarsePointer) {
      glow?.classList.add("cursor-glow--off");
      return;
    }

    function onMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
      glow!.dataset.active = "true";
    }

    function onLeave() {
      glow!.dataset.active = "false";
    }

    function tick() {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      glow!.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      data-active="false"
      className="cursor-glow pointer-events-none fixed top-0 left-0 z-[45]"
      style={{ width: GLOW_SIZE, height: GLOW_SIZE }}
    />
  );
}
