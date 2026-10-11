import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Award,
  Banknote,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  ShieldAlert,
  Users,
  Video,
} from "lucide-react";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import {
  ComplianceNote,
  FeeSplit,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Steps,
} from "@/components/site/Blocks";
import { CohortCard } from "@/components/site/Cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ACADEMY_DELIVERY,
  ACADEMY_FAQS,
  ACADEMY_TRAINERS,
  CURRICULUM,
  getCohortById,
  getCohorts,
} from "@/data/academy";
import { images, COMPLIANCE_NOTES, BRAND } from "@/data/site";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/academy")({
  head: pageMeta(
    "Hague Travel Academy — Virtual Travel Consulting Training",
    "Quarterly online training for people who want to work in travel: live classes, recordings, assignments, booking practice and a final test.",
  ),
  component: Academy,
});

const PAYMENT_PLANES = [
  { id: "full", label: "Pay in full", note: "One payment · 5% discount applied", factor: 0.95 },
  {
    id: "two",
    label: "Two instalments",
    note: "50% at registration, 50% before Module 5",
    factor: 1,
  },
  {
    id: "three",
    label: "Three instalments",
    note: "34% / 33% / 33% across the cohort",
    factor: 1.06,
  },
] as const;

function Academy() {
  const cohorts = getCohorts();
  const { money } = useCurrency();
  const [selected, setSelected] = useState<string>("cohort-02");
  const [plane, setPlane] = useState<(typeof PAYMENT_PLANES)[number]["id"]>("full");
  const [stage, setStage] = useState<"form" | "payment" | "done">("form");
  const [payer, setPayer] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  });

  const cohort = getCohortById(selected) ?? cohorts[0]!;
  const plan = PAYMENT_PLANES.find((p) => p.id === plane)!;
  const total = useMemo(
    () => Math.round((cohort.fee * plan.factor) / 500) * 500,
    [cohort.fee, plan.factor],
  );

  const enrolFields: FieldDef[] = [
    ...contactFields.map((f) => (f.name === "email" || f.name === "phone" ? { ...f } : f)),
    {
      name: "cohort",
      label: "Cohort",
      type: "select",
      options: cohorts.map((c) => `${c.cohort} — ${c.month} ${c.year}`),
      defaultValue: `${cohort.cohort} — ${cohort.month} ${cohort.year}`,
    },
    {
      name: "background",
      label: "Your background",
      type: "select",
      options: [
        "Student / graduate",
        "Working in travel",
        "Career switcher",
        "Running an agency",
        "Corporate / HR",
        "Other",
      ],
    },
    {
      name: "goal",
      label: "What do you want from this?",
      type: "select",
      options: [
        "Remote travel consultant role",
        "Start my own agency",
        "Move into reservations",
        "Add travel to my services",
        "Employer requirement",
      ],
    },
    {
      name: "tools",
      label: "Do you have a laptop and stable data?",
      type: "select",
      options: ["Yes, both", "Laptop yes, data shaky", "Phone only — advise me"],
    },
    {
      name: "notes",
      label: "Anything else (optional)",
      type: "textarea",
      required: false,
      full: true,
      placeholder: "Questions about the assessment, time zones, payment plan needs…",
    },
    {
      name: "terms",
      label: "I have read the enrolment terms and refund window",
      type: "checkbox",
      help: "Full refund to 7 days after class one; 50% to the end of Module 2; none afterwards.",
    },
    {
      name: "cert",
      label: "I understand the certificate is not IATA or government accreditation",
      type: "checkbox",
      help: COMPLIANCE_NOTES.academy,
    },
  ];

  return (
    <>
      <PageHero
        image={images.academy}
        eyebrow="Hague Travel Academy"
        title={
          <>
            Learn the trade from people who <em className="text-gold">run it</em>.
          </>
        }
        sub="A paid online programme for people who want to work in travel: live classes, recordings, assignments, real booking practice and a final test, every quarter."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">4 cohorts a year</Pill>
          <Pill tone="gold">Small groups (max 30)</Pill>
          <Pill>Recordings for 12 months</Pill>
        </div>
      </PageHero>

      {/* Delivery */}
      <Section eyebrow="How it's delivered" title="Five components, one deadline-driven rhythm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ACADEMY_DELIVERY.map((d, i) => (
            <Reveal key={d.title} delay={i * 50}>
              <div className="lift h-full rounded-3xl border border-border bg-card p-5">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ink text-ink-foreground">
                  {i === 0 ? (
                    <Video className="h-4 w-4" />
                  ) : i === 4 ? (
                    <Award className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </span>
                <p className="mt-4 font-semibold leading-snug">{d.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { v: "45", l: "taught hours per cohort" },
            { v: "≤30", l: "students per cohort" },
            { v: "60%", l: "pass mark on the final assessment" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-border bg-secondary p-5 text-center"
            >
              <p className="font-display text-3xl text-primary">{s.v}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Cohorts */}
      <section
        id="cohorts"
        className="scroll-mt-24 bg-ink-gradient py-14 text-ink-foreground lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <p className="eyebrow">Annual cohort calendar</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            February, May, August and November — every three months
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-foreground/75">
            Registration closes one week before class starts. We cap seats so the practical sessions
            stay real.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cohorts.map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <div className="text-card-foreground">
                  <CohortCard
                    c={c}
                    selected={selected === c.id}
                    onSelect={(id) => {
                      setSelected(id);
                      setStage("form");
                      document
                        .getElementById("enrol")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <Section
        id="curriculum"
        eyebrow="Curriculum"
        title="Eight modules, in the order the job is actually done"
        size="sm"
        tone="muted"
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {CURRICULUM.map((m, i) => (
            <Reveal key={m.number} delay={i * 40}>
              <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gold-gradient font-display text-base font-bold text-gold-foreground">
                  {m.number}
                </span>
                <div>
                  <p className="font-semibold leading-snug">{m.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {m.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Pill>{m.lessons} lessons</Pill>
                    <p className="text-[11px] font-semibold text-primary">Outcome: {m.outcome}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Notice className="mt-6" tone="sea" title="Tools and environments">
          If a module needs licensed GDS access or special booking software, we give you a training
          environment or a demo account.
        </Notice>
      </Section>

      {/* Trainers + certification */}
      <Section tone="muted" eyebrow="Who teaches" title="Practitioners, not presenters">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {ACADEMY_TRAINERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 50}>
                <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink font-display text-base text-ink-foreground">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-bold leading-snug">{t.name}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold">
                      {t.role}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div
              id="certification"
              className="scroll-mt-24 rounded-3xl border border-gold/50 bg-accent p-6"
            >
              <Award className="h-7 w-7 text-accent-foreground" />
              <p className="mt-3 font-display text-2xl leading-snug">
                Certification, described accurately
              </p>
              <p className="mt-3 text-sm leading-relaxed text-accent-foreground">
                When you pass the final test, you get a Hague Travel Academy Certificate of
                Completion that lists your modules, the work you did and the date. Read the line
                above it first: it is an academy certificate, nothing more.
              </p>
              <div className="mt-4 rounded-2xl bg-card/70 p-4">
                <p className="flex items-start gap-2 text-sm font-bold leading-relaxed">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  {COMPLIANCE_NOTES.academy}
                </p>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-accent-foreground">
                {[
                  "Digital certificate with a verifiable ID",
                  "PDF transcript of modules and grades",
                  "CV template we approve",
                  "LinkedIn guidance for the travel industry",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Enrol flow */}
      <section id="enrol" className="scroll-mt-24 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-5">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="eyebrow">Enrolment</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                Three steps: details, payment summary, confirmation
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This is a demo. No card is charged and no seat is held — but the flow is exactly
                what the live programme will use, including the honest certificate wording.
              </p>
              <div className="mt-6 rounded-3xl border border-border bg-secondary p-5">
                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  Selected cohort
                </p>
                <p className="mt-2 font-display text-2xl">
                  {cohort.cohort} · {cohort.month} {cohort.year}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{cohort.focus}</p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3 border-b border-border pb-1.5">
                    <dt className="text-muted-foreground">Runs</dt>
                    <dd className="font-semibold">
                      {cohort.startDate} → {cohort.endDate}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border pb-1.5">
                    <dt className="text-muted-foreground">Classes</dt>
                    <dd className="font-semibold text-right">{cohort.classes}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border pb-1.5">
                    <dt className="text-muted-foreground">Seats left</dt>
                    <dd className="font-semibold">
                      {cohort.seats - cohort.seatsTaken} of {cohort.seats}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Registration closes</dt>
                    <dd className="font-semibold">{cohort.registrationDeadline}</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-5">
                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  Payment plan
                </p>
                <div className="mt-2.5 space-y-2">
                  {PAYMENT_PLANES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlane(p.id)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition",
                        plane === p.id
                          ? "border-primary bg-secondary ring-2 ring-primary/25"
                          : "border-border bg-card hover:border-gold/60",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-bold">{p.label}</span>
                        <span className="block text-xs text-muted-foreground">{p.note}</span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block font-display text-lg">
                          {money(Math.round((cohort.fee * p.factor) / 500) * 500)}
                        </span>
                        {p.id === "full" ? (
                          <span className="block text-[11px] font-bold text-success">
                            −{money(Math.round(cohort.fee * 0.05))}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {cohort.feeNote}. Instalments must be cleared before the final assessment.
                </p>
              </div>
              <div className="mt-6">
                <FeeSplit
                  agency={[
                    { label: "Academy tuition (all 8 modules)", amount: formatPrice(total, "NGN") },
                    { label: "Certificate & transcript", amount: "Included" },
                  ]}
                  thirdParty={[
                    { label: "Data / internet", amount: "Yours to provide" },
                    { label: "Optional GDS practice licence", amount: "₦0 in cohort" },
                  ]}
                />
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                {(["form", "payment", "done"] as const).map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-black transition",
                        stage === s
                          ? "bg-primary text-primary-foreground"
                          : ["form", "payment", "done"].indexOf(stage) >= i
                            ? "bg-success text-success-foreground"
                            : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {["form", "payment", "done"].indexOf(stage) > i ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                      {s === "form" ? "Details" : s === "payment" ? "Payment" : "Done"}
                    </span>
                    {i < 2 ? <span className="h-px flex-1 bg-border" /> : null}
                  </div>
                ))}
              </div>

              {stage === "form" ? (
                <EnquiryForm
                  title={`Enrol in ${cohort.cohort}`}
                  description="Send your details and we confirm your seat, send the enrolment terms and share the payment summary."
                  cta="Continue to payment summary"
                  refPrefix="HTA"
                  fields={enrolFields}
                  note="No payment is taken by this form. The next screen is a mock payment summary only."
                  onSubmit={(values) => {
                    setPayer({
                      name: String(values["name"] ?? ""),
                      email: String(values["email"] ?? ""),
                      phone: String(values["phone"] ?? ""),
                    });
                    setStage("payment");
                  }}
                />
              ) : null}

              {stage === "payment" ? (
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">Mock payment summary</p>
                      <h3 className="mt-2 text-2xl leading-snug">
                        {cohort.cohort} — {cohort.month} {cohort.year}
                      </h3>
                    </div>
                    <CreditCard className="h-7 w-7 shrink-0 text-gold" />
                  </div>
                  <dl className="mt-6 space-y-2.5 text-sm">
                    <Row label="Tuition (8 modules)" value={money(cohort.fee)} />
                    <Row
                      label={`Plan: ${plan.label}`}
                      value={
                        plan.factor < 1
                          ? `− ${money(Math.round(cohort.fee * (1 - plan.factor)))}`
                          : plan.factor > 1
                            ? `+ ${money(Math.round(cohort.fee * (plan.factor - 1)))}`
                            : "No adjustment"
                      }
                    />
                    <Row label="Certificate & transcript" value="Included" />
                    <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
                      <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                        Total due
                      </span>
                      <span className="font-display text-3xl text-primary">{money(total)}</span>
                    </div>
                    {plane !== "full" ? (
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Instalment 1 of {money(Math.round(total / (plane === "two" ? 2 : 3)))} is
                        due at registration; the remainder before Module 5 / Module 7.
                      </p>
                    ) : null}
                  </dl>
                  <div className="mt-5 rounded-2xl bg-secondary p-4 text-xs leading-relaxed">
                    <p className="font-bold">Student</p>
                    <p className="mt-1 text-muted-foreground">
                      {payer.name || "—"} · {payer.email || "—"} · {payer.phone || "—"}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setStage("done");
                      }}
                      className="flex-1 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105"
                    >
                      Confirm mock payment
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage("form")}
                      className="rounded-full border border-input px-5 py-3.5 text-sm font-bold transition hover:bg-accent"
                    >
                      Back
                    </button>
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
                    <Banknote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Preview only — no gateway, no card details, no money moves. Later this becomes a
                    Paystack or Flutterwave checkout with receipts, invoices and refunds.
                  </p>
                </div>
              ) : null}

              {stage === "done" ? (
                <div
                  className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft"
                  role="status"
                >
                  <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
                  <h3 className="mt-4 text-3xl">You're in — seat held for 48 hours</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Welcome to {cohort.cohort}, {payer.name || "student"}. In the live system you
                    would now receive your receipt, class calendar, Zoom links, the reading pack for
                    Module 1 and your cohort WhatsApp group invite.
                  </p>
                  <div className="mx-auto mt-6 grid max-w-md gap-2 text-left">
                    {[
                      "Confirmation email with payment summary and receipt",
                      "Class calendar and joining links for the full cohort",
                      "Module 1 pre-reading and software checklist",
                      "Assignment portal access opened the day classes start",
                      "Certificate issued after the final assessment",
                    ].map((x) => (
                      <p key={x} className="flex gap-2.5 rounded-xl bg-secondary p-3 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        {x}
                      </p>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
                    <Link
                      to="/jobs"
                      className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                    >
                      See the careers it leads to
                    </Link>
                    <button
                      type="button"
                      onClick={() => setStage("form")}
                      className="rounded-full border border-input px-5 py-3 text-sm font-bold transition hover:bg-accent"
                    >
                      Start another enrolment
                    </button>
                  </div>
                  <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
                    Demo confirmation — no payment was processed and no place has been booked.{" "}
                    {COMPLIANCE_NOTES.academy}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section tone="muted" eyebrow="Academy FAQs" title="What people ask before they pay">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl border border-border bg-card px-5"
          >
            {ACADEMY_FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-[15px] font-semibold leading-snug">
                  <span>
                    {f.q}{" "}
                    <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 align-middle text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                      {f.topic}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="space-y-3">
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 font-bold">
                <Users className="h-4 w-4 text-primary" /> Who this suits
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>· Career switchers who want a remote-capable skill</li>
                <li>· Agency staff who need real booking discipline</li>
                <li>· Entrepreneurs starting a travel business</li>
                <li>· Graduates targeting TMC and airline roles</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 font-bold">
                <CalendarClock className="h-4 w-4 text-primary" /> Next intake
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cohort.cohort} starts {cohort.startDate}. Registration closes{" "}
                {cohort.registrationDeadline}. Fee {money(cohort.fee)} with instalments available.
              </p>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("enrol")?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-4 w-full rounded-full bg-gold-gradient py-3 text-sm font-bold text-gold-foreground shadow-gold"
              >
                Enrol now
              </button>
            </div>
            <Notice title="Placement is not promised">
              {BRAND.name} Academy prepares you and introduces you to verified partners. We never
              promise a job or an income, and we never charge for access to legitimate listings.
            </Notice>
          </div>
        </div>
        <ComplianceNote
          className="mt-6"
          text="Refunds: full up to 7 days after class starts, 50% until the end of Module 2, nothing after that."
        />
      </Section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
