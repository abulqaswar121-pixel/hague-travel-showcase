/**
 * Staff back-office demo records. These mirror the rows the production API
 * would return for the enquiry desk, bookings ledger and academy admin.
 */

export type AdminEnquiryStatus = "New" | "In Review" | "Contacted" | "Converted" | "Closed";
export type AdminService =
  | "Flights"
  | "Hotels"
  | "Holiday packages"
  | "Study Abroad"
  | "Relocation"
  | "Passport"
  | "Academy"
  | "Corporate"
  | "Insurance";

export interface AdminEnquiry {
  id: string;
  client: string;
  email: string;
  phone: string;
  channel: "Website form" | "WhatsApp" | "Phone" | "Instagram" | "Walk-in" | "Referral";
  service: AdminService;
  subject: string;
  detail: string;
  status: AdminEnquiryStatus;
  priority: "High" | "Standard" | "Low";
  received: string;
  consultant: string;
  value: number | null;
}

export const ADMIN_ENQUIRIES: AdminEnquiry[] = [
  {
    id: "ENQ-78410",
    client: "Tunde Balogun",
    email: "tunde.balogun@example.com",
    phone: "+234 803 241 1180",
    channel: "Website form",
    service: "Flights",
    subject: "LOS → ACC, 2 adults, 28 Dec",
    detail:
      "Family of two travelling for a wedding. Flexible by one day either side. Asked for baggage and a refundable fare.",
    status: "New",
    priority: "High",
    received: "12 minutes ago",
    consultant: "Unassigned",
    value: 1_280_000,
  },
  {
    id: "ENQ-78409",
    client: "Grace Eze",
    email: "grace.eze@example.com",
    phone: "+234 806 553 2091",
    channel: "WhatsApp",
    service: "Study Abroad",
    subject: "UK student visa document review",
    detail:
      "MSc Public Health applicant. CAS received. Needs the 28-day financial evidence checked before biometrics.",
    status: "In Review",
    priority: "High",
    received: "38 minutes ago",
    consultant: "Halima Y.",
    value: 350_000,
  },
  {
    id: "ENQ-78408",
    client: "Ibrahim Kola",
    email: "ibrahim.kola@example.com",
    phone: "+234 810 992 4431",
    channel: "Referral",
    service: "Relocation",
    subject: "Canada Express Entry family assessment",
    detail:
      "Two adults, one child. CRS estimate 472. Wants a settlement plan and school options in Ontario.",
    status: "New",
    priority: "High",
    received: "1 hour ago",
    consultant: "Unassigned",
    value: 520_000,
  },
  {
    id: "ENQ-78407",
    client: "Chinelo Madu",
    email: "chinelo.madu@example.com",
    phone: "+234 802 338 7120",
    channel: "Website form",
    service: "Passport",
    subject: "Passport renewal — fast-track appointment",
    detail:
      "Passport expires in seven months. Needs a renewal appointment before a January trip to Dubai.",
    status: "Contacted",
    priority: "Standard",
    received: "2 hours ago",
    consultant: "Tobi E.",
    value: 120_000,
  },
  {
    id: "ENQ-78406",
    client: "Bola Adesanya",
    email: "bola.adesanya@example.com",
    phone: "+234 807 771 9022",
    channel: "Instagram",
    service: "Holiday packages",
    subject: "Zanzibar honeymoon, 6 nights",
    detail:
      "Honeymoon in February. Asked for a beachfront resort, private transfers and a candlelit dinner.",
    status: "Converted",
    priority: "Standard",
    received: "3 hours ago",
    consultant: "Funmi A.",
    value: 4_480_000,
  },
  {
    id: "ENQ-78405",
    client: "Nordic Energy Ltd",
    email: "travel@nordicenergy.example",
    phone: "+234 700 114 8820",
    channel: "Website form",
    service: "Corporate",
    subject: "Rotational crew travel RFP — 60 staff",
    detail:
      "Monthly Lagos–Port Harcourt rotations plus international training travel. Requested a credit facility proposal.",
    status: "In Review",
    priority: "High",
    received: "Yesterday",
    consultant: "Seyi B.",
    value: 18_500_000,
  },
  {
    id: "ENQ-78404",
    client: "Samuel Okafor",
    email: "samuel.okafor@example.com",
    phone: "+234 805 220 6671",
    channel: "Phone",
    service: "Study Abroad",
    subject: "Australia January intake — nursing",
    detail:
      "Bachelor of Nursing applicant. Needs course shortlist, tuition budget and a student visa timeline.",
    status: "Contacted",
    priority: "Standard",
    received: "Yesterday",
    consultant: "Halima Y.",
    value: 280_000,
  },
  {
    id: "ENQ-78403",
    client: "Ngozi Umeh",
    email: "ngozi.umeh@example.com",
    phone: "+234 809 665 1044",
    channel: "WhatsApp",
    service: "Hotels",
    subject: "Manchester serviced apartment, 6 months",
    detail:
      "Postgraduate student arriving with family. Budget £1,150 per month, needs a verified landlord.",
    status: "In Review",
    priority: "Standard",
    received: "2 days ago",
    consultant: "Funmi A.",
    value: 1_480_000,
  },
  {
    id: "ENQ-78402",
    client: "Emeka Nwachukwu",
    email: "emeka.nwachukwu@example.com",
    phone: "+234 811 740 2288",
    channel: "Walk-in",
    service: "Relocation",
    subject: "Ireland Critical Skills Employment Permit",
    detail:
      "Software engineer with a job offer in Dublin. Needs permit document review and family reunification guidance.",
    status: "New",
    priority: "High",
    received: "2 days ago",
    consultant: "Unassigned",
    value: 640_000,
  },
  {
    id: "ENQ-78401",
    client: "Zainab Sule",
    email: "zainab.sule@example.com",
    phone: "+234 803 901 2244",
    channel: "Website form",
    service: "Academy",
    subject: "Travel Consultant Masterclass instalments",
    detail: "Asked whether the February cohort fee can be split into three payments.",
    status: "Closed",
    priority: "Low",
    received: "18 Aug 2026",
    consultant: "Seyi B.",
    value: 285_000,
  },
  {
    id: "ENQ-78400",
    client: "Femi Adebayo",
    email: "femi.adebayo@example.com",
    phone: "+234 802 116 8080",
    channel: "Website form",
    service: "Insurance",
    subject: "Annual multi-trip cover, family of four",
    detail: "Needs Schengen-compliant cover with a ₦50m medical limit and winter-sports add-on.",
    status: "Closed",
    priority: "Low",
    received: "20 Aug 2026",
    consultant: "Toke A.",
    value: 96_000,
  },
];

