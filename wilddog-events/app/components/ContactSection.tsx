'use client'

import { useRef, useState, useEffect } from 'react'

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Atmospheric blobs */}
      <div
        className="blob-1 absolute rounded-full pointer-events-none"
        style={{
          width: '70vw', height: '70vw',
          bottom: '-30%', right: '-20%',
          background: 'radial-gradient(ellipse, rgba(232,18,36,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="blob-3 absolute rounded-full pointer-events-none"
        style={{
          width: '40vw', height: '40vw',
          top: '10%', left: '-10%',
          background: 'radial-gradient(ellipse, rgba(233,30,140,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: big CTA text */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#e81224' }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#e81224' }}>
                Get In Touch
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-8xl leading-none text-white mb-8">
              JOIN THE
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #e81224, #ff9500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                PACK
              </span>
            </h2>

            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(245,245,245,0.55)' }}>
              Whether you want to attend, perform, sponsor, or just talk dark music —
              we want to hear from you.
            </p>

            {/* Contact links */}
            <div className="space-y-4">
              {[
                { label: 'General', value: 'hello@wilddogevents.com' },
                { label: 'Bookings', value: 'bookings@wilddogevents.com' },
                { label: 'Press', value: 'press@wilddogevents.com' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <span
                    className="text-xs uppercase tracking-widest w-20"
                    style={{ color: 'rgba(245,245,245,0.3)' }}
                  >
                    {item.label}
                  </span>
                  <a
                    href={`mailto:${item.value}`}
                    className="text-sm font-medium transition-colors hover:text-[#e81224]"
                    style={{ color: 'rgba(245,245,245,0.7)' }}
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6 mt-12">
              {['Instagram', 'Facebook', 'Resident Advisor', 'SoundCloud'].map(s => (
                <button
                  key={s}
                  className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#e81224]"
                  style={{ color: 'rgba(245,245,245,0.3)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[400px]">
                <div className="mb-4">
                  <span className="font-display text-5xl" style={{ color: '#e81224' }}>✓</span>
                </div>
                <h3 className="font-display text-3xl text-white mb-3">Message Received</h3>
                <p style={{ color: 'rgba(245,245,245,0.5)' }}>
                  We'll get back to you within 48 hours. The pack is listening.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Who are you?' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label
                      className="block text-xs font-bold uppercase tracking-[0.3em] mb-2"
                      style={{ color: 'rgba(245,245,245,0.4)' }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formState[field.name as keyof typeof formState]}
                      onChange={e => setFormState(s => ({ ...s, [field.name]: e.target.value }))}
                      required
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(16,16,16,0.8)',
                        border: '1px solid rgba(245,245,245,0.1)',
                        color: '#f5f5f5',
                        borderRadius: '4px',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(232,18,36,0.5)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(245,245,245,0.1)' }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-[0.3em] mb-2"
                    style={{ color: 'rgba(245,245,245,0.4)' }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us what's on your mind..."
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'rgba(16,16,16,0.8)',
                      border: '1px solid rgba(245,245,245,0.1)',
                      color: '#f5f5f5',
                      borderRadius: '4px',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(232,18,36,0.5)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(245,245,245,0.1)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-shimmer text-white text-xs font-bold uppercase tracking-[0.3em] py-4 rounded mt-2"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
