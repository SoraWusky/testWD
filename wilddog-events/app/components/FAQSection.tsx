'use client'

import { useState, useRef, useEffect } from 'react'

const FAQS = [
  {
    q: 'How do I get tickets?',
    a: 'All tickets are sold through our website and select authorized resellers. We do not sell at the door — every event is pre-ticketed to maintain the intimate atmosphere our events are known for.',
  },
  {
    q: 'What is the dress code?',
    a: 'Express yourself. Dark, underground, creative. We welcome all aesthetic forms as long as they\'re genuine. Smart casual at minimum — no sportswear or flip-flops.',
  },
  {
    q: 'Are your events 18+?',
    a: 'Most events are 18+. Select events are 21+. The age requirement is listed clearly on each event page. Valid government-issued ID is required at all events.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Tickets are non-refundable but transferable up to 48 hours before the event. If we cancel an event, you will receive a full refund within 5-7 business days.',
  },
  {
    q: 'How can I perform or DJ at WildDog events?',
    a: 'We love discovering underground talent. Submit your EPK through our contact form. We review all submissions and respond to those that fit our current booking needs.',
  },
  {
    q: 'Do you host private or corporate events?',
    a: 'Yes — we produce bespoke private and brand experiences. Our production team brings the same dark, immersive energy to any scale. Contact us for custom quotes.',
  },
]

function FAQItem({ item, index }: { item: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative border-b overflow-hidden"
      style={{ borderColor: 'rgba(245,245,245,0.06)' }}
    >
      {/* Animated claw accent on open */}
      {open && (
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, #e81224, transparent)` }}
        />
      )}

      <button
        className="w-full flex items-center justify-between py-5 px-4 md:px-6 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span
          className="text-sm md:text-base font-medium pr-8 transition-colors duration-200"
          style={{ color: open ? '#f5f5f5' : 'rgba(245,245,245,0.7)' }}
        >
          <span className="font-display text-lg mr-3" style={{ color: '#e81224' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300"
          style={{
            color: '#e81224',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            border: '1px solid rgba(232,18,36,0.4)',
            borderRadius: '2px',
          }}
        >
          +
        </span>
      </button>

      {/* Animated answer reveal */}
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          className="pb-5 px-4 md:px-6 text-sm leading-relaxed"
          style={{ color: 'rgba(245,245,245,0.5)' }}
        >
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="faq" className="relative py-24 px-6 md:px-16" style={{ zIndex: 1 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(232,18,36,0.04) 0%, transparent 60%)',
        }}
      />

      <div ref={sectionRef} className="max-w-4xl mx-auto">
        <div
          className="mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#e81224' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#e81224' }}>
              FAQ
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
            QUESTIONS<br />
            <span style={{ color: 'rgba(245,245,245,0.25)' }}>ANSWERED</span>
          </h2>
        </div>

        <div
          className="rounded overflow-hidden"
          style={{
            background: 'rgba(16,16,16,0.6)',
            border: '1px solid rgba(245,245,245,0.06)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
