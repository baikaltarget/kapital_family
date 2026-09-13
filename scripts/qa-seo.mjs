/**
 * Проверка SEO по всем адресам из sitemap.
 * Запуск: npm run build && npx next start -p 3100, затем `node scripts/qa-seo.mjs`
 * Базовый адрес можно задать: BASE=http://localhost:3100 node scripts/qa-seo.mjs
 */
const BASE = process.env.BASE || "http://localhost:3100";

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : "";
};

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&mdash;/g, "—")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, "·");

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) =>
  m[1].replace(/^https?:\/\/[^/]+/, BASE)
);

let problems = 0;
const rows = [];

for (const url of urls) {
  const res = await fetch(url);
  const html = await res.text();
  const path = url.replace(BASE, "") || "/";

  const title = decode(pick(html, /<title>([\s\S]*?)<\/title>/));
  const desc = decode(pick(html, /<meta name="description" content="([\s\S]*?)"/));
  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/);
  const h1all = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    decode(m[1].replace(/<[^>]+>/g, "").trim())
  );

  const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let ldTypes = [];
  let ldBroken = 0;
  for (const l of lds) {
    try {
      const parsed = JSON.parse(l[1]);
      (Array.isArray(parsed) ? parsed : [parsed]).forEach((p) => ldTypes.push(p["@type"]));
    } catch {
      ldBroken++;
    }
  }

  const errs = [];
  if (res.status !== 200) errs.push(`статус ${res.status}`);
  if (h1all.length !== 1) errs.push(`H1: ${h1all.length}`);
  if (title.length < 30 || title.length > 75) errs.push(`title ${title.length} симв.`);
  if (desc.length < 100 || desc.length > 220) errs.push(`description ${desc.length} симв.`);
  if (!canonical) errs.push("нет canonical");
  if (ldBroken) errs.push(`битый JSON-LD: ${ldBroken}`);
  if (!ldTypes.length) errs.push("нет JSON-LD");

  if (errs.length) problems++;
  rows.push({ path, title: title.length, desc: desc.length, h1: h1all.length, ld: ldTypes.join(", "), errs });
}

for (const r of rows) {
  const mark = r.errs.length ? "ОШИБКА" : "ок    ";
  console.log(
    `${mark} ${r.path.padEnd(42)} title:${String(r.title).padStart(3)} desc:${String(r.desc).padStart(3)} h1:${r.h1}  ${r.ld}`
  );
  if (r.errs.length) console.log(`        → ${r.errs.join("; ")}`);
}

console.log(`\nПроверено адресов: ${rows.length}. С замечаниями: ${problems}.`);
process.exit(problems ? 1 : 0);
