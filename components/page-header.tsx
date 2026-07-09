export function PageHeader({
  code,
  title,
  description,
}: {
  code: string
  title: string
  description?: string
}) {
  return (
    <header className="flex flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">{code}</p>
      <h1 className="font-sans text-3xl font-bold text-balance md:text-5xl">{title}</h1>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          {description}
        </p>
      )}
    </header>
  )
}
