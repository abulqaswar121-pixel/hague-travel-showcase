import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, HandCoins, ShieldAlert, Users } from "lucide-react";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import {
  ComplianceNote,
  FeatureGrid,
  FeeSplit,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Stepper,
} from "@/components/site/Blocks";
import {
  FINANCING_DISCLOSURE,
  RELOCATION_SERVICES,
  RELOCATION_WORKFLOW,
  SERVICE_IMAGES,
} from "@/data/services";
import { getCountriesCoveredForWork, getRedFlags } from "@/data/relocation";
import { COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/relocation")({
  head: pageMeta(
    "Work Visas, Overseas Jobs & Professional Relocation",
    "Permit guidance, checked overseas roles, family planning, housing, bags, airport pickup, settling in, and open referrals to finance partners.",
  ),
  component: Relocation,
});

const fields: FieldDef[] = [
  ...contactFields,
  {
    name: "pathway",
    label: "Pathway you're considering",
    type: "select",
    options: getCountriesCoveredForWork().map((p) => p.label),
  },
  {
    name: "destination",
    label: "Destination",
    type: "select",
    options: [
      "United Kingdom",
      "Canada",
      "USA",
      "Ireland",
      "Germany",
      "Netherlands",
      "UAE",
      "Saudi Arabia",
      "Australia",
      "Not sure — advise me",
    ],
  },
  {
    name: "occupation",
    label: "Occupation / trade",
    placeholder: "Registered nurse, backend engineer, HSE officer…",
  },
  {
    name: "years",
    label: "Years of experience",
    type: "select",
    options: ["0–2", "3–5", "6–10", "10+"],
  },
  {
    name: "family",
    label: "Who is moving?",
    type: "select",
    options: ["Just me", "Me + spouse", "Family with children", "Family + dependant parents"],
  },
  { name: "timing", label: "Target move date", type: "month" },
  {
    name: "notes",
    label: "Context that matters",
    type: "textarea",
    required: false,
    full: true,
    placeholder:
      "Sponsorship status, previous applications, licences, property to sell, schools for the children…",
  },
  {
    name: "consent",
    label: "I understand no visa, job or permit outcome can be guaranteed",
    type: "checkbox",
    help: COMPLIANCE_NOTES.visa,
  },
];

