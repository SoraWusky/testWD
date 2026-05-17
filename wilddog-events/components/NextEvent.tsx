'use client'

import { useScrollReveal } from '@/lib/useScrollReveal'
import { nextEvent } from '@/data/events'
import WolfMark from './WolfMark'

function revealStyle(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 840ms cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 840ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
  }
}

export default function NextEvent() {
  const [ref, visible] = useScrollReveal<HTMLElement>()

  const statusLabel =
    nextEvent.status === 'sold-out'   ? 'SOLD OUT'
    : nextEvent.status === 'cancelled' ? 'CANCELLED'
    : 'COMING SOON'

  return (
    <section
      id="next-event"
      className="section-pad"
      ref={ref}
      aria-label="Next event and tickets"
    >
      <div className="inner">
        <div className="grid grid-cols-1 wolf:grid-cols-2 gap-10 items-start">

          {/* ── Left: visual panel ───────────────────────────────── */}
          <div
            className="relative flex flex-col items-center justify-center py-16 overflow-hidden"
            style={{
              clipPath: 'polygon(0 3%, 97% 0, 100% 97%, 3% 100%)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              minHeight: 340,
              ...revealStyle(visible, 0),
            }}
          >
            {/* Wolf watermark background */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <WolfMark
                size={220}
                style={{
                  opacity: 0.1,
                  filter: 'invert(1) brightness(0.9)',
                  mixBlendMode: 'normal',
                }}
              />
            </div>

            {/* Date display */}
            <div className="relative text-center">
              <p
                className="font-bebas text-dim"
                style={{ fontSize: 13, letterSpacing: '0.4em' }}
              >
                {nextEvent.month}
              </p>
              <p
                className="font-anton text-white leading-none"
                style={{ fontSize: 'clamp(72px, 10vw, 120px)' }}
              >
                {nextEvent.date}
              </p>
              <p
                className="font-bebas text-dim"
                style={{ fontSize: 13, letterSpacing: '0.4em' }}
              >
                {nextEvent.year}
              </p>
            </div>

            {/* Status badge */}
            <div
              className="relative mt-8 flex items-center gap-2 px-5 py-2"
              style={{ border: '1px solid var(--border)' }}
            >
              <span
                className="block w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                aria-hidden="true"
              />
              <span
                className="font-bebas text-white"
                style={{ fontSize: 12, letterSpacing: '0.38em' }}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          {/* ── Right: event details ──────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Event name */}
            <div style={revealStyle(visible, 100)}>
              <p
                className="eyebrow font-bebas mb-3"
                style={{ letterSpacing: '0.38em', fontSize: 11 }}
              >
                Next Event
              </p>
              <h2
                className="font-anton text-white leading-none"
                style={{ fontSize: 'clamp(44px, 7vw, 114px)' }}
              >
                {nextEvent.title}
              </h2>
              <span
                className="font-anton leading-none text-hollow block"
                style={{ fontSize: 'clamp(22px, 3vw, 42px)', marginTop: 2 }}
              >
                {nextEvent.subtitle}
              </span>
            </div>

            {/* Meta row */}
            <dl
              className="grid grid-cols-2 gap-4"
              style={revealStyle(visible, 180)}
            >
              {[
                { label: 'Date',     value: nextEvent.date },
                { label: 'Doors',    value: nextEvent.doors },
                { label: 'Venue',    value: nextEvent.venue },
                { label: 'Capacity', value: `${nextEvent.capacity}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt
                    className="font-bebas text-dim"
                    style={{ fontSize: 11, letterSpacing: '0.38em' }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="font-anton text-white"
                    style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', letterSpacing: '0.04em' }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Description */}
            <p
              className="font-archivo"
              style={{
                fontSize: 'clamp(14px, 1.1vw, 17px)',
                lineHeight: 1.72,
                color: 'rgba(240,240,240,.52)',
                ...revealStyle(visible, 240),
              }}
            >
              {nextEvent.description}
            </p>

            {/* Ticket block */}
            <div
              className="relative mt-2"
              style={{
                border: '1px solid var(--border)',
                padding: '28px 24px 24px',
                ...revealStyle(visible, 300),
              }}
            >
              {/* Floating label on top border */}
              <span
                className="absolute font-bebas bg-bg px-2"
                style={{
                  top: -9,
                  left: 20,
                  fontSize: 11,
                  letterSpacing: '0.38em',
                  color: 'var(--dim)',
                }}
              >
                TICKETS
              </span>

              {/* Price + tier */}
              <div className="flex items-end gap-3 mb-5">
                <span
                  className="font-anton text-white leading-none"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
                >
                  ${nextEvent.ticketPrice}
                </span>
                <span
                  className="font-bebas text-dim mb-1"
                  style={{ fontSize: 12, letterSpacing: '0.28em' }}
                >
                  {nextEvent.ticketTier}
                </span>
              </div>

              {/* Primary CTA */}
              <a
                href={nextEvent.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-anton bg-white text-black py-4 hover:-translate-y-[3px] hover:scale-[1.016] hover:bg-white/90 transition-all duration-200"
                style={{ fontSize: 17, letterSpacing: '0.1em' }}
                aria-label={`Buy tickets for ${nextEvent.title} — ${nextEvent.ticketTier} $${nextEvent.ticketPrice}`}
              >
                CLAIM YOUR SPOT →
              </a>

              {/* Fine print */}
              <p
                className="font-archivo text-center mt-4"
                style={{ fontSize: 12, color: 'rgba(240,240,240,.3)' }}
              >
                🔒 Secure checkout · Limited capacity · No refunds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
