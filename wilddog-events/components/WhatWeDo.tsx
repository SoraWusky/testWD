'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/useScrollReveal'

interface Service {
  num: string
  title: string
  body: string
}

const SERVICES: Service[] = [
  {
    num:   '01',
    title: 'SOUND SYSTEMS',
    body:  'We design and install full PA rigs engineered for outdoor backyard scale — not living rooms, not arenas. Every system is tuned to the space. Subs that move air without waking the block. Tops that carry without distorting. We do it right.',
  },
  {
    num:   '02',
    title: 'LIGHTING & ATMOSPHERE',
    body:  'Intelligent fixtures, dimmers, hazers, lasers on licensed runs. We build the atmosphere from the ground up: stage wash, crowd blinders, moving heads keyed to the music. The vibe is not an afterthought.',
  },
  {
    num:   '03',
    title: 'FULL EVENT BUILD',
    body:  'End-to-end production — staging, power distribution, barricades, waste management, guest list, door staff, and a sound engineer on-site all night. You hand us a date and a yard. We hand back an event.',
  },
]

function ServiceCard({ s, delay, visible }: { s: Service; delay: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col gap-4 p-8"
      style={{
        background:    'var(--surface)',
        borderLeft:    `2px solid ${hovered ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.12)'}`,
        transition:    'border-color .3s ease',
        opacity:       visible ? 1 : 0,
        transform:     visible ? 'translateY(0)' : 'translateY(22px)',
        transitionProperty: 'border-color, opacity, transform',
        transitionDuration: `300ms, 840ms, 840ms`,
        transitionTimingFunction: 'ease, cubic-bezier(.2,.8,.2,1), cubic-bezier(.2,.8,.2,1)',
        transitionDelay: `0ms, ${delay}ms, ${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ghost number */}
      <span
        className="absolute top-4 right-6 font-anton text-white pointer-events-none select-none"
        style={{ fontSize: 80, opacity: 0.04, lineHeight: 1 }}
        aria-hidden="true"
      >
        {s.num}
      </span>

      <h3
        className="font-anton text-white"
        style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', letterSpacing: '0.04em' }}
      >
        {s.title}
      </h3>
      <p
        className="font-archivo"
        style={{
          fontSize: 'clamp(14px, 1.1vw, 17px)',
          lineHeight: 1.72,
          color: 'rgba(240,240,240,.52)',
        }}
      >
        {s.body}
      </p>
    </div>
  )
}

export default function WhatWeDo() {
  const [ref, visible] = useScrollReveal<HTMLElement>()

  return (
    <section
      id="what-we-do"
      className="section-pad"
      ref={ref}
      aria-label="What we do"
      style={{ background: 'var(--surface)' }}
    >
      <div className="inner">
        {/* Section header */}
        <div
          className="mb-12"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 840ms cubic-bezier(.2,.8,.2,1), transform 840ms cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <p className="eyebrow font-bebas mb-3">Services</p>
          <h2
            className="font-anton leading-none"
            style={{ fontSize: 'clamp(44px, 7vw, 114px)' }}
          >
            <span className="text-white">WHAT </span>
            <span className="text-hollow">WE DO</span>
          </h2>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 wolf:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} delay={i * 100} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
