import { Reveal } from "../components/Reveal";
import { ParallaxImage } from "../components/ParallaxImage";
import { GoldArcSvg } from "../components/GoldArcSvg";
import { GoldButton } from "../components/GoldButton";
import { PurposeBubbles } from "../components/PurposeBubbles";
import { WAITLIST_ID } from "../lib/nav";
import { scrollToId } from "../lib/cn";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-navy-hero px-6 pt-[140px] pb-[90px]"
    >
      <div
        aria-hidden="true"
        className="animate-glow-pulse pointer-events-none absolute -top-[6%] left-1/2 h-[620px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(207,159,52,0.20),rgba(207,159,52,0.06)_55%,transparent_72%)]"
      />

      <ParallaxImage
        src="/assets/world-white.png"
        speed={0.05}
        className="w-[118%] max-w-[1500px] opacity-16"
      />

      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#cf9f34" stopOpacity="0" />
            <stop offset="0.5" stopColor="#e8c25a" stopOpacity="0.7" />
            <stop offset="1" stopColor="#cf9f34" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g
          stroke="url(#lineGold)"
          strokeWidth="1.1"
          fill="none"
          strokeDasharray="5 7"
          className="animate-dash-flow"
        >
          <path d="M250 215 L610 195" />
          <path d="M610 195 L835 205" />
          <path d="M610 195 L650 330" />
          <path d="M835 205 L770 300" />
          <path d="M835 205 L985 405" />
          <path d="M250 215 L360 400" />
          <path d="M650 330 L770 300" />
        </g>
        <g fill="#e8c25a">
          {[0, 0.6, 1.1, 1.6, 2.1, 2.6, 0.3].map((delay, i) => {
            const coords = [
              [250, 215],
              [610, 195],
              [835, 205],
              [650, 330],
              [770, 300],
              [985, 405],
              [360, 400],
            ][i];
            return (
              <circle
                key={i}
                cx={coords[0]}
                cy={coords[1]}
                r="2.6"
                style={{
                  animation: `nodeBlink 3.4s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </g>
      </svg>

      <GoldArcSvg
        animated
        className="pointer-events-none absolute top-[20px] left-1/2 h-auto w-[min(1180px,108%)] -translate-x-1/2 md:-top-10 md:w-[min(1180px,98%)] lg:-top-20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(4,11,28,0.55)_100%)]"
      />

      <PurposeBubbles
        variant="categories"
        theme="dark"
        className="z-[3]"
        showLines={false}
      />

      <div
        data-parallax="-0.03"
        className="relative z-5 flex max-w-[880px] flex-col items-center text-center"
      >
        <Reveal>
          <div className="mb-[30px] inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/7 px-4 py-[7px]">
            <span className="h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_10px_#e8c25a]" />
            <span className="text-[13px] font-semibold tracking-[1.4px] text-gold-chip uppercase">
              Pre-launch · Join the waitlist
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            id="hero-heading"
            className="m-0 font-display text-[clamp(46px,7.4vw,92px)] leading-[1.02] font-bold tracking-[-1.8px] text-white"
          >
            Funding goals,
            <br />
            <span className="text-shimmer-gold">simplified.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 max-w-[620px] text-[clamp(17px,1.5vw,20px)] leading-[1.62] text-[rgba(214,224,244,0.82)]">
            SFS is a campaign platform that helps individuals and families work
            toward the financial goals that matter most — through participation,
            education, rewards, and centralized marketing support.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GoldButton
              href={`#${WAITLIST_ID}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(WAITLIST_ID);
              }}
            >
              Join the waitlist
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0b1f44"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </GoldButton>
            <GoldButton
              variant="ghost"
              href="#how"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("how");
              }}
            >
              See how it works
            </GoldButton>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mt-[26px] text-sm tracking-wide text-[rgba(180,194,222,0.66)]">
            No payment required. Get launch updates and early access.
          </p>
        </Reveal>
      </div>

      <div className="absolute bottom-[30px] left-1/2 z-5 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[11px] tracking-[2.5px] text-[rgba(180,194,222,0.6)] uppercase">
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8c25a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bob-chevron"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
