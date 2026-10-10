import documents from "@/assets/documents.jpg";
import hero from "@/assets/hero.jpg";
import resort from "@/assets/resort.jpg";
import campus from "@/assets/campus.jpg";
import corporate from "@/assets/corporate.jpg";
import relocation from "@/assets/relocation.jpg";
import academy from "@/assets/academy.jpg";
import city from "@/assets/city.jpg";
import type { InsuranceProduct, Testimonial, Faq, TravelExtra } from "./types";

export const SERVICE_IMAGES = {
  documents,
  hero,
  resort,
  campus,
  corporate,
  relocation,
  academy,
  city,
};

/* ------------------------------------------------------------------ insurance */
export const INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    id: "single-trip",
    name: "Single Trip Travel Cover",
    type: "Single-trip",
    cover: [
      "Medical expenses up to £5m",
      "Curtailment and interruption",
      "Baggage up to £2,500",
      "Personal liability £2m",
      "Trip delay from 6 hours",
    ],
    limits: "£5m medical · £2,500 baggage · £2m liability",
    excess: "£75 per claim (medical £0)",
    scope: "Worldwide including USA, Canada and Japan",
    exclusions: [
      "Pre-existing conditions not declared",
      "Travel against FCDO advice",
      "Extreme sports without the adventure add-on",
      "Unattended belongings in a vehicle",
    ],
    from: 38500,
    insurer: "Underwritten by a UK-authorised partner insurer (named on the policy schedule)",
  },
  {
    id: "annual-multi",
    name: "Annual Multi-Trip",
    type: "Annual multi-trip",
    cover: [
      "Unlimited trips in 12 months",
      "Up to 31 days per trip",
      "Medical £5m",
      "Baggage £2,500",
      "Gadget cover optional",
    ],
    limits: "£5m medical · 31 days per trip",
    excess: "£50 per claim",
    scope: "Worldwide annual zone (single-country Europe also available)",
    exclusions: [
      "Trips over 31 days",
      "Work-related injury if you are employed abroad",
      "Business cargo liability",
      "Recreational vehicle hire excess",
    ],
    from: 96000,
    insurer: "Underwritten by a UK-authorised partner insurer (named on the policy schedule)",
  },
  {
    id: "medical-evacuation",
    name: "Medical & Emergency Evacuation",
    type: "Medical / evacuation",
    cover: [
      "Emergency treatment and hospitalisation",
      "Medical repatriation",
      "Closest suitable facility, not nearest",
      "Family travel in emergency",
      "24/7 assistance line",
    ],
    limits: "Repatriation covered in full; treatment to policy limit",
    excess: "Nil on emergency evacuation",
    scope: "Worldwide, including remote-area search and rescue add-on",
    exclusions: [
      "Elective treatment abroad",
      "Failure to obtain medical clearance first",
      "Conflict zones",
      "Claims without a police or hospital report",
    ],
    from: 74000,
    insurer:
      "Assisted by a global assistance partner; underwriting at the insurer named in the schedule",
  },
  {
    id: "cancellation",
    name: "Trip Cancellation & Curtailment",
    type: "Cancellation",
    cover: [
      "Non-refundable flights and packages",
      "Accommodation loss",
      "Missed departure from listed causes",
      "Curtailed trip pro-rata",
      "Alternative travel costs",
    ],
    limits: "Up to £10,000 per trip / £25,000 for group bookings",
    excess: "£100 per event",
    scope: "Worldwide",
    exclusions: [
      "Change of mind or employment",
      "Known events at purchase date",
      "Supplier insolvency not on the covered list",
      "Deposits paid after the cover start",
    ],
    from: 52000,
    insurer: "Underwritten by a UK-authorised partner insurer (named on the policy schedule)",
  },
  {
    id: "baggage",
    name: "Baggage, Delay & Personal Effects",
    type: "Baggage",
    cover: [
      "Lost or stolen luggage",
      "Delayed baggage essentials",
      "Personal effects in transit",
      "Emergency clothing purchase",
      "Baggage tracker hire add-on",
    ],
    limits: "£2,500 total · £250 single item",
    excess: "£35",
    scope: "Worldwide, checked and hand luggage",
    exclusions: [
      "Unattended items in public",
      "Business stock and samples",
      "Cash and documents replacement cost limits",
      "Wear and tear",
    ],
    from: 21000,
    insurer: "Underwritten by a UK-authorised partner insurer (named on the policy schedule)",
  },
  {
    id: "student-cover",
    name: "Student & International Study Cover",
    type: "Student / study",
    cover: [
      "12-month annual cover for the visa requirement",
      "Medical and hospitalisation",
      "Baggage and electronics",
      "Curtailed studies on medical grounds",
      "Dependant add-on",
    ],
    limits: "Complies with OSHS / student cover requirements where applicable",
    excess: "£0 medical · £50 other",
    scope: "Country of study, worldwide for travel during holidays",
    exclusions: [
      "Pre-existing conditions not declared at start",
      "Work placements in hazardous roles",
      "Cover lapses from missed renewal",
      "Winter-sports injury without the add-on",
    ],
    from: 148000,
    insurer: "Compared from verified student schemes; the insurer is named on your policy schedule",
  },
];

