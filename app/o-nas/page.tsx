import type { Metadata } from "next";
import Link from "next/link";
import { site, canonical } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import Tight from "@/components/Tight";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: site.about.metaTitle,
  description: site.about.metaDescription,
  alternates: { canonical: canonical("/o-nas/") },
};

export default function Page() {
  return (
    <div className="wrap pb-12">
      <Breadcrumbs items={[{ name: "О центре", href: "/o-nas/" }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
        <div className="prose-kf max-w-[68ch]">
          <h1 className="font-display text-3xl leading-tight md:text-4xl"><Tight>{site.about.h1}</Tight></h1>
          {site.about.text.map((t) => (
            <p key={t} className="mt-4 text-[var(--muted)]">{t}</p>
          ))}

          <NeedsData>
            год открытия центра, сколько человек занимается и сколько специалистов работает, номер
            лицензии на медицинскую деятельность. Эти цифры хорошо работают на странице и в поиске.
          </NeedsData>

          <h2 className="font-display text-2xl">Коротко</h2>
          <table>
            <tbody>
              {site.about.facts.map((f) => (
                <tr key={f.label}>
                  <th>{f.label}</th>
                  <td>{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            Посмотреть цены можно на <Link href="/tseny/">странице цен</Link>, а записаться — по
            телефону или через форму на странице <Link href="/kontakty/">контактов</Link>.
          </p>
        </div>

        <aside className="space-y-6">
          <figure className="overflow-hidden rounded-card shadow-card">
            <img
              src="/img/basseyn-bolshaya-chasha.webp"
              alt="Большая чаша бассейна центра здоровья «FAMILY Академия», Ангарск"
              width={1600}
              height={1067}
              className="w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-sm text-[var(--muted)]">
              Большая чаша бассейна
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-card bg-[var(--surface)] shadow-card">
            <img
              src="/img/diplom.webp"
              alt="Диплом за первое место в конкурсе «Лучшие объекты социальной инфраструктуры» — за интерьер центра «FAMILY Академия»"
              width={1100}
              height={1467}
              className="w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
              Диплом 1-й степени конкурса «Лучшие объекты социальной инфраструктуры», номинация
              «Реализованные интерьеры. Медицинские учреждения», 2018. Награду получил проект
              центра, автор — архитектурное бюро VAAB.
            </figcaption>
          </figure>
        </aside>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
            { "@type": "ListItem", position: 2, name: "О центре", item: canonical("/o-nas/") },
          ],
        }}
      />
    </div>
  );
}
