'use client'

interface ClawMark {
  top?: string
  bottom?: string
  left?: string
  right?: string
  width: string
  angle: string
  delay: string
  color?: string
}

const DEFAULT_MARKS: ClawMark[] = [
  { top: '15%', left: '8%',  width: '18vw', angle: '-18deg', delay: '0s' },
  { top: '18%', left: '9%',  width: '14vw', angle: '-22deg', delay: '0.15s' },
  { top: '22%', left: '7%',  width: '16vw', angle: '-14deg', delay: '0.3s' },
  { bottom: '20%', right: '6%',  width: '20vw', angle: '15deg', delay: '1s', color: 'rgba(255,85,0,' },
  { bottom: '24%', right: '5%',  width: '15vw', angle: '20deg', delay: '1.15s', color: 'rgba(255,85,0,' },
  { bottom: '28%', right: '7%',  width: '17vw', angle: '12deg', delay: '1.3s', color: 'rgba(255,85,0,' },
]

export default function ClawMarks({ marks = DEFAULT_MARKS }: { marks?: ClawMark[] }) {
  return (
    <>
      {marks.map((m, i) => (
        <div
          key={i}
          className="absolute pointer-events-none overflow-hidden"
          style={{
            top: m.top,
            bottom: m.bottom,
            left: m.left,
            right: m.right,
            width: m.width,
            height: '2px',
            transform: `rotate(${m.angle})`,
            animationDelay: m.delay,
          }}
        >
          <div
            className="claw-line w-full"
            style={{
              animationDelay: m.delay,
              background: `linear-gradient(90deg, transparent 0%, ${m.color ?? 'rgba(232,18,36,'}0.8) 40%, ${m.color ?? 'rgba(255,85,0,'}0.5) 70%, transparent 100%)`,
              '--sk': '0deg',
            } as React.CSSProperties}
          />
        </div>
      ))}
    </>
  )
}

export function ClawTear({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* SVG claw slash marks */}
      <svg
        viewBox="0 0 1440 120"
        className="w-full"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="clawGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e81224" stopOpacity="0" />
            <stop offset="30%" stopColor="#e81224" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#ff5500" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="clawGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff5500" stopOpacity="0" />
            <stop offset="40%" stopColor="#ff9500" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#e81224" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e81224" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Jagged tear line */}
        <path
          d="M0,60 L120,20 L280,80 L400,10 L580,70 L720,15 L900,65 L1060,5 L1220,55 L1440,20"
          stroke="url(#clawGrad1)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          opacity="0.9"
        />
        {/* Second slash offset */}
        <path
          d="M0,75 L180,35 L320,90 L480,25 L640,80 L800,30 L980,75 L1140,20 L1300,65 L1440,35"
          stroke="url(#clawGrad2)"
          strokeWidth="1"
          fill="none"
          filter="url(#glow)"
          opacity="0.7"
        />
        {/* Third slash */}
        <path
          d="M50,90 L200,55 L360,100 L520,45 L700,95 L860,40 L1040,85 L1200,35 L1380,70 L1440,50"
          stroke="rgba(232,18,36,0.4)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />

        {/* Glow drips at slash intersections */}
        {[180, 420, 660, 900, 1180].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={40 + (i % 3) * 20}
            r="2"
            fill="#e81224"
            opacity="0.8"
            filter="url(#glow)"
          />
        ))}
      </svg>
    </div>
  )
}
