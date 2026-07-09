'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/rules', label: 'Правила' },
  { href: '/shop', label: 'Магазин' },
  { href: '/monitoring', label: 'Мониторинг' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { count, setOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="flex size-7 items-center justify-center border border-primary font-mono text-xs font-bold text-primary">
            SCP
          </span>
          <span className="font-mono text-sm tracking-widest text-foreground">SCP: ROLEPLAY</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-mono text-xs uppercase tracking-widest transition-colors',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex size-9 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label={`Корзина, товаров: ${count}`}
          >
            <ShoppingCart className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-4.5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="flex size-9 items-center justify-center border border-border text-foreground md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border md:hidden" aria-label="Мобильная навигация">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'py-3 font-mono text-xs uppercase tracking-widest',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
