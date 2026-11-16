import { images } from "./site";

/**
 * Customer-portal demo data.
 *
 * Everything here is example content for the interactive preview. In production
 * these records come from the client, booking, payment, document and academy
 * tables, scoped to the signed-in customer.
 */

export type PortalBookingStatus = "Confirmed" | "Balance due" | "Completed" | "Cancelled";

export interface PortalBooking {
  id: string;
  reference: string;
  packageSlug: string;
  title: string;
  destination: string;
  cover: string;
  departDate: string;
  returnDate: string;
  travellers: number;
  status: PortalBookingStatus;
  total: number;
  paid: number;
  balance: number;
  nextDue: string;
  consultant: string;
  leadTraveller: string;
  hotelCategory: string;
  roomBasis: string;
  flightNote: string;
}

export const PORTAL_BOOKINGS: PortalBooking[] = [
  {
    id: "BK-2027-0141",
    reference: "HT-BK-2027-0141",
    packageSlug: "zanzibar-spice-shore",
    title: "Zanzibar Spice & Shore",
    destination: "Zanzibar, Tanzania",
    cover: images.resort,
    departDate: "2027-01-16",
    returnDate: "2027-01-23",
    travellers: 2,
    status: "Balance due",
    total: 4_480_000,
    paid: 1_344_000,
    balance: 3_136_000,
    nextDue: "2026-12-02",
    consultant: "Kelechi N.",
    leadTraveller: "Adaeze Okonkwo",
    hotelCategory: "4-star beach resort",
    roomBasis: "Double sea-view room",
    flightNote: "International flights included from Lagos",
  },
  {
    id: "BK-2026-0918",
    reference: "HT-BK-2026-0918",
    packageSlug: "cape-town-family-table-mountain",
    title: "Cape Town Family Table Mountain",
    destination: "Cape Town, South Africa",
    cover: images.island,
    departDate: "2026-12-19",
    returnDate: "2026-12-27",
    travellers: 2,
    status: "Confirmed",
    total: 4_960_000,
    paid: 4_960_000,
    balance: 0,
    nextDue: "Paid in full",
    consultant: "Funmi A.",
    leadTraveller: "Adaeze Okonkwo",
    hotelCategory: "4-star family hotel",
    roomBasis: "Two connecting rooms",
    flightNote: "Flights included from Lagos",
  },
  {
    id: "BK-2026-0402",
    reference: "HT-BK-2026-0402",
    packageSlug: "dubai-new-year-skyline",
    title: "Dubai New Year Skyline",
    destination: "Dubai, UAE",
    cover: images.dubai,
    departDate: "2025-12-29",
    returnDate: "2026-01-04",
    travellers: 1,
    status: "Completed",
    total: 2_350_000,
    paid: 2_350_000,
    balance: 0,
    nextDue: "Paid in full",
    consultant: "Kelechi N.",
    leadTraveller: "Adaeze Okonkwo",
    hotelCategory: "5-star city hotel",
    roomBasis: "Double room",
    flightNote: "Flights included from Lagos",
  },
];

export interface PortalPayment {
  id: string;
  bookingId: string;
  amount: number;
  date: string;
  kind: "Deposit" | "Instalment" | "Balance" | "Refund";
  method: "Paystack card" | "Bank transfer" | "Paystack transfer";
  receipt: string;
}

export const PORTAL_PAYMENTS: PortalPayment[] = [
  {
    id: "PAY-90232",
    bookingId: "BK-2027-0141",
    amount: 1_344_000,
    date: "2026-09-12",
    kind: "Deposit",
    method: "Paystack card",
    receipt: "RCPT-90232",
  },
  {
    id: "PAY-90118",
    bookingId: "BK-2026-0918",
    amount: 2_480_000,
    date: "2026-10-02",
    kind: "Deposit",
    method: "Paystack transfer",
    receipt: "RCPT-90118",
  },
  {
    id: "PAY-90204",
    bookingId: "BK-2026-0918",
    amount: 2_480_000,
    date: "2026-11-06",
    kind: "Balance",
    method: "Bank transfer",
    receipt: "RCPT-90204",
  },
  {
    id: "PAY-89771",
    bookingId: "BK-2026-0402",
    amount: 2_350_000,
    date: "2025-11-18",
    kind: "Balance",
    method: "Paystack card",
    receipt: "RCPT-89771",
  },
];

export type QuoteStatus = "Quote sent" | "In review" | "Ticketed" | "Expired";

export interface PortalQuote {
  id: string;
  route: string;
  tripType: "One way" | "Round trip" | "Multi-city";
  dates: string;
  cabin: string;
  passengers: number;
  status: QuoteStatus;
  indicative: number;
  airline: string;
  consultant: string;
  updated: string;
  expires: string;
}

