import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image`,
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
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
    description: site.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "13",
      bestRating: "5",
    },
    employee: site.people.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
      telephone: person.phone,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
