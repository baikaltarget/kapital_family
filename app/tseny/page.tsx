import type { Metadata } from "next";
import Link from "next/link";
import { site, servicesByHub, canonical, phoneHref } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Цены на массаж, бассейн и прокол ушей в Ангарске | Капитал Фэмили",
  description:
    "Полный прайс центра здоровья «Капитал Фэмили» в Ангарске: массаж от 1000 ₽, занятие в бассейне от 650 ₽, аренда чаши 7500 ₽/час, прокол ушей от 1000 ₽.",
  alternates: { canonical: canonical("/tseny/") },
};

function Table({ title, items, color }: any) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl" style={{ color }}>{title}</h2>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--line)] text-left text-[var(--muted)]">
            <th className="py-2 font-medium">Услуга</th>
            <th className="py-2 font-medium">Длительность</th>
            <th className="py-2 text-right font-medium">Цена</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r: any) => (
            <tr key={r.name} className="border-b border-[var(--line)]">
              <td className="py-3 pr-4">
                {r.href ? <Link href={r.href} className="underline decoration-[var(--line)] underline-offset-4">{r.name}</Link> : r.name}
              </td>
              <td className="py-3 pr-4 text-[var(--muted)]">{r.duration || ""}</td>
              <td className="py-3 text-right font-medium">
                {r.price}
                {r.draft && <span className="ml-2 text-xs font-normal text-red-700">черновик</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function Page() {
  const massage: any[] = [];
  servicesByHub("massazh").forEach((s) => {
    if (s.options?.length) {
      s.options.forEach((o: any, i: number) =>
        massage.push({
          name: `${s.title} — ${o.name}`,
          duration: i === 0 ? s.duration : "",
          price: o.price,
          href: i === 0 ? `/massazh/${s.slug}/` : undefined,
          draft: s.priceDraft,
        })
      );
    } else {
      massage.push({
        name: s.title,
        duration: s.duration,
        price: s.priceText,
        href: `/massazh/${s.slug}/`,
        draft: s.priceDraft,
      });
    }
  });

  const pool: any[] = [];
  servicesByHub("basseyn").forEach((s) => {
    if (s.options?.length) {
      s.options.forEach((o: any, i: number) =>
        pool.push({
          name: `${s.title} — ${o.name}`,
          duration: i === 0 ? s.duration : "",
          price: o.price,
          href: i === 0 ? `/basseyn/${s.slug}/` : undefined,
          draft: s.priceDraft,
        })
      );
    } else {
      pool.push({
        name: s.title,
        duration: s.duration,
        price: s.priceText,
        href: `/basseyn/${s.slug}/`,
        draft: s.priceDraft,
      });
    }
  });

  const prokol = site.prokol.options.map((o: any) => ({
    name: `Прокол ушей — ${o.name}`,
    duration: "—",
    price: o.price,
    href: "/prokol-ushey/",
  }));

  return (
    <div className="wrap pb-12">
      <Breadcrumbs items={[{ name: "Цены", href: "/tseny/" }]} />
      <h1 className="font-display text-3xl leading-tight md:text-4xl">
        Цены центра здоровья «Капитал Фэмили»
      </h1>
      <p className="mt-4 max-w-[64ch] text-lg text-[var(--muted)]">
        Полный прайс на массаж, занятия в бассейне и прокол ушей. Записаться можно по телефону{" "}
        <a href={phoneHref} className="font-medium underline">{site.org.phone}</a>.
      </p>

      <NeedsData>
        подтвердить цены, отмеченные как черновик, и уточнить, есть ли абонементы и курсы —
        например, 10 сеансов массажа или 8 занятий в бассейне со скидкой.
      </NeedsData>

      <Table title="Массаж" items={massage} color="var(--massage)" />
      <Table title="Бассейн" items={pool} color="var(--pool)" />
      <Table title="Прокол ушей" items={prokol} color="var(--kids)" />

      <p className="mt-8 max-w-[68ch] text-sm text-[var(--muted)]">
        Цены действуют на дату публикации. Стоимость реабилитационного массажа определяется после
        осмотра специалиста. Имеются противопоказания, необходима консультация специалиста.
      </p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
            { "@type": "ListItem", position: 2, name: "Цены", item: canonical("/tseny/") },
          ],
        }}
      />
    </div>
  );
}
