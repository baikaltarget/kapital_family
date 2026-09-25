import Link from "next/link";
import { site, phoneHref } from "@/lib/site";

export default function Footer() {
  const o = site.org;
  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="wrap grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">FAMILY Академия</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Центр здоровья в Ангарске</p>
          <p className="mt-4 text-sm">{o.address}</p>
          <p className="mt-1 text-sm">
            <a href={phoneHref} className="font-medium hover:underline">{o.phone}</a>
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {o.hoursNeedsData ? "Часы работы уточняются" : o.hours}
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium">Разделы</p>
          <ul className="space-y-2 text-[var(--muted)]">
            <li><Link href="/massazh/" className="hover:underline">Массаж</Link></li>
            <li><Link href="/basseyn/" className="hover:underline">Бассейн</Link></li>
            <li><Link href="/prokol-ushey/" className="hover:underline">Прокол ушей</Link></li>
            <li><Link href="/tseny/" className="hover:underline">Цены</Link></li>
            <li><Link href="/blog/" className="hover:underline">Блог</Link></li>
            <li><Link href="/otzyvy/" className="hover:underline">Отзывы</Link></li>
            <li><Link href="/politika/" className="hover:underline">Политика конфиденциальности</Link></li>
          </ul>
        </div>

        <div className="text-sm text-[var(--muted)]">
          <p className="mb-3 font-medium text-[var(--ink)]">Реквизиты</p>
          <p>{o.legalName}</p>
          <p>ИНН {o.inn} · КПП {o.kpp}</p>
          <p>ОГРН {o.ogrn}</p>
          <p className="mt-2">Юридический адрес: {o.legalAddress}</p>
          <p className="mt-2">Директор: {o.director}</p>
          {o.license?.number ? (
            <p className="mt-2">Лицензия № {o.license.number}</p>
          ) : (
            <p className="mt-2">Номер лицензии на медицинскую деятельность будет указан здесь</p>
          )}
          <p className="mt-4 text-xs">
            Имеются противопоказания. Необходима консультация специалиста.
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="wrap mobile-bar-offset flex flex-wrap items-center justify-between gap-2 py-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {site.org.legalName}
          </p>
          {site.developer && (
            <p className="text-xs opacity-60">
              {site.developer.text} —{" "}
              <a
                href={site.developer.url}
                target="_blank"
                rel="noopener"
                className="hover:underline"
              >
                {site.developer.name}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