/* -------------------------------------------------------------------- extras */
export const TRAVEL_EXTRAS: TravelExtra[] = [
  {
    id: "transfer-sedan",
    title: "Airport transfer — private sedan",
    description:
      "Meet-and-greet with a name board, flight tracking and 60 minutes of free waiting.",
    priceFrom: 45000,
    unit: "each way",
    icon: "Car",
    bullets: [
      "Any Lagos, Abuja or PHC airport",
      "Child seat on request",
      "WhatsApp driver contact",
      "Fixed price, no surge",
    ],
  },
  {
    id: "transfer-suv",
    title: "Airport transfer — SUV / family",
    description: "Up to 6 passengers and 6 bags, ideal for arrivals with student luggage.",
    priceFrom: 68000,
    unit: "each way",
    icon: "CarFront",
    bullets: [
      "Extra luggage space",
      "Two child seats",
      "Late-night arrivals included",
      "Corporate invoicing available",
    ],
  },
  {
    id: "transfer-coach",
    title: "Group coach transfer",
    description: "30–50 seat air-conditioned coach for group departures, pilgrimages and retreats.",
    priceFrom: 320000,
    unit: "per day",
    icon: "Bus",
    bullets: [
      "Licensed driver and PSV",
      "Trailer for group bags",
      "Itinerary co-ordination",
      "Insurance certificate on request",
    ],
  },
  {
    id: "lounge",
    title: "Airport lounge access",
    description: "Single-visit lounge access at Murtala Muhammed, Kotoka, DXB and LHR terminals.",
    priceFrom: 62000,
    unit: "per visit",
    icon: "Armchair",
    bullets: [
      "Showers, food, Wi-Fi",
      "Priority lane partner",
      "Child-friendly lounges",
      "Digital pass by email",
    ],
  },
  {
    id: "esim",
    title: "eSIM / local SIM data",
    description:
      "Pre-installed eSIM profiles for 60 destinations plus physical SIM for Nigeria arrivals.",
    priceFrom: 14500,
    unit: "1GB / 7 days",
    icon: "Smartphone",
    bullets: [
      "QR install in 3 minutes",
      "Roaming-free top-ups",
      "Data-only and combo plans",
      "UK/Canada/Ireland bundles",
    ],
  },
  {
    id: "assistance",
    title: "Airport assistance",
    description:
      "Wheelchair, fast-track security, escort through connections and baggage handling.",
    priceFrom: 25000,
    unit: "per service",
    icon: "Accessibility",
    bullets: [
      "Special assistance requests",
      "Unaccompanied minor handling",
      "Connection escort",
      "Airlines notified in advance",
    ],
  },
  {
    id: "car-hire",
    title: "Self-drive car hire",
    description:
      "Supplier-sourced rentals with collision damage waiver and local insurance guidance.",
    priceFrom: 55000,
    unit: "per day",
    icon: "KeyRound",
    bullets: [
      "Automatic or manual",
      "Additional driver",
      "Cross-border options",
      "Covered by our supplier terms",
    ],
  },
  {
    id: "baggage",
    title: "Extra baggage & sports gear",
    description:
      "Pre-purchase baggage, sports equipment, instruments and student oversize allowances.",
    priceFrom: 38000,
    unit: "per leg",
    icon: "Luggage",
    bullets: [
      "Cheaper than airport rate",
      "Student 3rd-bag deals",
      "Oversize approvals",
      "Documented in the PNR",
    ],
  },
];