export type AdminBookingStatus = "Confirmed" | "Balance due" | "Fully paid" | "Cancelled";

export interface AdminBookingPayment {
  date: string;
  amount: number;
  method: "Paystack card" | "Bank transfer" | "Paystack transfer" | "Cash";
  reference: string;
}

export interface AdminBooking {
  id: string;
  reference: string;
  client: string;
  email: string;
  tour: string;
  destination: string;
  departDate: string;
  travellers: number;
  total: number;
  deposit: number;
  paid: number;
  balance: number;
  status: AdminBookingStatus;
  nextDue: string;
  consultant: string;
  payments: AdminBookingPayment[];
}

export const ADMIN_BOOKINGS: AdminBooking[] = [
  {
    id: "BK-2027-0141",
    reference: "HT-BK-2027-0141",
    client: "Adaeze Okonkwo",
    email: "adaeze.okonkwo@example.com",
    tour: "Zanzibar Spice & Shore",
    destination: "Zanzibar, Tanzania",
    departDate: "2027-01-16",
    travellers: 2,
    total: 4_480_000,
    deposit: 1_344_000,
    paid: 1_344_000,
    balance: 3_136_000,
    status: "Balance due",
    nextDue: "2026-12-02",
    consultant: "Kelechi N.",
    payments: [
      { date: "2026-09-12", amount: 1_344_000, method: "Paystack card", reference: "RCPT-90232" },
    ],
  },
  {
    id: "BK-2026-0918",
    reference: "HT-BK-2026-0918",
    client: "Adaeze Okonkwo",
    email: "adaeze.okonkwo@example.com",
    tour: "Cape Town Family Table Mountain",
    destination: "Cape Town, South Africa",
    departDate: "2026-12-19",
    travellers: 2,
    total: 4_960_000,
    deposit: 1_488_000,
    paid: 4_960_000,
    balance: 0,
    status: "Fully paid",
    nextDue: "Paid in full",
    consultant: "Funmi A.",
    payments: [
      {
        date: "2026-10-02",
        amount: 2_480_000,
        method: "Paystack transfer",
        reference: "RCPT-90118",
      },
      { date: "2026-11-06", amount: 2_480_000, method: "Bank transfer", reference: "RCPT-90204" },
    ],
  },
  {
    id: "BK-2026-1042",
    reference: "HT-BK-2026-1042",
    client: "Dr. Samuel Obi",
    email: "samuel.obi@example.com",
    tour: "Dubai New Year Skyline",
    destination: "Dubai, UAE",
    departDate: "2026-12-29",
    travellers: 9,
    total: 21_150_000,
    deposit: 6_345_000,
    paid: 14_440_000,
    balance: 6_710_000,
    status: "Balance due",
    nextDue: "2026-12-05",
    consultant: "Kelechi N.",
    payments: [
      { date: "2026-07-02", amount: 5_805_000, method: "Paystack card", reference: "RCPT-89980" },
      { date: "2026-09-15", amount: 4_250_000, method: "Bank transfer", reference: "RCPT-90141" },
      {
        date: "2026-10-28",
        amount: 4_385_000,
        method: "Paystack transfer",
        reference: "RCPT-90309",
      },
    ],
  },
  {
    id: "BK-2026-1188",
    reference: "HT-BK-2026-1188",
    client: "Folake Adeyemi",
    email: "folake.adeyemi@example.com",
    tour: "Jeddah Umrah Group",
    destination: "Jeddah & Makkah, Saudi Arabia",
    departDate: "2027-02-04",
    travellers: 14,
    total: 41_580_000,
    deposit: 8_316_000,
    paid: 33_264_000,
    balance: 8_316_000,
    status: "Balance due",
    nextDue: "2026-12-18",
    consultant: "Halima Y.",
    payments: [
      { date: "2026-08-26", amount: 20_790_000, method: "Bank transfer", reference: "RCPT-90177" },
      { date: "2026-10-12", amount: 12_474_000, method: "Bank transfer", reference: "RCPT-90288" },
    ],
  },
  {
    id: "BK-2026-1201",
    reference: "HT-BK-2026-1201",
    client: "Bola Adesanya",
    email: "bola.adesanya@example.com",
    tour: "Maldives Honeymoon Lagoon",
    destination: "Maldives",
    departDate: "2027-02-14",
    travellers: 2,
    total: 6_980_000,
    deposit: 2_094_000,
    paid: 2_094_000,
    balance: 4_886_000,
    status: "Confirmed",
    nextDue: "2026-12-15",
    consultant: "Funmi A.",
    payments: [
      { date: "2026-11-08", amount: 2_094_000, method: "Paystack card", reference: "RCPT-90412" },
    ],
  },
  {
    id: "BK-2026-0777",
    reference: "HT-BK-2026-0777",
    client: "Tunde Ade",
    email: "tunde.ade@example.com",
    tour: "Kigali Corporate Retreat",
    destination: "Kigali, Rwanda",
    departDate: "2026-08-14",
    travellers: 18,
    total: 24_300_000,
    deposit: 7_290_000,
    paid: 24_300_000,
    balance: 0,
    status: "Fully paid",
    nextDue: "Paid in full",
    consultant: "Seyi B.",
    payments: [
      { date: "2026-05-20", amount: 12_150_000, method: "Bank transfer", reference: "RCPT-89120" },
      { date: "2026-07-30", amount: 12_150_000, method: "Bank transfer", reference: "RCPT-89705" },
    ],
  },
  {
    id: "BK-2026-0621",
    reference: "HT-BK-2026-0621",
    client: "Ijeoma Nwankwo",
    email: "ijeoma.nwankwo@example.com",
    tour: "Accra Weekend City Break",
    destination: "Accra, Ghana",
    departDate: "2026-10-03",
    travellers: 2,
    total: 1_460_000,
    deposit: 438_000,
    paid: 62_000,
    balance: 0,
    status: "Cancelled",
    nextDue: "Refund settled",
    consultant: "Kelechi N.",
    payments: [
      { date: "2026-09-01", amount: 438_000, method: "Paystack card", reference: "RCPT-90044" },
      { date: "2026-09-12", amount: 62_000, method: "Paystack transfer", reference: "REF-1180" },
    ],
  },
];

