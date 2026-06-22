/** Pre-launch ribbon — sits below header inside SiteChrome. */
export function PreLaunchRibbon() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="prelaunch-ribbon w-full border-b border-gold/35 bg-[linear-gradient(90deg,rgba(6,18,46,0.97),rgba(12,31,68,0.97),rgba(6,18,46,0.97))] px-4 py-2.5 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/12 px-3 py-0.5 text-[11px] font-bold tracking-[1.6px] text-gold uppercase">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_8px_#e8c25a] animate-glow-pulse" />
          Launching soon
        </span>
        <p className="m-0 text-[13px] font-medium leading-snug text-[rgba(234,240,251,0.92)] sm:text-sm">
          Join the waitlist for early access when Share Fund System launches.
        </p>
      </div>
    </div>
  )
}
