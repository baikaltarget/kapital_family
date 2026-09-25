import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/blog";
import { canonical, site } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: canonical(`/blog/${p.slug}/`) },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.date,
      url: canonical(`/blog/${p.slug}/`),
      mainEntityOfPage: canonical(`/blog/${p.slug}/`),
      author: { "@type": "Organization", name: "FAMILY Академия" },
      publisher: { "@id": `${site.site.url}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: canonical("/") },
        { "@type": "ListItem", position: 2, name: "Блог", item: canonical("/blog/") },
        { "@type": "ListItem", position: 3, name: p.title, item: canonical(`/blog/${p.slug}/`) },
      ],
    },
  ];

  return (
    <div className="wrap pb-12">
      <Breadcrumbs
        items={[
          { name: "Блог", href: "/blog/" },
          { name: p.title, href: `/blog/${p.slug}/` },
        ]}
      />
      <article className="prose-kf max-w-[68ch]">
        <h1 className="font-display text-3xl leading-tight md:text-4xl">{p.title}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {new Date(p.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <div className="mt-6" dangerouslySetInnerHTML={{ __html: p.html }} />
      </article>
      <JsonLd data={ld} />
    </div>
  );
}
