import type { CaseRecord, Enquiry, PaymentRecord } from "./types";

/** Everything in this file is clearly-labelled demo data for the preview dashboards. */

export const CUSTOMER = {
  name: "Adaeze Okonkwo",
  initials: "AO",
  since: "Member since Mar 2025",
  tier: "Study & Traveller",
  reference: "HT-CL-40921",
  upcomingTrip: {
    title: "Zanzibar Spice & Shore",
    when: "16 – 23 Jan 2027",
    code: "PKG-2027-0141",
    progress: 60,
    next: "Balance due 2 Dec 2026",
  },
};

export const ENQUIRIES: Enquiry[] = [
  {
    id: "ENQ-78410",
    service: "Flights",
    subject: "LOS → MME, 2 adults, 28 Dec 2026",
    status: "Quote sent",
    updated: "2 hours ago",
    consultant: "Kelechi N.",
  },
  {
    id: "ENQ-78355",
    service: "Study visa",
    subject: "UK Student visa document review",
    status: "Awaiting documents",
    updated: "Yesterday",
    consultant: "Halima Y.",
  },
  {
    id: "ENQ-78290",
    service: "Hotel",
    subject: "Manchester serviced apartment, 6 months",
    status: "In progress",
    updated: "2 days ago",
    consultant: "Funmi A.",
  },
  {
    id: "ENQ-78102",
    service: "Academy",
    subject: "Cohort 02 instalment plan question",
    status: "Closed",
    updated: "18 Aug 2026",
    consultant: "Seyi B.",
  },
  {
    id: "ENQ-78066",
    service: "Insurance",
    subject: "Annual multi-trip quote for family of 4",
    status: "New",
    updated: "12 minutes ago",
    consultant: "Unassigned",
  },
];

export const TRACKER_STEPS = [
  "Eligibility assessment",
  "Course confirmed",
  "Application submitted",
  "Offer received",
  "Financial evidence pack",
  "Visa application lodged",
  "Biometrics completed",
  "Decision received",
] as const;

export const APPLICATIONS = [
  {
    id: "APP-2026-0412",
    programme: "MSc Public Health — University of Manchester",
    country: "United Kingdom",
    step: 6,
    status: "In progress",
    consultant: "Halima Y.",
    nextAction: "Attend biometrics at the VAC, 5 Sep · 09:20",
    documents: [
      { name: "Passport data page", state: "verified" as const, date: "12 Jun 2026" },
      { name: "BSc transcript and certificate", state: "verified" as const, date: "14 Jun 2026" },
      { name: "IELTS UKVI report form", state: "verified" as const, date: "20 Jun 2026" },
      { name: "CAS statement", state: "verified" as const, date: "3 Jul 2026" },
      { name: "28-day financial evidence", state: "action" as const, date: "Chase — due 28 Aug" },
      { name: "TB certificate (Pearson)", state: "received" as const, date: "9 Aug 2026" },
    ],
  },
  {
    id: "APP-2026-0388",
    programme: "MSc Data Science — Teesside University (January intake)",
    country: "United Kingdom",
    step: 2,
    status: "Awaiting your reply",
    consultant: "Halima Y.",
    nextAction: "Send degree classification statement and one academic reference",
    documents: [
      { name: "Degree certificate", state: "verified" as const, date: "2 May 2026" },
      {
        name: "Personal statement (draft 2)",
        state: "action" as const,
        date: "Feedback sent 11 Aug",
      },
      { name: "Academic reference ×1", state: "missing" as const, date: "Not received" },
    ],
  },
];

export const ACADEMY_PROGRESS = {
  cohort: "Cohort 01 · February 2027",
  overall: 42,
  attendance: "11 of 14 live classes",
  grade: "Current average 74%",
  modules: [
    { title: "1 · Introduction to travel & tourism", status: "Complete", score: "82%" },
    { title: "2 · Flight booking fundamentals", status: "In progress", score: "68%" },
    { title: "3 · Hotel reservations & package planning", status: "Up next", score: "—" },
    { title: "4 · Customer service & itinerary management", status: "Locked", score: "—" },
    { title: "5 · Visa documentation & ethics", status: "Locked", score: "—" },
    { title: "6 · Tour operations & suppliers", status: "Locked", score: "—" },
    { title: "7 · Travel business setup & sales", status: "Locked", score: "—" },
    { title: "8 · Assessment & career preparation", status: "Locked", score: "—" },
  ],
  assignments: [
    {
      title: "Build a 4-segment PNR for a Lagos→Manchester family",
      due: "Tomorrow",
      state: "To do",
    },
    { title: "Fare-rule quiz: fares, tickets and voids", due: "Fri", state: "To do" },
    { title: "Refusal-analysis case study", due: "Submitted", state: "Graded 78%" },
  ],
};

export const SAVED_PACKAGES = [
  "zanzibar-spice-shore",
  "dubai-new-year-skyline",
  "cape-town-family-table-mountain",
] as const;

