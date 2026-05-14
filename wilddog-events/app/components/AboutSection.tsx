'use client'

import { useRef, useState, useEffect } from 'react'

const STATS = [
  { value: '200+', label: 'Events Produced' },
  { value: '50K+', label: 'Attendees' },
  { value: '8', label: 'Cities' },
  { value: '∞', label: 'Nights Lost' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-24 px-6 md:px-16 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background blobs */}
      <div
        className="absolute blob-2 rounded-full pointer-events-none"
        style={{
          width: '60vw', height: '60vw',
          top: '-20%', right: '-20%',
          background: 'radial-gradient(ellipse, rgba(233,30,140,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: typography */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#e81224' }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#e81224' }}>
                Who We Are
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-none text-white mb-8">
              WE ARE THE
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #e81224, #ff5500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                HUNT
              </span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'rgba(245,245,245,0.65)' }}>
              WildDog Events is not an event company. We are architects of experience.
              We build environments where music becomes primal, where darkness becomes
              alive, where strangers become pack.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,245,0.4)' }}>
              Founded in the underground, built on the fringe. Every event we produce
              is designed to leave a mark — in the best possible way.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-shimmer text-white text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded"
              >
                Work With Us
              </a>
              <button
                className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
                style={{ color: 'rgba(245,245,245,0.4)' }}
              >
                Read Our Story →
              </button>
            </div>
          </div>

          {/* Right: stats grid */}
          <div
            className="grid grid-cols-2 gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="relative p-6 rounded overflow-hidden group"
                style={{
                  background: 'rgba(16,16,16,0.8)',
                  border: '1px solid rgba(245,245,245,0.06)',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(232,18,36,0.1) 0%, transparent 70%)',
                  }}
                />
                <p
                  className="font-display text-4xl md:text-5xl leading-none mb-2"
                  style={{ color: i % 2 === 0 ? '#e81224' : '#ff9500' }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(245,245,245,0.4)' }}>
                  {stat.label}
                </p>

                {/* Corner claw */}
                <div
                  className="absolute top-2 right-2 w-8 h-px pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(232,18,36,0.4))',
                    transform: 'rotate(-30deg)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
