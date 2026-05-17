'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/useScrollReveal'
import { faqs } from '@/data/faqs'
import WolfMark from './WolfMark'

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-answer-${index}`

  return (
    <div
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span
          className="font-anton pr-6 group-hover:opacity-60 transition-opacity duration-200"
          style={{
            fontSize:      'clamp(15px, 1.6vw, 20px)',
            color:         'var(--text)',
            letterSpacing: '0.04em',
            opacity:       open ? 1 : undefined,
          }}
        >
          {q}
        </span>

        {/* Plus/minus indicator */}
        <span
          className="relative flex-shrink-0 w-5 h-5"
          aria-hidden="true"
          style={{ color: 'var(--dim)' }}
        >
          {/* Horizontal bar (always visible) */}
          <span
            className="absolute top-1/2 left-0 right-0 h-px bg-current"
            style={{ transform: 'translateY(-50%)' }}
          />
          {/* Vertical bar (hidden when open) */}
          <span
            className="absolute top-0 bottom-0 left-1/2 w-px bg-current transition-transform duration-300"
            style={{
              transform: open ? 'translateX(-50%) scaleY(0)' : 'translateX(-50%) scaleY(1)',
            }}
          />
        </span>
      </button>

      <div
        id={id}
        aria-hidden={!open}
        style={{
          maxHeight:  open ? 220 : 0,
          overflow:   'hidden',
          transition: 'max-height .5s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <p
          className="font-archivo pb-5"
          style={{
            fontSize:   'clamp(14px, 1.1vw, 17px)',
            lineHeight: 1.72,
            color:      'rgba(240,240,240,.52)',
          }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [ref, visible] = useScrollReveal<HTMLElement>()

  return (
    <section
      id="faq"
      className="section-pad"
      ref={ref}
      aria-label="Frequently asked questions"
    >
      <div className="inner">
        <div className="grid grid-cols-1 wolf:grid-cols-2 gap-12 items-start">

          {/* Left: heading + blurb + logo */}
          <div
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 840ms cubic-bezier(.2,.8,.2,1), transform 840ms cubic-bezier(.2,.8,.2,1)',
            }}
          >
            <p className="eyebrow font-bebas mb-3">Questions</p>
            <h2
              className="font-anton leading-none mb-6"
              style={{ fontSize: 'clamp(44px, 7vw, 114px)' }}
            >
              <span className="text-white block">PACK</span>
              <span className="text-hollow block">INTEL</span>
            </h2>
            <p
              className="font-archivo mb-8"
              style={{
                fontSize:   'clamp(14px, 1.1vw, 17px)',
                lineHeight: 1.72,
                color:      'rgba(240,240,240,.52)',
                maxWidth:   380,
              }}
            >
              Everything you need to know before you show up. If your question isn&apos;t here, hit us on Telegram.
            </p>

            <WolfMark
              size={90}
              style={{
                opacity:      0.22,
                filter:       'invert(1) brightness(0.9)',
                mixBlendMode: 'normal',
              }}
            />
          </div>

          {/* Right: accordion */}
          <div
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 840ms cubic-bezier(.2,.8,.2,1) 100ms, transform 840ms cubic-bezier(.2,.8,.2,1) 100ms',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.question} a={item.answer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