export const DOCUMENT_VAULT = [
  {
    name: "International passport (data page)",
    type: "Identity",
    added: "12 Jun 2026",
    expiry: "Expires 04 2031",
    state: "Verified",
  },
  {
    name: "CAS statement — University of Manchester",
    type: "Admissions",
    added: "3 Jul 2026",
    expiry: "Use by 31 Aug 2026",
    state: "Verified",
  },
  {
    name: "Bank statement (28-day rule pack)",
    type: "Financial",
    added: "Pending",
    expiry: "—",
    state: "Action needed",
  },
  {
    name: "Return flight itinerary (hold)",
    type: "Travel",
    added: "21 Aug 2026",
    expiry: "Hold expires 28 Aug",
    state: "Draft",
  },
  {
    name: "Tuberculosis test certificate",
    type: "Health",
    added: "9 Aug 2026",
    expiry: "Valid 6 months",
    state: "Verified",
  },
];

/* ------------------------------------------------------------------ admin */

export const BANNERS = [
  {
    id: "bn1",
    title: "Festive Dubai — 6 seats left",
    placement: "Homepage hero strip",
    cta: "See the package",
    link: "/packages/dubai-new-year-skyline",
    status: "Scheduled",
    window: "1 Oct – 31 Oct 2026",
  },
  {
    id: "bn2",
    title: "January intake: free eligibility assessment",
    placement: "Study abroad banner",
    cta: "Start assessment",
    link: "/study-abroad",
    status: "Published",
    window: "Always on",
  },
  {
    id: "bn3",
    title: "Academy Cohort 01 closing soon",
    placement: "Homepage 3rd slot",
    cta: "Enrol",
    link: "/academy#enrol",
    status: "Published",
    window: "1 Sep – 29 Jan 2027",
  },
  {
    id: "bn4",
    title: "Umrah January group open",
    placement: "Mega-menu promo",
    cta: "Reserve a seat",
    link: "/packages/jeddah-umrah-group",
    status: "Draft",
    window: "—",
  },
];

export const PROMO_CODES = [
  {
    code: "SPICE120",
    description: "₦120,000 off Zanzibar",
    type: "Package",
    discount: "₦120,000",
    uses: 4,
    limit: 20,
    expires: "2026-11-20",
    status: "Active",
  },
  {
    code: "LOVE250",
    description: "₦250,000 off Maldives honeymoon",
    type: "Package",
    discount: "₦250,000",
    uses: 1,
    limit: 8,
    expires: "2026-11-30",
    status: "Active",
  },
  {
    code: "FAM150",
    description: "₦150,000 off Cape Town family",
    type: "Package",
    discount: "₦150,000",
    uses: 6,
    limit: 15,
    expires: "2027-04-30",
    status: "Active",
  },
  {
    code: "STUDYFREE",
    description: "Waived admissions service fee",
    type: "Service",
    discount: "100%",
    uses: 41,
    limit: 100,
    expires: "2026-12-31",
    status: "Active",
  },
  {
    code: "COHORT1EARLY",
    description: "Academy early-bird ₦35,000 off",
    type: "Academy",
    discount: "₦35,000",
    uses: 30,
    limit: 30,
    expires: "2027-01-29",
    status: "Expired",
  },
];

export const CASES: CaseRecord[] = [
  {
    id: "CASE-2291",
    client: "Adaeze Okonkwo",
    service: "Study visa",
    country: "United Kingdom",
    step: 6,
    consultant: "Halima Y.",
    priority: "High",
  },
  {
    id: "CASE-2288",
    client: "Ibrahim & Amina Kola",
    service: "Relocation",
    country: "Canada",
    step: 4,
    consultant: "Unassigned",
    priority: "Standard",
  },
  {
    id: "CASE-2280",
    client: "Chinelo Madu",
    service: "Passport",
    country: "Nigeria",
    step: 2,
    consultant: "Tobi E.",
    priority: "Standard",
  },
  {
    id: "CASE-2275",
    client: "Emeka Nwachukwu",
    service: "Work permit",
    country: "Ireland",
    step: 3,
    consultant: "Unassigned",
    priority: "High",
  },
  {
    id: "CASE-2261",
    client: "Folake Adeyemi (group 42)",
    service: "Relocation",
    country: "Saudi Arabia",
    step: 7,
    consultant: "Halima Y.",
    priority: "Standard",
  },
  {
    id: "CASE-2254",
    client: "Samuel Okafor",
    service: "Study visa",
    country: "Australia",
    step: 1,
    consultant: "Unassigned",
    priority: "Standard",
  },
];

