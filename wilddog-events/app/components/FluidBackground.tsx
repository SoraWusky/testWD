'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

const COLORS = ['rgba(232,18,36,', 'rgba(255,85,0,', 'rgba(233,30,140,', 'rgba(0,245,255,']

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticle = () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 0.6 + 0.2),
        life: 0,
        maxLife: 200 + Math.random() * 200,
        size: Math.random() * 2 + 0.5,
        color,
      })
    }

    let spawnTimer = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnTimer++
      if (spawnTimer % 3 === 0 && particlesRef.current.length < 120) spawnParticle()

      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife)

      for (const p of particlesRef.current) {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vx += (Math.random() - 0.5) * 0.02

        const progress = p.life / p.maxLife
        const alpha = progress < 0.1
          ? progress / 0.1
          : progress > 0.8
          ? (1 - progress) / 0.2
          : 1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${(alpha * 0.6).toFixed(2)})`
        ctx.fill()
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
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep base */}
      <div className="absolute inset-0" style={{ background: '#050505' }} />

      {/* Fluid gradient blobs */}
      <div
        className="blob-1 absolute rounded-full pulse-glow"
        style={{
          width: '70vw', height: '70vw',
          top: '-20vw', left: '-15vw',
          background: 'radial-gradient(ellipse, rgba(232,18,36,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="blob-2 absolute rounded-full"
        style={{
          width: '60vw', height: '60vw',
          bottom: '-10vw', right: '-10vw',
          background: 'radial-gradient(ellipse, rgba(255,85,0,0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="blob-3 absolute rounded-full"
        style={{
          width: '40vw', height: '40vw',
          top: '40%', left: '30%',
          background: 'radial-gradient(ellipse, rgba(233,30,140,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.85) 100%)',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}
