import type { Metadata } from "next";
import { HubView } from "@/components/ServiceView";
import { getHub, canonical } from "@/lib/site";

const hub = getHub("basseyn")!;

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.metaDescription,
  alternates: { canonical: canonical("/basseyn/") },
};

export default function Page() {
  return <HubView hubSlug="basseyn" />;
}
