import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.name,
    url: site.url,
    image: `${site.url}/og.png`,
    email: site.email,
    telephone: site.primaryPhone.display,
    foundingDate: String(site.foundingYear),
    taxID: site.ico,
    identifier: site.ico,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: "Teplice",
      addressRegion: "Ústecký kraj",
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: ["Teplice", "Ústecký kraj", "Praha", "Česko"],
    sameAs: [site.social.facebook],
    description: site.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
