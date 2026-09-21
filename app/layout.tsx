import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Kalika Translink — Bus, Car & Tempo Traveller on Rent in Pune',
  description:
    'Trusted travel agency in Pune offering AC/Non-AC buses, cars and tempo travellers on rent with experienced drivers. 15+ years of safe, affordable and reliable journeys across Maharashtra.',
  keywords: ['bus rental Pune', 'car rental Pune', 'tempo traveller Pune', 'outstation travel Maharashtra'],
  openGraph: {
    title: 'Kalika Translink — Reliable travel across Pune and Maharashtra',
    description: 'Buses, cars and tempo travellers on rent with experienced drivers and dependable service.',
    type: 'website',
    images: ['/images/owner_about.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalika Translink — Bus, Car & Tempo Traveller on Rent in Pune',
    description: 'Reliable buses, cars and tempo travellers with experienced drivers.',
    images: ['/images/owner_about.jpeg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} light`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
