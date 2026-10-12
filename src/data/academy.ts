import academy from "@/assets/academy.jpg";
import campus from "@/assets/campus.jpg";
import type { AcademyCohort, CurriculumModule, Faq } from "./types";

export const ACADEMY_IMAGES = { academy, campus };

export const ACADEMY_DELIVERY = [
  {
    title: "Live virtual classes",
    detail: "Two 2-hour evening sessions weekly on Zoom, recorded if you miss one.",
    icon: "Video",
  },
  {
    title: "Recorded lessons",
    detail: "Every module is recorded and stays available for 12 months after your cohort ends.",
    icon: "PlayCircle",
  },
  {
    title: "Assignments",
    detail:
      "Short weekly tasks: itinerary builds, fare rules quizzes, email drafts for real scenarios.",
    icon: "FileText",
  },
  {
    title: "Practical exercises",
    detail: "Booking simulations in a training environment and a supplier-roleplay clinic.",
    icon: "MousePointerClick",
  },
  {
    title: "Final assessment",
    detail: "A written paper plus a supervised booking exercise. Pass mark is 60%.",
    icon: "Award",
  },
] as const;

export const COHORTS: AcademyCohort[] = [
  {
    id: "cohort-01",
    cohort: "Cohort 01",
    month: "Feb",
    year: 2027,
    title: "February intake",
    focus: "Registration, onboarding and first-quarter training",
    status: "Closing soon",
    startDate: "2027-02-08",
    endDate: "2027-04-30",
    classes: "Tue & Thu, 7:00–9:00pm WAT + 1 Saturday clinic",
    seats: 30,
    seatsTaken: 26,
    fee: 250000,
    feeNote: "One-time, covers all 8 modules, recordings and assessment",
    registrationDeadline: "2027-01-29",
  },
  {
    id: "cohort-02",
    cohort: "Cohort 02",
    month: "May",
    year: 2027,
    title: "May intake",
    focus: "New students, practical booking exercises and career preparation",
    status: "Open",
    startDate: "2027-05-10",
    endDate: "2027-07-31",
    classes: "Mon & Wed, 7:00–9:00pm WAT + 1 Saturday clinic",
    seats: 30,
    seatsTaken: 11,
    fee: 250000,
    feeNote: "Early-bird ₦215,000 if paid before 10 Apr 2027",
    registrationDeadline: "2027-04-30",
  },
  {
    id: "cohort-03",
    cohort: "Cohort 03",
    month: "Aug",
    year: 2027,
    title: "August intake",
    focus: "Reservations, tour operations, customer service and sales",
    status: "Upcoming",
    startDate: "2027-08-09",
    endDate: "2027-10-29",
    classes: "Tue & Thu, 7:00–9:00pm WAT",
    seats: 30,
    seatsTaken: 3,
    fee: 265000,
    feeNote: "Includes a supervised GDS training-environment licence",
    registrationDeadline: "2027-07-30",
  },
  {
    id: "cohort-04",
    cohort: "Cohort 04",
    month: "Nov",
    year: 2027,
    title: "November intake",
    focus: "Final intake of the year: assessments and career pathway guidance",
    status: "Upcoming",
    startDate: "2027-11-08",
    endDate: "2028-01-27",
    classes: "Mon & Wed, 7:00–9:00pm WAT",
    seats: 30,
    seatsTaken: 0,
    fee: 265000,
    feeNote: "Payment plan available: two instalments",
    registrationDeadline: "2027-10-29",
  },
];

