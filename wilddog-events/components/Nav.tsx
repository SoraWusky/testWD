'use client'

import { useState, useEffect } from 'react'
import WolfMark from './WolfMark'

const LINKS = [
  { label: 'Next Event', href: '#next-event' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Community',  href: '#community' },
  { label: 'Past Runs',  href: '#past-runs' },
  { label: 'FAQ',        href: '#faq' },
]

function scrollTo(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trap focus in open menu
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => scrollTo(href), 10)
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
        style={{
          background: scrolled
            ? 'rgba(5,5,5,0.96)'
            : 'linear-gradient(rgba(5,5,5,.88), transparent)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="inner flex items-center justify-between py-5">
          {/* Logo + wordmark */}
          <a
            href="/"
            className="flex items-center gap-3"
            aria-label="Wild Dogs Events — home"
          >
            <WolfMark
              size={36}
              style={{ opacity: 0.85, filter: 'invert(1) brightness(0.9)', mixBlendMode: 'normal' }}
            />
            <span
              className="font-anton text-white tracking-wide"
              style={{ fontSize: 20, letterSpacing: '0.06em' }}
            >
              WILD DOGS
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden wolf:flex items-center gap-8" role="list">
            {LINKS.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => handleLink(l.href)}
                  className="font-bebas text-white/50 hover:text-white transition-opacity duration-200"
                  style={{ fontSize: 17, letterSpacing: '0.16em' }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#next-event"
            onClick={e => { e.preventDefault(); scrollTo('#next-event') }}
            className="hidden wolf:inline-flex font-anton text-black bg-white px-5 py-2 hover:-translate-y-0.5 transition-transform duration-200"
            style={{ fontSize: 15, letterSpacing: '0.08em' }}
          >
            GET TICKETS
          </a>

          {/* Hamburger */}
          <button
            className="wolf:hidden flex flex-col justify-center gap-[5px] p-2 z-[60] relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="block h-px bg-white transition-all duration-300"
                style={{
                  width: 24,
                  transform:
                    i === 0 && menuOpen ? 'translateY(6px) rotate(45deg)'
                    : i === 1 && menuOpen ? 'scaleX(0)'
                    : i === 2 && menuOpen ? 'translateY(-6px) rotate(-45deg)'
                    : 'none',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="wolf:hidden fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{ background: 'rgba(5,5,5,.97)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <ul className="flex flex-col items-center gap-8" role="list">
            {LINKS.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => handleLink(l.href)}
                  className="font-anton text-white hover:text-white/60 transition-colors duration-200"
                  style={{ fontSize: 'clamp(36px, 10vw, 52px)', letterSpacing: '0.06em' }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href="#next-event"
            onClick={e => { e.preventDefault(); handleLink('#next-event') }}
            className="mt-12 font-anton text-black bg-white px-8 py-3 hover:-translate-y-0.5 transition-transform duration-200"
            style={{ fontSize: 16, letterSpacing: '0.1em' }}
          >
            GET TICKETS
          </a>
        </div>
      )}
    </>
  )
}
