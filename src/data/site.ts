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

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  veg?: boolean;
  signature?: boolean;
  image?: string;
};

/**
 * SAMPLE MENU — dish names are common Pakistani dishes and the prices below are
 * placeholders (PKR) that have NOT been confirmed with the restaurant.
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: "chicken-karahi",
    name: "Chicken Karahi",
    category: "Karahi",
    description: "Wok-cooked chicken with tomato, ginger and green chilli.",
    price: 1800,
    signature: true,
    image: karahi,
  },
  {
    id: "mutton-karahi",
    name: "Mutton Karahi",
    category: "Karahi",
    description: "Slow-cooked mutton in a peppery tomato masala.",
    price: 2800,
    image: karahi,
  },
  {
    id: "seekh-kebab",
    name: "Seekh Kebab",
    category: "BBQ & Grills",
    description: "Charcoal-grilled minced beef skewers with fresh herbs.",
    price: 650,
    signature: true,
    image: bbq,
  },
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    category: "BBQ & Grills",
    description: "Marinated bone-in chicken grilled over coals.",
    price: 550,
    image: bbq,
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    category: "Rice",
    description: "Layered basmati rice with spiced chicken and saffron.",
    price: 750,
    signature: true,
    image: biryani,
  },
  {
    id: "daal-mash",
    name: "Daal Mash",
    category: "Desi & Handi",
    description: "White lentils tempered with cumin, garlic and ginger.",
    price: 600,
    veg: true,
    image: heroFeast,
  },
  {
    id: "chicken-handi",
    name: "Chicken Handi",
    category: "Desi & Handi",
    description: "Creamy slow-cooked chicken in a clay handi.",
    price: 1600,
    image: heroFeast,
  },
  {
    id: "pakora-platter",
    name: "Pakora Platter",
    category: "Starters",
    description: "Gram-flour fritters with mint chutney.",
    price: 350,
    veg: true,
    image: story,
  },
  {
    id: "kashmiri-chai",
    name: "Kashmiri Chai",
    category: "Drinks",
    description: "Pink tea finished with pistachio and almond.",
    price: 300,
    veg: true,
    image: story,
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    category: "Desserts",
    description: "Warm milk dumplings in cardamom syrup (2 pcs).",
    price: 250,
    veg: true,
    image: story,
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    category: "Rice",
    description: "Slow-dum basmati with tender mutton, kewra and fried onion.",
    price: 950,
    image: biryani,
  },
  {
    id: "chicken-pulao",
    name: "Chicken Pulao",
    category: "Rice",
    description: "Yakhni-cooked rice with chicken, whole spices and green chilli.",
    price: 650,
    image: biryani,
  },
  {
    id: "malai-boti",
    name: "Chicken Malai Boti",
    category: "BBQ & Grills",
    description: "Cream-and-cheese marinated boneless chicken off the skewer.",
    price: 700,
    image: bbq,
  },
  {
    id: "beef-seekh-platter",
    name: "Mixed Grill Platter",
    category: "BBQ & Grills",
    description: "Seekh kebab, tikka and malai boti with naan and chutney.",
    price: 1950,
    signature: true,
    image: bbq,
  },
  {
    id: "beef-karahi",
    name: "Beef Karahi",
    category: "Karahi",
    description: "Bone-in beef simmered in tomato, black pepper and coriander.",
    price: 2200,
    image: karahi,
  },
  {
    id: "white-karahi",
    name: "Chicken White Karahi",
    category: "Karahi",
    description: "Yoghurt and cream based karahi with crushed white pepper.",
    price: 1900,
    image: karahi,
  },
  {
    id: "mutton-handi",
    name: "Mutton Achari Handi",
    category: "Desi & Handi",
    description: "Pickle-spiced mutton handi finished with fresh coriander.",
    price: 2400,
    image: heroFeast,
  },
  {
    id: "palak-paneer",
    name: "Palak Paneer",
    category: "Desi & Handi",
    description: "Spinach curry with cubes of soft paneer and garlic tarka.",
    price: 850,
    veg: true,
    image: heroFeast,
  },
  {
    id: "chicken-samosa",
    name: "Chicken Samosa (4 pcs)",
    category: "Starters",
    description: "Crisp pastry parcels filled with spiced minced chicken.",
    price: 300,
    image: story,
  },
  {
    id: "chicken-soup",
    name: "Hot & Sour Soup",
    category: "Chinese",
    description: "Peppery chicken and vegetable soup with egg ribbons.",
    price: 450,
    image: story,
  },
  {
    id: "chicken-chowmein",
    name: "Chicken Chowmein",
    category: "Chinese",
    description: "Stir-fried noodles with shredded chicken and crisp vegetables.",
    price: 900,
    image: heroFeast,
  },
  {
    id: "zinger-burger",
    name: "Zinger Burger",
    category: "Fast Food",
    description: "Crispy fried chicken fillet, lettuce and mayo in a soft bun.",
    price: 550,
    image: story,
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    category: "Fast Food",
    description: "Fries topped with cheese sauce, chicken chunks and jalapeño.",
    price: 480,
    image: story,
  },
  {
    id: "mint-margarita",
    name: "Mint Margarita",
    category: "Drinks",
    description: "Chilled lemon and mint blend, lightly sweetened.",
    price: 320,
    veg: true,
    image: story,
  },
  {
    id: "kheer",
    name: "Kheer",
    category: "Desserts",
    description: "Slow-cooked rice pudding with cardamom and pistachio.",
    price: 280,
    veg: true,
    image: story,
  },
];


export const CURRENCY = "PKR";

export const formatPrice = (value: number) =>
  `${CURRENCY} ${value.toLocaleString("en-PK")}`;

/** Verified by the owner: destinations for reservation & order requests. */
export const CONTACT = {
  whatsapp: "+92 305 7531602",
  whatsappDigits: "923057531602",
  email: "zaighamfk.69@gmail.com",
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (subject: string, body: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

