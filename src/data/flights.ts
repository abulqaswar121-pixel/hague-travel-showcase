import hero from "@/assets/hero.jpg";
import documents from "@/assets/documents.jpg";
import type { FlightResult, FlightRoute } from "./types";

export const FLIGHT_HERO = hero;
export const DOCS_IMAGE = documents;

/** Popular city pairs used on the homepage and as search defaults. */
const ROUTES: FlightRoute[] = [
  {
    id: "los-lhr",
    from: "Lagos",
    fromCode: "LOS",
    to: "London",
    toCode: "LHR",
    airline: "Multiple carriers",
    stops: 0,
    duration: "6h 25m",
    indicativeFrom: 1250000,
    seasonal: "Peak: Jul–Sep, Dec",
  },
  {
    id: "abv-dxb",
    from: "Abuja",
    fromCode: "ABV",
    to: "Dubai",
    toCode: "DXB",
    airline: "Multiple carriers",
    stops: 1,
    duration: "9h 40m",
    indicativeFrom: 780000,
    seasonal: "Peak: Dec–Jan",
  },
  {
    id: "los-yyz",
    from: "Lagos",
    fromCode: "LOS",
    to: "Toronto",
    toCode: "YYZ",
    airline: "Multiple carriers",
    stops: 1,
    duration: "14h 20m",
    indicativeFrom: 1690000,
    seasonal: "Peak: Aug, Jan (student intake)",
  },
  {
    id: "los-iah",
    from: "Lagos",
    fromCode: "LOS",
    to: "Houston",
    toCode: "IAH",
    airline: "Multiple carriers",
    stops: 1,
    duration: "15h 05m",
    indicativeFrom: 1540000,
    seasonal: "Peak: May–Jul",
  },
  {
    id: "los-nbo",
    from: "Lagos",
    fromCode: "LOS",
    to: "Nairobi",
    toCode: "NBO",
    airline: "Kenya Airways",
    stops: 0,
    duration: "4h 45m",
    indicativeFrom: 520000,
    seasonal: "Peak: Dec, Apr–May",
  },
  {
    id: "phc-acc",
    from: "Port Harcourt",
    fromCode: "PHC",
    to: "Accra",
    toCode: "ACC",
    airline: "Africa-focused carriers",
    stops: 0,
    duration: "1h 30m",
    indicativeFrom: 310000,
    seasonal: "Peak: Dec (Detty December)",
  },
  {
    id: "los-jed",
    from: "Lagos",
    fromCode: "LOS",
    to: "Jeddah",
    toCode: "JED",
    airline: "Multiple carriers",
    stops: 1,
    duration: "8h 10m",
    indicativeFrom: 890000,
    seasonal: "Peak: Ramadan, Dec–Feb",
  },
  {
    id: "los-mme",
    from: "Lagos",
    fromCode: "LOS",
    to: "Manchester",
    toCode: "MME",
    airline: "Multiple carriers",
    stops: 1,
    duration: "8h 55m",
    indicativeFrom: 1310000,
    seasonal: "Peak: Sep intake",
  },
  {
    id: "los-skup",
    from: "Lagos",
    fromCode: "LOS",
    to: "Istanbul",
    toCode: "IST",
    airline: "Turkish Airlines",
    stops: 0,
    duration: "7h 30m",
    indicativeFrom: 960000,
    seasonal: "Year-round",
  },
  {
    id: "los-cpt",
    from: "Lagos",
    fromCode: "LOS",
    to: "Cape Town",
    toCode: "CPT",
    airline: "Multiple carriers",
    stops: 1,
    duration: "9h 15m",
    indicativeFrom: 1080000,
    seasonal: "Peak: Jul–Aug, Dec",
  },
];

const AIRLINES = [
  "British Airways",
  "Virgin Atlantic",
  "Qatar Airways",
  "Turkish Airlines",
  "Kenya Airways",
  "Emirates",
  "RwandAir",
  "South African Airways",
];

