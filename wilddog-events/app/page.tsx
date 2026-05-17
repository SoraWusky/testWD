import LenisProvider       from '@/components/LenisProvider'
import { WolfMarkFixed }   from '@/components/WolfMark'
import Nav                 from '@/components/Nav'
import Hero                from '@/components/Hero'
import ClawDivider         from '@/components/ClawDivider'
import NextEvent           from '@/components/NextEvent'
import WhatWeDo            from '@/components/WhatWeDo'
import CommunitySection    from '@/components/CommunitySection'
import PastRuns            from '@/components/PastRuns'
import Testimonials        from '@/components/Testimonials'
import FAQ                 from '@/components/FAQ'
import ContactStrip        from '@/components/ContactStrip'
import Footer              from '@/components/Footer'

export default function Home() {
  return (
    <LenisProvider>
      {/* Persistent fixed wolf mark — desktop only */}
      <WolfMarkFixed />

      {/* Fixed navigation */}
      <Nav />

      <main>
        <Hero />
        <ClawDivider direction="ltr" />
        <NextEvent />
        <ClawDivider direction="rtl" />
        <WhatWeDo />
        <ClawDivider direction="ltr" />
        <CommunitySection />
        <ClawDivider direction="rtl" />
        <PastRuns />
        <ClawDivider direction="ltr" />
        <Testimonials />
        <ClawDivider direction="rtl" />
        <FAQ />
        <ClawDivider direction="ltr" />
        <ContactStrip />
      </main>

      <Footer />
    </LenisProvider>
  )
}
