'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/useScrollReveal'

const tgUrl = process.env['NEXT_PUBLIC_TELEGRAM_URL'] ?? 'https://t.me/wilddogs'
const dcUrl = process.env['NEXT_PUBLIC_DISCORD_URL'] ?? 'https://discord.gg/wilddogs'

interface Platform {
  id:        string
  name:      string
  icon:      string
  color:     string
  url:       string
  desc:      string
  cta:       string
  watermark: string
}

const PLATFORMS: Platform[] = [
  {
    id:        'telegram',
    name:      'TELEGRAM',
    icon:      '✈',
    color:     'var(--tg)',
    url:       tgUrl,
    desc:      'First access to tickets before they go public. Event announcements, lineup drops, and last-minute updates straight to your phone.',
    cta:       'JOIN TELEGRAM →',
    watermark: '✈',
  },
  {
    id:        'discord',
    name:      'DISCORD',
    icon:      '⚡',
    color:     'var(--dc)',
    url:       dcUrl,
    desc:      'The community lives here. Event recaps, photo dumps, setlist debates, and connecting with the people who were in the yard with you.',
    cta:       'JOIN DISCORD →',
    watermark: '⚡',
  },
]

function PlatformCard({ p, delay, visible }: { p: Platform; delay: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col gap-5 p-8 overflow-hidden group"
      style={{
        background:  'var(--surface)',
        border:      `1px solid ${hovered ? p.color : 'var(--border)'}`,
        transform:   `translateY(${hovered ? -5 : 0}px)`,
        transition:  'border-color .3s ease, transform .3s cubic-bezier(.2,.8,.2,1), opacity 840ms cubic-bezier(.2,.8,.2,1), box-shadow .3s ease',
        boxShadow:   hovered ? `0 0 0 1px ${p.color}22, 0 20px 40px rgba(0,0,0,.4)` : 'none',
        opacity:     visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        display:     'flex',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Join Wild Dogs on ${p.name}`}
    >
      {/* Watermark ghost icon */}
      <span
        className="absolute bottom-4 right-6 pointer-events-none select-none"
        style={{
          fontSize:  120,
          opacity:   0.035,
          transform: 'rotate(8deg)',
          lineHeight: 1,
          color: p.color,
        }}
        aria-hidden="true"
      >
        {p.watermark}
      </span>

      {/* Icon + name */}
      <div className="flex items-center gap-3">
        <span style={{ fontSize: 28 }} aria-hidden="true">{p.icon}</span>
        <span
          className="font-anton"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            color:    p.color,
            letterSpacing: '0.04em',
          }}
        >
          {p.name}
        </span>
      </div>

      {/* Description */}
      <p
        className="font-archivo"
        style={{
          fontSize:   'clamp(14px, 1.1vw, 17px)',
          lineHeight: 1.72,
          color:      'rgba(240,240,240,.52)',
        }}
      >
        {p.desc}
      </p>

      {/* CTA */}
      <span
        className="font-anton mt-auto inline-block px-6 py-3 text-center"
        style={{
          fontSize:        15,
          letterSpacing:   '0.08em',
          border:          `1px solid ${p.color}`,
          color:           p.color,
          background:      hovered ? `${p.color}14` : 'transparent',
          transition:      'background .3s ease',
        }}
      >
        {p.cta}
      </span>
    </a>
  )
}

export default function CommunitySection() {
  const [ref, visible] = useScrollReveal<HTMLElement>()

  return (
    <section
      id="community"
      className="section-pad"
      ref={ref}
      aria-label="Community"
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
          <p className="eyebrow font-bebas mb-3">Community</p>
          <h2
            className="font-anton leading-none"
            style={{ fontSize: 'clamp(44px, 7vw, 114px)' }}
          >
            <span className="text-white">JOIN </span>
            <span className="text-hollow">THE PACK</span>
          </h2>
          <p
            className="font-archivo mt-4 max-w-md"
            style={{
              fontSize:   'clamp(14px, 1.1vw, 17px)',
              lineHeight: 1.72,
              color:      'rgba(240,240,240,.52)',
            }}
          >
            The event ends at 3am. The conversation keeps going.
          </p>
        </div>

        {/* 2-column platform cards */}
        <div className="grid grid-cols-1 wolf:grid-cols-2 gap-5">
          {PLATFORMS.map((p, i) => (
            <PlatformCard key={p.id} p={p} delay={i * 100} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
