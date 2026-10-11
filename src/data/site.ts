import academy from "@/assets/academy.jpg";
import city from "@/assets/city.jpg";
import corporate from "@/assets/corporate.jpg";
import culture from "@/assets/culture.jpg";
import documents from "@/assets/documents.jpg";
import dubai from "@/assets/dubai.jpg";
import hero from "@/assets/hero.jpg";
import hotel from "@/assets/hotel.jpg";
import island from "@/assets/island.jpg";
import relocation from "@/assets/relocation.jpg";
import resort from "@/assets/resort.jpg";
import campus from "@/assets/campus.jpg";

export const BRAND = {
  name: "Hague Travel",
  tagline: "Your Journey. Our Responsibility.",
  group: "A sister brand of the Hague group",
  heroTitle: "Your World. Your Next Chapter.",
  heroSub:
    "Flights, hotels, study abroad, relocation and travel training — one desk, one consultant who owns your file.",
  siteLine: "Flights. Holidays. Hotels. Study Abroad. Work Abroad. Relocation. Travel Careers.",
  company: "Hague Travel (a brand of Hague Digital Solutions)",
  rc: "RC-3789349",
  email: "hello@haguetravel.example",
  desk: "desk@haguetravel.example",
  phone: "+234 810 395 4351",
  hours: "Mon–Sat, 8:00am – 10:00pm WAT",
  address: "Ikeja, Lagos, Nigeria · Remote support worldwide",
} as const;

/**
 * WhatsApp desk. Every page gets a floating button plus a context-prefilled
 * message, matching the human-first promise in the brief.
 */
export const WHATSAPP_NUMBER = "2348103954351";
export const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;

export function waLink(message: string): string {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: "Hello Hague Travel, I'd like help planning a trip. (via haguetravel preview)",
  flights: "Hello Hague Travel, I'd like a flight quotation. Please advise on live availability.",
  hotels: "Hello Hague Travel, I need help finding accommodation for my dates.",
  packages: "Hello Hague Travel, I'm interested in one of your holiday packages.",
  study: "Hello Hague Travel, I'd like a study-abroad eligibility assessment.",
  relocation: "Hello Hague Travel, I'd like to talk about relocating for work.",
  passport: "Hello Hague Travel, I need help with passport documentation.",
  academy: "Hello Hague Travel Academy, I'd like to enrol in an upcoming cohort.",
  jobs: "Hello Hague Travel, I have a question about the careers portal.",
  corporate: "Hello Hague Travel, we need a corporate travel desk for our company.",
  support: "Hello Hague Travel, I need assistance with an existing booking.",
} as const;

export const images = {
  hero,
  resort,
  island,
  hotel,
  study: campus,
  campus,
  relocation,
  academy,
  dubai,
  city,
  culture,
  corporate,
  documents,
} as const;

export interface NavChild {
  label: string;
  to: string;
  hash?: string;
  description?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  to: string;
  eyebrow: string;
  blurb: string;
  image: string;
  children: NavChild[];
}