export const PORTAL_QUOTES: PortalQuote[] = [
  {
    id: "HT-Q-78410",
    route: "Lagos (LOS) → Accra (ACC)",
    tripType: "Round trip",
    dates: "28 Dec 2026 – 4 Jan 2027",
    cabin: "Economy",
    passengers: 2,
    status: "Quote sent",
    indicative: 1_280_000,
    airline: "Air Peace / Africa World",
    consultant: "Kelechi N.",
    updated: "2 hours ago",
    expires: "20 Nov 2026",
  },
  {
    id: "HT-Q-78390",
    route: "Lagos (LOS) → Manchester (MAN)",
    tripType: "One way",
    dates: "3 Jan 2027",
    cabin: "Economy",
    passengers: 1,
    status: "Ticketed",
    indicative: 1_640_000,
    airline: "British Airways",
    consultant: "Kelechi N.",
    updated: "Yesterday",
    expires: "Issued",
  },
  {
    id: "HT-Q-78355",
    route: "Lagos (LOS) → Toronto (YYZ)",
    tripType: "Multi-city",
    dates: "12 May 2027",
    cabin: "Premium Economy",
    passengers: 1,
    status: "In review",
    indicative: 4_920_000,
    airline: "Awaiting supplier",
    consultant: "Tobi E.",
    updated: "3 days ago",
    expires: "18 Nov 2026",
  },
];

export interface SavedPassenger {
  id: string;
  name: string;
  relationship: "Self" | "Spouse" | "Child" | "Parent" | "Colleague";
  dob: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  seat: string;
  meal: string;
  frequentFlyer: string;
}

export const SAVED_PASSENGERS: SavedPassenger[] = [
  {
    id: "PAX-01",
    name: "Adaeze Okonkwo",
    relationship: "Self",
    dob: "1994-03-18",
    nationality: "Nigerian",
    passportNumber: "A•••••482",
    passportExpiry: "2031-04-04",
    seat: "Window",
    meal: "No special meal",
    frequentFlyer: "BA 7712 4408",
  },
  {
    id: "PAX-02",
    name: "Chidi Okonkwo",
    relationship: "Spouse",
    dob: "1991-11-02",
    nationality: "Nigerian",
    passportNumber: "A•••••917",
    passportExpiry: "2030-09-21",
    seat: "Aisle",
    meal: "Vegetarian",
    frequentFlyer: "—",
  },
  {
    id: "PAX-03",
    name: "Ada Okonkwo",
    relationship: "Child",
    dob: "2019-06-14",
    nationality: "Nigerian",
    passportNumber: "A•••••203",
    passportExpiry: "2028-06-13",
    seat: "With adult",
    meal: "Child meal",
    frequentFlyer: "—",
  },
];

export type PortalDocumentState = "Verified" | "Received" | "Action needed" | "Expired";
export type PortalDocumentType =
  "Passport" | "Visa" | "Admissions" | "Financial" | "Health" | "Travel";

export interface PortalDocument {
  id: string;
  name: string;
  type: PortalDocumentType;
  owner: string;
  added: string;
  expires: string;
  state: PortalDocumentState;
  size: string;
  note: string;
}

export const PORTAL_DOCUMENTS: PortalDocument[] = [
  {
    id: "DOC-01",
    name: "International passport — data page",
    type: "Passport",
    owner: "Adaeze Okonkwo",
    added: "12 Jun 2026",
    expires: "04 Apr 2031",
    state: "Verified",
    size: "1.8 MB",
    note: "Checked against the name on your application.",
  },
  {
    id: "DOC-02",
    name: "CAS statement — University of Manchester",
    type: "Admissions",
    owner: "Adaeze Okonkwo",
    added: "3 Jul 2026",
    expires: "31 Aug 2027",
    state: "Verified",
    size: "420 KB",
    note: "The CAS reference is on your case file.",
  },
  {
    id: "DOC-03",
    name: "Bank statement — 28-day evidence pack",
    type: "Financial",
    owner: "Adaeze Okonkwo",
    added: "Pending",
    expires: "—",
    state: "Action needed",
    size: "—",
    note: "Upload a statement dated within the last 28 days.",
  },
  {
    id: "DOC-06",
    name: "UK Student visa application — draft",
    type: "Visa",
    owner: "Adaeze Okonkwo",
    added: "18 Jul 2026",
    expires: "Lodge by 30 Nov 2026",
    state: "Received",
    size: "260 KB",
    note: "Fee and IHS amounts are checked again before submission.",
  },
  {
    id: "DOC-07",
    name: "Passport bio page — Chidi Okonkwo",
    type: "Passport",
    owner: "Chidi Okonkwo",
    added: "14 Jun 2026",
    expires: "21 Sep 2030",
    state: "Verified",
    size: "1.4 MB",
    note: "Name matches the dependant entry on the visa form.",
  },
  {
    id: "DOC-04",
    name: "Return flight itinerary (hold)",
    type: "Travel",
    owner: "Chidi Okonkwo",
    added: "21 Aug 2026",
    expires: "28 Nov 2026",
    state: "Received",
    size: "180 KB",
    note: "Supplier hold — not a confirmed ticket.",
  },
  {
    id: "DOC-05",
    name: "Tuberculosis test certificate",
    type: "Health",
    owner: "Adaeze Okonkwo",
    added: "9 Aug 2026",
    expires: "09 Feb 2027",
    state: "Verified",
    size: "640 KB",
    note: "Valid for six months from the test date.",
  },
];

