'use client'

import useSWR from 'swr'
import { Activity, Map, Users, Wifi } from 'lucide-react'
import { SERVER } from '@/lib/server-config'
import { cn } from '@/lib/utils'

export type ServerStatus = {
  online: boolean
  name?: string
  map?: string
  players: number
  maxPlayers: number
  ping?: number
  playerList: { name: string }[]
  queriedAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<ServerStatus>)

export function useServerStatus() {
  return useSWR<ServerStatus>('/api/status', fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: true,
  })
}

export function StatusBadge({ online, loading }: { online?: boolean; loading?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-xs uppercase tracking-widest',
        loading
          ? 'border-border text-muted-foreground'
          : online
            ? 'border-success/40 text-success'
            : 'border-destructive/40 text-destructive',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          loading ? 'bg-muted-foreground' : online ? 'bg-success animate-pulse' : 'bg-destructive',
        )}
      />
      {loading ? 'Проверка...' : online ? 'Онлайн' : 'Оффлайн'}
    </span>
  )
}

export function ServerStatusCard({ detailed = false }: { detailed?: boolean }) {
  const { data, isLoading } = useServerStatus()

  return (
    <div className="border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Activity className="size-4 text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Статус сервера
          </span>
        </div>
        <StatusBadge online={data?.online} loading={isLoading} />
      </div>

      <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        <div className="flex flex-col gap-1 bg-card p-4">
          <dt className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Users className="size-3.5" /> Игроки
          </dt>
          <dd className="font-mono text-xl font-bold text-foreground">
            {data?.online ? `${data.players}/${data.maxPlayers}` : '—'}
          </dd>
        </div>
        <div className="flex flex-col gap-1 bg-card p-4">
          <dt className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Map className="size-3.5" /> Карта
          </dt>
          <dd className="truncate font-mono text-sm font-bold text-foreground pt-1.5">
            {data?.online ? (data.map ?? '—') : '—'}
          </dd>
        </div>
        <div className="flex flex-col gap-1 bg-card p-4">
          <dt className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Wifi className="size-3.5" /> Пинг
          </dt>
          <dd className="font-mono text-xl font-bold text-foreground">
            {data?.online && data.ping != null ? `${data.ping} мс` : '—'}
          </dd>
        </div>
        <div className="flex flex-col gap-1 bg-card p-4">
          <dt className="font-mono text-xs text-muted-foreground">IP адрес</dt>
          <dd className="truncate font-mono text-sm font-bold text-primary pt-1.5">{SERVER.address}</dd>
        </div>
      </dl>

      {detailed && (
        <div className="border-t border-border p-4">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Игроки на сервере
          </h3>
          {!data?.online ? (
            <p className="text-sm text-muted-foreground">Сервер недоступен. Список игроков не получен.</p>
          ) : data.playerList.length === 0 ? (
            <p className="text-sm text-muted-foreground">Сейчас на сервере никого нет. Будьте первым!</p>
          ) : (
            <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {data.playerList.map((p, i) => (
                <li key={`${p.name}-${i}`} className="truncate border border-border px-3 py-1.5 font-mono text-xs">
                  {p.name}
                </li>
              ))}
            </ul>
          )}
          {data?.queriedAt && (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              Обновлено: {new Date(data.queriedAt).toLocaleTimeString('ru-RU')} · автообновление каждые 15 сек.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
