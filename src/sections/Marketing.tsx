import { Reveal } from '../components/Reveal'
import { ParallaxImage } from '../components/ParallaxImage'

export function Marketing() {
  return (
    <section id="marketing" className="section-anchor relative overflow-hidden bg-gradient-to-br from-navy-darkest via-[#0c2150] to-[#10295e] px-gutter py-[160px]">
      <ParallaxImage
        src="/assets/world-white.png"
        speed={0.07}
        className="w-[120%] max-w-[1500px] opacity-10"
      />
      <div
        aria-hidden="true"
        className="animate-glow-pulse pointer-events-none absolute -top-[10%] -right-[5%] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(207,159,52,0.18),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="animate-float-y pointer-events-none absolute top-[24%] left-[8%] h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_20px_#e8c25a] opacity-70"
      />
      <div
        aria-hidden="true"
        className="animate-float-ysm pointer-events-none absolute right-[14%] bottom-[20%] h-[9px] w-[9px] rounded-full bg-gold shadow-[0_0_16px_#e8c25a] opacity-60"
      />

      <div className="relative mx-auto max-w-[920px] text-center">
        <Reveal>
          <span className="mb-6 inline-block text-[13px] font-bold tracking-[2px] text-gold uppercase">
            Centralized marketing support
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mx-auto m-0 max-w-[860px] font-display text-[clamp(38px,5.4vw,72px)] leading-[1.04] font-bold tracking-[-1.8px] text-white">
            You focus on the goal.
            <br />
            <span className="text-shimmer-gold">We handle the marketing.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-[680px] text-xl leading-[1.7] text-[rgba(214,224,244,0.8)]">
            Most people aren&apos;t marketing experts and shouldn&apos;t have to be. SFS provides
            centralized marketing support so you don&apos;t need to learn advertising or campaign
            optimization yourself — the platform manages it behind the scenes.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
