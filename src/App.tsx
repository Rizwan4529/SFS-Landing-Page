import { useScrollEffects } from './hooks/useScrollEffects'
import { CursorGlow } from './components/CursorGlow'
import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Introducing } from './sections/Introducing'
import { Categories } from './sections/Categories'
import { HowItWorks } from './sections/HowItWorks'
import { Rewards } from './sections/Rewards'
import { Marketing } from './sections/Marketing'
import { Education } from './sections/Education'
import { WaitlistSection } from './sections/Waitlist'
import { Closing } from './sections/Closing'

function App() {
  useScrollEffects()

  return (
    <>
      <CursorGlow />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="relative w-full overflow-hidden">
        <Hero />
        <Problem />
        <Introducing />
        <Categories />
        <HowItWorks />
        <Rewards />
        <Marketing />
        <Education />
        <WaitlistSection />
        <Closing />
      </main>
    </>
  )
}

export default App
