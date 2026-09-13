import type { Metadata } from "next";
import { site, canonical, phoneHref } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Специалисты центра здоровья «Капитал Фэмили» в Ангарске",
  description:
    "Массажисты, тренеры по плаванию и врачи центра здоровья «Капитал Фэмили» в Ангарске, 30-й микрорайон. Запись на приём по телефону.",
  alternates: { canonical: canonical("/spetsialisty/") },
};

export default function Page() {
  return (
    <div className="wrap pb-12">
      <Breadcrumbs items={[{ name: "Специалисты", href: "/spetsialisty/" }]} />
      <h1 className="font-display text-3xl leading-tight md:text-4xl">
        Специалисты центра «Капитал Фэмили»
      </h1>
      <p className="mt-4 max-w-[64ch] text-lg text-[var(--muted)]">
        В центре работают массажисты, тренеры по плаванию и врачи. Записаться на приём можно по
        телефону <a href={phoneHref} className="font-medium underline">{site.org.phone}</a>.
      </p>

      <NeedsData>
        имена, фотографии, специальности, образование и стаж специалистов. Ниже — карточки-заглушки,
        их заменим, когда заказчик передаст данные.
      </NeedsData>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.team.members.map((m) => (
          <article key={m.slug} className="border border-[var(--line)] bg-[var(--surface)] p-5">
            <div className="mb-4 flex h-40 items-center justify-center border-2 border-dashed border-red-400 bg-red-50 text-sm text-red-700">
              Фото специалиста
            </div>
            <h2 className="font-display text-lg">{m.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{m.role}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">{m.about}</p>
          </article>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
            { "@type": "ListItem", position: 2, name: "Специалисты", item: canonical("/spetsialisty/") },
          ],
        }}
      />
    </div>
  );
}
