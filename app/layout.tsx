import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Iris Calder — Photographs, Drawings, Film Fragments',
  description: 'A study of light, shadow, and overlooked moments.',
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
