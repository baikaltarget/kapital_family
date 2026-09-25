import type { Metadata } from "next";
import { site, phoneHref, canonical } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Проколоть уши ребёнку в Ангарске — с 9 месяцев, от 700 ₽",
  description:
    "Прокол ушей ребёнку в Ангарске стерильным одноразовым пистолетом, с 9 месяцев. 1 прокол — 700 ₽, 2 прокола — 1000 ₽. Разметка показывается родителю до прокола. Запись по телефону.",
  alternates: { canonical: canonical("/prokol-ushey/detyam/") },
};

const faq = [
  {
    q: "В каком возрасте лучше прокалывать уши ребёнку?",
    a: "Мы делаем с 9 месяцев. Единственно верного возраста нет: одни родители приходят с малышами, другие ждут, пока ребёнок сам попросит и сможет ухаживать за ушами.",
  },
  {
    q: "Ребёнок будет плакать?",
    a: "Чаще всего дети пугаются щелчка, а не боли. Помогает, если родитель держит ребёнка на руках и заранее спокойно объясняет, что будет происходить.",
  },
  {
    q: "Можно проколоть только одно ухо?",
    a: "Обычно прокалывают оба. Если нужен другой вариант, скажите об этом при записи.",
  },
  {
    q: "Как ухаживать за ушами после?",
    a: "После процедуры вам расскажут, чем обрабатывать и как долго. Главное в первые недели — не трогать уши грязными руками и не снимать серёжки раньше срока.",
  },
];

export default function Page() {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
        { "@type": "ListItem", position: 2, name: "Прокол ушей", item: canonical("/prokol-ushey/") },
        { "@type": "ListItem", position: 3, name: "Ребёнку", item: canonical("/prokol-ushey/detyam/") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div data-section="deti" className="wrap pb-12">
      <Breadcrumbs
        items={[
          { name: "Прокол ушей", href: "/prokol-ushey/" },
          { name: "Ребёнку", href: "/prokol-ushey/detyam/" },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="max-w-[68ch]">
          <h1 className="font-display text-3xl leading-tight md:text-4xl">
            Прокол ушей ребёнку в Ангарске
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
            С 9 месяцев, стерильным одноразовым пистолетом. Разметку показываем родителю до прокола —
            вы видите, где именно будут серёжки, и можете попросить поправить.
          </p>

          <section className="mt-8 border-y border-[var(--line)] py-5">
            <h2 className="font-display text-xl">Стоимость</h2>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {site.prokol.options.map((o) => (
                  <tr key={o.name} className="border-b border-[var(--line)] last:border-0">
                    <td className="py-2 pr-4">{o.name}</td>
                    <td className="py-2 text-right font-medium">{o.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl">Как подготовить ребёнка</h2>
            <ul className="mt-3 space-y-2">
              {[
                "Выберите день, когда ребёнок выспался и не голоден",
                "Расскажите заранее, что будет один короткий щелчок",
                "Планируйте так, чтобы в ближайшие дни не было бассейна и открытых водоёмов",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <span className="text-[var(--muted)]">{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <Faq items={faq} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" id="zapis">
          <LeadForm service="Прокол ушей ребёнку" goal="lead_prokol_deti" />
          <div className="mt-4 rounded border border-[var(--line)] bg-[var(--surface)] p-5 text-sm">
            <p className="text-[var(--muted)]">Или позвоните:</p>
            <a href={phoneHref} className="mt-1 block font-display text-xl font-semibold">
              {site.org.phone}
            </a>
          </div>
        </aside>
      </div>

      <JsonLd data={ld} />
    </div>
  );
}
