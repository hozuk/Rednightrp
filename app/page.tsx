import Link from 'next/link'
import { ArrowRight, FileText, ShieldAlert, ShoppingBag } from 'lucide-react'
import { CopyIp } from '@/components/copy-ip'
import { ServerStatusCard } from '@/components/server-status'
import { SERVER } from '@/lib/server-config'

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/hero-facility.png')" }}
          aria-hidden="true"
        />
        <div className="scanlines absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 md:py-36">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="border border-destructive/50 px-2 py-0.5 text-destructive">Секретно</span>
            <span>Протокол доступа // {SERVER.game}</span>
          </div>
          <h1 className="max-w-3xl font-sans text-4xl font-bold leading-tight text-balance md:text-6xl">
            SCP: Roleplay — <span className="text-primary">Фонд ждёт тебя</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            Ролевой сервер по вселенной SCP Foundation. Стань исследователем, охранником, бойцом МОГ или самим
            SCP-объектом. Мы обезопасим. Мы удержим. Мы сохраним.
          </p>
          <CopyIp />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-label="Статус сервера">
        <ServerStatusCard />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16" aria-label="Разделы сайта">
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/rules"
            className="group flex flex-col gap-3 border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <ShieldAlert className="size-6 text-primary" />
            <h2 className="font-mono text-sm uppercase tracking-widest">Правила сервера</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Ознакомьтесь с регламентом Фонда перед подключением. Незнание правил не освобождает от ответственности.
            </p>
            <span className="mt-auto flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-primary">
              Читать <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/shop"
            className="group flex flex-col gap-3 border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <ShoppingBag className="size-6 text-primary" />
            <h2 className="font-mono text-sm uppercase tracking-widest">Магазин доната</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Донат-статусы, классы и кредиты. Оплата через gm-donate с мгновенной активацией на сервере.
            </p>
            <span className="mt-auto flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-primary">
              В магазин <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/monitoring"
            className="group flex flex-col gap-3 border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <FileText className="size-6 text-primary" />
            <h2 className="font-mono text-sm uppercase tracking-widest">Мониторинг</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              Статус сервера, онлайн, карта и список игроков в реальном времени с автообновлением.
            </p>
            <span className="mt-auto flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-primary">
              Смотреть <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
