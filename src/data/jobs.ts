import type { JobListing } from "./types";

/**
 * Example role categories — not live vacancies. The brief is explicit that these
 * must never read as guaranteed work or guaranteed earnings.
 */
const JOBS: JobListing[] = [
  {
    id: "travel-consultant-remote",
    title: "Travel Consultant — Remote",
    category: "Consulting & Sales",
    employmentType: "Employed",
    workMode: "Remote",
    country: "Nigeria / Global",
    experience: "Entry",
    employer: "Verified partner agencies (rotating list)",
    source: "Hague Travel Academy partner network",
    summary:
      "Handle flight and hotel enquiries, prepare quotations, follow up with clients and coordinate bookings under a senior agent.",
    responsibilities: [
      "Respond to enquiry forms and WhatsApp messages within the agreed service window",
      "Build quotations from supplier and GDS options, clearly labelled indicative until confirmed",
      "Issue and re-issue tickets, apply changes and process refund requests",
      "Keep the client record updated in the CRM with documents and payment status",
    ],
    qualifications: [
      "Hague Travel Academy certificate or equivalent experience",
      "Reliable laptop and internet",
      "Written English at business standard",
      "Availability for weekend peak support rota",
    ],
    salary:
      "Commission-weighted. Verified partners typically disclose a range at interview — we never publish unverified figures.",
    deadline: "Rolling — applications reviewed fortnightly",
    academyModule: "Module 2 · Flight booking fundamentals",
    status: "approved",
  },
  {
    id: "travel-sales-digital-marketing",
    title: "Travel Sales & Digital Marketing",
    category: "Sales & Marketing",
    employmentType: "Freelance",
    workMode: "Remote",
    country: "Nigeria",
    experience: "Mid",
    employer: "Independent agency contracts",
    source: "Hague Travel partner briefs",
    summary:
      "Generate leads through content and paid social, run festive and study-intake campaigns, and convert enquiries into quoted trips.",
    responsibilities: [
      "Plan monthly campaign calendars around package departures and intakes",
      "Write and schedule content; report on cost per qualified enquiry",
      "Run retargeting for abandoned quotation requests",
      "Hand warm leads to consultants with full context in the CRM",
    ],
    qualifications: [
      "Portfolio of campaigns (travel or hospitality preferred)",
      "Meta and TikTok Ads Manager fluency",
      "Basic design in Canva or Figma",
      "Understanding of travel margins and deposit flows",
    ],
    salary: "Project or retainer based. Rates agreed directly with each client.",
    deadline: "Rolling",
    academyModule: "Module 7 · Travel business setup & sales",
    status: "approved",
  },
  {
    id: "reservations-customer-experience",
    title: "Reservations & Customer Experience",
    category: "Reservations & CX",
    workMode: "Remote",
    employmentType: "Employed",
    country: "UK / Nigeria",
    experience: "Entry",
    employer: "Managed service desk partners",
    source: "Hague Travel recruitment moderation",
    summary:
      "Own the booking follow-up loop: confirmations, itinerary changes, rebooking during disruptions and service recovery.",
    responsibilities: [
      "Acknowledge and progress reservation requests within SLA",
      "Rebook disrupted travellers with documented supplier approvals",
      "Maintain accurate notes, vouchers and refund records",
      "Escalate safeguarding and fraud risk cases to the duty manager",
    ],
    qualifications: [
      "Excellent written English",
      "Typing speed above 55 wpm",
      "Familiarity with a booking or CRM tool",
      "Calm, structured communication under pressure",
    ],
    salary: "Disclosed by the hiring partner at offer stage.",
    deadline: "Rolling",
    academyModule: "Module 4 · Customer service & itinerary management",
    status: "approved",
  },
  {
    id: "group-tour-leader",
    title: "Group Tour Leader (Escort)",
    category: "Tour Operations",
    employmentType: "Commission-based",
    workMode: "On-site",
    country: "Ghana, Nigeria, Tanzania, UAE",
    experience: "Mid",
    employer: "Hague Experiences departures",
    source: "Internal tour operations",
    summary:
      "Escort festive and cultural group departures: airport meet, hotel liaison, activity timing, duty-of-care and on-trip problem solving.",
    responsibilities: [
      "Run the departure-day brief and manage group check-in",
      "Liaise with ground handlers, guides and hotels against the itinerary",
      "Handle incidents with documented decisions and supplier escalation",
      "Collect feedback and post-trip review requests",
    ],
    qualifications: [
      "Prior group travel experience",
      "First aid willingness",
      "Passport valid for 6+ months",
      "Comfortable on WhatsApp at all hours during a trip",
    ],
    salary: "Per-department fee plus approved expenses, agreed before assignment.",
    deadline: "Seasonal — Dec and Easter pools open 8 weeks prior",
    academyModule: "Module 6 · Tour operations & supplier management",
    status: "approved",
  },
  {
    id: "student-recruitment-adviser",
    title: "Student Recruitment Adviser",
    category: "Education",
    employmentType: "Independent agent",
    workMode: "Hybrid",
    country: "Lagos / Abuja",
    experience: "Mid",
    employer: "Verified university representation partners",
    source: "Partner agreement, reviewed annually",
    summary:
      "Counsel prospective students on country, course and funding, then manage the application file to visa decision.",
    responsibilities: [
      "Run eligibility assessments and honest course matching",
      "Prepare documents and financial-evidence checklists",
      "Track each application and report status to the client",
      "Never promise a visa outcome; record the advice you gave",
    ],
    qualifications: [
      "Education advising or admissions background",
      "Knowledge of UKVI/Study Permit requirements",
      "Written English at a high standard",
      "Data-protection awareness",
    ],
    salary: "Commission from the representing institution, disclosed to students as required.",
    deadline: "Rolling — cohort-cycle intake",
    academyModule: "Module 5 · Visa documentation & ethical consultation",
    status: "approved",
  },
  {
    id: "corporate-travel-coordinator",
    title: "Corporate Travel Coordinator",
    category: "Corporate",
    employmentType: "Employed",
    workMode: "Hybrid",
    country: "Nigeria",
    experience: "Senior",
    employer: "Contract clients (energy, finance, NGO)",
    source: "Corporate desk referral",
    summary:
      "Own a corporate travel account: policy compliance, negotiated fares, group moves, invoicing and monthly reporting.",
    responsibilities: [
      "Manage end-to-end itineraries for execs and project teams",
      "Enforce travel policy and flag exceptions with approval trails",
      "Reconcile invoices, credit memos and refunds monthly",
      "Report savings, leakage and duty-of-care incidents",
    ],
    qualifications: [
      "3+ years corporate travel or TMC experience",
      "GDS competence (Amadeus/Sabre)",
      "Excel and reporting discipline",
      "Familiarity with travel policy design",
    ],
    salary: "Disclosed at interview by the contracting client.",
    deadline: "Until filled",
    academyModule: "Module 3 · Hotel reservations & package planning",
    status: "approved",
  },
  {
    id: "visa-documents-officer",
    title: "Visa Documentation Officer",
    category: "Documentation",
    employmentType: "Employed",
    workMode: "Hybrid",
    country: "Lagos",
    experience: "Mid",
    employer: "Hague Travel documentation desk",
    source: "Internal",
    summary:
      "Quality-check every client pack before submission: consistency, financial evidence, translations and appointment logistics.",
    responsibilities: [
      "Audit application packs against the country checklist",
      "Chase missing documents with clear, dated requests",
      "Book biometrics and prepare interview briefing notes",
      "Log consent and document retention dates",
    ],
    qualifications: [
      "Attention to detail above all",
      "Prior documentation or admin experience",
      "GDPR/NDPR awareness",
      "Comfort with confidential client data",
    ],
    salary: "Disclosed at interview.",
    deadline: "Rolling",
    academyModule: "Module 5 · Visa documentation & ethical consultation",
    status: "approved",
  },
  {
    id: "remote-travel-content-writer",
    title: "Remote Travel Content Writer",
    category: "Sales & Marketing",
    employmentType: "Freelance",
    workMode: "Remote",
    country: "Global",
    experience: "Entry",
    employer: "Hague Travel content desk",
    source: "Internal",
    summary:
      "Write destination guides, package descriptions and FAQ pages that are accurate on visas, honest on price and good to read.",
    responsibilities: [
      "Draft destination and package copy from verified supplier sheets",
      "Fact-check every visa and baggage claim before publishing",
      "Follow our indicative-pricing language rules strictly",
      "Work with SEO guidance without keyword stuffing",
    ],
    qualifications: [
      "Two published writing samples",
      "Ability to verify facts against official sources",
      "Familiar with Google Docs and Notion",
      "Interest in travel operations",
    ],
    salary: "Per-word or per-brief, agreed before the assignment.",
    deadline: "Rolling",
    academyModule: "Module 1 · Introduction to travel & tourism",
    status: "pending",
  },
];

export function getJobs(includePending = false): JobListing[] {
  return includePending ? JOBS : JOBS.filter((j) => j.status === "approved");
}

export function getJobById(id: string): JobListing | undefined {
  return JOBS.find((j) => j.id === id);
}

export const JOB_CATEGORIES = Array.from(new Set(JOBS.map((j) => j.category)));
export const JOB_COUNTRIES = Array.from(new Set(JOBS.map((j) => j.country)));
