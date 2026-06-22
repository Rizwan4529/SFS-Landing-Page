import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WAITLIST_ID } from "../lib/nav";
import { scrollToId } from "../lib/cn";
import { trackCtaClick } from "../lib/analytics";

const MENU_EASE = [0.16, 0.84, 0.34, 1] as const;
const FOOTER_HIDE_OFFSET = 400;

export function StickyWaitlistBar() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const waitlist = document.getElementById(WAITLIST_ID);
    const footer = document.getElementById("site-footer");

    function update() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const pastHero = scrollY > 100;

      let waitlistInView = false;
      if (waitlist) {
        const rect = waitlist.getBoundingClientRect();
        waitlistInView = rect.top < vh * 0.85 && rect.bottom > 0;
      }

      let nearFooter = false;
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        nearFooter = footerTop < vh + FOOTER_HIDE_OFFSET;
      }

      setVisible(pastHero && !waitlistInView && !nearFooter);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    trackCtaClick("sticky");
    scrollToId(WAITLIST_ID);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-waitlist"
          role="complementary"
          aria-label="Join the waitlist"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: MENU_EASE }}
          className="fixed inset-x-0 bottom-0 z-190 border-t border-white/10 bg-[rgba(6,18,46,0.92)] px-4 py-3 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-page items-center justify-between gap-3">
            <p className="hidden text-sm text-[rgba(214,224,244,0.88)] sm:block">
              <span className="font-bold text-gold">Launching soon</span>
              {" · "}
              Join the waitlist for early access at launch.
            </p>
            <p className="text-xs font-medium leading-snug text-[rgba(214,224,244,0.8)] sm:hidden">
              <span className="text-gold">Launching soon</span> — early access
              at launch
            </p>
            <a
              href={`#${WAITLIST_ID}`}
              onClick={handleClick}
              className="interactive-btn shrink-0 rounded-brand bg-gradient-gold px-5 py-2.5 font-display text-sm font-bold tracking-wide text-[#0b1f44] shadow-[0_8px_24px_rgba(207,159,52,0.4)] hover:shadow-[0_12px_32px_rgba(207,159,52,0.55)]"
            >
              Join for early access
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