/** Mega-menu structure — mirrors the site map in the business brief. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Flights & Travel",
    to: "/flights",
    eyebrow: "Flights & Travel",
    blurb: "Search, compare, then let a consultant confirm the real price with the airline.",
    image: images.hero,
    children: [
      { label: "Flights", to: "/flights", description: "Domestic, international, multi-city" },
      { label: "Hotels", to: "/hotels", description: "Stays, apartments and long-stay housing" },
      {
        label: "Tour Packages",
        to: "/packages",
        description: "Beach, festive, honeymoon, cultural",
      },
      {
        label: "Transfers",
        to: "/extras",
        description: "Airport pickups, coaches and meet-and-greet",
      },
      {
        label: "Travel Insurance",
        to: "/insurance",
        description: "Compared through verified partners",
      },
      { label: "Travel Extras", to: "/extras", description: "Lounges, eSIM, baggage, guides" },
    ],
  },
  {
    label: "Study Abroad",
    to: "/study-abroad",
    eyebrow: "Study Abroad",
    blurb: "From picking a course to packing your bags, with your papers checked at every step.",
    image: images.campus,
    children: [
      {
        label: "Study abroad overview",
        to: "/study-abroad",
        description: "The eight-step journey",
      },
      { label: "United Kingdom", to: "/study-abroad/uk", badge: "Partner coverage" },
      { label: "Canada", to: "/study-abroad/canada", badge: "Partner coverage" },
      { label: "United States", to: "/study-abroad/usa", badge: "Partner coverage" },
      { label: "Ireland", to: "/study-abroad/ireland", badge: "Partner coverage" },
      { label: "Germany", to: "/study-abroad/germany", badge: "Partner coverage" },
      { label: "Australia", to: "/study-abroad/australia", badge: "Partner coverage" },
    ],
  },
  {
    label: "Work & Relocation",
    to: "/relocation",
    eyebrow: "Work & Relocation",
    blurb: "Pathways, paperwork and the plain reality of moving a house.",
    image: images.relocation,
    children: [
      { label: "Work visa guidance", to: "/relocation" },
      { label: "Overseas jobs", to: "/jobs" },
      { label: "Professional relocation", to: "/relocation" },
      {
        label: "Education financing referrals",
        to: "/relocation",
        hash: "financing",
        description: "Referral only — not a lender",
      },
    ],
  },
  {
    label: "Passports & Docs",
    to: "/passports",
    eyebrow: "Passports & Documentation",
    blurb: "Assistance and guidance only — issuance stays with the government.",
    image: images.documents,
    children: [
      { label: "New passport assistance", to: "/passports" },
      { label: "Renewal guidance", to: "/passports", hash: "renewal" },
      { label: "Document checklists", to: "/passports", hash: "checklists" },
    ],
  },
  {
    label: "Academy",
    to: "/academy",
    eyebrow: "Hague Travel Academy",
    blurb: "Online training for people who want to work in travel, every quarter.",
    image: images.academy,
    children: [
      { label: "Programme", to: "/academy" },
      { label: "Cohorts", to: "/academy", hash: "cohorts" },
      { label: "Curriculum", to: "/academy", hash: "curriculum" },
      { label: "Certification", to: "/academy", hash: "certification" },
      { label: "Enrol", to: "/academy", hash: "enrol" },
    ],
  },
];

export const NAV_FLAT: NavChild[] = [
  { label: "Remote Jobs", to: "/jobs" },
  { label: "Corporate", to: "/corporate" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_COLUMNS: { title: string; links: NavChild[] }[] = [
  {
    title: "Book a trip",
    links: [
      { label: "Flights", to: "/flights" },
      { label: "Hotels & long stays", to: "/hotels" },
      { label: "Tour packages", to: "/packages" },
      { label: "Travel insurance", to: "/insurance" },
      { label: "Transfers & extras", to: "/extras" },
    ],
  },
  {
    title: "Go global",
    links: [
      { label: "Study abroad", to: "/study-abroad" },
      { label: "Work & relocation", to: "/relocation" },
      { label: "Passports & documents", to: "/passports" },
      { label: "Corporate travel", to: "/corporate" },
      { label: "Remote jobs portal", to: "/jobs" },
    ],
  },
  {
    title: "Learn & earn",
    links: [
      { label: "Hague Travel Academy", to: "/academy" },
      { label: "Curriculum", to: "/academy", hash: "curriculum" },
      { label: "Enrol", to: "/academy", hash: "enrol" },
      { label: "About Hague Travel", to: "/about" },
      { label: "Contact a consultant", to: "/contact" },
    ],
  },
  {
    title: "Your account",
    links: [
      { label: "Customer dashboard", to: "/dashboard" },
      { label: "Admin dashboard (demo)", to: "/admin" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    title: "Legal & policy",
    links: [
      { label: "Booking terms", to: "/terms" },
      { label: "Privacy policy", to: "/privacy" },
      { label: "Refund & cancellation", to: "/refund-policy" },
      { label: "Visa disclaimer", to: "/visa-disclaimer" },
    ],
  },
];

export const CURRENCIES = [
  { code: "NGN", label: "NGN", symbol: "₦", rate: 1, locale: "en-NG" },
  { code: "USD", label: "USD", symbol: "$", rate: 1 / 1550, locale: "en-US" },
  { code: "GBP", label: "GBP", symbol: "£", rate: 1 / 1980, locale: "en-GB" },
] as const;

export const COMPLIANCE_NOTES = {
  indicative:
    "Interactive concept preview. Live fares, hotel inventory, payments and confirmed bookings require integration with actual suppliers. Prices on this site are a guide. Nothing is fixed until the supplier says yes.",
  visa: "A visa is approved only by the embassy or immigration office — never by us. We help you put honest, complete papers together. We cannot promise a result.",
  passport:
    "Only the government can issue a passport, take your biometrics and approve it. We help with the forms, the photos and the appointment. That is all we do.",
  fees: "Every invoice shows two lines: what the government, embassy or school charges, and what we charge for our work.",
  partners:
    "Some partners pay us a referral commission. We always tell you in writing. It does not change your price.",
  documents:
    "We take documents through an encrypted upload. Only your consultant can open them. We delete them 14 days after your trip, unless you ask us to keep them.",
  academy:
    "Certificates are issued by Hague Travel Academy and are not IATA or government accreditation.",
  jobs: "These are example role categories, not live vacancies. You never pay to use the board. We do not promise you a job or an income.",
  financing:
    "Hague Travel is not a lender. We refer you to verified partners and help you apply. Nothing is approved until the lender writes to you.",
} as const;
