'use client'

import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null) as React.RefObject<T>
  // Start visible immediately if user prefers reduced motion
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}
