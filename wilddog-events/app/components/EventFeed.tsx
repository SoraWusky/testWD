'use client'

import { useRef, useState, useEffect } from 'react'

const EVENTS = [
  {
    id: 1,
    title: 'BLOOD MOON RAVE',
    date: 'FRI 06 JUNE 2025',
    venue: 'The Underground Warehouse',
    city: 'Detroit, MI',
    desc: 'Six floors. Twelve acts. One night that rewrites your definition of dark techno.',
    tags: ['TECHNO', 'INDUSTRIAL'],
    accent: '#e81224',
    ticketsLeft: 47,
    imgGradient: 'linear-gradient(135deg, rgba(232,18,36,0.3) 0%, rgba(16,16,16,0.9) 60%)',
  },
  {
    id: 2,
    title: 'NEON PREDATOR',
    date: 'SAT 14 JUNE 2025',
    venue: 'Volt Club',
    city: 'Berlin, DE',
    desc: 'High-octane drum & bass beneath a ceiling of reactive neon. 10 hours of fury.',
    tags: ['DnB', 'JUNGLE', '18+'],
    accent: '#ff5500',
    ticketsLeft: 120,
    imgGradient: 'linear-gradient(135deg, rgba(255,85,0,0.3) 0%, rgba(16,16,16,0.9) 60%)',
  },
  {
    id: 3,
    title: 'PACK MENTALITY',
    date: 'FRI 27 JUNE 2025',
    venue: 'Fabric',
    city: 'London, UK',
    desc: 'Where minimal techno meets industrial noise. The pack hunts together.',
    tags: ['MINIMAL', 'NOISE', 'EXPERIMENTAL'],
    accent: '#e91e8c',
    ticketsLeft: 200,
    imgGradient: 'linear-gradient(135deg, rgba(233,30,140,0.3) 0%, rgba(16,16,16,0.9) 60%)',
  },
  {
    id: 4,
    title: 'MIDNIGHT HOWL',
    date: 'SAT 05 JULY 2025',
    venue: 'Output',
    city: 'Brooklyn, NY',
    desc: 'A raw, visceral journey from deep house to crushing techno. No mercy.',
    tags: ['DEEP HOUSE', 'TECHNO'],
    accent: '#ff9500',
    ticketsLeft: 85,
    imgGradient: 'linear-gradient(135deg, rgba(255,149,0,0.3) 0%, rgba(16,16,16,0.9) 60%)',
  },
  {
    id: 5,
    title: 'KILL THE LIGHTS',
    date: 'FRI 18 JULY 2025',
    venue: 'Tresor',
    city: 'Berlin, DE',
    desc: 'Total darkness. Total sound. Total surrender. A sensory annihilation experience.',
    tags: ['EBM', 'DARK TECHNO', '21+'],
    accent: '#00f5ff',
    ticketsLeft: 33,
    imgGradient: 'linear-gradient(135deg, rgba(0,245,255,0.15) 0%, rgba(16,16,16,0.95) 60%)',
  },
]

