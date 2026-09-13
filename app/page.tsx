import type { Metadata } from "next";
import Link from "next/link";
import { site, servicesByHub, phoneHref, canonical } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import NeedsData from "@/components/NeedsData";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Центр здоровья «Капитал Фэмили» в Ангарске — массаж, бассейн, специалисты",
  description:
    "Центр здоровья в Ангарске, 30-й микрорайон: массаж от 1000 ₽, бассейн и обучение плаванию от 650 ₽, прокол ушей с 9 месяцев, приём специалистов. Детский массаж с 1 месяца.",
  alternates: { canonical: canonical("/") },
};

const directions = [
  {
    hub: "massazh",
    href: "/massazh/",
    color: "var(--massage)",
    title: "Массаж",
    text: "Десять программ для взрослых и детей: общий, спины, лица, детский с первого месяца, реабилитация после травм и операций.",
    price: "от 1000 ₽",
  },
  {
    hub: "basseyn",
    href: "/basseyn/",
    color: "var(--pool)",
    title: "Бассейн",
    text: "Обучение плаванию для детей и взрослых, грудничковое плавание, аквааэробика, аренда чаши целиком.",
    price: "от 650 ₽",
  },
  {
    hub: "deti",
    href: "/prokol-ushey/",
    color: "var(--kids)",
    title: "Прокол ушей",
    text: "Стерильным одноразовым пистолетом, детям с 9 месяцев и взрослым. Разметка показывается до прокола.",
    price: "от 1000 ₽",
  },
];

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faqGlobal.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* Первый экран */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div>
            <h1 className="font-display text-3xl leading-tight md:text-5xl">
              {site.hero.h1}
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-[var(--muted)]">
              {site.hero.lead}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={phoneHref}
                className="rounded bg-[var(--massage)] px-6 py-3 font-medium text-white"
              >
                Позвонить и записаться
              </a>
              <Link
                href="/tseny/"
                className="rounded border border-[var(--line)] px-6 py-3 font-medium"
              >
                Смотреть цены
              </Link>
            </div>

            <p className="mt-4 text-sm text-[var(--muted)]">
              {site.org.address} · {site.org.hoursNeedsData ? "часы работы уточняются" : site.org.hours}
            </p>
          </div>

          <figure className="overflow-hidden rounded">
            <img
              src={site.hero.photo}
              alt={site.hero.photoAlt}
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Направления */}
      <section className="wrap py-12">
        <h2 className="font-display text-2xl md:text-3xl">Три направления в одном здании</h2>
        <p className="mt-2 max-w-[60ch] text-[var(--muted)]">
          Записаться можно по одному телефону. Семье удобно, когда ребёнку занятие в бассейне, а
          взрослому массаж — в один приезд.
        </p>

        <div className="mt-8 space-y-4">
          {directions.map((d) => {
            const items = d.hub === "deti" ? [] : servicesByHub(d.hub);
            return (
              <article
                key={d.href}
                data-section={d.hub}
                className="border-l-4 bg-[var(--surface)] p-6 md:p-8"
                style={{ borderColor: d.color }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl">
                    <Link href={d.href} className="hover:underline">
                      {d.title}
                    </Link>
                  </h3>
                  <span className="font-display text-lg" style={{ color: d.color }}>
                    {d.price}
                  </span>
                </div>
                <p className="mt-2 max-w-[68ch] text-[var(--muted)]">{d.text}</p>

                {items.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {items.slice(0, 6).map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.hub}/${s.slug}/`} className="underline decoration-[var(--line)] underline-offset-4 hover:decoration-current">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Приём специалистов */}
      <section className="wrap pb-12">
        <div className="border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
          <h2 className="font-display text-2xl">Приём специалистов</h2>
          <p className="mt-2 max-w-[68ch] text-[var(--muted)]">
            В центре ведут приём врачи. Записаться можно по телефону — администратор подскажет, кто
            принимает в ближайшие дни.
          </p>
          <NeedsData>
            список специальностей и расписание приёма. Сейчас на сайте четыре карточки-заглушки на
            странице «Специалисты» — заменим на реальных врачей, когда заказчик передаст имена, фото
            и специальности.
          </NeedsData>
          <Link href="/spetsialisty/" className="mt-2 inline-block font-medium underline">
            Кто принимает
          </Link>
        </div>
      </section>

      {/* О центре + фото */}
      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap grid gap-8 py-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Центр здоровья для всей семьи</h2>
            <div className="mt-4 space-y-3 text-[var(--muted)] leading-relaxed">
              <p>{site.about.text[1]}</p>
              <p>Работаем со взрослыми и с детьми с первого месяца жизни.</p>
            </div>
            <Link href="/o-nas/" className="mt-4 inline-block font-medium underline">
              Подробнее о центре
            </Link>
          </div>
          <figure>
            <img
              src="/img/resepshn.webp"
              alt="Ресепшн центра здоровья «Капитал Фэмили» в Ангарске"
              width={1280}
              height={960}
              className="w-full rounded object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Вопросы + форма */}
      <section className="wrap grid gap-10 py-12 md:grid-cols-2">
        <div>
          <Faq items={site.faqGlobal} />
        </div>
        <div id="zapis" className="md:pt-12">
          <LeadForm goal="lead_main" />
        </div>
      </section>

      <JsonLd data={faqLd} />
    </>
  );
}
