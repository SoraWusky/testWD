'use client'

import { useEffect, useRef, useState } from 'react'

interface ClawDividerProps {
  direction?: 'ltr' | 'rtl'
}

// Approximate path length for stroke-dasharray
const PATH_LEN = 1700

// Three parallel slash paths — vary by direction prop
function getPaths(dir: 'ltr' | 'rtl'): [string, string, string] {
  if (dir === 'ltr') {
    return [
      'M -80 75  C 340 18,  900 150, 1520 52',
      'M -80 105 C 340 48,  900 178, 1520 82',
      'M -80 135 C 340 78,  900 206, 1520 112',
    ]
  }
  return [
    'M 1520 75  C 900 18,  340 150, -80 52',
    'M 1520 105 C 900 48,  340 178, -80 82',
    'M 1520 135 C 900 78,  340 206, -80 112',
  ]
}

const WIDTHS: [number, number, number] = [34, 24, 16]
const DELAYS: [number, number, number] = [0, 0.18, 0.34]

export default function ClawDivider({ direction = 'ltr' }: ClawDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [drawn, setDrawn] = useState(false)
  const paths = getPaths(direction)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full overflow-hidden" style={{ height: 190, lineHeight: 0 }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1440 190"
        width="100%"
        height="190"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((d, i) => (
          <g key={i}>
            {/* Thick bg-coloured stroke — cuts visually through lighter elements */}
            <path
              d={d}
              stroke="var(--bg)"
              strokeWidth={WIDTHS[i]}
              strokeLinecap="round"
              strokeDasharray={PATH_LEN}
              strokeDashoffset={drawn ? 0 : PATH_LEN}
              style={{
                transition: drawn
                  ? `stroke-dashoffset 1.4s cubic-bezier(.85,0,.15,1) ${DELAYS[i]}s`
                  : 'none',
              }}
            />
            {/* Thin white glow overlay */}
            <path
              d={d}
              stroke="rgba(255,255,255,.12)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray={PATH_LEN}
              strokeDashoffset={drawn ? 0 : PATH_LEN}
              style={{
                transition: drawn
                  ? `stroke-dashoffset 1.4s cubic-bezier(.85,0,.15,1) ${DELAYS[i] + 0.06}s`
                  : 'none',
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
