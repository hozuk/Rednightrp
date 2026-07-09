'use client'

import { useState } from 'react'
import { Loader2, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, setQty, clear, total, count } = useCart()
  const [steamId, setSteamId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleCheckout = async () => {
    setError(null)
    if (!/^7656\d{13}$/.test(steamId.trim())) {
      setError('Укажите корректный SteamID64 — 17 цифр, начинается с 7656.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          steamId: steamId.trim(),
          sum: total,
          items: items.map((i) => `${i.product.id}x${i.qty}`),
        }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Не удалось создать платёж.')
        return
      }
      clear()
      window.open(data.url, '_blank', 'noopener')
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Корзина покупок">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-label="Закрыть корзину"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest">
            <ShoppingCart className="size-4 text-primary" />
            Корзина <span className="text-muted-foreground">({count})</span>
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-8 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary"
            aria-label="Закрыть"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Корзина пуста. Загляните в магазин.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex flex-col gap-2 border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{item.product.price} ₽ / шт.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={`Удалить ${item.product.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setQty(item.product.id, item.qty - 1)}
                        className="flex size-7 items-center justify-center border border-border transition-colors hover:border-primary"
                        aria-label="Уменьшить количество"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.product.id, item.qty + 1)}
                        className="flex size-7 items-center justify-center border border-border transition-colors hover:border-primary"
                        aria-label="Увеличить количество"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <p className="font-mono text-sm text-primary">{item.product.price * item.qty} ₽</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Итого</span>
              <span className="font-mono text-lg font-bold text-primary">{total} ₽</span>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Ваш SteamID64
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={steamId}
                onChange={(e) => setSteamId(e.target.value)}
                placeholder="7656119..."
                className="border border-input bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </label>
            {error && <p className="text-sm text-destructive text-pretty">{error}</p>}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-primary px-4 py-3 font-mono text-sm font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Оплатить через gm-donate
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
              После оплаты средства зачисляются на ваш игровой счёт через систему IGS (gm-donate.net), и покупки
              активируются на сервере. SteamID64 можно узнать на steamid.io.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
