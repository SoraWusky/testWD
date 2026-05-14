'use client'

import { useRef, useEffect, useState } from 'react'

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const [year] = useState(new Date().getFullYear())

  // Animated footer canvas — liquid bottom
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0)
      grad.addColorStop(0, 'rgba(232,18,36,0.15)')
      grad.addColorStop(0.4, 'rgba(255,85,0,0.1)')
      grad.addColorStop(0.7, 'rgba(233,30,140,0.08)')
      grad.addColorStop(1, 'rgba(232,18,36,0.12)')

      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      for (let x = 0; x <= canvas.width; x += 4) {
        const y = Math.sin(x * 0.005 + t) * 20
              + Math.sin(x * 0.01 + t * 1.5) * 10
              + Math.sin(x * 0.003 + t * 0.7) * 30
              + canvas.height * 0.4
        ctx.lineTo(x, y)
      }
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#050505', zIndex: 1 }}
    >
      {/* Animated wave canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Top claw separator */}
      <div className="relative">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path
            d="M0,20 L60,5 L180,30 L300,8 L450,25 L600,3 L750,22 L900,6 L1050,28 L1200,10 L1320,24 L1440,12"
            stroke="rgba(232,18,36,0.3)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">

          {/* Top row: logo + newsletter */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
            <div>
              <p className="font-display text-5xl md:text-6xl text-white leading-none mb-2">
                WILD<span style={{ color: '#e81224' }}>DOG</span>
              </p>
              <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'rgba(245,245,245,0.3)' }}>
                Events — Underground. Alive.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full md:w-auto md:max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'rgba(245,245,245,0.4)' }}>
                Join the pack — get early access
              </p>
              <form
                onSubmit={e => e.preventDefault()}
                className="flex gap-0 overflow-hidden rounded"
                style={{ border: '1px solid rgba(232,18,36,0.3)' }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  style={{
                    background: 'rgba(16,16,16,0.8)',
                    color: '#f5f5f5',
                    border: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="px-5 text-xs font-bold uppercase tracking-widest transition-all"
                  style={{
                    background: 'rgba(232,18,36,0.9)',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { title: 'Navigate', links: ['Events', 'Gallery', 'Artists', 'Venues'] },
              { title: 'Company', links: ['About', 'Careers', 'Press', 'Partners'] },
              { title: 'Events', links: ['Upcoming', 'Past Events', 'Private Events', 'Corporate'] },
              { title: 'Connect', links: ['Instagram', 'Facebook', 'Resident Advisor', 'SoundCloud'] },
            ].map(col => (
              <div key={col.title}>
                <p
                  className="text-xs font-bold uppercase tracking-[0.3em] mb-4"
                  style={{ color: '#e81224' }}
                >
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <button
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'rgba(245,245,245,0.4)' }}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(245,245,245,0.05)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(245,245,245,0.2)' }}>
              © {year} WildDog Events. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
                <button
                  key={t}
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: 'rgba(245,245,245,0.2)' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
