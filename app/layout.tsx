import type { Metadata } from "next"
import { inter, playfair } from "./fonts"
import "./globals.css"
import { Analytics } from '@vercel/analytics/react'
import { FloatingAircraft } from '@/components/shared/floating-aircraft'

export const metadata: Metadata = {
  title: "KeyPrivateJet - Luxury Private Jet Charter",
  description: "Connect with premium private jet charter operators. Instant quotes, best rates, 24/7 service.",
  keywords: ["private jet", "charter", "luxury travel", "private aviation"],
  authors: [{ name: "KeyPrivateJet" }],
  openGraph: {
    title: "KeyPrivateJet - Luxury Private Jet Charter",
    description: "Connect with premium private jet charter operators",
    url: "https://keyprivatejet.com",
    siteName: "KeyPrivateJet",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyPrivateJet - Luxury Private Jet Charter",
    description: "Connect with premium private jet charter operators",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <FloatingAircraft />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

