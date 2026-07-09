import Link from 'next/link'
import { SERVER } from '@/lib/server-config'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center border border-primary font-mono text-xs font-bold text-primary">
              SCP
            </span>
            <span className="font-mono text-sm tracking-widest">SCP: ROLEPLAY</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Ролевой сервер по вселенной SCP Foundation на платформе Garry&apos;s Mod.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            IP: <span className="text-primary">{SERVER.address}</span>
          </p>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Разделы сайта">
          <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Разделы</h2>
          <Link href="/rules" className="text-sm text-foreground transition-colors hover:text-primary">
            Правила сервера
          </Link>
          <Link href="/shop" className="text-sm text-foreground transition-colors hover:text-primary">
            Магазин доната
          </Link>
          <Link href="/monitoring" className="text-sm text-foreground transition-colors hover:text-primary">
            Мониторинг сервера
          </Link>
        </nav>

        <nav className="flex flex-col gap-2" aria-label="Документы">
          <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Документы</h2>
          <Link href="/terms" className="text-sm text-foreground transition-colors hover:text-primary">
            Пользовательское соглашение
          </Link>
          <Link href="/privacy" className="text-sm text-foreground transition-colors hover:text-primary">
            Политика конфиденциальности
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SCP: Roleplay. Все права защищены.</p>
          <p>Проект не аффилирован с Facepunch Studios и SCP Foundation Wiki.</p>
        </div>
      </div>
    </footer>
  )
}
