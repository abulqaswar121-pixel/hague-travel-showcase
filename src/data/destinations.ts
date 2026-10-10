import campus from "@/assets/campus.jpg";
import city from "@/assets/city.jpg";
import dubai from "@/assets/dubai.jpg";
import relocation from "@/assets/relocation.jpg";
import culture from "@/assets/culture.jpg";
import island from "@/assets/island.jpg";
import type { StudyDestination } from "./types";

const DESTINATIONS: StudyDestination[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    headline: "One-year Master's, Graduate Route and a two-hour time difference from Lagos.",
    heroImage: city,
    intakes: ["September (main)", "January", "May (selected courses)"],
    tuitionRange: "£16,000 – £32,000 for a one-year Master's",
    postStudyWork: "Graduate Route: 2 years post-study work (3 years for PhD)",
    visaRoute: "Student visa (formerly Tier 4) — Confirmation of Acceptance for Studies required",
    partnerNote:
      "Subject to partner coverage: we place through verified UK agent networks and university direct links.",
    benefits: [
      "One-year taught Master's — faster total cost than a two-year programme",
      "No IELTS needed by many universities if you studied in English",
      "Dependants allowed only on research and specific programme types",
      "Graduate Route lets you work without sponsorship after graduating",
      "Lagos, Abuja and Port Harcourt have nearby visa application centres",
    ],
    topInstitutions: [
      "University of Manchester",
      "Coventry University",
      "University of Westminster",
      "University of Bedfordshire",
      "Teesside University",
      "Queen Mary University of London",
    ],
    popularCourses: [
      "Public Health MSc",
      "Data Science MSc",
      "Business Analytics MSc",
      "Nursing (adult)",
      "Project Management MSc",
      "Cyber Security MSc",
    ],
    documents: [
      "Valid international passport",
      "Academic transcripts and certificates (WES/SIRI where required)",
      "English test: IELTS UKVI 6.5 overall (varies by course)",
      "CAS from the university",
      "Financial evidence: tuition + 9 months' maintenance held 28 consecutive days",
      "TB test certificate (Pearson approved centre in Nigeria)",
      "Personal statement and two references",
      "Credibility-interview readiness notes",
    ],
    costBreakdown: [
      { label: "Student visa application fee", amount: "£524 (paid to UKVI)", owner: "government" },
      { label: "Immigration Health Surcharge", amount: "£776 per year", owner: "government" },
      { label: "Tuition deposit", amount: "Usually £2,000 – £5,000", owner: "university" },
      {
        label: "Hague Travel admissions & documentation service",
        amount: "₦250,000 – ₦450,000",
        owner: "agency",
      },
      { label: "Biometrics appointment (VFS)", amount: "₦12,000 – ₦25,000", owner: "third-party" },
    ],
    timeline: [
      {
        week: "T-9 months",
        task: "Eligibility assessment, shortlist universities and courses, sit IELTS if needed",
      },
      { week: "T-7 months", task: "Submit applications with personal statement and references" },
      { week: "T-5 months", task: "Receive offers, pay tuition deposit, receive CAS" },
      {
        week: "T-4 months",
        task: "Assemble financial evidence (28-day rule), TB test, visa application",
      },
      { week: "T-2 months", task: "Biometrics, decision, accommodation contract" },
      { week: "T-3 weeks", task: "Flight booking, pre-departure briefing, arrival checklist" },
    ],
    faqs: [
      {
        q: "Do you guarantee a UK visa?",
        a: "No. The decision rests solely with UK Visas and Immigration. We prepare a complete, consistent, well-evidenced application — that is what we control.",
      },
      {
        q: "Can I work while studying?",
        a: "Most Student visa holders may work 20 hours per week in term time. Roles must not be self-employed.",
      },
      {
        q: "Can my spouse come with me?",
        a: "Only on specific research and funded programme types. We check eligibility before you pay anyone.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    headline:
      "Co-op diplomas and Master's with a post-graduation work permit of up to three years.",
    heroImage: relocation,
    intakes: ["September", "January", "May (colleges)"],
    tuitionRange: "CAD 16,000 – CAD 35,000 per year",
    postStudyWork: "PGWP up to 3 years depending on programme length",
    visaRoute:
      "Study permit via a Designated Learning Institution, with IEC/GIR pathway where eligible",
    partnerNote:
      "Subject to partner coverage: college placements run through licensed Canadian representatives.",
    benefits: [
      "Family accompaniment: spouse open work permit, school-age children on domestic tuition",
      "Co-op programmes embed paid work placements in the curriculum",
      "Clear route from PGWP to provincial nomination for permanent residence",
      "GIC route demonstrates funds without large locked deposits",
      "Second-language and diploma-to-degree transfer pathways",
    ],
    topInstitutions: [
      "Seneca Polytechnic",
      "George Brown College",
      "University of Windsor",
      "Concordia University",
      "Langara College",
      "Cape Breton University",
    ],
    popularCourses: [
      "Supply Chain Diploma",
      "Software Development Graduate Certificate",
      "Occupational Health & Safety",
      "Early Childhood Education",
      "Data Analytics",
      "Practical Nursing",
    ],
    documents: [
      "Letter of Acceptance from a DLI",
      "Provincial Attestation Letter (PAL) where required for the intake",
      "CAD 20,635 GIC + first-year tuition (2026 requirement — verify current figure)",
      "Two years' transaction history for the sponsor",
      "IELTS Academic 6.0 / CELPIP 7 (or PTE as accepted)",
      "Medical exam by a panel physician",
      "Police character certificate",
      "Statement of purpose tied to a clear home-country link",
    ],
    costBreakdown: [
      { label: "Study permit processing fee", amount: "CAD 150", owner: "government" },
      { label: "Biometrics (VAC Lagos)", amount: "CAD 85", owner: "government" },
      { label: "Medical examination", amount: "≈₦130,000 – ₦180,000", owner: "third-party" },
      {
        label: "Hague Travel admissions & permit documentation",
        amount: "₦350,000 – ₦550,000",
        owner: "agency",
      },
      { label: "GIC administration fee", amount: "CAD 235 (to the bank)", owner: "third-party" },
    ],
    timeline: [
      {
        week: "T-12 months",
        task: "Programme fit assessment, IELTS booking, budget and funding plan",
      },
      { week: "T-9 months", task: "Apply to DLIs, prepare SOP, gather transcripts" },
      { week: "T-6 months", task: "Acceptance, PAL, tuition deposit, open GIC" },
      {
        week: "T-4 months",
        task: "Medical, police certificate, submit study permit with full financial pack",
      },
      { week: "T-2 months", task: "Approval, housing contract, flights" },
      { week: "T-2 weeks", task: "Pre-departure orientation, settlement checklist" },
    ],
    faqs: [
      {
        q: "Is a PAL still required?",
        a: "For most new undergraduate-level intakes, yes. Our partner representatives confirm the requirement for your specific college and intake before you pay.",
      },
      {
        q: "Can my family come with me?",
        a: "Spouses of Master's and several professional programme students may be eligible for an open work permit. We verify per programme.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    headline:
      "Strong-funded graduate routes, OPT and STEM extension — with the strictest interview prep.",
    heroImage: dubai,
    intakes: ["August / September", "January (selected)"],
    tuitionRange: "USD 22,000 – USD 55,000 per year",
    postStudyWork: "12 months OPT, plus 24-month STEM extension",
    visaRoute: "F-1 student visa — I-20, SEVIS fee and consular interview in Lagos or Abuja",
    partnerNote:
      "Subject to partner coverage: we work with verified education agents; no visa outcome is ever promised.",
    benefits: [
      "Assistantships and tuition waivers at research universities can cut cost sharply",
      "STEM OPT gives up to three years of US work experience",
      "CPT allows internships during study",
      "Transfers between community college and university pathways",
      "Alumni networks across Houston, Atlanta, Dallas and Toronto-adjacent markets",
    ],
    topInstitutions: [
      "University of Houston",
      "Georgia State University",
      "SUNY Buffalo State",
      "Arkansas State University",
      "University of North Texas",
      "California State University system",
    ],
    popularCourses: [
      "Computer Science MS",
      "Petroleum Engineering MS",
      "Public Health MPH",
      "Engineering Management MS",
      "Business Analytics MS",
      "Nursing MSN",
    ],
    documents: [
      "Form I-20 signed by the designated school official",
      "SEVIS I-901 fee receipt (USD 350)",
      "DS-160 confirmation page",
      "Financial proof: I-20 cost of attendance fully covered",
      "GRE/GMAT where the programme requires it",
      "Transcripts with a course-by-course evaluation where requested",
      "Evidence of ties to Nigeria: employment, property, family",
      "Interview rehearsal notes on study plan and post-graduation intent",
    ],
    costBreakdown: [
      { label: "MRV visa fee", amount: "USD 185 (paid to the US government)", owner: "government" },
      { label: "SEVIS I-901 fee", amount: "USD 350", owner: "government" },
      { label: "Credential evaluation (WES/ECE)", amount: "USD 160 – 300", owner: "third-party" },
      {
        label: "Hague Travel US admissions and interview coaching",
        amount: "₦400,000 – ₦650,000",
        owner: "agency",
      },
    ],
    timeline: [
      {
        week: "T-14 months",
        task: "Profile review, GRE/GMAT plan, shortlist affordable funded programmes",
      },
      { week: "T-10 months", task: "Applications and financial documents to universities" },
      { week: "T-6 months", task: "I-20 issued, SEVIS paid, DS-160 filed" },
      { week: "T-4 months", task: "Interview appointment, mock interviews with consultants" },
      { week: "T-2 months", task: "Visa decision, housing, flights, health insurance" },
      { week: "T-1 month", task: "Pre-departure orientation and airport briefing" },
    ],
    faqs: [
      {
        q: "Why are US refusals common for Nigerians?",
        a: "Consular officers weigh ties to home. We help you document employment, assets and family links, and rehearse a coherent study plan — but the officer decides.",
      },
      {
        q: "Can I work on campus?",
        a: "Typically 20 hours per week in term time with the DSO's approval, off-campus only through CPT/OPT or economic hardship authorisation.",
      },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    headline: "One-year Master's, 2-year stay-back and an English-speaking EU base.",
    heroImage: city,
    intakes: ["September (main)", "January (limited)"],
    tuitionRange: "€13,000 – €26,000 per year",
    postStudyWork: "Third Level Graduate Programme: 2 years (3 for Master's)",
    visaRoute:
      "Study visa (D) with Irish Immigration Service Delivery; no part-time work before registration",
    partnerNote: "Subject to partner coverage: university partnerships reviewed each intake.",
    benefits: [
      "Common Travel Area gives free access to the UK for many purposes",
      "Strong tech and pharma employer presence in Dublin, Cork and Galway",
      "Straightforward document requirements versus larger markets",
      "Master's-level scholarship schemes (Government of Ireland, pathway awards)",
      "Dependants permitted on research Master's and specific programmes",
    ],
    topInstitutions: [
      "University of Limerick",
      "Technological University Dublin",
      "National University of Ireland Galway",
      "Munster Technological University",
      "Dublin City University",
      "Atlantic Technological University",
    ],
    popularCourses: [
      "Software Engineering MSc",
      "Pharmaceutical Engineering",
      "Data Analytics MSc",
      "Cyber Security",
      "International Business",
      "Renewable Energy",
    ],
    documents: [
      "Offer letter and evidence of fee payment (usually €3,000+ deposit)",
      "Proof of €12,000 maintenance funds (2026 guideline — confirm current)",
      "Private medical insurance for the first year",
      "IELTS 6.5 (no band below 6.0) or accepted equivalent",
      "Statement of purpose and CV",
      "Certificates and accreditation documents where the course requires",
      "Accommodation evidence for initial arrival",
    ],
    costBreakdown: [
      { label: "Long Stay D study visa fee", amount: "€60", owner: "government" },
      { label: "IRP residence registration", amount: "€300 after arrival", owner: "government" },
      { label: "University deposit", amount: "€3,000 – €6,000", owner: "university" },
      {
        label: "Hague Travel admissions & visa pack",
        amount: "₦280,000 – ₦420,000",
        owner: "agency",
      },
    ],
    timeline: [
      { week: "T-10 months", task: "Course fit, budget review, English test" },
      { week: "T-7 months", task: "Applications with SOP and references" },
      { week: "T-5 months", task: "Acceptance, deposit, accommodation booking" },
      { week: "T-3 months", task: "Visa application with financial and insurance evidence" },
      { week: "T-1 month", task: "Approval, flights, pre-departure orientation" },
    ],
    faqs: [
      {
        q: "Do I need IELTS for Ireland?",
        a: "Most institutions ask for IELTS 6.5. Several accept Duolingo English Test or a medium-of-instruction letter — we check the course page before you sit anything.",
      },
      {
        q: "Can I bring my partner?",
        a: "Only on research-level Master's and select programmes. We confirm eligibility in writing before you commit.",
      },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    headline:
      "Low or no tuition at public universities, with a blocked account as the funding proof.",
    heroImage: culture,
    intakes: ["Winter (October)", "Summer (April)"],
    tuitionRange:
      "€0 – €4,000 per semester at most public universities (semester contribution applies)",
    postStudyWork: "18-month job-seeker residence permit after graduation",
    visaRoute: "National (D) study visa or student permit via the German mission in Lagos",
    partnerNote:
      "Subject to partner coverage: APS-style document verification and uni-assist applications are handled with partners.",
    benefits: [
      "No or minimal tuition at public universities",
      "Engineering, automotive, renewable energy and IT industries recruiting locally",
      "Working students may take 120 full / 240 half days per year",
      "German-taught programmes unlock lower living costs outside Munich and Frankfurt",
      "Route to permanent residence after study and employment",
    ],
    topInstitutions: [
      "RWTH Aachen University",
      "TU Dortmund",
      "University of Siegen",
      "Hochschule München",
      "University of Kaiserslautern",
      "Technische Hochschule Köln",
    ],
    popularCourses: [
      "Mechanical Engineering MSc",
      "Automotive Engineering",
      "Electrical Engineering",
      "Computer Science MSc",
      "Renewable Energy",
      "Supply Chain Management",
    ],
    documents: [
      "Blocked account (Sperrkonto) — €11,904 per year guideline",
      "University admission letter (Zulassungsbescheid)",
      "Transcripts with uni-assist evaluation where required",
      "TestAS / GRE for some programmes",
      "German A1–B1 certificate or English-taught proof (IELTS 6.5)",
      "Health insurance confirmation",
      "Motivation letter aligned with the chosen module list",
    ],
    costBreakdown: [
      { label: "National visa fee", amount: "€75", owner: "government" },
      { label: "uni-assist first application", amount: "€75", owner: "third-party" },
      { label: "Blocked account transfer charges", amount: "≈€100 – €150", owner: "third-party" },
      {
        label: "Hague Travel applications & blocked-account guidance",
        amount: "₦300,000 – ₦480,000",
        owner: "agency",
      },
    ],
    timeline: [
      { week: "T-12 months", task: "Transcript review, module matching, German/English test plan" },
      { week: "T-8 months", task: "uni-assist and direct university applications" },
      { week: "T-5 months", task: "Admission letters, open the blocked account" },
      { week: "T-3 months", task: "Visa appointment with full document set" },
      { week: "T-6 weeks", task: "City registration pack, housing, health insurance, flights" },
    ],
    faqs: [
      {
        q: "Is Germany really tuition-free?",
        a: "Most public universities charge no tuition, but a semester contribution (€150 – €400) applies. Some Länder and private universities charge fees.",
      },
      {
        q: "Do I need German to study?",
        a: "Not for English-taught programmes, but daily life and part-time work get far easier with A2–B1 German.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    headline: "Post-study work rights to four years, with the strictest Genuine Student test.",
    heroImage: island,
    intakes: ["February / March", "July", "November (some)"],
    tuitionRange: "AUD 33,000 – AUD 55,000 per year",
    postStudyWork: "Temporary Graduate visa: 2–4 years depending on qualification and location",
    visaRoute: "Subclass 500 with a Confirmation of Enrolment and Genuine Student requirement",
    partnerNote:
      "Subject to partner coverage: only MARA-registered education agents submit on your behalf.",
    benefits: [
      "High minimum wage and transparent award rates for student work",
      "Regional study grants extra years on the Temporary Graduate visa",
      "Strong health, engineering, IT and agribusiness employment",
      "Dependants may work; school places for children available",
      "Clear skilled-migration pathways after study",
    ],
    topInstitutions: [
      "Deakin University",
      "Charles Darwin University",
      "University of Southern Queensland",
      "Griffith University",
      "Edith Cowan University",
      "University of Wollongong",
    ],
    popularCourses: [
      "Nursing (registered) GDG",
      "Information Technology",
      "Civil Engineering",
      "Public Health",
      "Agribusiness",
      "Social Work",
    ],
    documents: [
      "Confirmation of Enrolment (CoE)",
      "Genuine Student (GS) statement responses",
      "ODSH health insurance for the full course length",
      "AUD 29,714 living-cost evidence (2026 guideline — confirm current)",
      "IELTS 6.5 bands 6.0 / PTE / OET for health courses",
      "Skills assessment for trade and health pathways",
      "Character documents (police certificate)",
    ],
    costBreakdown: [
      { label: "Student visa subclass 500 fee", amount: "AUD 1,600", owner: "government" },
      { label: "ODSH health cover", amount: "AUD 800 – 1,100 per year", owner: "third-party" },
      { label: "English test (IELTS/OET)", amount: "≈₦150,000", owner: "third-party" },
      {
        label: "Hague Travel admissions and GS statement support",
        amount: "₦380,000 – ₦600,000",
        owner: "agency",
      },
    ],
    timeline: [
      { week: "T-12 months", task: "Course and CRICOS review, eligibility, English test" },
      { week: "T-8 months", task: "Apply to institution, accept offer, pay deposit for CoE" },
      { week: "T-5 months", task: "Buy ODSH, prepare GS statement and financial pack" },
      { week: "T-3 months", task: "Lodge subclass 500 with health and character checks" },
      { week: "T-1 month", task: "Visa grant, housing, flights, pre-departure orientation" },
    ],
    faqs: [
      {
        q: "What is the Genuine Student test?",
        a: "A written set of questions proving you are going to study, not to migrate on a student visa. We help you answer truthfully and consistently.",
      },
      {
        q: "Can I work while studying?",
        a: "Commonly 48 hours per fortnight during term and unlimited in breaks — always check the conditions on your visa grant.",
      },
    ],
  },
];

export function getDestinations(): StudyDestination[] {
  return DESTINATIONS;
}

export function getDestinationBySlug(slug: string): StudyDestination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export const STUDY_STEPS = [
  {
    title: "Choose destination",
    detail: "Compare countries on cost, work rights and family policy.",
  },
  {
    title: "Select course",
    detail: "Match your transcript, budget and timeline to real programmes.",
  },
  {
    title: "Eligibility assessment",
    detail: "Free academic and financial review with a consultant.",
  },
  { title: "Admissions support", detail: "Applications, SOPs, references and offer follow-up." },
  { title: "Visa documentation", detail: "Checklists, financial packs and interview preparation." },
  { title: "Accommodation", detail: "Student halls, long-stay housing and first-month flats." },
  { title: "Flight booking", detail: "Student fares, extra baggage and group departures." },
  { title: "Pre-departure support", detail: "Orientation, arrival checklist and settlement pack." },
] as const;

export const SCHOLARSHIP_ALERTS = [
  {
    name: "Commonwealth Shared Scholarships (UK)",
    status: "Applications open",
    note: "Master's, full tuition + stipend. Deadline: Dec 2026.",
  },
  {
    name: "Government of Ireland Postgraduate",
    status: "Opens Jan 2027",
    note: "€4,000 stipend per year + fee remission.",
  },
  {
    name: "DAAD Study Scholarships (Germany)",
    status: "Rolling",
    note: "Monthly stipend for Master's and PhD.",
  },
  {
    name: "EduTrust Lagos County bursary",
    status: "Verify with us",
    note: "We confirm legitimacy before you share documents.",
  },
];
