'use client'

import { useEffect, useRef } from 'react'
import { ClawTear } from './ClawMarks'

export default function FluidTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  // Animated fluid ink streaks on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    interface Streak {
      x: number; y: number; vx: number; vy: number
      length: number; life: number; maxLife: number
      color: string; width: number
    }

    const streaks: Streak[] = []
    const STREAK_COLORS = [
      'rgba(232,18,36,', 'rgba(255,85,0,', 'rgba(233,30,140,',
    ]

    const spawn = () => {
      const side = Math.random() > 0.5 ? 0 : 1
      streaks.push({
        x: side === 0 ? 0 : canvas.width,
        y: Math.random() * canvas.height,
        vx: side === 0 ? Math.random() * 4 + 2 : -(Math.random() * 4 + 2),
        vy: (Math.random() - 0.5) * 1.5,
        length: Math.random() * 120 + 60,
        life: 0,
        maxLife: 80 + Math.random() * 60,
        color: STREAK_COLORS[Math.floor(Math.random() * STREAK_COLORS.length)],
        width: Math.random() * 3 + 1,
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++

      if (t % 12 === 0 && streaks.length < 20) spawn()

      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i]
        s.life++
        s.x += s.vx
        s.y += s.vy

        const progress = s.life / s.maxLife
        const alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
          ? (1 - progress) / 0.3
          : 1

        const grad = ctx.createLinearGradient(
          s.x - s.vx * s.length / Math.abs(s.vx), s.y,
          s.x, s.y
        )
        grad.addColorStop(0, `${s.color}0)`)
        grad.addColorStop(0.4, `${s.color}${(alpha * 0.7).toFixed(2)})`)
        grad.addColorStop(1, `${s.color}${(alpha * 0.3).toFixed(2)})`)

        ctx.beginPath()
        ctx.moveTo(s.x - s.vx * (s.length / Math.abs(s.vx)), s.y)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = s.width
        ctx.lineCap = 'round'
        ctx.stroke()

        if (s.life >= s.maxLife) streaks.splice(i, 1)
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ zIndex: 1, minHeight: '40vh' }}
    >
      {/* Fluid canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(232,18,36,0.08) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 20%, rgba(255,85,0,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(233,30,140,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* Top claw tear */}
      <ClawTear />

      {/* Central content */}
      <div className="relative flex flex-col items-center justify-center py-20 px-6 text-center">
        {/* Moving ink blobs */}
        <div
          className="blob-2 absolute rounded-full"
          style={{
            width: '50vw',
            height: '30vh',
            top: '20%',
            left: '25%',
            background: 'radial-gradient(ellipse, rgba(232,18,36,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative">
          <p className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-4">
            THE PACK
          </p>
          <p
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none"
            style={{
              background: 'linear-gradient(90deg, rgba(232,18,36,0.9), rgba(255,85,0,0.9), rgba(233,30,140,0.9))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            IS HUNTING
          </p>

          {/* Diagonal slash behind text */}
          <div
            className="absolute -inset-4 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, rgba(232,18,36,0.04) 50%, transparent 60%)',
            }}
          />
        </div>

        <p
          className="mt-8 max-w-md text-sm md:text-base leading-relaxed"
          style={{ color: 'rgba(245,245,245,0.5)' }}
        >
          Underground events engineered for those who feel the pull of the dark.
          <br />
          <span style={{ color: 'rgba(245,245,245,0.25)' }}>No compromises. No daylight.</span>
        </p>

        {/* Horizontal separator lines (claw-style) */}
        <div className="mt-10 flex items-center gap-4 w-full max-w-lg">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,18,36,0.5))' }}
          />
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: '#e81224' }}>
            ✦
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(232,18,36,0.5), transparent)' }}
          />
        </div>
      </div>

      {/* Bottom claw tear (flipped) */}
      <div style={{ transform: 'scaleY(-1)' }}>
        <ClawTear />
      </div>
    </section>
  )
}
