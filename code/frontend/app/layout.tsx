import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Zenith Estate — Premium Real Estate in Delhi NCR',
    template: '%s | Zenith Estate',
  },
  description:
    'Discover premium residential projects and properties in Noida, Greater Noida & Ghaziabad. Expert real estate consultancy by Zenith Estate.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithestate.in'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
