'use client'

import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { CATEGORY_LABELS, PRODUCTS, type Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

const CLASS_STYLES: Record<Product['objectClass'], string> = {
  SAFE: 'border-success/50 text-success',
  EUCLID: 'border-primary/50 text-primary',
  KETER: 'border-destructive/50 text-destructive',
}

const FILTERS = ['all', 'status', 'class', 'credits'] as const

export function ShopGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all')
  const { addItem } = useCart()

  const visible = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)

  return (
    <div className="mt-10 flex flex-col gap-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по категориям">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors',
              filter === f
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary hover:text-foreground',
            )}
          >
            {f === 'all' ? 'Все товары' : CATEGORY_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <article key={product.id} className="flex flex-col border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span
                className={cn(
                  'border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest',
                  CLASS_STYLES[product.objectClass],
                )}
              >
                {product.objectClass}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{CATEGORY_LABELS[product.category]}</span>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <h2 className="font-sans text-lg font-bold text-balance">{product.name}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{product.description}</p>
              <ul className="flex flex-col gap-1.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-relaxed text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-border px-5 py-4">
              <span className="font-mono text-xl font-bold text-primary">{product.price} ₽</span>
              <button
                type="button"
                onClick={() => addItem(product)}
                className="flex items-center gap-2 bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="size-3.5" aria-hidden="true" />В корзину
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground text-pretty">
        Оплата обрабатывается сервисом gm-donate.net. Для зачисления покупки укажите ваш SteamID64 при оформлении
        заказа в корзине. Возврат средств осуществляется согласно Пользовательскому соглашению.
      </p>
    </div>
  )
}