export const DESTINATION_GUIDES = [
  {
    city: "London",
    country: "United Kingdom",
    reading: "12 min",
    covers: [
      "Arrival & Heathrow rail",
      "Sim and banking",
      "Winter packing",
      "Student part-time rules",
    ],
  },
  {
    city: "Toronto",
    country: "Canada",
    reading: "14 min",
    covers: [
      "PRET and first week",
      "GIC and banking",
      "Winter gear list",
      "OHIP/wait for health cover",
    ],
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    reading: "9 min",
    covers: ["Airport to Marina", "Alcohol & conduct rules", "Ramadan etiquette", "SIM and metro"],
  },
  {
    city: "Istanbul",
    country: "Türkiye",
    reading: "10 min",
    covers: ["Tram and metro card", "Hammam etiquette", "Duty-free limits", "Currency exchange"],
  },
  {
    city: "Accra",
    country: "Ghana",
    reading: "8 min",
    covers: [
      "Cross-border entry",
      "SIM registration",
      "October–January weather",
      "Rideshare safety",
    ],
  },
  {
    city: "Malé",
    country: "Maldives",
    reading: "7 min",
    covers: [
      "Speedboat timings",
      "Reef-safe rules",
      "Alcohol on inhabited islands",
      "Resort dress code",
    ],
  },
];

export const PACKING_CHECKLISTS = [
  {
    id: "student",
    title: "Student departure checklist",
    items: [
      "Passport valid 6+ months",
      "CAS / I-20 / CoE printouts",
      "Financial evidence copies",
      "TB / medical results",
      "Academic originals + 2 copies",
      "30-day arrival plan",
      "First-month budget in cash",
      "Winter coat before you buy local",
    ],
  },
  {
    id: "family",
    title: "Family travel checklist",
    items: [
      "Children's passports and consent letters",
      "Birth certificates",
      "Vaccination records",
      "Travel insurance for every member",
      "Car seat booking confirmation",
      "Medicine with prescription copy",
      "Hotel crib / connecting-room request",
      "Snacks for connections",
    ],
  },
  {
    id: "business",
    title: "Business travel checklist",
    items: [
      "Invitation letter and conference pass",
      "Company travel policy approval",
      "Corporate card + receipt folder",
      "Lounge and transfer confirmations",
      "Device chargers and power adapter",
      "Duty-of-care check-in schedule",
      "Visa and entry clearance copies",
      "Dress code and cultural notes",
    ],
  },
];

