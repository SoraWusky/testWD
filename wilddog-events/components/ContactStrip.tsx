'use client'

import { useScrollReveal } from '@/lib/useScrollReveal'

const email = process.env['NEXT_PUBLIC_EMAIL'] ?? 'howl@wilddogevents.com'

export default function ContactStrip() {
  const [ref, visible] = useScrollReveal<HTMLElement>()

  function revealStyle(delay = 0): React.CSSProperties {
    return {
      opacity:    visible ? 1 : 0,
      transform:  visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 840ms cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 840ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
    }
  }

  return (
    <section
      id="contact"
      className="section-pad text-center"
      ref={ref}
      aria-label="Contact and booking"
      style={{ background: 'var(--surface)' }}
    >
      <div className="inner flex flex-col items-center">
        {/* Eyebrow */}
        <p
          className="eyebrow font-bebas mb-4"
          style={revealStyle(0)}
        >
          LET&apos;S BUILD SOMETHING
        </p>

        {/* Heading */}
        <h2
          className="font-anton leading-none mb-6"
          style={{ fontSize: 'clamp(44px, 7vw, 114px)', ...revealStyle(80) }}
        >
          <span className="text-white block">TURN YOUR</span>
          <span className="text-hollow block">YARD FERAL</span>
        </h2>

        {/* Body */}
        <p
          className="font-archivo max-w-lg mb-10"
          style={{
            fontSize:   'clamp(14px, 1.1vw, 17px)',
            lineHeight: 1.72,
            color:      'rgba(240,240,240,.52)',
            ...revealStyle(160),
          }}
        >
          Got a yard? We&apos;ll bring the sound, lighting, staging, and everything else. We handle the full production — you provide the space. Reach out and we&apos;ll scope it with you within 48 hours.
        </p>

        {/* Animated email link */}
        <div style={revealStyle(240)}>
          <a
            href={`mailto:${email}`}
            className="font-anton group relative text-white inline-block"
            style={{ fontSize: 'clamp(18px, 2.4vw, 30px)', letterSpacing: '0.06em' }}
            aria-label={`Email us at ${email}`}
          >
            {email}
            {/* Underline that expands from 0 to full on hover */}
            <span
              className="block mt-1 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
