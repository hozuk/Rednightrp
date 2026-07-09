import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import './globals.css'

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'SCP: Roleplay — сервер Garry\u2019s Mod',
  description:
    'SCP Roleplay сервер по Garry\u2019s Mod: правила, магазин доната, мониторинг и статус сервера в реальном времени. IP: 62.122.215.220:19291',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#16161a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`bg-background ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans min-h-dvh flex flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
