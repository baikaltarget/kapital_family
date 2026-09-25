import Link from "next/link";
import { site, servicesByHub, getHub, phoneHref, canonical } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import NeedsData from "@/components/NeedsData";
import JsonLd from "@/components/JsonLd";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--muted)]">
      {children}
    </span>
  );
}

export function HubView({ hubSlug }: { hubSlug: string }) {
  const hub = getHub(hubSlug);
  const items = servicesByHub(hubSlug);
  if (!hub) return null;

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
        { "@type": "ListItem", position: 2, name: hub.title, item: canonical(`/${hub.slug}/`) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: items.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: canonical(`/${s.hub}/${s.slug}/`),
      })),
    },
  ];

  return (
    <div data-section={hub.slug} className="wrap pb-12">
      <Breadcrumbs items={[{ name: hub.title, href: `/${hub.slug}/` }]} />

      <header className="max-w-[64ch]">
        <h1 className="font-display text-3xl leading-tight md:text-4xl">{hub.h1}</h1>
        <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">{hub.lead}</p>
      </header>

      <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((s) => (
          <article key={s.slug} className="grid gap-2 py-5 md:grid-cols-[1fr_auto] md:items-baseline">
            <div>
              <h2 className="font-display text-xl">
                <Link href={`/${s.hub}/${s.slug}/`} className="hover:underline">
                  {s.title}
                </Link>
              </h2>
              <p className="mt-1 max-w-[68ch] text-[var(--muted)]">{s.lead}</p>
              <p className="mt-2 flex flex-wrap gap-2">
                <Badge>{s.duration}</Badge>
                {s.age && <Badge>{s.age}</Badge>}
              </p>
            </div>
            <p className="font-display text-lg md:text-right" style={{ color: "var(--accent)" }}>
              {s.priceText}
              {s.priceDraft && (
                <span className="ml-2 align-middle text-xs text-red-700">цена не подтверждена</span>
              )}
            </p>
          </article>
        ))}
      </div>

      <section className="mt-10 max-w-[68ch] text-[var(--muted)] leading-relaxed">
        <p>{hub.intro}</p>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Как записаться</h2>
          <p className="mt-2 text-[var(--muted)]">
            Позвоните — администратор подберёт время и специалиста. Или оставьте номер, перезвоним
            сами.
          </p>
          <p className="mt-4">
            <a href={phoneHref} className="font-display text-2xl font-semibold">
              {site.org.phone}
            </a>
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">{site.org.address}</p>
        </div>
        <div id="zapis">
          <LeadForm service={hub.title} goal={`lead_${hub.slug}`} />
        </div>
      </section>

      <JsonLd data={ld} />
    </div>
  );
}

export function ServiceView({ hubSlug, slug }: { hubSlug: string; slug: string }) {
  const hub = getHub(hubSlug);
  const s = site.services.find((x) => x.hub === hubSlug && x.slug === slug);
  if (!hub || !s) return null;

  const others = servicesByHub(hubSlug).filter((x) => x.slug !== slug).slice(0, 5);

  const ld: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
        { "@type": "ListItem", position: 2, name: hub.title, item: canonical(`/${hub.slug}/`) },
        { "@type": "ListItem", position: 3, name: s.title, item: canonical(`/${s.hub}/${s.slug}/`) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      serviceType: s.title,
      description: s.metaDescription,
      url: canonical(`/${s.hub}/${s.slug}/`),
      provider: { "@id": `${site.site.url}/#organization` },
      areaServed: { "@type": "City", name: "Ангарск" },
      ...(s.price
        ? {
            offers: {
              "@type": "Offer",
              price: s.price,
              priceCurrency: "RUB",
              availability: "https://schema.org/InStock",
              url: canonical(`/${s.hub}/${s.slug}/`),
            },
          }
        : {}),
    },
  ];

  if (s.faq?.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <div data-section={hub.slug} className="wrap pb-12">
      <Breadcrumbs
        items={[
          { name: hub.title, href: `/${hub.slug}/` },
          { name: s.title, href: `/${s.hub}/${s.slug}/` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <header className="max-w-[64ch]">
            <h1 className="font-display text-3xl leading-tight md:text-4xl">{s.h1}</h1>
            <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">{s.lead}</p>
            <p className="mt-4 flex flex-wrap gap-2">
              <Badge>{s.duration}</Badge>
              {s.age && <Badge>{s.age}</Badge>}
            </p>
          </header>

          {/* Цена */}
          <section className="mt-8 border-y border-[var(--line)] py-5">
            <h2 className="font-display text-xl">Стоимость</h2>
            {s.optionGroups?.length ? (
              <div className="mt-3 space-y-5">
                {s.optionGroups.map((g) => (
                  <div key={g.title}>
                    <h3 className="text-sm font-semibold">{g.title}</h3>
                    <table className="mt-2 w-full text-sm">
                      <tbody>
                        {g.rows.map((o) => (
                          <tr key={o.name} className="border-b border-[var(--line)] last:border-0">
                            <td className="py-2 pr-4">{o.name}</td>
                            <td className="py-2 text-right font-medium">{o.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ) : s.options?.length ? (
              <table className="mt-3 w-full text-sm">
                <tbody>
                  {s.options.map((o) => (
                    <tr key={o.name} className="border-b border-[var(--line)] last:border-0">
                      <td className="py-2 pr-4">{o.name}</td>
                      <td className="py-2 text-right font-medium">{o.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-2 font-display text-2xl" style={{ color: "var(--accent)" }}>
                {s.priceText}
              </p>
            )}
            {s.priceNote && <p className="mt-2 text-sm text-[var(--muted)]">{s.priceNote}</p>}
            {s.priceDraft && (
              <NeedsData>цена на эту услугу. Заказчик подтверждает стоимость и длительность.</NeedsData>
            )}
          </section>

          {s.forWhom?.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-2xl">Когда стоит прийти</h2>
              <ul className="mt-3 space-y-2">
                {s.forWhom.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <span className="text-[var(--muted)]">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {s.howItGoes?.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-2xl">Как проходит</h2>
              <ol className="mt-3 space-y-3">
                {s.howItGoes.map((h, i) => (
                  <li key={h} className="flex gap-4">
                    <span
                      className="font-display text-lg leading-none"
                      style={{ color: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[var(--muted)]">{h}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <Faq items={s.faq} />

          <section className="mt-12">
            <h2 className="font-display text-2xl">Другие программы</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.hub}/${o.slug}/`}
                    className="underline decoration-[var(--line)] underline-offset-4 hover:decoration-current"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" id="zapis">
          <LeadForm service={s.title} goal={`lead_${s.slug}`} />
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
