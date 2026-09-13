import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.site.url),
  title: {
    default: "Центр здоровья «Капитал Фэмили» в Ангарске — массаж, бассейн, специалисты",
    template: "%s",
  },
  description: site.site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Капитал Фэмили",
  },
};

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = site.org;

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${site.site.url}/#organization`,
    name: "Капитал Фэмили",
    alternateName: org.legalName,
    description: site.site.description,
    url: `${site.site.url}/`,
    telephone: org.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ангарск",
      addressRegion: "Иркутская область",
      streetAddress: "30-й микрорайон, 4",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: org.geo.lat,
      longitude: org.geo.lng,
    },
    areaServed: ["Ангарск", "Мегет", "Усолье-Сибирское"],
    image: `${site.site.url}/img/fasad-tsentra.webp`,
    priceRange: "₽₽",
  };

  return (
    <html lang="ru">
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
        >
          К содержанию
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd data={organizationLd} />
        {YM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
            }}
          />
        )}
      </body>
    </html>
  );
}