/* --------------------------------------------------------------- relocation */
export const RELOCATION_WORKFLOW = [
  {
    title: "Readiness assessment",
    detail:
      "Points-style review of age, language, funds, qualifications and destination fit — with honest odds, not hope.",
    icon: "ClipboardCheck",
  },
  {
    title: "Pathway consultation",
    detail:
      "Study, work permit, intra-company transfer, talent or dependent route compared side by side, with real costs.",
    icon: "GitBranch",
  },
  {
    title: "Documents & qualifications",
    detail:
      "Credential evaluation, translations, police certificates, medicals and attestation sequencing.",
    icon: "FileCheck2",
  },
  {
    title: "Family planning",
    detail:
      "Spouse work rights, school places, dependant visas and the paperwork each family member needs.",
    icon: "Users",
  },
  {
    title: "Temporary & long-term housing",
    detail:
      "Two weeks of serviced accommodation, then a real lease with viewings and agent negotiation.",
    icon: "Building2",
  },
  {
    title: "Moving & baggage",
    detail: "Freight options versus extra airline baggage, customs inventories and duty estimates.",
    icon: "Package",
  },
  {
    title: "Airport pickup & arrival",
    detail:
      "Driver waiting on landing, SIM at arrivals, transit card and a first-week orientation brief.",
    icon: "PlaneLanding",
  },
  {
    title: "Settlement & orientation",
    detail:
      "Bank, tax number, health registration, driving licence exchange and community introductions.",
    icon: "MapPinned",
  },
] as const;

export const FINANCING_DISCLOSURE = {
  heading: "Education financing — referral only",
  body: "Hague Travel is not a lender. We introduce you to verified education-finance partners and help you prepare a complete application. Nothing is approved until the lender confirms it in writing, and affordability is their assessment, not ours.",
  commissions:
    "Where a financing partner pays us a referral commission, we disclose it in the introduction email and on the referral form. The commission never changes the rate you are offered.",
  steps: [
    "We build your tuition and living-cost budget with you",
    "We identify legitimate scholarships and bursaries worth applying for",
    "We introduce verified lenders or education-finance partners",
    "We help you prepare and submit the application correctly",
    "We explain repayment terms and affordability in plain language",
    "We track the application and remind you of every deadline",
  ],
};

export const RELOCATION_SERVICES = [
  {
    title: "Work permit & visa guidance",
    detail:
      "Route selection, employer sponsorship checks, document packs and interview preparation.",
    price: "From ₦280,000 agency fee (government fees separate)",
  },
  {
    title: "Employer & opportunity screening",
    detail:
      "We verify the employer or recruitment partner and check for unpaid-fee red flags before you apply.",
    price: "Included in consultation",
  },
  {
    title: "CV & international application support",
    detail: "Country-format CV rewrite, cover letters, LinkedIn and ATS-friendly rework.",
    price: "₦75,000",
  },
  {
    title: "Credential & qualification guidance",
    detail: "WES, ENIC, NARIC, medicals and police certificates, sequenced to avoid expiry.",
    price: "₦95,000",
  },
  {
    title: "Family relocation planning",
    detail: "Dependant files, schools, healthcare registration and consent documentation.",
    price: "₦180,000 per family",
  },
  {
    title: "Housing & settlement",
    detail: "Temporary stay plus long-term lease support, viewings and utility setup.",
    price: "₦150,000 or one rent month, disclosed",
  },
];

/* ----------------------------------------------------------------- passports */
export const PASSPORT_PATHWAYS = [
  {
    id: "new",
    title: "New passport assistance",
    summary:
      "First passport, or expired with no renewal eligibility — we prepare the Nigeria Immigration Service application and everything it needs.",
    steps: [
      "Eligibility and document review",
      "NIS online application and payment guidance",
      "Guarantor and identification form support",
      "Biometric appointment scheduling",
      "Photo specification check before you go",
      "Collection and status follow-up",
    ],
    governmentFees: [
      "Standard 32-page, 5-year: ₦35,250",
      "Standard 62-page, 10-year: ₦59,750",
      "Express delivery (where available): ₦75,000",
    ],
    agencyFees: [
      "Documentation review and appointment booking: ₦45,000",
      "Full concierge handling incl. collection follow-up: ₦120,000",
    ],
    photos: [
      "Plain white background, frontal, no glasses",
      "Face 60–70% of frame height",
      "No shadows, no retouching",
      "Digital file submitted with the online form",
    ],
  },
  {
    id: "renewal",
    title: "Renewal or replacement guidance",
    summary:
      "Renewals, lost or damaged passports and data-change requests — including the police-report route for losses.",
    steps: [
      "Renewal eligibility check (name or data changes)",
      "Surrender or loss-report documentation",
      "Application form completion review",
      "Appointment rescheduling if you miss one",
      "Emergency travel document guidance",
      "Status reminders until collection",
    ],
    governmentFees: [
      "Renewal fee at the published NIS rate",
      "Lost-passport replacement: published fee + police report",
      "Data change (name/state of origin): as published",
    ],
    agencyFees: ["Renewal documentation review: ₦35,000", "Lost-passport casework: ₦85,000"],
    photos: [
      "Same specification as new applications",
      "Two physical copies to the biometric appointment",
      "Keep the digital file for re-submission",
    ],
  },
];

