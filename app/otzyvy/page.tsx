import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Отзывы о центре здоровья «Капитал Фэмили» в Ангарске",
  description:
    "Отзывы клиентов центра здоровья «Капитал Фэмили» в Ангарске о массаже, занятиях в бассейне и приёме специалистов.",
  alternates: { canonical: canonical("/otzyvy/") },
};

export default function Page() {
  return (
    <div className="wrap pb-12">
      <Breadcrumbs items={[{ name: "Отзывы", href: "/otzyvy/" }]} />
      <h1 className="font-display text-3xl leading-tight md:text-4xl">
        Отзывы о центре «Капитал Фэмили»
      </h1>
      <p className="mt-4 max-w-[64ch] text-lg text-[var(--muted)]">
        Здесь будут отзывы клиентов — из 2ГИС, Яндекс.Карт и мессенджеров.
      </p>

      <NeedsData>
        3–5 отзывов: скрины из 2ГИС, Яндекс.Карт или переписки. Публикуем только реальные отзывы, с
        указанием источника — выдуманные вредят и в поиске, и в доверии.
      </NeedsData>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-48 items-center justify-center border-2 border-dashed border-red-400 bg-red-50 p-4 text-center text-sm text-red-700"
          >
            Место для отзыва {i}
          </div>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
            { "@type": "ListItem", position: 2, name: "Отзывы", item: canonical("/otzyvy/") },
          ],
        }}
      />
    </div>
  );
}
