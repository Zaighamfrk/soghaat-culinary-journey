import heroFeast from "@/assets/hero-feast.jpg";
import story from "@/assets/story.jpg";
import karahi from "@/assets/dish-karahi.jpg";
import bbq from "@/assets/dish-bbq.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import interior from "@/assets/interior.jpg";

export const RESTAURANT = {
  name: "Soghaat Cuisine",
  tagline: "Authentic Flavours. Memorable Gatherings.",
  street: "A Block Gulgasht Colony 34A",
  city: "Multan",
  country: "Pakistan",
  lat: 30.2165112,
  lng: 71.4701141,
  instagram: "https://www.instagram.com/soghaatcuisine/",
  mapsLink: "https://maps.app.goo.gl/4dfjR8ijgsqk1oXj9",
} as const;

export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.lat},${RESTAURANT.lng}`;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${RESTAURANT.lat},${RESTAURANT.lng}&z=17&hl=en&output=embed`;

/**
 * NOTE ON IMAGERY: the restaurant's own Instagram photography could not be
 * accessed programmatically, so the images below are clearly-labelled
 * placeholders representing Pakistani cuisine. Replace each file in
 * src/assets/ with an authentic Soghaat Cuisine photograph.
 */
export const IMAGES = { heroFeast, story, karahi, bbq, biryani, interior };

export type Dish = {
  id: string;
  name: string;
  note: string;
  image: string;
};

/** Placeholder dish cards — dish names/prices pending verification. */
export const SIGNATURE_DISHES: Dish[] = [
  {
    id: "karahi",
    name: "Karahi",
    note: "Wok-cooked desi curry. Exact varieties and prices pending confirmation.",
    image: karahi,
  },
  {
    id: "bbq",
    name: "BBQ & Grills",
    note: "Charcoal-grilled kebabs and tikka. Menu details pending confirmation.",
    image: bbq,
  },
  {
    id: "rice",
    name: "Rice & Biryani",
    note: "Aromatic rice dishes. Menu details pending confirmation.",
    image: biryani,
  },
  {
    id: "handi",
    name: "Desi Handi",
    note: "Slow-cooked traditional curries. Menu details pending confirmation.",
    image: heroFeast,
  },
];

export const GALLERY = [
  { src: heroFeast, alt: "Placeholder image of a Pakistani feast with karahi, naan and kebabs" },
  { src: karahi, alt: "Placeholder image of chicken karahi in an iron wok" },
  { src: interior, alt: "Placeholder image of a warm restaurant dining room" },
  { src: bbq, alt: "Placeholder image of grilled kebabs on charcoal" },
  { src: biryani, alt: "Placeholder image of biryani served in a copper handi" },
  { src: story, alt: "Placeholder image of naan and curry served at a table" },
];

export const MENU_CATEGORIES = [
  "Starters",
  "Desi & Handi",
  "Karahi",
  "BBQ & Grills",
  "Rice",
  "Chinese",
  "Fast Food",
  "Drinks",
  "Desserts",
] as const;
