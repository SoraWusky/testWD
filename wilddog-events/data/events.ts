export interface NextEventData {
  title: string
  subtitle: string
  date: string
  month: string
  year: string
  doors: string
  venue: string
  capacity: number
  description: string
  ticketPrice: number
  ticketTier: string
  ticketUrl: string
  status: 'upcoming' | 'sold-out' | 'cancelled'
}

export interface PastEvent {
  title: string
  date: string
  location: string
  capacity: string
  recapUrl?: string
}

export const nextEvent: NextEventData = {
  title:       'DOG DAYS FESTIVAL',
  subtitle:    'SUMMER HEAT EDITION',
  date:        'AUG 15',
  month:       'AUGUST',
  year:        '2026',
  doors:       '8 PM',
  venue:       'THE BIG YARD',
  capacity:    300,
  description: 'The annual dog days run returns. Six acts, two stages, one Surrey backyard engineered for maximum impact. We build the sound system, you lose your voice. Heat-seekers only — no spectators, only participants.',
  ticketPrice: 25,
  ticketTier:  'EARLY BIRD',
  ticketUrl:   process.env['NEXT_PUBLIC_TICKET_URL'] ?? '#tickets',
  status:      'upcoming',
}

export const pastEvents: PastEvent[] = [
  {
    title:    'FERAL NIGHTS',
    date:     'MAR 2026',
    location: 'Surrey, BC',
    capacity: '280',
  },
  {
    title:    'WINTER HOWL',
    date:     'JAN 2026',
    location: 'Surrey, BC',
    capacity: '250',
  },
  {
    title:    'AUTUMN PACK',
    date:     'OCT 2025',
    location: 'Surrey, BC',
    capacity: '300',
  },
  {
    title:    'SUMMER SURGE',
    date:     'AUG 2025',
    location: 'Surrey, BC',
    capacity: '320',
  },
  {
    title:    'SPRING RIOT',
    date:     'MAY 2025',
    location: 'Surrey, BC',
    capacity: '270',
  },
  {
    title:    'DOG DAYS 01',
    date:     'MAR 2025',
    location: 'Surrey, BC',
    capacity: '200',
  },
]