export const PASSPORT_SECURITY = [
  "Documents are received through an encrypted upload link, never WhatsApp photo drops",
  "Access is restricted to the assigned consultant and the documentation desk lead",
  "Images are purged from processing storage 14 days after your travel date unless you ask us to retain them",
  "We never hold your original passport beyond what the appointment requires",
  "Every access to your file is logged and you can request that log at any time",
];

/* ------------------------------------------------- shared testimonial / faq */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Adaeze O.",
    role: "MSc Public Health, Manchester",
    location: "Lagos → Manchester",
    quote:
      "From my admission letter to the day I landed, Hague Travel handled every detail. When my financial evidence format was wrong, they caught it before submission — that single check saved my application.",
    rating: 5,
    service: "Study Abroad",
  },
  {
    id: "t2",
    name: "Tunde & Bisi A.",
    role: "Honeymoon, Maldives",
    location: "Lagos → Malé",
    quote:
      "Real humans, real answers on WhatsApp at midnight when our speedboat timing changed. The villa was beyond words, and the budget they quoted was the budget I paid.",
    rating: 5,
    service: "Tour Packages",
  },
  {
    id: "t3",
    name: "Ibrahim K.",
    role: "Relocated to Toronto",
    location: "Abuja → Toronto",
    quote:
      "They planned our family move like a project — housing, schools, airport pickup, bank appointment on day two. My wife cried at the airport, but for the right reason.",
    rating: 5,
    service: "Work & Relocation",
  },
  {
    id: "t4",
    name: "Chinelo M.",
    role: "Academy Cohort 03",
    location: "Port Harcourt",
    quote:
      "I could not read a PNR before. Eight modules later I was doing bookings for a live agency on my third week. The certificate is not IATA, and they told me that clearly before I paid.",
    rating: 5,
    service: "Hague Travel Academy",
  },
  {
    id: "t5",
    name: "Mrs. Folake A.",
    role: "Umrah group, 42 travellers",
    location: "Lagos → Jeddah",
    quote:
      "Forty-two people, no one lost, no one confused, visas ready on time. They handled the Nusuk paperwork and the elderly wheelchairs. I have already booked my husband's trip.",
    rating: 5,
    service: "Tour Packages",
  },
  {
    id: "t6",
    name: "Emeka N.",
    role: "HR Lead, energy sector",
    location: "Lagos / Houston",
    quote:
      "Our rotational crew travel is chaos to manage. The corporate desk now handles 60 sectors a month, and the invoice reconciliation actually balances.",
    rating: 4,
    service: "Corporate Travel",
  },
  {
    id: "t7",
    name: "Zainab S.",
    role: "Passport renewal",
    location: "Kano",
    quote:
      "They separated the government fee from their own service fee on paper before I paid. That honesty is why I came back for my children's passports.",
    rating: 5,
    service: "Passports",
  },
  {
    id: "t8",
    name: "Dr. Samuel O.",
    role: "Dubai festive package, 9 guests",
    location: "Lagos → Dubai",
    quote:
      "I booked a group of nine on a deposit plan. Deadlines were in writing, the hotel was exactly the category promised and the New Year dinner was worth the whole trip.",
    rating: 5,
    service: "Tour Packages",
  },
];

