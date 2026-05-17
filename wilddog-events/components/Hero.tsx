'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import WolfMark from './WolfMark'

const tgUrl = process.env['NEXT_PUBLIC_TELEGRAM_URL'] ?? 'https://t.me/wilddogs'
const dcUrl = process.env['NEXT_PUBLIC_DISCORD_URL'] ?? 'https://discord.gg/wilddogs'
const ticketUrl = process.env['NEXT_PUBLIC_TICKET_URL'] ?? '#next-event'

const ease = [0.2, 0.8, 0.2, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.84, ease, delay },
})

const fadeDown = (delay: number) => ({
  initial: { opacity: 0, y: -14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.84, ease, delay },
})

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll indicator click
  const handleScrollDown = () => {
    const el = document.getElementById('next-event')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative flex flex-col justify-center min-h-screen overflow-hidden"
      aria-label="Hero"
      style={{
        paddingLeft: 'clamp(16px, 4vw, 58px)',
        paddingRight: 'clamp(16px, 4vw, 58px)',
      }}
    >
      {/* Wolf padding offset on desktop */}
      <div
        className="flex flex-col justify-center min-h-screen"
        style={{ paddingLeft: 'clamp(0px, 0px, 0px)' }}
      >
        <div
          className="wolf:pl-[clamp(190px,17vw,230px)]"
          style={{ paddingTop: 'clamp(100px, 14vh, 140px)', paddingBottom: 80 }}
        >
          {/* Logo mark — centered, fades down */}
          <motion.div
            className="mb-8 wolf:mb-10"
            {...fadeDown(0.4)}
          >
            <WolfMark
              size={136}
              style={{
                filter: 'invert(1) brightness(0.9)',
                mixBlendMode: 'normal',
                opacity: 0.72,
              }}
            />
          </motion.div>

          {/* Heading — three typographic treatments */}
          <h1
            className="font-anton leading-none"
            style={{ fontSize: 'clamp(60px, 13vw, 214px)' }}
          >
            {/* Line 1: hollow stroke only */}
            <motion.span
              className="block text-hollow"
              {...fadeUp(0.7)}
            >
              WILD
            </motion.span>

            {/* Line 2: solid white */}
            <motion.span
              className="block text-white"
              {...fadeUp(0.8)}
            >
              DOGS
            </motion.span>

            {/* Line 3: dimmed */}
            <motion.span
              className="block"
              style={{ color: 'rgba(240,240,240,.35)' }}
              {...fadeUp(0.9)}
            >
              EVENTS
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="font-archivo mt-6 max-w-sm"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              lineHeight: 1.72,
              color: 'rgba(240,240,240,.52)',
            }}
            {...fadeUp(0.95)}
          >
            Underground backyard events engineered loud and built raw — Surrey, BC.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mt-8"
            {...fadeUp(1.1)}
          >
            {/* Primary */}
            <a
              href={ticketUrl}
              className="font-anton bg-white text-black px-7 py-3 hover:-translate-y-[3px] hover:scale-[1.016] transition-transform duration-200"
              style={{ fontSize: 16, letterSpacing: '0.08em' }}
            >
              BUY TICKETS
            </a>

            {/* Telegram */}
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-anton px-6 py-3 hover:-translate-y-[3px] transition-transform duration-200"
              style={{
                fontSize: 16,
                letterSpacing: '0.08em',
                border: '1px solid var(--tg)',
                color: 'var(--tg)',
              }}
            >
              TELEGRAM
            </a>

            {/* Discord */}
            <a
              href={dcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-anton px-6 py-3 hover:-translate-y-[3px] transition-transform duration-200"
              style={{
                fontSize: 16,
                letterSpacing: '0.08em',
                border: '1px solid var(--dc)',
                color: 'var(--dc)',
              }}
            >
              DISCORD
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-start gap-3 mt-16"
            {...fadeUp(1.3)}
          >
            <button
              onClick={handleScrollDown}
              className="flex flex-col items-center gap-2 group"
              aria-label="Scroll to next section"
            >
              <span
                className="font-bebas text-dim group-hover:text-white/50 transition-colors duration-200"
                style={{ fontSize: 11, letterSpacing: '0.38em' }}
              >
                SCROLL
              </span>
              <div
                ref={scrollRef}
                className="relative overflow-hidden"
                style={{ width: 1, height: 52, background: 'rgba(255,255,255,.12)' }}
              >
                <div
                  className="absolute inset-x-0 top-0 bg-white scroll-bar-inner"
                  style={{ height: '100%' }}
                />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
