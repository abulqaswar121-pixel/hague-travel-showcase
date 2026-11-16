import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardList,
  HandCoins,
  ShieldAlert,
  Target,
  Users,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const READINESS_QUESTIONS = [
  {
    id: "offer",
    q: "I have a job offer, admission or a named skilled pathway in mind.",
    help: "A named employer, course or occupation code changes everything that follows.",
  },
  {
    id: "qualification",
    q: "My qualification or licence is assessed or recognised in the destination.",
    help: "Credential evaluation, IELTS/OET or a professional body letter.",
  },
  {
    id: "passport",
    q: "My passport is valid for at least 12 months after the planned move.",
    help: "Most routes need 6–12 months beyond the intended stay.",
  },
  {
    id: "funds",
    q: "I can evidence funds for the first three months, or I have a sponsor.",
    help: "Bank statements, payslips or a sponsor's undertaking.",
  },
  {
    id: "family",
    q: "My partner or children are included in the plan (or not applicable).",
    help: "Dependants add fees, housing needs and school timelines.",
  },
] as const;

const CHECKLIST_ITEMS = [
  "Passport and identity documents",
  "Qualification assessment / licence recognition",
  "Employment evidence and references",
  "Police clearance certificate",
  "Medical, TB test and biometrics",
  "Housing search or short-stay booking",
  "Shipping, excess baggage or freight quote",
  "School or childcare applications",
  "Bank account, SIM and driving licence plan",
  "Airport pickup and first-week orientation",
] as const;

const ANSWERS = [
  { value: "yes", label: "Yes", score: 2 },
  { value: "partly", label: "Partly", score: 1 },
  { value: "no", label: "Not yet", score: 0 },
] as const;

function RelocationPlanner() {
  const [answers, setAnswers] = useState<Record<string, "yes" | "partly" | "no">>({});
  const [checked, setChecked] = useState<string[]>([]);

  const answered = READINESS_QUESTIONS.filter((question) => answers[question.id]).length;
  const score = READINESS_QUESTIONS.reduce(
    (total, question) =>
      total + (ANSWERS.find((a) => a.value === answers[question.id])?.score ?? 0),
    0,
  );
  const band =
    answered < 5
      ? { label: "Answer all five to see your reading", tone: "muted" as const }
      : score >= 8
        ? { label: "Strong starting position", tone: "success" as const }
        : score >= 5
          ? { label: "Some gaps to close first", tone: "gold" as const }
          : { label: "Start with a readiness consultation", tone: "danger" as const };

  const toggle = (item: string) =>
    setChecked((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item],
    );

  const percent = Math.round((checked.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <Section
      id="prepare"
      eyebrow="Before you book"
      title="Check your fit, then build the brief"
      sub="Two tools you can use without talking to anybody. Neither one is legal advice, and neither one can approve a visa."
    >
      <Tabs defaultValue="eligibility">
        <TabsList className="w-full justify-start overflow-x-auto rounded-full bg-secondary p-1 sm:w-auto">
          <TabsTrigger value="eligibility" className="gap-1.5 rounded-full text-xs sm:text-sm">
            <Target className="h-3.5 w-3.5" /> Eligibility self-check
          </TabsTrigger>
          <TabsTrigger value="checklist" className="gap-1.5 rounded-full text-xs sm:text-sm">
            <ClipboardList className="h-3.5 w-3.5" /> Service checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eligibility" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
              <div className="space-y-4">
                {READINESS_QUESTIONS.map((question, index) => (
                  <div
                    key={question.id}
                    className="border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold leading-snug">
                      <span className="mr-1.5 text-muted-foreground">{index + 1}.</span>
                      {question.q}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{question.help}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {ANSWERS.map((answer) => (
                        <button
                          key={answer.value}
                          type="button"
                          aria-pressed={answers[question.id] === answer.value}
                          onClick={() =>
                            setAnswers((current) => ({ ...current, [question.id]: answer.value }))
                          }
                          className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                            answers[question.id] === answer.value
                              ? "border-transparent bg-primary text-primary-foreground"
                              : "border-input bg-card hover:bg-accent"
                          }`}
                        >
                          {answer.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div
                className={`rounded-3xl border p-5 ${
                  band.tone === "success"
                    ? "border-success/40 bg-success/10"
                    : band.tone === "gold"
                      ? "border-gold/40 bg-accent"
                      : band.tone === "danger"
                        ? "border-destructive/40 bg-destructive/8"
                        : "border-border bg-secondary"
                }`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Self-check reading
                </p>
                <p className="mt-2 font-display text-2xl leading-tight">{band.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {answered}/5 answered · {score}/10 points
                </p>
                <Progress value={(score / 10) * 100} className="mt-3 h-2" />
                <p className="mt-3 text-[11px] leading-relaxed">
                  {answered < 5
                    ? "The reading is deliberately conservative. A partial answer is still a useful brief for a consultant."
                    : score >= 8
                      ? "Bring your documents to a consultation and we can price the work, not the hope. Eligibility is still decided by the destination authority."
                      : "Most applicants with gaps can still move — they just need sequencing. The consultation tells you what to fix first."}
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <p className="font-bold">What this tool does not do</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {COMPLIANCE_NOTES.visa} It does not predict an approval, quote a fee or replace
                  legal advice. It helps you decide whether to book a readiness consultation.
                </p>
                <a
                  href="#consult"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
                >
                  Book a consultation <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-xl">Your relocation file</p>
                  <p className="text-xs text-muted-foreground">
                    {checked.length} of {CHECKLIST_ITEMS.length} items gathered
                  </p>
                </div>
                <span className="font-display text-2xl text-primary">{percent}%</span>
              </div>
              <Progress value={percent} className="mt-3 h-2" />
              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {CHECKLIST_ITEMS.map((item) => {
                  const isChecked = checked.includes(item);
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        aria-pressed={isChecked}
                        onClick={() => toggle(item)}
                        className={`flex w-full items-start gap-2 rounded-xl border p-2.5 text-left text-xs leading-snug transition ${
                          isChecked
                            ? "border-success/40 bg-success/8 text-foreground"
                            : "border-border bg-secondary/30 hover:border-gold/50"
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        <span className={isChecked ? "line-through opacity-70" : ""}>{item}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-3xl border border-border bg-secondary p-5">
                <p className="font-bold">How to use this</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Tick what you already hold. Anything unticked is either a document you need, or a
                  service we can price. The checklist stays in this browser — nothing is uploaded.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs">
                  {checked.length ? (
                    checked.slice(-3).map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-muted-foreground">Nothing ticked yet.</li>
                  )}
                </ul>
              </div>
              <div className="rounded-3xl border border-gold/40 bg-accent p-5">
                <p className="font-display text-lg">Send this brief to the desk</p>
                <p className="mt-1 text-xs leading-relaxed text-accent-foreground">
                  We reply with the missing items, a realistic sequence and a written fee for the
                  work — before you pay anything.
                </p>
                <a
                  href={waLink(
                    `Hello Hague Travel, my relocation checklist: ${checked.length}/${CHECKLIST_ITEMS.length} items gathered.${checked.length ? ` I still need help with: ${CHECKLIST_ITEMS.filter((item) => !checked.includes(item)).join(", ")}.` : ""}`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
                >
                  Send on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <ComplianceNote className="mt-4" text={COMPLIANCE_NOTES.partners} />
    </Section>
  );
}

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

      <RelocationPlanner />

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
