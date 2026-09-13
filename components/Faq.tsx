export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl">Частые вопросы</h2>
      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="cursor-pointer list-none font-medium marker:content-none">
              <span className="flex items-start justify-between gap-4">
                {f.q}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[var(--accent)] group-open:rotate-45 transition-transform"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 max-w-[68ch] text-[var(--muted)] leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
