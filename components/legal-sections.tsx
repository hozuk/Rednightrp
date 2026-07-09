export function LegalSections({
  sections,
}: {
  sections: { title: string; items: string[] }[]
}) {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.title} className="border border-border bg-card">
          <h2 className="border-b border-border px-5 py-4 font-mono text-sm uppercase tracking-widest text-primary">
            {section.title}
          </h2>
          <ul className="flex flex-col gap-3 px-5 py-4">
            {section.items.map((item, i) => (
              <li key={i} className="text-sm leading-relaxed text-foreground text-pretty">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
