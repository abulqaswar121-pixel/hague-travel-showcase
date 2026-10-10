import resort from "@/assets/resort.jpg";
import hotel from "@/assets/hotel.jpg";
import study from "@/assets/study.jpg";
import relocation from "@/assets/relocation.jpg";
import hero from "@/assets/hero.jpg";
import academy from "@/assets/academy.jpg";

export const WHATSAPP = "https://wa.me/2348000000000";

export const nav = [
  { to: "/flights", label: "Flights" },
  { to: "/hotels", label: "Hotels" },
  { to: "/packages", label: "Packages" },
  { to: "/study-abroad", label: "Study Abroad" },
  { to: "/relocation", label: "Work & Relocation" },
  { to: "/passports", label: "Passports" },
  { to: "/academy", label: "Academy" },
  { to: "/jobs", label: "Remote Jobs" },
  { to: "/corporate", label: "Corporate" },
] as const;

export type Pkg = {
  slug: string; title: string; destination: string; category: string; image: string;
  nights: number; from: number; single: number; child: number; departs: string; returns: string;
  spaces: number; group: string; hotel: string; flights: boolean; earlyBird?: boolean;
  includes: string[]; excludes: string[]; itinerary: string[]; deposit: string; deadline: string; visa: string;
};

export const packages: Pkg[] = [
  {
    slug: "maldives-overwater-escape", title: "Maldives Overwater Escape", destination: "Malé, Maldives",
    category: "Honeymoon", image: resort, nights: 6, from: 3450000, single: 4900000, child: 1650000,
    departs: "14 Feb 2027", returns: "20 Feb 2027", spaces: 6, group: "2–12 guests", hotel: "5★ overwater villa",
    flights: true, earlyBird: true,
    includes: ["Return flights from Lagos", "Speedboat transfers", "Half board", "Sunset cruise", "Couples spa"],
    excludes: ["Visa fees (on arrival)", "Travel insurance", "Personal expenses"],
    itinerary: ["Arrive Malé, speedboat to resort", "Reef snorkelling & lagoon day", "Sandbank picnic", "Free day & spa", "Dolphin sunset cruise", "Leisure & beach dinner", "Departure"],
    deposit: "30% deposit secures booking", deadline: "Book by 15 Jan 2027", visa: "Visa on arrival for Nigerians",
  },
  {
    slug: "dubai-new-year-luxe", title: "Dubai New Year Luxe", destination: "Dubai, UAE", category: "Festive",
    image: hotel, nights: 5, from: 2150000, single: 2900000, child: 980000, departs: "28 Dec 2026", returns: "02 Jan 2027",
    spaces: 11, group: "4–30 guests", hotel: "5★ Downtown hotel", flights: true,
    includes: ["Return flights", "Airport transfers", "Breakfast daily", "Desert safari", "Fireworks dinner cruise"],
    excludes: ["UAE visa (assisted)", "Lunches", "Tourism dirham fee"],
    itinerary: ["Arrival & check-in", "City tour & Burj Khalifa", "Desert safari", "New Year's Eve cruise", "Shopping day", "Departure"],
    deposit: "₦500,000 per person deposit", deadline: "Book by 30 Nov 2026", visa: "UAE visa required — we assist",
  },
  {
    slug: "zanzibar-cultural-coast", title: "Zanzibar Spice & Culture", destination: "Zanzibar, Tanzania",
    category: "African Cultural", image: relocation, nights: 5, from: 1450000, single: 1850000, child: 690000,
    departs: "10 Apr 2027", returns: "15 Apr 2027", spaces: 14, group: "6–20 guests", hotel: "4★ beach resort", flights: true, earlyBird: true,
    includes: ["Return flights", "Stone Town walking tour", "Spice farm visit", "Breakfast & dinners"],
    excludes: ["Visa (e-visa)", "Insurance"],
    itinerary: ["Arrival & Stone Town", "Spice farm & Jozani forest", "Prison Island", "Beach day", "Nungwi sunset", "Departure"],
    deposit: "25% deposit", deadline: "Book by 10 Mar 2027", visa: "E-visa required",
  },
  {
    slug: "london-city-break", title: "London Easter City Break", destination: "London, UK", category: "City Break",
    image: study, nights: 4, from: 2600000, single: 3300000, child: 1200000, departs: "02 Apr 2027", returns: "06 Apr 2027",
    spaces: 9, group: "2–16 guests", hotel: "4★ Kensington hotel", flights: true,
    includes: ["Return flights", "Oyster travel card", "Thames cruise", "West End show"],
    excludes: ["UK visa (assisted)", "Meals not stated"],
    itinerary: ["Arrival & Kensington", "Royal London tour", "West End evening", "Free shopping day", "Departure"],
    deposit: "30% deposit", deadline: "Book by 15 Feb 2027", visa: "UK Standard Visitor visa required",
  },
];