export const CURRICULUM: CurriculumModule[] = [
  {
    number: 1,
    title: "Introduction to travel & tourism",
    summary:
      "How the industry actually pays: airlines, consolidators, wholesalers, OTAs and the agent's margin.",
    lessons: 4,
    outcome: "Explain the value chain and where a consultant earns.",
  },
  {
    number: 2,
    title: "Flight booking fundamentals",
    summary:
      "Fare bases, rules, ticketing workflows, PNR construction, ancillaries and void/refund handling.",
    lessons: 8,
    outcome: "Build a correct PNR and read a fare rule without help.",
  },
  {
    number: 3,
    title: "Hotel reservations & package planning",
    summary:
      "Room types, rate plans, allotments, FIT vs group, and building a sellable holiday package.",
    lessons: 6,
    outcome: "Price a 7-night package with transfers and mark-up.",
  },
  {
    number: 4,
    title: "Customer service & itinerary management",
    summary:
      "Handling changes, delays, involuntary reroutes, complaints and the language that keeps a client.",
    lessons: 5,
    outcome: "Resolve a disruption and document it defensibly.",
  },
  {
    number: 5,
    title: "Visa documentation & ethical consultation",
    summary:
      "Checklists, financial evidence, refusal analysis, and the hard line between support and misrepresentation.",
    lessons: 6,
    outcome: "Assemble a complete, honest application pack.",
  },
  {
    number: 6,
    title: "Tour operations & supplier management",
    summary:
      "Sourcing, contracting, DMC relationships, QA visits and handling supplier failure mid-trip.",
    lessons: 5,
    outcome: "Negotiate and document a supplier agreement.",
  },
  {
    number: 7,
    title: "Travel business setup & sales",
    summary:
      "Registration, pricing and margins, payment collection, WhatsApp selling and repeat-client systems.",
    lessons: 6,
    outcome: "Model a sustainable agency P&L.",
  },
  {
    number: 8,
    title: "Practical assessment & career preparation",
    summary:
      "Supervised booking exercise, CV and LinkedIn clinic, remote-role interview practice, placement guidance.",
    lessons: 4,
    outcome: "Pass the final assessment and interview ready.",
  },
];

export const ACADEMY_TRAINERS = [
  {
    name: "Mrs. Funmi Adeyemi",
    role: "Lead instructor — Reservations",
    bio: "18 years in airline ticketing and GDS training across West Africa.",
    initials: "FA",
  },
  {
    name: "Kelechi Nwosu",
    role: "Tour operations & suppliers",
    bio: "Built outbound package operations for two Nigerian tour brands.",
    initials: "KN",
  },
  {
    name: "Halima Yusuf",
    role: "Visa documentation & compliance",
    bio: "Former visa-section operations; teaches document discipline.",
    initials: "HY",
  },
  {
    name: "Seyi Bakare",
    role: "Sales & travel business setup",
    bio: "Runs a 400-client boutique agency from Lagos.",
    initials: "SB",
  },
];

export const ACADEMY_FAQS: Faq[] = [
  {
    q: "Do I need experience to join?",
    a: "No. Module 1 assumes zero industry knowledge. You need a laptop, stable data and 5 hours of weekly study time.",
    topic: "Admissions",
  },
  {
    q: "Is the certificate accredited?",
    a: "Certificates are issued by Hague Travel Academy and are not IATA or government accreditation. We describe it exactly that way on your certificate and CV template.",
    topic: "Certification",
  },
  {
    q: "Will you get me a job?",
    a: "We do not promise placement. You get interview preparation, a CV clinic and introductions to verified partners who are hiring. Earnings depend on you.",
    topic: "Careers",
  },
  {
    q: "What if I miss a live class?",
    a: "Recordings are posted within 24 hours and stay available for 12 months. Missed practicals can be re-booked in the Saturday clinic.",
    topic: "Delivery",
  },
  {
    q: "Do we use a real booking system?",
    a: "Where a module needs GDS access, we use a licensed training environment or an authorised demonstration account. You never touch live passenger names.",
    topic: "Tools",
  },
  {
    q: "Can I pay in instalments?",
    a: "Cohort 04 offers two instalments. Instalment plans must be cleared before the final assessment.",
    topic: "Fees",
  },
  {
    q: "Is there a refund if I drop out?",
    a: "Full refund up to seven days after the first class, 50% to the end of Module 2, none afterwards. See the Refund & Cancellation Policy.",
    topic: "Fees",
  },
  {
    q: "Do remote students from outside Nigeria join?",
    a: "Yes — cohorts include students from Ghana, Kenya, the UK and Canada. Fees are quoted in NGN and converted at the day's published rate.",
    topic: "Delivery",
  },
];

export function getCohorts(): AcademyCohort[] {
  return COHORTS;
}

export function getCohortById(id: string): AcademyCohort | undefined {
  return COHORTS.find((c) => c.id === id);
}

export function getOpenCohorts(): AcademyCohort[] {
  return COHORTS.filter((c) => c.status !== "Upcoming");
}
