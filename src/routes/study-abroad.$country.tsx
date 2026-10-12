import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  GraduationCap,
  Landmark,
  Wallet,
} from "lucide-react";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import {
  ComplianceNote,
  FeeSplit,
  IndicativeTag,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Steps,
} from "@/components/site/Blocks";
import { getDestinationBySlug, STUDY_STEPS } from "@/data/destinations";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/study-abroad/$country")({
  loader: ({ params }) => {
    const d = getDestinationBySlug(params.country);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Destination not found | Hague Travel" },
          { name: "robots", content: "noindex" },
        ],
      };
    const title = `Study in ${loaderData.name}`;
    const description = `${loaderData.headline} Visa route: ${loaderData.visaRoute}. ${loaderData.postStudyWork}.`;
    return {
      meta: [
        { title: `${title} | Hague Travel` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Hague Travel` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: loaderData.heroImage },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CountryPage,
});

const fields: FieldDef[] = [
  ...contactFields,
  {
    name: "level",
    label: "Current level",
    type: "select",
    options: ["WAEC / A-levels", "HND / Diploma", "Bachelor's", "Master's", "Professional"],
  },
  { name: "course", label: "Course you want to read", placeholder: "MSc Data Science" },
  {
    name: "intake",
    label: "Target intake",
    type: "select",
    options: ["Next available", "January", "May", "September", "No preference"],
  },
  {
    name: "budgetBand",
    label: "First-year budget",
    type: "select",
    options: ["Under ₦8m", "₦8m – ₦15m", "₦15m – ₦25m", "₦25m+", "Need financing guidance"],
  },
  {
    name: "notes",
    label: "Anything specific to your case",
    type: "textarea",
    required: false,
    full: true,
    placeholder: "Previous refusals, dependants, scholarships applied for, deadline pressure…",
  },
  {
    name: "consent",
    label: "I understand visa approval rests with the authority",
    type: "checkbox",
    help: "We prepare and check your file. We do not decide the outcome and never claim to.",
  },
];

function CountryPage() {
  const d = Route.useLoaderData();

  return (
    <>
      <PageHero
        image={d.heroImage}
        eyebrow={`Study abroad · ${d.flag} ${d.name}`}
        title={
          <>
            Study in <em className="text-gold">{d.name}</em>, with the paperwork handled properly.
          </>
        }
        sub={d.headline}
        size="md"
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">{d.visaRoute.split(" — ")[0]}</Pill>
          <Pill>{d.intakes.join(" · ")}</Pill>
          <Pill>Subject to partner coverage</Pill>
        </div>
      </PageHero>

      <Section eyebrow="Snapshot" title="What this destination looks like in practice" size="sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Wallet, l: "Tuition", v: d.tuitionRange },
            { i: Landmark, l: "Visa route", v: d.visaRoute },
            { i: Building2, l: "Post-study work", v: d.postStudyWork },
            { i: CalendarClock, l: "Intakes", v: d.intakes.join(", ") },
          ].map((x) => (
            <div key={x.l} className="rounded-2xl border border-border bg-card p-5">
              <x.i className="h-5 w-5 text-gold" />
              <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {x.l}
              </p>
              <p className="mt-1 text-sm font-semibold leading-relaxed">{x.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Notice tone="sea" title="Partner coverage">
            {d.partnerNote} {COMPLIANCE_NOTES.fees}
          </Notice>
        </div>
      </Section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-5 lg:grid-cols-[1.5fr_1fr] lg:py-14">
        <div className="min-w-0 space-y-10">
          <Reveal>
            <section>
              <h2 className="text-2xl sm:text-3xl">Why students pick {d.name}</h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {d.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2.5 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl sm:text-3xl">Institutions we place into</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A fair list for a profile like yours. We check the entry rules and fees again before
                you apply.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.topInstitutions.map((u) => (
                  <span
                    key={u}
                    className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium"
                  >
                    {u}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                Popular courses
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {d.popularCourses.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl sm:text-3xl">Your document checklist</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tick each one as you collect it. The format matters as much as the paper itself.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {d.documents.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-3.5 text-sm leading-snug"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border-2 border-primary/50" />
                    {doc}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl sm:text-3xl">Timeline to departure</h2>
              <ol className="mt-5 space-y-3 border-l-2 border-gold/40 pl-5">
                {d.timeline.map((t) => (
                  <li key={t.week} className="relative">
                    <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
                    <p className="text-[11px] font-black uppercase tracking-widest text-gold">
                      {t.week}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed">{t.task}</p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl sm:text-3xl">Fees, separated</h2>
              <div className="mt-5">
                <FeeSplit
                  government={d.costBreakdown
                    .filter((c) => c.owner === "government")
                    .map((c) => ({ label: c.label, amount: c.amount }))}
                  agency={d.costBreakdown
                    .filter((c) => c.owner === "agency")
                    .map((c) => ({ label: c.label, amount: c.amount }))}
                  thirdParty={d.costBreakdown
                    .filter((c) => c.owner !== "government" && c.owner !== "agency")
                    .map((c) => ({ label: c.label, amount: c.amount }))}
                />
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl sm:text-3xl">{d.name} FAQs</h2>
              <div className="mt-4 space-y-3">
                {d.faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-semibold leading-snug">{f.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        {/* rail */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-5">
            <p className="eyebrow">Free assessment</p>
            <h3 className="mt-2 font-display text-xl leading-snug">
              Tell us your profile, we'll tell you the truth
            </h3>
            <div className="mt-3">
              <IndicativeTag />
            </div>
            <div className="mt-4">
              <EnquiryForm
                compact
                title={`${d.name} enquiry`}
                cta="Request my assessment"
                refPrefix="HTS"
                fields={fields}
                successTitle="Assessment requested"
                successLines={[
                  "We review your transcripts, budget and timeline against current standards.",
                  "You receive a written response with realistic options and total cost.",
                  "Only then do you decide whether to open an admissions file.",
                ]}
                note={COMPLIANCE_NOTES.visa}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-secondary p-5">
            <p className="flex items-center gap-2 font-bold">
              <GraduationCap className="h-4 w-4 text-primary" /> Also needed for {d.name}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-sm">
              <li>
                ·{" "}
                <Link to="/hotels" className="font-semibold text-primary underline">
                  Student & long-stay housing
                </Link>
              </li>
              <li>
                ·{" "}
                <Link to="/insurance" className="font-semibold text-primary underline">
                  Student travel cover
                </Link>
              </li>
              <li>
                ·{" "}
                <Link to="/flights" className="font-semibold text-primary underline">
                  Student flight fares
                </Link>
              </li>
              <li>
                ·{" "}
                <Link to="/passports" className="font-semibold text-primary underline">
                  Passport validity check
                </Link>
              </li>
              <li>
                ·{" "}
                <Link
                  to="/relocation"
                  hash="financing"
                  className="font-semibold text-primary underline"
                >
                  Education financing referrals
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <p className="font-bold">The eight-step journey</p>
            <ol className="mt-3 space-y-2 text-sm">
              {STUDY_STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{s.title}</span>
                </li>
              ))}
            </ol>
            <Link
              to="/study-abroad"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
            >
              Full overview <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>

      <Section
        tone="muted"
        eyebrow="How we work"
        title="Support that continues after the visa stamp"
        size="sm"
      >
        <Steps
          items={[
            {
              title: "Assigned consultant",
              detail: "One named person owns your file from assessment to arrival day.",
            },
            {
              title: "Live tracker",
              detail: "Every application has visible status steps you can check any time.",
            },
            {
              title: "Document vault",
              detail: "Encrypted uploads, restricted access, and a purge date you control.",
            },
            {
              title: "Arrival support",
              detail: "Housing, banking, SIM and orientation — not just a ticket.",
            },
          ]}
        />
        <ComplianceNote className="mt-6" text={COMPLIANCE_NOTES.documents} />
      </Section>
    </>
  );
}
