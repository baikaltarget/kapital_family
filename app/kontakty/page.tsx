import type { Metadata } from "next";
import { site, canonical, phoneHref } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import NeedsData from "@/components/NeedsData";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: site.contacts.metaTitle,
  description: site.contacts.metaDescription,
  alternates: { canonical: canonical("/kontakty/") },
};

export default function Page() {
  const o = site.org;
  return (
    <div className="wrap pb-12">
      <Breadcrumbs items={[{ name: "Контакты", href: "/kontakty/" }]} />
      <h1 className="font-display text-3xl leading-tight md:text-4xl">{site.contacts.h1}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
              <dt className="text-[var(--muted)]">Адрес</dt>
              <dd>
                {o.address}
                <span className="block text-sm text-[var(--muted)]">{o.addressNote}</span>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
              <dt className="text-[var(--muted)]">Телефон</dt>
              <dd>
                <a href={phoneHref} className="font-display text-xl font-semibold">{o.phone}</a>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
              <dt className="text-[var(--muted)]">Часы работы</dt>
              <dd>{o.hoursNeedsData ? "уточняются" : o.hours}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
              <dt className="text-[var(--muted)]">Соцсети</dt>
              <dd>{o.socials.length ? o.socials.join(", ") : "скоро появятся"}</dd>
            </div>
          </dl>

          <NeedsData>
            телефон, часы работы, ссылки на соцсети и 2ГИС, точка на карте. Как только будет телефон —
            он встанет в шапку, в подвал и в мобильную панель автоматически.
          </NeedsData>

          <div className="mt-6 flex h-64 items-center justify-center border-2 border-dashed border-red-400 bg-red-50 text-sm text-red-700">
            Здесь будет карта: Ангарск, 30-й микрорайон, 4
          </div>

          <div className="mt-8 text-sm text-[var(--muted)]">
            <p className="mb-2 font-medium text-[var(--ink)]">Реквизиты</p>
            <p>{o.legalName}</p>
            <p>ИНН {o.inn} · КПП {o.kpp} · ОГРН {o.ogrn}</p>
            <p>Юридический адрес: {o.legalAddress}</p>
            <p>Директор: {o.director}, действует на основании устава</p>
          </div>
        </div>

        <div id="zapis">
          <LeadForm goal="lead_contacts" />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
            { "@type": "ListItem", position: 2, name: "Контакты", item: canonical("/kontakty/") },
          ],
        }}
      />
    </div>
  );
}
