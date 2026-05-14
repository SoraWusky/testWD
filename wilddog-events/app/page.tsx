import FluidBackground from './components/FluidBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import FluidTransition from './components/FluidTransition'
import EventFeed from './components/EventFeed'
import AboutSection from './components/AboutSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import LenisProvider from './components/LenisProvider'

export default function Page() {
  return (
    <LenisProvider>
      {/* Fixed animated background — sits behind everything */}
      <FluidBackground />

      {/* Floating navigation */}
      <Navigation />

      {/* Main content stacked over background */}
      <main>
        <Hero />
        <FluidTransition />
        <EventFeed />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </LenisProvider>
  )
}
