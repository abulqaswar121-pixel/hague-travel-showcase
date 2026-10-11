import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, GraduationCap, ShieldAlert, Sparkles } from "lucide-react";
import {
  ComplianceNote,
  FeeSplit,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Stepper,
  Steps,
} from "@/components/site/Blocks";
import { MultiStepForm } from "@/components/site/Form";
import { SCHOLARSHIP_ALERTS, STUDY_STEPS, getDestinations } from "@/data/destinations";
import { images, COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/study-abroad/")({
  head: pageMeta(
    "Study Abroad — Admissions, Visas & Pre-Departure",
    "Course picking, admissions help, document lists, money proof, visa papers, housing, flights and pre-departure support for six countries.",
  ),
  component: StudyAbroadIndex,
});

const SERVICES = [
  {
    t: "University & course selection",
    d: "Matched to your results, your budget and your plan after school — not to whoever pays the biggest commission.",
  },
  {
    t: "Admissions applications",
    d: "Forms, personal statements, references, portfolio guidance and deadline control.",
  },
  {
    t: "Document checklists & SOP guidance",
    d: "Country-specific packs, format discipline and statement-of-purpose review.",
  },
  {
    t: "Study permit / visa preparation",
    d: "Financial evidence, interviews, credibility questions and submission timing.",
  },
  {
    t: "Financial-document readiness",
    d: "The 28-day rule, sponsorship letters, loan statements and where money should sit.",
  },
  {
    t: "Application tracking & interview prep",
    d: "A live tracker plus mock credibility interviews with a consultant.",
  },
  {
    t: "Tuition & accommodation planning",
    d: "Deposits, payment schedules, halls versus private rentals, bills explained.",
  },
  {
    t: "Pre-departure orientation & flights",
    d: "Arrival week, banking, SIM, winter kit, baggage rules and student fares.",
  },
];