export type AcademyModuleState = "Completed" | "In progress" | "Unlocked" | "Locked";

export interface AcademyModule {
  number: number;
  title: string;
  duration: string;
  state: AcademyModuleState;
  score?: string;
}

export interface AcademyResource {
  name: string;
  href: string;
  kind: "PDF outline" | "Worksheet" | "Checklist";
  size: string;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  cohort: string;
  instructor: string;
  progress: number;
  attendance: string;
  nextClass: string;
  certificate: "In progress" | "Eligible after final assessment" | "Issued";
  modules: AcademyModule[];
  resources: AcademyResource[];
}

export const ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: "COURSE-01",
    title: "Travel Consultant Masterclass",
    cohort: "Cohort 01 · February 2027",
    instructor: "Seyi Bamidele",
    progress: 42,
    attendance: "11 of 14 live classes",
    nextClass: "Tue 18:00 WAT · Hotel reservations & package planning",
    certificate: "In progress",
    modules: [
      {
        number: 1,
        title: "Introduction to travel & tourism",
        duration: "42 min",
        state: "Completed",
        score: "82%",
      },
      {
        number: 2,
        title: "Flight booking fundamentals",
        duration: "58 min",
        state: "In progress",
        score: "68%",
      },
      {
        number: 3,
        title: "Hotel reservations & package planning",
        duration: "51 min",
        state: "Unlocked",
      },
      {
        number: 4,
        title: "Customer service & itinerary management",
        duration: "46 min",
        state: "Locked",
      },
      { number: 5, title: "Visa documentation & ethics", duration: "63 min", state: "Locked" },
      { number: 6, title: "Tour operations & suppliers", duration: "49 min", state: "Locked" },
      { number: 7, title: "Travel business setup & sales", duration: "55 min", state: "Locked" },
      { number: 8, title: "Assessment & career preparation", duration: "38 min", state: "Locked" },
    ],
    resources: [
      {
        name: "Full 8-module syllabus & reading list",
        href: "/downloads/hague-travel-academy-syllabus.txt",
        kind: "PDF outline",
        size: "18 KB",
      },
      {
        name: "PNR worksheet — Lagos to Manchester family",
        href: "/downloads/gds-ticketing-outline.txt",
        kind: "Worksheet",
        size: "12 KB",
      },
      {
        name: "Visa documentation ethics checklist",
        href: "/downloads/visa-document-checklist.txt",
        kind: "Checklist",
        size: "9 KB",
      },
    ],
  },
  {
    id: "COURSE-02",
    title: "GDS Ticketing & Reservation",
    cohort: "Add-on module · February 2027",
    instructor: "Kelechi Nwosu",
    progress: 18,
    attendance: "2 of 6 practical labs",
    nextClass: "Sat 10:00 WAT · Fare rules and void windows",
    certificate: "In progress",
    modules: [
      {
        number: 1,
        title: "GDS screen orientation",
        duration: "35 min",
        state: "Completed",
        score: "91%",
      },
      { number: 2, title: "Build and price a PNR", duration: "47 min", state: "In progress" },
      {
        number: 3,
        title: "Fare rules, taxes and void windows",
        duration: "44 min",
        state: "Locked",
      },
      { number: 4, title: "Changes, reissues and refunds", duration: "52 min", state: "Locked" },
    ],
    resources: [
      {
        name: "GDS practice outline and lab schedule",
        href: "/downloads/gds-ticketing-outline.txt",
        kind: "PDF outline",
        size: "12 KB",
      },
    ],
  },
];

export const PORTAL_PROFILE = {
  name: "Adaeze Okonkwo",
  initials: "AO",
  email: "adaeze.okonkwo@example.com",
  phone: "+234 803 000 0000",
  city: "Lagos, Nigeria",
  tier: "Study & Traveller",
  since: "Member since Mar 2025",
  reference: "HT-CL-40921",
  consultant: "Kelechi N.",
  renewalReminder: "Passport expires 04 Apr 2031",
  emergencyContact: "Chidi Okonkwo · +234 805 000 0000",
};

export const PORTAL_ACTIONS = [
  {
    title: "Upload your 28-day bank statement",
    detail: "This blocks your UK visa submission.",
    urgency: "Urgent" as const,
    href: "/portal/documents",
  },
  {
    title: "Confirm your Accra flight quote",
    detail: "HT-Q-78410 expires on 20 Nov 2026.",
    urgency: "Soon" as const,
    href: "/portal/bookings",
  },
  {
    title: "Pay Academy instalment 2",
    detail: "Due before Module 5 unlocks on 2 Dec.",
    urgency: "Info" as const,
    href: "/portal/academy",
  },
  {
    title: "Review your Zanzibar cancellation window",
    detail: "30 days before departure for a full supplier credit.",
    urgency: "Info" as const,
    href: "/portal/bookings",
  },
];
