import type { Metadata } from "next";
import Link from "next/link";
import { site, canonical } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
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
          <h1 className="font-display text-3xl leading-tight md:text-4xl">{site.about.h1}</h1>
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

        <aside>
          <img
            src="/img/kabinet-priema.webp"
            alt="Кабинет приёма в центре здоровья «Капитал Фэмили», Ангарск"
            width={1280}
            height={960}
            className="w-full rounded"
          />
          <p className="mt-2 text-sm text-[var(--muted)]">Кабинет приёма</p>
          <NeedsData>
            фотографии бассейна, массажного кабинета и занятий с людьми. Сейчас на сайте только три
            фото помещений без людей — этого мало для главной и страниц услуг.
          </NeedsData>
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
