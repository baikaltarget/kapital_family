import type { Metadata } from "next";
import Link from "next/link";
import { site, phoneHref, canonical } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";

const p = site.prokol;

export const metadata: Metadata = {
  title: p.metaTitle,
  description: p.metaDescription,
  alternates: { canonical: canonical("/prokol-ushey/") },
};

export default function Page() {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
        { "@type": "ListItem", position: 2, name: "Прокол ушей", item: canonical("/prokol-ushey/") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Прокол ушей",
      description: p.metaDescription,
      url: canonical("/prokol-ushey/"),
      provider: { "@id": `${site.site.url}/#organization` },
      areaServed: { "@type": "City", name: "Ангарск" },
      offers: {
        "@type": "Offer",
        price: 1000,
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        url: canonical("/prokol-ushey/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div data-section="deti" className="wrap pb-12">
      <Breadcrumbs items={[{ name: "Прокол ушей", href: "/prokol-ushey/" }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <h1 className="font-display text-3xl leading-tight md:text-4xl">{p.h1}</h1>
          <p className="mt-4 max-w-[64ch] text-lg text-[var(--muted)] leading-relaxed">{p.lead}</p>

          <section className="mt-8 border-y border-[var(--line)] py-5">
            <h2 className="font-display text-xl">Стоимость</h2>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {p.options.map((o) => (
                  <tr key={o.name} className="border-b border-[var(--line)] last:border-0">
                    <td className="py-2 pr-4">{o.name}</td>
                    <td className="py-2 text-right font-medium">{o.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl">Как проходит</h2>
            <ol className="mt-3 space-y-3">
              {p.howItGoes.map((h, i) => (
                <li key={h} className="flex gap-4">
                  <span className="font-display text-lg leading-none" style={{ color: "var(--accent)" }}>
                    {i + 1}
                  </span>
                  <span className="text-[var(--muted)]">{h}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-8 max-w-[68ch]">
            <h2 className="font-display text-2xl">Ребёнку</h2>
            <p className="mt-3 text-[var(--muted)] leading-relaxed">
              Детям мы прокалываем уши с 9 месяцев. Подробнее о том, как проходит процедура у детей и
              что спрашивают родители — на отдельной странице.
            </p>
            <Link href="/prokol-ushey/detyam/" className="mt-3 inline-block font-medium underline">
              Прокол ушей ребёнку
            </Link>
          </section>

          <Faq items={p.faq} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" id="zapis">
          <LeadForm service="Прокол ушей" goal="lead_prokol" />
          <div className="mt-4 rounded border border-[var(--line)] bg-[var(--surface)] p-5 text-sm">
            <p className="text-[var(--muted)]">Или позвоните:</p>
            <a href={phoneHref} className="mt-1 block font-display text-xl font-semibold">
              {site.org.phone}
            </a>
            <p className="mt-3 text-[var(--muted)]">{site.org.address}</p>
          </div>
        </aside>
      </div>

      <JsonLd data={ld} />
    </div>
  );
}
