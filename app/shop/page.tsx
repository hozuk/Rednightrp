import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ShopGrid } from '@/components/shop-grid'

export const metadata: Metadata = {
  title: 'Магазин доната — SCP: Roleplay',
  description:
    'Магазин доната SCP Roleplay сервера: VIP-статусы, классы и кредиты. Оплата через gm-donate с мгновенной активацией.',
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        code="СНАБЖЕНИЕ ФОНДА"
        title="Магазин доната"
        description="Поддержите сервер и получите игровые преимущества. Оплата проходит через платёжную систему gm-donate (IGS) — покупки активируются на сервере автоматически после оплаты."
      />
      <ShopGrid />
    </div>
  )
}
