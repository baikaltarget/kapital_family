import type { Metadata } from "next";
import Link from "next/link";
import { site, servicesByHub, phoneHref, canonical } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Tight from "@/components/Tight";

export const metadata: Metadata = {
  title: "Центр здоровья «FAMILY Академия» в Ангарске — массаж, бассейн, специалисты",
  description:
    "Центр здоровья в Ангарске, 30-й микрорайон: массаж от 800 ₽, бассейн и обучение плаванию от 650 ₽, прокол ушей от 700 ₽, приём специалистов. Детский массаж с 1 месяца.",
  alternates: { canonical: canonical("/") },
};

const directions = [
  {
    hub: "massazh",
    href: "/massazh/",
    color: "var(--massage)",
    title: "Массаж",
    text: "Тринадцать программ для взрослых и детей: от общего массажа и лимфодренажного до детского с первого месяца и восстановления после травм.",
    price: "от 800 ₽",
    photo: "/img/kabinet-massazha.webp",
    photoAlt: "Кабинет массажа в центре здоровья «FAMILY Академия» в Ангарске",
    more: "Все программы массажа",
  },
  {
    hub: "basseyn",
    href: "/basseyn/",
    color: "var(--pool)",
    title: "Бассейн",
    text: "Групповые тренировки и занятия один на один с тренером, свободное и грудничковое плавание, аквааэробика, аренда чаши целиком.",
    price: "от 650 ₽",
    photo: "/img/basseyn-bolshaya-chasha.webp",
    photoAlt: "Большая чаша бассейна центра «FAMILY Академия» в Ангарске",
    more: "Расписание и цены",
  },
  {
    hub: "deti",
    href: "/prokol-ushey/",
    color: "var(--kids)",
    title: "Прокол ушей",
    text: "Стерильным одноразовым пистолетом, детям с 9 месяцев и взрослым. Разметку показываем до прокола, до 9 отверстий в одном ухе.",
    price: "от 700 ₽",
    photo: "/img/kabinet-priema.webp",
    photoAlt: "Кабинет приёма в центре здоровья «FAMILY Академия» в Ангарске",
    more: "Как проходит прокол",
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
      {/* Первый экран — фото бассейна на всю ширину */}
      <section className="relative isolate overflow-hidden bg-[var(--brand-dark)]">
        <img
          src="/img/hero-basseyn.webp"
          alt="Бассейн центра здоровья «FAMILY Академия» в Ангарске"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,42,27,.93) 0%, rgba(10,42,27,.80) 42%, rgba(10,42,27,.30) 78%, rgba(10,42,27,.20) 100%)",
          }}
        />
        <div className="wrap py-14 md:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
            Ангарск · 30-й микрорайон
          </p>
          <h1 className="mt-4 max-w-[21ch] font-display text-[2.1rem] text-white sm:text-5xl lg:text-[3.55rem]">
            <Tight>{site.hero.h1}</Tight>
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/85">
            {site.hero.lead}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {[
              { t: "Плавание", href: "/basseyn/", c: "var(--pool)" },
              { t: "Реабилитация", href: "/massazh/reabilitatsionnyy/", c: "var(--brand)" },
              { t: "Массаж", href: "/massazh/", c: "var(--kids)" },
            ].map((p) => (
              <li key={p.t}>
                <Link
                  href={p.href}
                  className="block rounded-pill px-5 py-2.5 font-medium text-white shadow-card transition hover:brightness-110"
                  style={{ background: p.c }}
                >
                  {p.t}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={phoneHref}
              className="rounded-pill bg-white px-7 py-3.5 font-display text-lg font-semibold text-[var(--brand-dark)] shadow-lift transition hover:bg-white/90"
            >
              {site.org.phone}
            </a>
            <Link
              href="/tseny/"
              className="rounded-pill border border-white/45 px-7 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              Смотреть цены
            </Link>
          </div>
        </div>
      </section>

      {/* Полоса фактов — ломает монотонность и снимает частые вопросы */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)]">
        <ul className="wrap grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-4">
          {[
            { big: "с 1 месяца", small: "работаем с детьми с первых недель жизни" },
            { big: "3 направления", small: "бассейн, массаж и приём — в одном здании" },
            { big: "1-е место", small: "интерьер центра, «Реализованные интерьеры», 2018" },
            { big: "30 мкр., д. 4", small: "своя парковка у входа" },
          ].map((f) => (
            <li key={f.big}>
              <p className="font-display text-xl text-[var(--brand)]">{f.big}</p>
              <p className="mt-1 text-sm leading-snug text-[var(--muted)]">{f.small}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Направления — карточками с фото */}
      <section className="wrap py-14 md:py-16">
        <h2 className="max-w-[24ch] font-display text-3xl md:text-4xl">
          Три направления в одном здании
        </h2>
        <p className="mt-3 max-w-[56ch] text-lg text-[var(--muted)]">
          Записаться можно по одному телефону. Семье удобно, когда ребёнку занятие в бассейне, а
          взрослому массаж — в один приезд.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {directions.map((d) => {
            const items = d.hub === "deti" ? [] : servicesByHub(d.hub);
            return (
              <article
                key={d.href}
                data-section={d.hub}
                className="group flex flex-col overflow-hidden rounded-card bg-[var(--surface)] shadow-card transition hover:shadow-lift"
              >
                <Link href={d.href} className="block overflow-hidden">
                  <img
                    src={d.photo}
                    alt={d.photoAlt}
                    width={1600}
                    height={1067}
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl">
                      <Link href={d.href} className="hover:underline">
                        {d.title}
                      </Link>
                    </h3>
                    <span
                      className="shrink-0 rounded-pill px-3 py-1 text-sm font-semibold text-white"
                      style={{ background: d.color }}
                    >
                      {d.price}
                    </span>
                  </div>
                  <p className="mt-3 text-[var(--muted)]">{d.text}</p>

                  {items.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {items.slice(0, 5).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/${s.hub}/${s.slug}/`}
                            className="block rounded-pill bg-[var(--paper)] px-3 py-1.5 text-sm transition hover:bg-[var(--brand-soft)]"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={d.href}
                    className="mt-auto pt-5 font-medium underline underline-offset-4"
                    style={{ color: d.color }}
                  >
                    {d.more}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>


      {/* О центре + награда за интерьер */}
      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap grid items-center gap-10 py-14 md:grid-cols-[1.15fr,0.85fr] md:py-16">
          <div>
            <h2 className="max-w-[18ch] font-display text-3xl md:text-4xl">
              Центр здоровья для всей семьи
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--muted)]">
              <p>{site.about.text[1]}</p>
              <p>Работаем со взрослыми и с детьми с первого месяца жизни.</p>
            </div>

            <div className="mt-7 rounded-card bg-[var(--brand-soft)] p-6">
              <p className="font-display text-xl text-[var(--brand-dark)]">
                Интерьер центра — 1-е место в конкурсе
              </p>
              <p className="mt-2 leading-relaxed text-[var(--brand-dark)]/80">
                «Лучшие объекты социальной инфраструктуры», номинация «Реализованные интерьеры.
                Медицинские учреждения», 2018. Награду получил проект нашего центра, автор —
                архитектурное бюро VAAB.
              </p>
            </div>

            <Link
              href="/o-nas/"
              className="mt-6 inline-block font-medium text-[var(--brand)] underline underline-offset-4"
            >
              Подробнее о центре
            </Link>
          </div>

          <figure className="overflow-hidden rounded-card shadow-card">
            <img
              src="/img/holl-logotip.webp"
              alt="Холл центра здоровья «FAMILY Академия» в Ангарске — интерьер, отмеченный первым местом в конкурсе"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Как выглядит центр */}
      <section className="wrap py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl md:text-4xl">Как выглядит центр</h2>
          <Link
            href="/basseyn/"
            className="font-medium text-[var(--pool)] underline underline-offset-4"
          >
            Подробнее о бассейне
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { src: "/img/basseyn-detskaya-chasha.webp", alt: "Детская чаша бассейна с игрушками", cap: "Детская чаша" },
            { src: "/img/basseyn-zanyatie.webp", alt: "Занятие с детьми в бассейне с тренером", cap: "Занятия с тренером" },
            { src: "/img/resepshn.webp", alt: "Ресепшн центра здоровья «FAMILY Академия»", cap: "Ресепшн" },
            { src: "/img/vhod-tsentra.webp", alt: "Вход в центр здоровья «FAMILY Академия» в Ангарске", cap: "Вход со двора" },
          ].map((g) => (
            <figure key={g.src} className="overflow-hidden rounded-card bg-[var(--surface)] shadow-card">
              <img
                src={g.src}
                alt={g.alt}
                width={1600}
                height={1067}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-[var(--muted)]">{g.cap}</figcaption>
            </figure>
          ))}
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