export const FAQS: Faq[] = [
  {
    q: "Are the fares and prices on this site live?",
    a: "No. Every price in this preview is indicative. A consultant checks live availability with the airline, hotel or supplier and sends you a written quotation before anything is confirmed.",
    topic: "Booking",
  },
  {
    q: "Will I ever be shown a ticket as confirmed here?",
    a: "Never. A ticket is confirmed only when the airline or consolidator issues it and we send you the e-ticket with a payment receipt.",
    topic: "Booking",
  },
  {
    q: "Can you guarantee my visa or admission?",
    a: "No agency can. Admission is the university's decision and visa approval rests solely with the relevant government authority. What we control is a complete, consistent, honestly prepared application.",
    topic: "Visas",
  },
  {
    q: "Why do you separate government fees from your service fees?",
    a: "Because they are different money. Government, embassy, biometric and university charges go to those bodies. Our agency fee covers our work. You will always see both lines on your invoice.",
    topic: "Fees",
  },
  {
    q: "Can I pay in Naira?",
    a: "Yes. NGN is our primary currency. USD and GBP are available where a supplier supports them, and the header switcher is a display conversion only.",
    topic: "Payments",
  },
  {
    q: "Do tour packages support instalments?",
    a: "Most do. Each package page states the deposit percentage, the deposit deadline and the balance due date. Those dates come from supplier terms and are enforced — that is how we hold your price.",
    topic: "Packages",
  },
  {
    q: "What happens if I cancel a package?",
    a: "Refund depends on how many days remain before departure and on supplier penalties. The exact tiers are on every package page and repeated on your booking confirmation before you pay.",
    topic: "Packages",
  },
  {
    q: "Do you issue passports?",
    a: "No. Passport issuance, biometrics and approval are handled solely by the relevant government authority. We prepare your application, book appointments and follow up.",
    topic: "Documents",
  },
  {
    q: "How do you handle my documents?",
    a: "Through an encrypted upload link with restricted access, an audit log you can request, and automatic purge 14 days after your travel date unless you ask otherwise.",
    topic: "Documents",
  },
  {
    q: "Are travel-insurance claims handled by you?",
    a: "No. The insurer underwrites the policy and decides claims. We help you file, chase and document the claim properly.",
    topic: "Insurance",
  },
  {
    q: "Do you charge for financing referrals?",
    a: "We do not charge you for a referral. If a financing partner pays us a commission, we disclose it in writing at the introduction. Financing is never approved before the lender confirms it.",
    topic: "Fees",
  },
  {
    q: "Is the Academy certificate an IATA qualification?",
    a: "No. Certificates are issued by Hague Travel Academy and are not IATA or government accreditation. We say so on the certificate itself.",
    topic: "Academy",
  },
  {
    q: "Does the Academy guarantee a job?",
    a: "No. We prepare you for remote travel roles, introduce verified partners and coach interviews. Placement and earnings are never promised, and legitimate listings are free for candidates.",
    topic: "Jobs",
  },
  {
    q: "How do group and student fares differ from published fares?",
    a: "They come from airline and consolidator allocations, so they depend on travel dates, group size and advance notice. Send a request and we negotiate.",
    topic: "Booking",
  },
  {
    q: "How do I complain or escalate?",
    a: "Write to complaints@haguetravel.example with your booking reference. We acknowledge within one business day, resolve within seven, and give you the escalation route to the relevant consumer body if we fail.",
    topic: "Support",
  },
];

export function getFaqs(topic?: string): Faq[] {
  return topic ? FAQS.filter((f) => f.topic === topic) : FAQS;
}

export function getFaqsByTopic(): Record<string, Faq[]> {
  return FAQS.reduce<Record<string, Faq[]>>((acc, f) => {
    (acc[f.topic] ||= []).push(f);
    return acc;
  }, {});
}

export const FAQ_TOPICS = [
  "All",
  "Booking",
  "Visas",
  "Fees",
  "Payments",
  "Packages",
  "Documents",
  "Insurance",
  "Academy",
  "Jobs",
  "Support",
];
