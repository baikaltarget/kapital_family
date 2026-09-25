import type { Metadata } from "next";
import Link from "next/link";
import { site, canonical, phoneHref } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";

const u = site.usolie;

export const metadata: Metadata = {
  title: u.metaTitle,
  description: u.metaDescription,
  alternates: { canonical: canonical("/usolie-sibirskoe/") },
};

export default function Page() {
  return (
    <div data-section="basseyn" className="wrap pb-12">
      <Breadcrumbs items={[{ name: "Усолье-Сибирское", href: "/usolie-sibirskoe/" }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="max-w-[68ch]">
          <h1 className="font-display text-3xl leading-tight md:text-4xl">{u.h1}</h1>
          <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">{u.lead}</p>
          {u.text.map((t) => (
            <p key={t} className="mt-4 text-[var(--muted)] leading-relaxed">{t}</p>
          ))}

          <h2 className="mt-8 font-display text-2xl">Что можно совместить за одну поездку</h2>
          <ul className="mt-3 space-y-2">
            {[
              { href: "/basseyn/grudnichkovoe-plavanie/", t: "Грудничковое плавание — 1600 ₽" },
              { href: "/basseyn/plavanie-dlya-detey/", t: "Занятие для ребёнка с тренером — от 650 ₽" },
              { href: "/massazh/detskiy/", t: "Детский массаж с 1 месяца — от 800 ₽" },
              { href: "/prokol-ushey/detyam/", t: "Прокол ушей ребёнку с 9 месяцев — от 700 ₽" },
            ].map((i) => (
              <li key={i.href} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                <Link href={i.href} className="underline decoration-[var(--line)] underline-offset-4">
                  {i.t}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[var(--muted)]">
            Адрес: {site.org.address}. Телефон для записи:{" "}
            <a href={phoneHref} className="font-medium underline">{site.org.phone}</a>.
          </p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" id="zapis">
          <LeadForm service="Занятия в бассейне (Усолье-Сибирское)" goal="lead_usolie" />
        </aside>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
            { "@type": "ListItem", position: 2, name: "Усолье-Сибирское", item: canonical("/usolie-sibirskoe/") },
          ],
        }}
      />
    </div>
  );
}
