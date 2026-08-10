import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { SignatureDishes } from "@/components/site/signature-dishes";
import { GallerySection } from "@/components/site/gallery-section";
import { FindUs } from "@/components/site/find-us";
import { Reservation } from "@/components/site/reservation";
import {
  ContactCta,
  Experience,
  FromOurKitchen,
  Story,
} from "@/components/site/sections";
import { RESTAURANT } from "@/data/site";

const TITLE = "Soghaat Cuisine Multan | Pakistani & Desi Restaurant, Gulgasht";
const DESC =
  "Soghaat Cuisine is a Pakistani and desi restaurant in A Block Gulgasht Colony, Multan. Authentic flavours, karahi, BBQ and family dining.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "restaurant.restaurant" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: RESTAURANT.name,
          servesCuisine: ["Pakistani", "Desi", "BBQ"],
          address: {
            "@type": "PostalAddress",
            streetAddress: RESTAURANT.street,
            addressLocality: RESTAURANT.city,
            addressCountry: "PK",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: RESTAURANT.lat,
            longitude: RESTAURANT.lng,
          },
          hasMap: RESTAURANT.mapsLink,
          sameAs: [RESTAURANT.instagram],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Story />
        <SignatureDishes />
        <GallerySection />
        <Experience />
        <FindUs />
        <FromOurKitchen />
        <Reservation />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  );
}