function Relocation() {
  return (
    <>
      <PageHero
        image={SERVICE_IMAGES.relocation}
        eyebrow="Work & Relocation"
        title={
          <>
            Moving countries is a <em className="text-gold">project</em>, not a ticket.
          </>
        }
        sub="Check if you are ready, pick a pathway, sort your papers, plan for the family, find a home, move your things and settle in — with a consultant who has moved before."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Routes before promises</Pill>
          <Pill tone="gold">Employer verification</Pill>
          <Pill>Family moves welcome</Pill>
        </div>
      </PageHero>

      {/* Safeguard band */}
      <div className="border-b border-border bg-accent">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-5 md:flex-row md:items-center">
          <ShieldAlert className="h-6 w-6 shrink-0 text-accent-foreground" />
          <p className="text-sm leading-relaxed text-accent-foreground">
            <span className="font-black uppercase tracking-wider">Safeguard:</span> We never promise
            a visa, a job or a sponsor. We check every employer and partner, state our fees in
            writing, and follow the work and immigration rules of each country.
          </p>
        </div>
      </div>

      {/* Workflow */}
      <Section
        eyebrow="The consultation workflow"
        title="Eight stages, each with a defined output"
        sub="You always know your stage, what you owe and what comes next."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RELOCATION_WORKFLOW.map((w, i) => (
            <Reveal key={w.title} delay={i * 50}>
              <div className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-5">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ink font-display text-sm text-ink-foreground">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold leading-snug">{w.title}</p>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {w.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services + fees */}
      <Section
        tone="muted"
        eyebrow="Services & pricing"
        title="What you can buy, and what it costs"
        sub="Each line is work we do, not a promise about the result. Government and partner costs stay on their own lines."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RELOCATION_SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 45}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold leading-snug">{s.title}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.detail}
                </p>
                <p className="mt-4 border-t border-border pt-3 text-sm font-bold text-primary">
                  {s.price}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <FeeSplit
            government={[
              { label: "Work permit / visa application", amount: "At published rate" },
              { label: "Residence registration or IRP", amount: "At published rate" },
              { label: "Biometrics appointment", amount: "Centre charge" },
            ]}
            agency={[
              { label: "Pathway consultation (60 min)", amount: "₦85,000" },
              { label: "Full relocation programme", amount: "₦650,000 – ₦1,400,000" },
              { label: "Settlement orientation pack", amount: "₦120,000" },
            ]}
            thirdParty={[
              { label: "Credential evaluation", amount: "USD 160 – 300" },
              { label: "Translations & attestation", amount: "Per provider" },
              { label: "Freight / excess baggage", amount: "Quoted per volume" },
            ]}
          />
        </div>
      </Section>

      {/* Overseas jobs pointer */}
      <Section
        eyebrow="Overseas opportunities"
        title="Job listings we check before you see them"
        sub="Every listing must name the employer, country, duties, what they want, the real salary if there is one, the permit rules, the deadline and where the job came from."
      >
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6">
              <FeatureGrid
                items={[
                  "Employer & recruitment-partner verification",
                  "Employment-offer authenticity checks",
                  "CV rewrite to destination format",
                  "Interview preparation with a consultant",
                  "Credential and licence guidance",
                  "Country-specific eligibility review",
                  "Relocation, flights, insurance and housing",
                  "Red-flag screening (fees to applicants)",
                ]}
              />
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  to="/jobs"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                >
                  Browse role categories
                </Link>
                <a
                  href={waLink(waMessages.relocation)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-input px-5 py-3 text-sm font-bold"
                >
                  Ask about a specific offer
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="h-full rounded-3xl border border-destructive/40 bg-destructive/8 p-6">
              <p className="flex items-center gap-2 font-bold">
                <AlertTriangle className="h-5 w-5 text-destructive" /> Before you pay anyone
              </p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed">
                {getRedFlags().map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Financing */}
      <section
        id="financing"
        className="scroll-mt-24 bg-ink-gradient py-14 text-ink-foreground lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Education financing</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              {FINANCING_DISCLOSURE.heading}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-foreground/80">
              {FINANCING_DISCLOSURE.body}
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl glass p-5">
              <HandCoins className="h-6 w-6 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed">{FINANCING_DISCLOSURE.commissions}</p>
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl glass p-5">
              <Users className="h-6 w-6 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed">
                {COMPLIANCE_NOTES.financing} If you need a lender, we introduce you; if you need a
                scholarship strategy, we build it with you. We do not hold student funds and we do
                not offer credit.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-elegant">
            <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              The referral workflow
            </p>
            <ol className="mt-4 space-y-3">
              {FINANCING_DISCLOSURE.steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
            <Notice
              tone="sea"
              title="Nothing is approved until the lender says so"
              className="mt-5"
            >
              We help you apply well and follow the result. We never call financing approved until
              the lender says so in writing.
            </Notice>
          </div>
        </div>
      </section>

      {/* Family + settlement */}
      <Section eyebrow="Settlement" title="The first 30 days, planned before you fly" size="sm">
        <Stepper
          items={[
            {
              title: "Landing day",
              detail:
                "Driver waiting, SIM at arrivals, transit card and the address that actually works.",
            },
            {
              title: "Week one",
              detail: "Bank appointment, tax or NI number, GP or family doctor, school enrolment.",
            },
            {
              title: "Month one",
              detail:
                "Utility setup, driving-licence exchange, insurance quotes, community introductions.",
            },
            {
              title: "Ongoing",
              detail: "A consultant on WhatsApp for the awkward questions nobody answers for free.",
            },
          ]}
        />
        <ComplianceNote className="mt-6" text={COMPLIANCE_NOTES.partners} />
      </Section>

      {/* Enquiry */}
      <section id="consult" className="scroll-mt-24 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-5">
          <EnquiryForm
            title="Request a relocation consultation"
            description="60 minutes on your profile: real pathways, the true cost, and what to fix first. You get a written summary after."
            cta="Book my consultation"
            refPrefix="HTR"
            fields={fields}
            note="The consult fee is quoted when you book. It is separate from any government or partner charge."
            successTitle="Consultation requested"
            successLines={[
              "We confirm a slot inside desk hours and send a short document checklist.",
              "You get a written summary of pathways, costs and next actions after the call.",
              "Nothing is submitted to an authority without your written go-ahead.",
            ]}
          />
        </div>
      </section>
    </>
  );
}
