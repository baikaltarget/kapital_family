import Link from "next/link";

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="py-4 text-sm text-[var(--muted)]">
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:underline">Главная</Link>
        </li>
        {items.map((c, i) => (
          <li key={c.href} className="flex gap-2">
            <span aria-hidden="true">/</span>
            {i === items.length - 1 ? (
              <span className="text-[var(--ink)]">{c.name}</span>
            ) : (
              <Link href={c.href} className="hover:underline">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
