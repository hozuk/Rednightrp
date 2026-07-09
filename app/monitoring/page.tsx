import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ServerStatusCard } from '@/components/server-status'
import { CopyIp } from '@/components/copy-ip'

export const metadata: Metadata = {
  title: 'Мониторинг сервера — SCP: Roleplay',
  description:
    'Мониторинг SCP Roleplay сервера по Garry\u2019s Mod в реальном времени: онлайн, карта, пинг и список игроков.',
}

export default function MonitoringPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        code="ЦЕНТР НАБЛЮДЕНИЯ"
        title="Мониторинг сервера"
        description="Данные о сервере запрашиваются напрямую по протоколу Source Query и обновляются автоматически каждые 15 секунд."
      />

      <div className="mt-10 flex flex-col gap-8">
        <ServerStatusCard detailed />

        <section className="border border-border bg-card p-5" aria-label="Подключение к серверу">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Подключение к серверу
          </h2>
          <CopyIp />
          <ol className="mt-5 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-mono text-primary">1.</span> Запустите Garry&apos;s Mod.
            </li>
            <li>
              <span className="font-mono text-primary">2.</span> Откройте консоль (клавиша «~») и введите{' '}
              <code className="border border-border bg-background px-1.5 py-0.5 font-mono text-xs text-primary">
                connect 62.122.215.220:19291
              </code>
            </li>
            <li>
              <span className="font-mono text-primary">3.</span> Либо нажмите кнопку «Подключиться» выше — игра
              запустится автоматически через Steam.
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}