/**
 * Deterministic pseudo-results so the demo is stable across refreshes.
 * Nothing here is a live fare: it is illustrative inventory for the preview only.
 */
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h) + 1;
}

export function getPopularRoutes(limit = 6): FlightRoute[] {
  return ROUTES.slice(0, limit);
}

export function getAllRoutes(): FlightRoute[] {
  return ROUTES;
}

export function searchDemoFlights(input: {
  from: string;
  to: string;
  tripType: "Round trip" | "One way" | "Multi-city";
  cabin: string;
  pax: number;
  flexible: boolean;
}): FlightResult[] {
  const rand = seeded(hash(`${input.from}|${input.to}|${input.cabin}`));
  const base =
    ROUTES.find(
      (r) =>
        input.from.toLowerCase().includes(r.fromCode.toLowerCase()) ||
        input.from.toLowerCase().includes(r.from.toLowerCase()),
    ) ?? ROUTES[0];
  const routeFactor = base ? base.indicativeFrom : 1200000;
  const cabinFactor =
    input.cabin === "Business" ? 3.1 : input.cabin === "Premium Economy" ? 1.6 : 1;
  const stopsFor = input.flexible ? [0, 1, 1, 2] : [0, 1, 1, 0];

  return stopsFor.map((stops, i) => {
    const airline = AIRLINES[hash(input.to + i) % AIRLINES.length] ?? "Partner carrier";
    const shift = 0.82 + rand() * 0.5;
    const depHour = 6 + Math.floor(rand() * 18);
    const depMin = [0, 15, 30, 45, 55][Math.floor(rand() * 5)] as number;
    const totalMin = (Number.parseInt(base?.duration ?? "7h", 10) || 7) * 60 + stops * 120;
    const arrHour = (depHour + Math.floor(totalMin / 60)) % 24;
    const arrMin = (depMin + totalMin) % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return {
      id: `${input.to}-${stops}-${i}`,
      airline,
      flightNo: `${airline.slice(0, 2).toUpperCase()}${100 + Math.floor(rand() * 800)}`,
      departs: `${pad(depHour)}:${pad(depMin)}`,
      arrives: `${pad(arrHour)}:${pad(arrMin)}`,
      arriveDayPlus: depHour + Math.floor(totalMin / 60) >= 24,
      duration: `${Math.floor(totalMin / 60)}h ${pad(totalMin % 60)}m`,
      stops: stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`,
      via:
        stops > 0
          ? base?.id === "los-nbo"
            ? "NBO"
            : (["DOH", "IST", "ADD", "NBO"][i % 4] ?? "DOH")
          : undefined,
      cabin: input.cabin,
      baggage: input.cabin === "Economy" ? `${stops > 0 ? "1" : "2"} × 23kg` : "2 × 32kg",
      fareConditions:
        i % 4 === 0
          ? "Non-refundable · date change with fee"
          : i % 4 === 1
            ? "Changeable with fee · partial refund before departure"
            : i % 4 === 2
              ? "Refundable with admin fee · no changes after departure"
              : "Saver fare · strictly non-refundable, non-changeable",
      price: Math.round((routeFactor * shift * cabinFactor * input.pax) / 1000) * 1000,
      seatsLeft: 1 + Math.floor(rand() * 9),
    };
  });
}

export const AIRPORTS = [
  "Lagos (LOS)",
  "Abuja (ABV)",
  "Port Harcourt (PHC)",
  "London Heathrow (LHR)",
  "London Gatwick (LGW)",
  "Manchester (MEE)",
  "Dubai (DXB)",
  "Toronto (YYZ)",
  "Houston (IAH)",
  "Atlanta (ATL)",
  "New York (JFK)",
  "Istanbul (IST)",
  "Nairobi (NBO)",
  "Accra (ACC)",
  "Jeddah (JED)",
  "Cape Town (CPT)",
  "Kigali (KGL)",
  "Zanzibar (ZNZ)",
  "Toronto Island (YTZ)",
  "Dublin (DUB)",
];
