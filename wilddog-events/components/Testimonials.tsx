'use client'

import { useScrollReveal } from '@/lib/useScrollReveal'

interface Testimonial {
  quote:       string
  attribution: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:       'Best sound system I\'ve heard in a backyard. Period. The sub hit different — you felt it in your chest from 20 feet away. Wild Dogs knows what they\'re doing.',
    attribution: '— @marzipan_rave, attended Feral Nights',
  },
  {
    quote:       'I\'ve been to clubs in Berlin and this backyard in Surrey had better lighting. No joke. The atmosphere was dialled in from the first track to the last.',
    attribution: '— S.K., attended Winter Howl',
  },
  {
    quote:       'Bought a ticket skeptically. Drove home at 4am convinced this is the best event series running in BC. Already waiting for the next announcement in Telegram.',
    attribution: '— T.M., attended Dog Days 01',
  },
]

export default function Testimonials() {
  const [ref, visible] = useScrollReveal<HTMLElement>()

  return (
    <section
      id="testimonials"
      className="section-pad"
      ref={ref}
      aria-label="Testimonials"
      style={{ background: 'var(--surface)' }}
    >
      <div className="inner">
        {/* Header */}
        <div
          className="mb-12"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 840ms cubic-bezier(.2,.8,.2,1), transform 840ms cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <p className="eyebrow font-bebas mb-3">From The Pack</p>
          <h2
            className="font-anton leading-none"
            style={{ fontSize: 'clamp(44px, 7vw, 114px)' }}
          >
            <span className="text-white">THE </span>
            <span className="text-hollow">WORD</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 wolf:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-4 p-8"
              style={{
                background:  'var(--bg)',
                border:      '1px solid var(--border)',
                opacity:     visible ? 1 : 0,
                transform:   visible ? 'translateY(0)' : 'translateY(22px)',
                transition:  `opacity 840ms cubic-bezier(.2,.8,.2,1) ${i * 100}ms, transform 840ms cubic-bezier(.2,.8,.2,1) ${i * 100}ms`,
              }}
            >
              {/* Decorative opening quote */}
              <span
                className="font-anton text-white select-none"
                style={{ fontSize: 48, opacity: 0.16, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote>
                <p
                  className="font-archivo italic"
                  style={{
                    fontSize:   'clamp(14px, 1.1vw, 16px)',
                    lineHeight: 1.72,
                    color:      'rgba(240,240,240,.72)',
                    marginTop:  -16,
                  }}
                >
                  {t.quote}
                </p>
              </blockquote>

              {/* Attribution */}
              <footer>
                <p
                  className="font-bebas text-dim"
                  style={{ fontSize: 11, letterSpacing: '0.28em' }}
                >
                  {t.attribution}
                </p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