function EventCard({ event, index }: { event: typeof EVENTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * -12, y: cx * 12 })
  }

  const urgent = event.ticketsLeft < 50

  return (
    <div
      ref={cardRef}
      className="card-hover relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -8 : 0}px)`
          : 'translateY(40px)',
        transition: visible
          ? 'opacity 0.8s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)'
          : 'none',
        transitionDelay: `${index * 0.12}s`,
        willChange: 'transform',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      onMouseEnter={() => setHovered(true)}
    >
      {/* Card body */}
      <div
        className="relative overflow-hidden rounded"
        style={{
          background: 'rgba(16,16,16,0.95)',
          border: `1px solid ${hovered ? event.accent : 'rgba(245,245,245,0.06)'}`,
          boxShadow: hovered
            ? `0 20px 60px ${event.accent}25, 0 0 0 1px ${event.accent}40`
            : '0 4px 30px rgba(0,0,0,0.5)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Image area */}
        <div
          className="relative h-48 overflow-hidden"
          style={{ background: event.imgGradient }}
        >
          {/* Animated gradient overlay on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${event.accent}30 0%, transparent 70%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Date stamp */}
          <div className="absolute top-4 left-4">
            <span
              className="text-xs font-bold uppercase tracking-[0.3em] px-3 py-1 rounded"
              style={{
                background: 'rgba(5,5,5,0.8)',
                border: `1px solid ${event.accent}60`,
                color: event.accent,
                backdropFilter: 'blur(8px)',
              }}
            >
              {event.date}
            </span>
          </div>

          {/* Tickets urgency */}
          {urgent && (
            <div className="absolute top-4 right-4">
              <span
                className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded animate-pulse"
                style={{
                  background: 'rgba(232,18,36,0.9)',
                  color: 'white',
                }}
              >
                {event.ticketsLeft} left
              </span>
            </div>
          )}

          {/* City badge */}
          <div className="absolute bottom-4 right-4">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: 'rgba(245,245,245,0.5)' }}
            >
              {event.city}
            </span>
          </div>

          {/* Claw scratch overlay on the image */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 192"
            preserveAspectRatio="none"
          >
            <path
              d={`M${50 + index * 20},0 L${80 + index * 15},192`}
              stroke={`${event.accent}30`}
              strokeWidth="1"
              fill="none"
            />
            <path
              d={`M${80 + index * 20},0 L${100 + index * 15},192`}
              stroke={`${event.accent}20`}
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
        </div>

        {/* Card content */}
        <div className="p-5 md:p-6">
          <h3
            className="font-display text-2xl md:text-3xl mb-1 leading-tight"
            style={{ color: '#f5f5f5' }}
          >
            {event.title}
          </h3>
          <p className="text-sm mb-3" style={{ color: 'rgba(245,245,245,0.4)' }}>
            {event.venue}
          </p>

          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(245,245,245,0.65)' }}>
            {event.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5"
                style={{
                  color: event.accent,
                  border: `1px solid ${event.accent}40`,
                  borderRadius: '2px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <button
              className="text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded transition-all duration-200"
              style={{
                background: hovered ? event.accent : 'transparent',
                border: `1px solid ${event.accent}`,
                color: hovered ? 'white' : event.accent,
              }}
            >
              Tickets
            </button>

            {!urgent && (
              <span className="text-xs" style={{ color: 'rgba(245,245,245,0.3)' }}>
                {event.ticketsLeft} available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Glow bloom on hover */}
      <div
        className="absolute -inset-px rounded pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${event.accent}15 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          filter: 'blur(20px)',
        }}
      />
    </div>
  )
}

export default function EventFeed() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headVisible, setHeadVisible] = useState(false)

  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadVisible(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="events" className="relative py-24 px-6 md:px-16" style={{ zIndex: 1 }}>
      {/* Section background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(232,18,36,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headRef}
          className="mb-16"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="h-px flex-1 max-w-[60px]"
              style={{ background: 'linear-gradient(90deg, transparent, #e81224)' }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: '#e81224' }}>
              Upcoming
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-none">
            EVENTS
          </h2>
          <p className="mt-4 max-w-md text-sm" style={{ color: 'rgba(245,245,245,0.4)' }}>
            Every event is a portal. Step through — what's on the other side is yours to discover.
          </p>
        </div>

        {/* Event grid — intentionally asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.slice(0, 3).map((ev, i) => (
            <EventCard key={ev.id} event={ev} index={i} />
          ))}
        </div>

        {/* Second row offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:ml-[16.67%]">
          {EVENTS.slice(3).map((ev, i) => (
            <EventCard key={ev.id} event={ev} index={i + 3} />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-16 flex justify-center">
          <button
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] px-8 py-4 rounded transition-all duration-300"
            style={{
              border: '1px solid rgba(232,18,36,0.3)',
              color: 'rgba(245,245,245,0.6)',
            }}
            onMouseEnter={e => {
              const t = e.currentTarget
              t.style.borderColor = 'rgba(232,18,36,0.8)'
              t.style.color = '#f5f5f5'
              t.style.boxShadow = '0 0 30px rgba(232,18,36,0.15)'
            }}
            onMouseLeave={e => {
              const t = e.currentTarget
              t.style.borderColor = 'rgba(232,18,36,0.3)'
              t.style.color = 'rgba(245,245,245,0.6)'
              t.style.boxShadow = 'none'
            }}
          >
            <span>View All Events</span>
            <span style={{ color: '#e81224' }}>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
