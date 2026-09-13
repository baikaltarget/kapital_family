import Link from "next/link";
import { site, phoneHref } from "@/lib/site";

const nav = [
  { href: "/massazh/", label: "Массаж" },
  { href: "/basseyn/", label: "Бассейн" },
  { href: "/prokol-ushey/", label: "Прокол ушей" },
  { href: "/spetsialisty/", label: "Специалисты" },
  { href: "/tseny/", label: "Цены" },
  { href: "/o-nas/", label: "О центре" },
  { href: "/kontakty/", label: "Контакты" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link href="/" className="leading-tight">
          <span className="block font-display text-lg font-semibold">Капитал Фэмили</span>
          <span className="block text-xs text-[var(--muted)]">Центр здоровья · Ангарск</span>
        </Link>

        <nav aria-label="Основное меню" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[var(--massage)]">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={phoneHref} className="hidden text-right sm:block">
            <span className="block font-display text-lg font-semibold">{site.org.phone}</span>
            <span className="block text-xs text-[var(--muted)]">{site.org.hours === "уточняется" ? "часы работы уточняются" : site.org.hours}</span>
          </a>
          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded border border-[var(--line)] px-3 py-2 text-sm marker:content-none">
              Меню
            </summary>
            <ul className="absolute right-0 mt-2 w-56 rounded border border-[var(--line)] bg-[var(--surface)] p-2 shadow-lg">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block rounded px-3 py-2 text-sm hover:bg-[var(--paper)]">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-[var(--line)] mt-1 pt-1">
                <a href={phoneHref} className="block rounded px-3 py-2 text-sm font-medium">
                  {site.org.phone}
                </a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
