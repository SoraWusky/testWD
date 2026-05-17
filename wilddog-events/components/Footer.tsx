import WolfMark from './WolfMark'

const NAV_LINKS = [
  { label: 'Next Event',  href: '#next-event' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Community',  href: '#community' },
  { label: 'Past Runs',  href: '#past-runs' },
  { label: 'FAQ',        href: '#faq' },
  { label: 'Contact',    href: '#contact' },
]

const SOCIAL_LINKS = [
  { label: 'Telegram',  href: process.env['NEXT_PUBLIC_TELEGRAM_URL'] ?? 'https://t.me/wilddogs' },
  { label: 'Discord',   href: process.env['NEXT_PUBLIC_DISCORD_URL'] ?? 'https://discord.gg/wilddogs' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Site footer"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}
    >
      {/* Mega decorative text */}
      <div className="overflow-hidden" aria-hidden="true">
        <p
          className="font-anton text-hollow-ghost leading-none select-none whitespace-nowrap"
          style={{
            fontSize:      'clamp(58px, 17vw, 278px)',
            paddingLeft:   'var(--px)',
            paddingRight:  'var(--px)',
            paddingTop:    'clamp(40px, 5vw, 80px)',
            pointerEvents: 'none',
          }}
        >
          WILD DOGS
        </p>
      </div>

      {/* 3-column grid */}
      <div className="inner py-12">
        <div className="grid grid-cols-2 wolf:grid-cols-3 gap-10">

          {/* Col 1: brand mark + wordmark */}
          <div className="col-span-2 wolf:col-span-1 flex flex-col gap-4">
            <WolfMark
              size={56}
              style={{
                filter: 'invert(1) brightness(0.9)',
                mixBlendMode: 'normal',
                opacity: 0.65,
              }}
            />
            <p
              className="font-anton text-white"
              style={{ fontSize: 20, letterSpacing: '0.06em' }}
            >
              WILD DOGS EVENTS
            </p>
            <p
              className="font-archivo max-w-[240px]"
              style={{
                fontSize:   13,
                lineHeight: 1.7,
                color:      'rgba(240,240,240,.35)',
              }}
            >
              Underground backyard events.<br />Surrey, BC.
            </p>
          </div>

          {/* Col 2: nav links */}
          <nav aria-label="Footer navigation">
            <p
              className="eyebrow font-bebas mb-4"
              style={{ letterSpacing: '0.38em', fontSize: 11 }}
            >
              Navigate
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-archivo text-white/40 hover:text-white transition-colors duration-200"
                    style={{ fontSize: 14 }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: social links */}
          <nav aria-label="Social links">
            <p
              className="eyebrow font-bebas mb-4"
              style={{ letterSpacing: '0.38em', fontSize: 11 }}
            >
              Community
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {SOCIAL_LINKS.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-archivo text-white/40 hover:text-white transition-colors duration-200"
                    style={{ fontSize: 14 }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${process.env['NEXT_PUBLIC_EMAIL'] ?? 'howl@wilddogevents.com'}`}
                  className="font-archivo text-white/40 hover:text-white transition-colors duration-200"
                  style={{ fontSize: 14 }}
                >
                  Email Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col wolf:flex-row items-start wolf:items-center justify-between gap-3 mt-12 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p
            className="font-archivo"
            style={{ fontSize: 12, color: 'rgba(240,240,240,.25)' }}
          >
            © {year} Wild Dogs Events. All rights reserved.
          </p>
          <p
            className="font-archivo"
            style={{ fontSize: 12, color: 'rgba(240,240,240,.18)' }}
          >
            Underground backyard ragers · Surrey, BC · Built to Howl
          </p>
        </div>
      </div>
    </footer>
  )
}
