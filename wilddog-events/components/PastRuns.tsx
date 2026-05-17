'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/useScrollReveal'
import { pastEvents } from '@/data/events'
import WolfMark from './WolfMark'

function EventCard({
  e,
  delay,
  visible,
}: {
  e: (typeof pastEvents)[number]
  delay: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio:      '3/4',
        background:       'var(--surface)',
        border:           '1px solid var(--border)',
        cursor:           e.recapUrl ? 'pointer' : 'default',
        opacity:          visible ? 1 : 0,
        transform:        visible ? 'translateY(0)' : 'translateY(22px)',
        transition:       `opacity 840ms cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 840ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (e.recapUrl) window.open(e.recapUrl, '_blank') }}
      role={e.recapUrl ? 'link' : undefined}
      tabIndex={e.recapUrl ? 0 : undefined}
      aria-label={e.recapUrl ? `View recap for ${e.title}` : undefined}
      onKeyDown={e.recapUrl ? (ev) => { if (ev.key === 'Enter') window.open(e.recapUrl, '_blank') } : undefined}
    >
      {/* Wolf watermark — lightens on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <WolfMark
          size={160}
          style={{
            opacity:    hovered ? 0.22 : 0.1,
            filter:     'invert(1) brightness(0.9)',
            mixBlendMode: 'normal',
            transform:  hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity .4s ease, transform .4s ease',
          }}
        />
      </div>

      {/* Background scale on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'var(--surface)',
          transform:  hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform .6s cubic-bezier(.2,.8,.2,1)',
        }}
      />

      {/* Hover overlay with recap link */}
      {e.recapUrl && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity:    hovered ? 1 : 0,
            transition: 'opacity .3s ease',
            background: 'rgba(5,5,5,.55)',
          }}
        >
          <span
            className="font-archivo px-5 py-2 text-white"
            style={{
              fontSize:  13,
              border:    '1px solid rgba(255,255,255,.6)',
              letterSpacing: '0.12em',
            }}
          >
            VIEW RECAP →
          </span>
        </div>
      )}

      {/* Bottom info bar */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          background: 'linear-gradient(0deg, rgba(5,5,5,.9) 0%, transparent 100%)',
        }}
      >
        <p
          className="font-bebas text-dim"
          style={{ fontSize: 11, letterSpacing: '0.38em', marginBottom: 2 }}
        >
          {e.date}
        </p>
        <p
          className="font-anton text-white leading-tight"
          style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '0.04em' }}
        >
          {e.title}
        </p>
        <p
          className="font-archivo"
          style={{ fontSize: 12, color: 'rgba(240,240,240,.45)', marginTop: 2 }}
        >
          {e.location}
        </p>
      </div>
    </div>
  )
}

export default function PastRuns() {
  const [ref, visible] = useScrollReveal<HTMLElement>()

  return (
    <section
      id="past-runs"
      className="section-pad"
      ref={ref}
      aria-label="Past events"
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
          <p className="eyebrow font-bebas mb-3">Archive</p>
          <h2
            className="font-anton leading-none"
            style={{ fontSize: 'clamp(44px, 7vw, 114px)' }}
          >
            <span className="text-white">PAST </span>
            <span className="text-hollow">RUNS</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 wolf:grid-cols-3 gap-4">
          {pastEvents.map((e, i) => (
            <EventCard key={e.title + e.date} e={e} delay={i * 80} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