export type AcademyPaymentStatus = "Paid" | "Part-paid" | "Unpaid" | "Refunded";

export interface AcademyApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: "Travel Consultant Masterclass" | "GDS Ticketing & Reservation" | "Visa Processing";
  cohort: string;
  applied: string;
  payment: AcademyPaymentStatus;
  amount: number;
  paid: number;
  batch: string | null;
  documentsVerified: boolean;
  note: string;
}

export const ACADEMY_APPLICATIONS: AcademyApplication[] = [
  {
    id: "APP-AC-3140",
    name: "Chinelo Madu",
    email: "chinelo.madu@example.com",
    phone: "+234 802 338 7120",
    course: "Travel Consultant Masterclass",
    cohort: "Cohort 01 · February 2027",
    applied: "14 Nov 2026",
    payment: "Part-paid",
    amount: 285_000,
    paid: 160_000,
    batch: "Batch A · Mon & Wed",
    documentsVerified: true,
    note: "Second instalment due 1 Dec 2026.",
  },
  {
    id: "APP-AC-3138",
    name: "Tunde Balogun",
    email: "tunde.balogun@example.com",
    phone: "+234 803 241 1180",
    course: "GDS Ticketing & Reservation",
    cohort: "Cohort 01 · February 2027",
    applied: "13 Nov 2026",
    payment: "Paid",
    amount: 185_000,
    paid: 185_000,
    batch: "Batch B · Tue & Thu",
    documentsVerified: true,
    note: "Paid in full by Paystack transfer.",
  },
  {
    id: "APP-AC-3134",
    name: "Grace Eze",
    email: "grace.eze@example.com",
    phone: "+234 806 553 2091",
    course: "Visa Processing",
    cohort: "Cohort 02 · May 2027",
    applied: "12 Nov 2026",
    payment: "Unpaid",
    amount: 145_000,
    paid: 0,
    batch: null,
    documentsVerified: true,
    note: "Requested an instalment plan.",
  },
  {
    id: "APP-AC-3129",
    name: "Samuel Okafor",
    email: "samuel.okafor@example.com",
    phone: "+234 805 220 6671",
    course: "Travel Consultant Masterclass",
    cohort: "Cohort 01 · February 2027",
    applied: "10 Nov 2026",
    payment: "Paid",
    amount: 285_000,
    paid: 285_000,
    batch: null,
    documentsVerified: true,
    note: "Awaiting batch assignment.",
  },
  {
    id: "APP-AC-3125",
    name: "Ngozi Umeh",
    email: "ngozi.umeh@example.com",
    phone: "+234 809 665 1044",
    course: "Visa Processing",
    cohort: "Cohort 01 · February 2027",
    applied: "8 Nov 2026",
    payment: "Part-paid",
    amount: 145_000,
    paid: 70_000,
    batch: "Batch A · Mon & Wed",
    documentsVerified: false,
    note: "Government ID still missing from the enrolment file.",
  },
  {
    id: "APP-AC-3120",
    name: "Emeka Nwachukwu",
    email: "emeka.nwachukwu@example.com",
    phone: "+234 811 740 2288",
    course: "GDS Ticketing & Reservation",
    cohort: "Cohort 02 · May 2027",
    applied: "5 Nov 2026",
    payment: "Unpaid",
    amount: 185_000,
    paid: 0,
    batch: null,
    documentsVerified: true,
    note: "Waiting on employer sponsorship confirmation.",
  },
  {
    id: "APP-AC-3117",
    name: "Zainab Sule",
    email: "zainab.sule@example.com",
    phone: "+234 803 901 2244",
    course: "Travel Consultant Masterclass",
    cohort: "Cohort 01 · February 2027",
    applied: "2 Nov 2026",
    payment: "Paid",
    amount: 285_000,
    paid: 285_000,
    batch: "Batch B · Tue & Thu",
    documentsVerified: true,
    note: "Early-bird fee honoured.",
  },
  {
    id: "APP-AC-3111",
    name: "Femi Adebayo",
    email: "femi.adebayo@example.com",
    phone: "+234 802 116 8080",
    course: "Travel Consultant Masterclass",
    cohort: "Cohort 03 · August 2027",
    applied: "28 Oct 2026",
    payment: "Refunded",
    amount: 285_000,
    paid: 0,
    batch: null,
    documentsVerified: true,
    note: "Withdrew inside the seven-day cooling-off window.",
  },
];

export const ADMIN_COHORTS = [
  "Cohort 01 · February 2027",
  "Cohort 02 · May 2027",
  "Cohort 03 · August 2027",
  "Cohort 04 · November 2027",
] as const;

export const ADMIN_BATCHES = [
  "Batch A · Mon & Wed",
  "Batch B · Tue & Thu",
  "Batch C · Weekend intensive",
] as const;

/** Monthly collections in millions of naira, used by the overview chart. */
export const ADMIN_REVENUE_TREND = [
  { month: "Jun", collected: 18.4, pipeline: 6.2 },
  { month: "Jul", collected: 22.8, pipeline: 8.1 },
  { month: "Aug", collected: 26.3, pipeline: 7.4 },
  { month: "Sep", collected: 24.9, pipeline: 9.8 },
  { month: "Oct", collected: 31.6, pipeline: 11.2 },
  { month: "Nov", collected: 34.2, pipeline: 12.7 },
];
