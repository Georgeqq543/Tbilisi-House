/**
 * Tbilisi House — Boutique Stay
 * Demo concept for a multilingual hospitality landing page.
 * Not a real hotel. Replace SITE, rooms, prices, contacts and copy
 * before handing this to a real client.
 */
const SITE = {
  brand: "Tbilisi House",
  tagline: "Boutique Stay",
  phoneDisplay: "+995 555 123 456",
  phoneHref: "tel:+995555123456",
  whatsappNumber: "995555123456",
  email: "hello@tbilisihouse.demo",
  demoAddress: "12 Example Street, Old Tbilisi",
  mapsQuery: "Old Tbilisi, Georgia",
  instagramUrl: "https://www.instagram.com/",
  currency: "GEL",
  defaultLang: "en",
  storageKey: "tbilisi-house-lang",
};

SITE.whatsappUrl = function (text) {
  const message = text || "Hello Tbilisi House, I would like to check availability.";
  return "https://wa.me/" + SITE.whatsappNumber + "?text=" + encodeURIComponent(message);
};

SITE.mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(SITE.mapsQuery);
SITE.directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(SITE.mapsQuery);

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=80",
  courtyard: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
  courtyard2: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  courtyard3: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  balcony: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
  balcony2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  balcony3: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  suite: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
  suite2: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  suite3: "https://images.unsplash.com/photo-1566665797739-1674d7f64c0f?auto=format&fit=crop&w=1200&q=80",
  why: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
  facade: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=1400&q=80",
  bedroom: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
  breakfast: "https://images.unsplash.com/photo-1493770348161-369560ae630e?auto=format&fit=crop&w=1400&q=80",
  tbilisi: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1400&q=80",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
  details: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
};

const ROOMS = [
  {
    id: "courtyard",
    priceFrom: 160,
    guests: 2,
    size: 22,
    popular: false,
    images: [IMAGES.courtyard, IMAGES.courtyard2, IMAGES.courtyard3],
  },
  {
    id: "balcony",
    priceFrom: 220,
    guests: 2,
    size: 28,
    popular: true,
    images: [IMAGES.balcony, IMAGES.balcony2, IMAGES.balcony3],
  },
  {
    id: "suite",
    priceFrom: 320,
    guests: 4,
    size: 42,
    popular: false,
    images: [IMAGES.suite, IMAGES.suite2, IMAGES.suite3],
  },
];

const GALLERY = [
  { src: IMAGES.facade, key: "facade" },
  { src: IMAGES.bedroom, key: "bedroom" },
  { src: IMAGES.breakfast, key: "breakfast" },
  { src: IMAGES.tbilisi, key: "tbilisi" },
  { src: IMAGES.coffee, key: "coffee" },
  { src: IMAGES.details, key: "details" },
];

const OSM_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=44.788%2C41.686%2C44.816%2C41.702&layer=mapnik&marker=41.6934%2C44.8015";
