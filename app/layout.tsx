import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sarah Nicholl — Light, Shadow, Trace',
  description: 'Photography, drawing, sculpture and film exploring light and shadow in relation to space, time and transience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
