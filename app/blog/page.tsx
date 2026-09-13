import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { canonical } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Блог центра здоровья «Капитал Фэмили» — массаж, плавание, дети",
  description:
    "Статьи о массаже, обучении плаванию и здоровье детей от специалистов центра «Капитал Фэмили» в Ангарске.",
  alternates: { canonical: canonical("/blog/") },
};

export default function Page() {
  const posts = getPosts();
  return (
    <div className="wrap pb-12">
      <Breadcrumbs items={[{ name: "Блог", href: "/blog/" }]} />
      <h1 className="font-display text-3xl leading-tight md:text-4xl">Блог</h1>
      <p className="mt-4 max-w-[64ch] text-lg text-[var(--muted)]">
        Отвечаем на вопросы, которые чаще всего задают по телефону.
      </p>

      <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {posts.map((p) => (
          <article key={p.slug} className="py-5">
            <h2 className="font-display text-xl">
              <Link href={`/blog/${p.slug}/`} className="hover:underline">{p.title}</Link>
            </h2>
            <p className="mt-1 max-w-[68ch] text-[var(--muted)]">{p.description}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {new Date(p.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
