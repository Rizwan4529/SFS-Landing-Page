import { useScrollEffects } from './hooks/useScrollEffects'
import { CursorGlow } from './components/CursorGlow'
import { SiteChrome } from './components/SiteChrome'
import { StickyWaitlistBar } from './components/StickyWaitlistBar'
import { VideoFab } from './components/VideoFab'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { ExplainerVideo } from './sections/ExplainerVideo'
import { Introducing } from './sections/Introducing'
import { TrustPreLaunch } from './sections/TrustPreLaunch'
import { WaitlistSection } from './sections/Waitlist'
import { Categories } from './sections/Categories'
import { HowItWorks } from './sections/HowItWorks'
import { Rewards } from './sections/Rewards'
import { Marketing } from './sections/Marketing'
import { Education } from './sections/Education'
import { Faq } from './sections/Faq'
import { Closing } from './sections/Closing'

function App() {
  useScrollEffects()

  return (
    <>
      <CursorGlow />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteChrome />
      <StickyWaitlistBar />
      <VideoFab />
      <main id="main" className="relative w-full overflow-hidden">
        <Hero />
        <Problem />
        <ExplainerVideo />
        <Introducing />
        <TrustPreLaunch />
        <WaitlistSection />
        <Categories />
        <HowItWorks />
        <Rewards />
        <Marketing />
        <Education />
        <Faq />
        <Closing />
      </main>
    </>
  )
}

export default App