function StudyAbroadIndex() {
  const destinations = getDestinations();

  return (
    <>
      <PageHero
        image={images.campus}
        eyebrow="Study Abroad"
        title={
          <>
            We prepare the file. <em className="text-gold">They</em> make the decision.
          </>
        }
        sub="We help with admission papers, the visa, your money proof, housing, flights and getting ready to leave. Schools and embassies decide. We only make sure you are ready for them."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Free eligibility assessment</Pill>
          <Pill tone="gold">Verified partner coverage</Pill>
          <Pill>6 destinations</Pill>
        </div>
      </PageHero>

      {/* Journey stepper */}
      <Section
        eyebrow="The journey"
        title="Eight steps, one consultant who owns your file"
        sub="We skip no step. You see every paper before anything is sent."
      >
        <Stepper items={STUDY_STEPS.map((s) => ({ title: s.title, detail: s.detail }))} />
        <div className="mt-6">
          <Notice tone="sea" title="Where our role stops" icon={ShieldAlert}>
            We give advice and do the paperwork. The school decides admission. The immigration
            office decides your visa. Neither of those is ever ours to promise.
          </Notice>
        </div>
      </Section>

      {/* Destination grid */}
      <Section
        tone="muted"
        eyebrow="Destinations"
        title="Where our students are going"
        sub="We have pages for the countries our partners cover today. We check that list every intake."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={i * 55}>
              <Link
                to="/study-abroad/$country"
                params={{ country: d.slug }}
                className="group lift flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card"
              >
                <div className="relative">
                  <img
                    src={d.heroImage}
                    alt={`${d.name} campus and city`}
                    loading="lazy"
                    className="aspect-16/10 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-bold">
                    {d.flag} {d.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed">{d.headline}</p>
                  <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex justify-between gap-3 border-b border-border pb-1.5">
                      <dt>Intakes</dt>
                      <dd className="text-right font-medium text-foreground">
                        {d.intakes.length} per year
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-border pb-1.5">
                      <dt>Tuition</dt>
                      <dd className="text-right font-medium text-foreground">
                        {d.tuitionRange.split(" for ")[0]}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Post-study</dt>
                      <dd className="text-right font-medium text-foreground">
                        {d.postStudyWork.split(":")[0]}
                      </dd>
                    </div>
                  </dl>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    Country guide{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          {COMPLIANCE_NOTES.visa}
        </p>
      </Section>

      {/* Services + checklist */}
      <Section eyebrow="What we do" title="Services, end to end">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={i * 40}>
                <div className="h-full rounded-2xl border border-border bg-card p-4">
                  <p className="flex items-start gap-2 font-semibold leading-snug">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {s.t}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-border bg-secondary p-5 sm:p-7">
              <p className="eyebrow">Document checklist</p>
              <h3 className="mt-3 text-2xl leading-snug">The pack every application needs</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Each country page has its own version. This is the main list we check against before
                we submit.
              </p>
              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {[
                  "Passport valid 6+ months beyond the course",
                  "Academic transcripts and certificates",
                  "English test report form",
                  "Personal statement / SOP",
                  "Two references (one academic)",
                  "Financial evidence in the required format",
                  "TB or medical examination where required",
                  "Police character certificate",
                  "Offer letter / CAS / I-20 / CoE",
                  "Accommodation confirmation",
                  "Tuberculosis and vaccination records",
                  "Return-ticket or travel plan",
                ].map((d) => (
                  <li key={d} className="flex gap-2.5 rounded-xl bg-card p-3">
                    <span className="mt-1 h-3.5 w-3.5 shrink-0 rounded border-2 border-primary/50" />
                    <span className="leading-snug">{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Nothing goes into a shared folder. Uploads use an encrypted link, only your
                consultant can open them, and we delete them 14 days after you travel.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Scholarships + financing pointer */}
      <Section
        tone="muted"
        eyebrow="Funding"
        title="Legitimate scholarships and honest budgeting"
        sub="We point you to real money, and warn you off anyone selling a 'guaranteed scholarship'."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOLARSHIP_ALERTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 55}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                <Pill tone={s.status.includes("open") ? "success" : "muted"}>{s.status}</Pill>
                <p className="mt-3 font-semibold leading-snug">{s.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="flex items-center gap-2 font-bold">
              <Sparkles className="h-4 w-4 text-gold" /> Tuition & living-cost budgeting
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We build the true first-year number: tuition, deposit, rent, visa fees, health cover,
              flights, and the first 60 days before any pay lands.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-bold">Education financing referrals</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {COMPLIANCE_NOTES.financing}{" "}
              <Link to="/relocation" hash="financing" className="font-bold text-primary underline">
                See the financing workflow
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* Fees */}
      <Section
        eyebrow="Money"
        title="Government, university and agency fees — separated"
        sub="Nothing is bundled into one opaque number."
      >
        <FeeSplit
          government={[
            { label: "Visa / study permit application", amount: "At published rate" },
            { label: "Health surcharge or insurance levy", amount: "At published rate" },
            { label: "Biometrics appointment", amount: "Centre charge" },
          ]}
          agency={[
            { label: "Admissions & documentation service", amount: "₦250,000 – ₦650,000" },
            { label: "Interview & credibility preparation", amount: "₦80,000" },
            { label: "Pre-departure orientation session", amount: "Included" },
          ]}
          thirdParty={[
            { label: "Credential evaluation (WES/ECE)", amount: "USD 160 – 300" },
            { label: "English test (IELTS / PTE)", amount: "≈₦150,000" },
            { label: "Medicals, police certificate, translations", amount: "Per provider" },
          ]}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Your country page lists the exact figures, and your invoice says them again before you
          pay.
        </p>
      </Section>

      {/* Assessment form */}
      <section
        id="assessment"
        className="scroll-mt-24 bg-ink-gradient py-14 text-ink-foreground lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow">Eligibility assessment</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Four short steps. An honest answer.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-foreground/75">
              This is not an application and it binds you to nothing. A consultant reads your
              profile and tells you what is possible — including when the answer is no.
            </p>
            <div className="mt-7 space-y-2.5">
              {STUDY_STEPS.slice(0, 4).map((s, i) => (
                <p key={s.title} className="flex items-start gap-3 text-sm text-ink-foreground/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold font-display text-[11px] font-bold text-gold-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-semibold">{s.title}</span> — {s.detail}
                  </span>
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl glass p-5">
              <p className="text-sm font-bold">Prefer a human first?</p>
              <p className="mt-1.5 text-sm text-ink-foreground/75">
                Book a 30-minute consultation and bring your transcripts. We will read them with you
                on the call.
              </p>
              <Link
                to="/contact"
                search={{ topic: "study" }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-gold-foreground"
              >
                Book a consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-foreground">
            <MultiStepForm
              title="Study abroad eligibility assessment"
              cta="Submit for review"
              refPrefix="HTE"
              note="This is only to size up your profile. Nothing goes to a school or embassy from this form."
              successTitle="Assessment received"
              successLines={[
                "A consultant reviews your profile against current entry standards.",
                "You get a written response: realistic options, costs and the fixes needed.",
                "If it makes sense, we open your admissions file — no obligation.",
              ]}
              steps={[
                {
                  label: "Your profile",
                  hint: "Academic background and where you are in the process.",
                  fields: [
                    {
                      name: "name",
                      label: "Full name",
                      placeholder: "As it appears on your passport",
                    },
                    { name: "phone", label: "Phone / WhatsApp", type: "tel" },
                    { name: "email", label: "Email", type: "email", full: true },
                    {
                      name: "level",
                      label: "Current level",
                      type: "select",
                      options: [
                        "WAEC / A-levels",
                        "HND / Diploma",
                        "Bachelor's (2:2)",
                        "Bachelor's (2:1)",
                        "Bachelor's (1st)",
                        "Master's holder",
                        "Professional (ACCA, CIPD, Nursing, Engineering)",
                      ],
                    },
                    {
                      name: "gpa",
                      label: "Class or GPA",
                      placeholder: "e.g. Second Class Upper / 3.4",
                    },
                    {
                      name: "field",
                      label: "Field of study",
                      placeholder: "Accounting, Nursing, Computer Science…",
                    },
                    {
                      name: "gradYear",
                      label: "Year graduated",
                      type: "number",
                      min: 1980,
                      max: 2026,
                    },
                    {
                      name: "workYears",
                      label: "Years of work experience",
                      type: "select",
                      options: ["None", "1–2", "3–5", "6–10", "10+"],
                    },
                  ],
                },
                {
                  label: "Destination & course",
                  hint: "Where you want to go and what you want to read.",
                  fields: [
                    {
                      name: "destination",
                      label: "Preferred destination",
                      type: "select",
                      options: destinations.map((d) => d.name).concat(["Not sure — advise me"]),
                    },
                    { name: "course", label: "Target course", placeholder: "MSc Public Health" },
                    {
                      name: "intake",
                      label: "Target intake",
                      type: "select",
                      options: ["Next available", "January", "May", "September", "No preference"],
                    },
                    {
                      name: "others",
                      label: "Also considering",
                      type: "select",
                      required: false,
                      options: destinations.map((d) => d.name),
                    },
                    {
                      name: "why",
                      label: "Why this course (1–2 sentences)",
                      type: "textarea",
                      full: true,
                      placeholder:
                        "Study plans are the first thing a visa officer reads — we help you make it coherent.",
                    },
                  ],
                },
                {
                  label: "Money & documents",
                  hint: "Funding readiness is where most applications fail.",
                  fields: [
                    {
                      name: "budgetBand",
                      label: "Total first-year budget",
                      type: "select",
                      options: [
                        "Under ₦8m",
                        "₦8m – ₦15m",
                        "₦15m – ₦25m",
                        "₦25m+",
                        "Depending on financing",
                      ],
                    },
                    {
                      name: "funding",
                      label: "Funding source",
                      type: "select",
                      options: [
                        "Self / family",
                        "Sponsor",
                        "Loan (not yet applied)",
                        "Loan approved",
                        "Scholarship applied",
                        "Employer",
                      ],
                    },
                    {
                      name: "english",
                      label: "English test",
                      type: "select",
                      options: [
                        "Not taken",
                        "Booked",
                        "IELTS taken",
                        "PTE taken",
                        "Duolingo taken",
                        "Exemption requested",
                      ],
                    },
                    {
                      name: "fundsHeld",
                      label: "How long have funds been held?",
                      type: "select",
                      options: [
                        "Under 28 days",
                        "28 days+",
                        "Split across accounts",
                        "Sponsor's account",
                        "Not yet set aside",
                      ],
                    },
                    {
                      name: "docs",
                      label: "Documents you already have",
                      type: "textarea",
                      required: false,
                      full: true,
                      placeholder:
                        "e.g. passport, transcripts, IELTS, bank statement, offer letter",
                    },
                  ],
                },
                {
                  label: "Timing & consent",
                  hint: "Last step — how and when to reach you.",
                  fields: [
                    {
                      name: "timeline",
                      label: "When do you want to travel?",
                      type: "select",
                      options: ["Within 3 months", "3–6 months", "6–12 months", "Exploring"],
                    },
                    {
                      name: "refused",
                      label: "Any previous visa refusal?",
                      type: "select",
                      options: [
                        "No",
                        "Yes — UK",
                        "Yes — USA",
                        "Yes — Schengen",
                        "Yes — Canada",
                        "Yes — other",
                        "Prefer to discuss",
                      ],
                    },
                    {
                      name: "channel",
                      label: "Preferred contact",
                      type: "select",
                      options: ["WhatsApp", "Phone call", "Email"],
                    },
                    {
                      name: "consent",
                      label: "I consent to Hague Travel storing these details to assess my profile",
                      type: "checkbox",
                      help: "We keep your details for 12 months, or until you ask us to delete them. Nothing goes to a school or embassy without your written go-ahead.",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Support + academy link */}
      <Section
        eyebrow="Before you fly"
        title="Orientation that actually helps"
        sub="Most students have the same five gaps. We close them in one two-hour session."
      >
        <Steps
          items={[
            {
              title: "Arrival week",
              detail:
                "Airport to accommodation, transit card, registration route and what to do if a bag is missing.",
            },
            {
              title: "Admin setup",
              detail:
                "Bank, tax/NI or SIN number, GP or family doctor, mobile plan, police registration where required.",
            },
            {
              title: "Money discipline",
              detail:
                "Budget for the first term, what part-time work realistically earns and its hours limit.",
            },
            {
              title: "Academic survival",
              detail:
                "Harvard/APA referencing, Turnitin, extension rules and how to use the writing centre.",
            },
          ]}
        />
        <div className="mt-8 rounded-3xl border border-border bg-secondary p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-7 w-7 shrink-0 text-primary" />
              <div>
                <p className="font-display text-xl leading-snug">
                  Want to work in this industry instead?
                </p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  The Hague Travel Academy trains the consultants and documentation officers who
                  handle files like yours — next cohort starts {new Date().getFullYear() + 1} in
                  February.
                </p>
              </div>
            </div>
            <Link
              to="/academy"
              className="shrink-0 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              See the programme
            </Link>
          </div>
        </div>
        <ComplianceNote className="mt-5" text={COMPLIANCE_NOTES.documents} />
      </Section>
    </>
  );
}