export const PAYMENTS: PaymentRecord[] = [
  {
    ref: "INV-90231",
    client: "Adaeze Okonkwo",
    item: "UK admissions & documentation",
    amount: 350000,
    balance: 0,
    status: "Paid",
    date: "2026-06-14",
  },
  {
    ref: "INV-90232",
    client: "Dr. Samuel O.",
    item: "Dubai package deposit (9 pax)",
    amount: 5805000,
    balance: 671000,
    status: "Partial",
    date: "2026-07-02",
  },
  {
    ref: "INV-90240",
    client: "Chinelo Madu",
    item: "Academy Cohort 01 instalment 1",
    amount: 125000,
    balance: 125000,
    status: "Pending",
    date: "2026-08-11",
  },
  {
    ref: "INV-90248",
    client: "Ibrahim Kola",
    item: "Relocation pathway consultation",
    amount: 180000,
    balance: 0,
    status: "Paid",
    date: "2026-08-19",
  },
  {
    ref: "INV-90251",
    client: "Zainab Sule",
    item: "Passport concierge (2 applicants)",
    amount: 240000,
    balance: 0,
    status: "Paid",
    date: "2026-08-22",
  },
  {
    ref: "INV-90255",
    client: "Mrs. Folake A.",
    item: "Umrah group balance",
    amount: 41580000,
    balance: 8316000,
    status: "Partial",
    date: "2026-08-26",
  },
  {
    ref: "REF-1180",
    client: "Tunde A.",
    item: "Cancelled add-on — lounge access",
    amount: 62000,
    balance: 0,
    status: "Refunded",
    date: "2026-08-27",
  },
];

export const SALES_BY_MONTH = [
  { month: "Feb", flights: 4.2, packages: 6.1, study: 3.4, academy: 2.2 },
  { month: "Mar", flights: 4.8, packages: 5.4, study: 4.1, academy: 1.4 },
  { month: "Apr", flights: 5.1, packages: 7.2, study: 5.6, academy: 2.8 },
  { month: "May", flights: 4.6, packages: 8.4, study: 6.2, academy: 2.1 },
  { month: "Jun", flights: 5.9, packages: 9.1, study: 7.4, academy: 3.2 },
  { month: "Jul", flights: 6.4, packages: 11.2, study: 9.8, academy: 4.6 },
  { month: "Aug", flights: 7.1, packages: 10.4, study: 12.6, academy: 3.8 },
];

export const REVENUE_SPLIT = [
  { name: "Flight service fees", value: 22, fill: "var(--color-chart-1)" },
  { name: "Tour package margins", value: 31, fill: "var(--color-chart-2)" },
  { name: "Study & visa advisory", value: 19, fill: "var(--color-chart-3)" },
  { name: "Academy cohorts", value: 15, fill: "var(--color-chart-4)" },
  { name: "Corporate contracts", value: 13, fill: "var(--color-chart-5)" },
];

export const STAFF_ROLES = [
  { role: "Administrator", people: 2, scope: "Everything incl. permissions and audit log" },
  { role: "Flight agent", people: 5, scope: "Quotations, ticketing, changes, refunds" },
  { role: "Tour operator", people: 3, scope: "Package CMS, capacity, scheduling" },
  { role: "Visa consultant", people: 4, scope: "Case files, documents, checklists" },
  { role: "Academy instructor", people: 4, scope: "Cohorts, lessons, assessments" },
  { role: "Recruitment moderator", people: 1, scope: "Employer approval, vacancy moderation" },
  { role: "Finance officer", people: 2, scope: "Payments, balances, refunds, reconciliation" },
];

export const EMPLOYER_QUEUE = [
  {
    id: "EMP-31",
    name: "Lagoon Escapes Ltd",
    role: "Travel Consultant — Remote",
    country: "Nigeria",
    submitted: "2 days ago",
    state: "Awaiting verification",
    note: "RC number found; CAC certificate pending",
  },
  {
    id: "EMP-32",
    name: "Global Reach Recruiting",
    role: "Customer Experience (50 pax)",
    country: "UK",
    submitted: "4 days ago",
    state: "Rejected",
    note: "Charges candidates a registration fee — against our policy",
  },
  {
    id: "EMP-33",
    name: "NorthBridge Student Housing",
    role: "Accounts & Leasing",
    country: "Canada",
    submitted: "5 days ago",
    state: "Approved",
    note: "Signed partner agreement on file",
  },
  {
    id: "EMP-34",
    name: "Sahel Cargo & Travel",
    role: "Group Tour Leader",
    country: "Ghana",
    submitted: "6 days ago",
    state: "Awaiting verification",
    note: "Awaiting licence copy from regulator",
  },
];

export const ACTIVITY_LOG = [
  {
    at: "09:14",
    who: "Funmi A.",
    what: "Published package “Kigali Corporate Retreat” to the scheduled queue",
  },
  { at: "08:52", who: "Halima Y.", what: "Marked CASE-2291 biometrics as completed" },
  {
    at: "08:31",
    who: "Tobi E.",
    what: "Purged 14-day-expired documents for 6 closed passport files",
  },
  {
    at: "Yesterday",
    who: "Seyi B.",
    what: "Rejected EMP-32 for charging candidates a registration fee",
  },
  { at: "Yesterday", who: "System", what: "Expired promo code COHORT1EARLY automatically" },
];
