import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Advent of Code 2023 Solver',
  description: 'Calculate solutions for Advent of Code 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex gap-4`}>

        <a href="#main" className='sr-only absolute top-4 w-screen text-center'>Jump to main content</a>

        <Nav />

        <main id='main' className='pt-8 w-full'>
          {children}
        </main>
        
        
      </body>
    </html>
  )
}