export const routes = [
  { from: "Lagos", to: "London", code: "LOS → LHR", price: 1250000 },
  { from: "Abuja", to: "Dubai", code: "ABV → DXB", price: 780000 },
  { from: "Lagos", to: "Toronto", code: "LOS → YYZ", price: 1690000 },
  { from: "Lagos", to: "Houston", code: "LOS → IAH", price: 1540000 },
  { from: "Lagos", to: "Nairobi", code: "LOS → NBO", price: 520000 },
  { from: "Port Harcourt", to: "Accra", code: "PHC → ACC", price: 310000 },
];

export const countries = [
  { slug: "uk", name: "United Kingdom", flag: "🇬🇧", intake: "Sept & Jan", note: "1-year Master's, Graduate Route" },
  { slug: "canada", name: "Canada", flag: "🇨🇦", intake: "Sept, Jan & May", note: "Co-op programmes & PGWP" },
  { slug: "usa", name: "United States", flag: "🇺🇸", intake: "Aug & Jan", note: "STEM OPT pathways" },
  { slug: "ireland", name: "Ireland", flag: "🇮🇪", intake: "Sept", note: "Stay-back up to 2 years" },
  { slug: "germany", name: "Germany", flag: "🇩🇪", intake: "Oct & Apr", note: "Low / no tuition public unis" },
  { slug: "australia", name: "Australia", flag: "🇦🇺", intake: "Feb & Jul", note: "Post-study work rights" },
];

export const cohorts = [
  { n: "01", month: "FEB", title: "February intake", focus: "Registration, onboarding & first-quarter training", status: "Closing soon" },
  { n: "02", month: "MAY", title: "May intake", focus: "Practical booking exercises & career preparation", status: "Open" },
  { n: "03", month: "AUG", title: "August intake", focus: "Reservations, tour operations, customer service & sales", status: "Upcoming" },
  { n: "04", month: "NOV", title: "November intake", focus: "Year-end cohort & advanced practical sessions", status: "Upcoming" },
];

export const jobs = [
  { id: "travel-consultant-remote", title: "Travel Consultant — Remote", type: "Remote", country: "Global", level: "Entry–Mid", desc: "Flight enquiries, customer support, quotations and booking coordination.", course: "Travel Consulting Foundations" },
  { id: "travel-sales-marketing", title: "Travel Sales & Digital Marketing", type: "Hybrid", country: "Nigeria", level: "Mid", desc: "Lead generation, social campaigns, travel promotions and customer acquisition.", course: "Travel Sales & Marketing" },
  { id: "reservations-cx", title: "Reservations & Customer Experience", type: "Remote", country: "UK / Nigeria", level: "Entry", desc: "Customer enquiries, booking follow-up, itinerary updates and service resolution.", course: "Reservations & GDS Basics" },
];

export const testimonials = [
  { name: "Adaeze O.", role: "MSc student, Manchester", quote: "From my admission letter to the day I landed, Hague Travel handled every detail. I never felt alone." },
  { name: "Tunde & Bisi A.", role: "Honeymoon, Maldives", quote: "Real humans, real answers on WhatsApp at midnight. The villa was beyond words." },
  { name: "Ibrahim K.", role: "Relocated to Toronto", quote: "They planned our family move like a project — housing, school, airport pickup. Flawless." },
];

export const faqs = [
  { q: "Are the fares on this site live?", a: "Fares shown are indicative. A consultant confirms live availability and the final fare before any ticket is issued." },
  { q: "Can you guarantee my visa?", a: "No agency can. Visa decisions rest solely with the relevant embassy or authority. We help you prepare a strong, complete application." },
  { q: "Can I pay in Naira?", a: "Yes. NGN is our primary currency, with USD and GBP available where suppliers support it." },
  { q: "Do you offer instalments?", a: "Tour packages support deposits and staged payments where supplier terms allow. Deadlines are shown on each package." },
  { q: "Is the Academy certificate accredited?", a: "Certificates are issued by Hague Travel Academy. They are not IATA or government accreditation." },
];

export const images = { hero, resort, hotel, study, relocation, academy };

export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");
