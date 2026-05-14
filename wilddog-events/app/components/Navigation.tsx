'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(5,5,5,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232,18,36,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-2xl tracking-widest"
            style={{ color: '#f5f5f5' }}
          >
            WILD
            <span style={{ color: '#e81224' }}>DOG</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => handleLink(l.href)}
                  className="text-sm font-medium uppercase tracking-widest transition-colors duration-200 hover:text-[#e81224]"
                  style={{ color: 'rgba(245,245,245,0.7)' }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#events"
            onClick={e => { e.preventDefault(); handleLink('#events') }}
            className="hidden md:inline-flex btn-shimmer text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded"
          >
            Get Tickets
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: '#f5f5f5',
                transform: open ? 'translateY(8px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: '#f5f5f5',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: '#f5f5f5',
                transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center mobile-menu-open"
          style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
        >
          <ul className="flex flex-col items-center gap-8">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => handleLink(l.href)}
                  className="font-display text-5xl tracking-widest text-white hover:text-[#e81224] transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href="#events"
            onClick={e => { e.preventDefault(); handleLink('#events') }}
            className="mt-12 btn-shimmer text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded"
          >
            Get Tickets
          </a>
        </div>
      )}
    </>
  )
}
