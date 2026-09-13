import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/ServiceView";
import { servicesByHub, getService, canonical } from "@/lib/site";

const HUB = "massazh";

export function generateStaticParams() {
  return servicesByHub(HUB).map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(HUB, params.slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: canonical(`/${HUB}/${s.slug}/`) },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const s = getService(HUB, params.slug);
  if (!s) notFound();
  return <ServiceView hubSlug={HUB} slug={params.slug} />;
}
