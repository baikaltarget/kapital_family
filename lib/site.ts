import data from "@/content/site.json";

export const site = data;

export type Service = (typeof data.services)[number];

export function servicesByHub(hub: string) {
  return data.services.filter((s) => s.hub === hub);
}

export function getService(hub: string, slug: string) {
  return data.services.find((s) => s.hub === hub && s.slug === slug);
}

export function getHub(slug: string) {
  return data.hubs.find((h) => h.slug === slug);
}

export const phoneHref = `tel:${data.org.phoneRaw}`;

export function canonical(path: string) {
  const base = data.site.url.replace(/\/$/, "");
  if (path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
