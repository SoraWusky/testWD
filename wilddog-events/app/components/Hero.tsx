'use client'

import { useEffect, useRef, useState } from 'react'
import ClawMarks from './ClawMarks'

const FEATURED_EVENT = {
  date: 'FRI 06 JUNE 2025',
  name: 'BLOOD MOON RAVE',
  venue: 'The Underground Warehouse, Detroit',
  desc: 'Six floors. Twelve acts. One night that rewrites your definition of dark.',
  tags: ['TECHNO', 'INDUSTRIAL', '18+'],
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current || !titleRef.current) return
      const y = window.scrollY
      titleRef.current.style.transform = `translateY(${y * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden scanlines"
      style={{ zIndex: 1 }}
    >
      {/* Atmospheric gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 60% 30%, rgba(232,18,36,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 70%, rgba(255,85,0,0.08) 0%, transparent 50%),
            linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.6) 60%, #050505 100%)
          `,
        }}
      />

      {/* Fluid ink blobs behind title */}
      <div
        className="absolute blob-1 rounded-full"
        style={{
          width: '55vw',
          height: '55vw',
          top: '5%',
          left: '45%',
          background: 'radial-gradient(ellipse, rgba(232,18,36,0.2) 0%, rgba(255,85,0,0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute blob-3 rounded-full"
        style={{
          width: '35vw',
          height: '35vw',
          top: '15%',
          right: '10%',
          background: 'radial-gradient(ellipse, rgba(233,30,140,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Claw marks over background */}
      <ClawMarks />

      {/* Hero content */}
      <div className="relative px-6 md:px-16 pb-16 md:pb-24 max-w-7xl mx-auto w-full">

        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #e81224)' }}
          />
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#e81224' }}>
            Live Events
          </span>
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#e81224' }}
          />
          <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,245,245,0.4)' }}>
            Now Booking
          </span>
        </div>

        {/* Giant kinetic title */}
        <h1
          ref={titleRef}
          className={`font-display leading-none text-glitch mb-8 transition-all duration-1200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            fontSize: 'clamp(4rem, 14vw, 16rem)',
            color: '#f5f5f5',
            textShadow: '0 0 80px rgba(232,18,36,0.3)',
            transitionDelay: '0.4s',
          }}
        >
          <span className="block">WILD</span>
          <span
            className="block text-gradient-crimson"
            style={{ marginLeft: 'clamp(1rem, 5vw, 8rem)' }}
          >
            DOG
          </span>
          <span
            className="block text-sm md:text-base font-mono font-light tracking-[0.4em] mt-4"
            style={{
              color: 'rgba(245,245,245,0.4)',
              fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
              letterSpacing: '0.4em',
              marginLeft: '2px',
            }}
          >
            EVENTS
          </span>
        </h1>

        {/* Featured event card — asymmetric */}
        <div
          className={`relative max-w-xl md:ml-[20%] transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.7s' }}
        >
          {/* Glow border */}
          <div
            className="relative p-px rounded overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(232,18,36,0.5), rgba(255,85,0,0.2), transparent)',
            }}
          >
            <div
              className="rounded p-6 md:p-8"
              style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(20px)' }}
            >
              {/* Date */}
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#e81224' }}>
                {FEATURED_EVENT.date}
              </p>

              {/* Event name */}
              <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
                {FEATURED_EVENT.name}
              </h2>

              {/* Venue */}
              <p className="text-sm mb-4" style={{ color: 'rgba(245,245,245,0.5)' }}>
                {FEATURED_EVENT.venue}
              </p>

              {/* Description */}
              <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'rgba(245,245,245,0.7)' }}>
                {FEATURED_EVENT.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {FEATURED_EVENT.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1"
                    style={{
                      border: '1px solid rgba(232,18,36,0.4)',
                      color: 'rgba(232,18,36,0.9)',
                      borderRadius: '2px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex items-center gap-4">
                <a
                  href="#events"
                  onClick={e => { e.preventDefault(); document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="btn-shimmer text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded"
                >
                  Get Tickets
                </a>
                <button
                  className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
                  style={{ color: 'rgba(245,245,245,0.4)' }}
                >
                  See all events →
                </button>
              </div>
            </div>
          </div>

          {/* Decorative slash across card corner */}
          <div
            className="absolute -top-2 -right-4 w-24 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,85,0,0.6))',
              transform: 'rotate(-25deg)',
            }}
          />
          <div
            className="absolute -top-4 -right-2 w-20 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(232,18,36,0.4))',
              transform: 'rotate(-20deg)',
            }}
          />
        </div>

        {/* Scroll hint */}
        <div
          className={`absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1.2s' }}
        >
          <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(245,245,245,0.3)' }}>
            Scroll
          </span>
          <div
            className="w-px h-16 overflow-hidden"
            style={{ background: 'rgba(245,245,245,0.1)' }}
          >
            <div
              className="w-full h-8"
              style={{
                background: 'linear-gradient(180deg, transparent, #e81224)',
                animation: 'scanline 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade to section below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #050505 0%, transparent 100%)' }}
      />
    </section>
  )
}
