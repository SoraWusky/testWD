import type { Metadata } from 'next'
import { Anton, Bebas_Neue, Archivo } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-anton',
  display:  'swap',
})

const bebasNeue = Bebas_Neue({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-bebas',
  display:  'swap',
})

const archivo = Archivo({
  subsets:  ['latin'],
  variable: '--font-archivo',
  display:  'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wilddogevents.com'),
  title:       'Wild Dogs Events — Underground Backyard Ragers',
  description: 'Underground backyard events engineered loud and built raw. Buy tickets, join the pack on Telegram and Discord.',
  openGraph: {
    title:       'Wild Dogs Events',
    description: 'Buy tickets to the next run.',
    url:         'https://wilddogevents.com',
    siteName:    'Wild Dogs Events',
    images:      [{ url: '/og.png', width: 1200, height: 630 }],
    locale:      'en_CA',
    type:        'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebasNeue.variable} ${archivo.variable}`}
    >
      <body className="bg-bg text-text">{children}</body>
    </html>
  )
}
