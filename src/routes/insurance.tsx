import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Shield, ShieldCheck, Umbrella } from "lucide-react";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import {
  ComplianceNote,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Steps,
} from "@/components/site/Blocks";
import { INSURANCE_PRODUCTS, SERVICE_IMAGES } from "@/data/services";
import { COMPLIANCE_NOTES } from "@/data/site";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/insurance")({
  head: pageMeta(
    "Travel Insurance Quotes",
    "Compare single-trip, annual, medical, cancellation, baggage and student cover from verified partners. The insurer underwrites the policy and decides claims.",
  ),
  component: Insurance,
});

const TRIP_LENGTHS = [3, 7, 10, 14, 21, 30] as const;

const fields: FieldDef[] = [
  ...contactFields,
  {
    name: "product",
    label: "Cover type",
    type: "select",
    options: INSURANCE_PRODUCTS.map((p) => p.name),
  },
  {
    name: "destinations",
    label: "Countries visited",
    placeholder: "Nigeria → UK, then Schengen for 4 days",
    full: true,
  },
  {
    name: "travellers",
    label: "Number of travellers",
    type: "select",
    options: ["1", "2", "3–4", "5–9", "10+ (group)"],
  },
  {
    name: "ages",
    label: "Age range",
    type: "select",
    options: ["0–17", "18–35", "36–55", "56–65", "65+", "Mixed"],
  },
  {
    name: "preexisting",
    label: "Pre-existing medical conditions?",
    type: "select",
    options: ["None", "Yes — declared", "Yes — need to check", "Prefer to discuss"],
  },
  {
    name: "value",
    label: "Trip value to cover",
    type: "number",
    min: 50000,
    max: 100000000,
    help: "Total non-refundable spend you want protected.",
  },
  {
    name: "notes",
    label: "Activities & context",
    type: "textarea",
    required: false,
    full: true,
    placeholder: "Scuba, skiing, working abroad, pregnancy, equipment carried…",
  },
  {
    name: "consent",
    label: "I understand the insurer, not Hague Travel, underwrites and decides claims",
    type: "checkbox",
    help: "We help you declare accurately and file properly. That is the difference between a paid claim and a rejected one.",
  },
];

function Insurance() {
  const { money } = useCurrency();
  const [type, setType] = useState<string>("Single-trip");
  const [nights, setNights] = useState<number>(7);
  const [age, setAge] = useState<number>(34);

  const quote = useMemo(() => {
    const base = INSURANCE_PRODUCTS.find((p) => p.type === type) ?? INSURANCE_PRODUCTS[0]!;
    const dayFactor = type === "Annual multi-trip" ? 1 : Math.max(0.6, nights / 10);
    const ageFactor = age < 25 ? 0.85 : age <= 45 ? 1 : age <= 60 ? 1.35 : 1.9;
    const premium = Math.round((base.from * dayFactor * ageFactor) / 500) * 500;
    return { base, premium };
  }, [type, nights, age]);

  return (
    <>
      <PageHero
        image={SERVICE_IMAGES.city}
        eyebrow="Travel Insurance"
        title={
          <>
            Cover you can actually <em className="text-gold">claim on</em>.
          </>
        }
        sub="We compare policies from verified partners, show you the cover and the exclusions before you buy, and help you claim if something goes wrong."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Partner-underwritten</Pill>
          <Pill>Policy wording shown first</Pill>
          <Pill>Student & group cover</Pill>
        </div>
      </PageHero>

      <Section
        eyebrow="Quote journey"
        title="Build your quote in three steps"
        sub="A demo calculator on guide prices. The real price comes from the insurer after you send your details."
      >
        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                1 · Type of cover
              </p>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
                {INSURANCE_PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setType(p.type)}
                    className={cn(
                      "rounded-2xl border p-3.5 text-left transition",
                      type === p.type
                        ? "border-primary bg-secondary ring-2 ring-primary/25"
                        : "border-border bg-card hover:border-gold/60",
                    )}
                  >
                    <p className="text-sm font-bold leading-snug">{p.name}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{p.limits}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  2 · Trip length
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {TRIP_LENGTHS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNights(n)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-bold transition",
                        nights === n
                          ? "border-transparent bg-primary text-primary-foreground"
                          : "border-input bg-card hover:bg-accent",
                      )}
                    >
                      {n} nights
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Annual multi-trip covers every trip in 12 months — length stops mattering.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  3 · Age of oldest traveller
                </p>
                <div className="mt-2.5">
                  <input
                    type="range"
                    min={5}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-[var(--color-primary)]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                    <span>5</span>
                    <span className="text-primary">{age} years old</span>
                    <span>80</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                    Indicative premium
                  </p>
                  <p className="mt-1 font-display text-4xl text-primary">{money(quote.premium)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {quote.base.name} · {quote.base.scope}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Pill>Excess {quote.base.excess}</Pill>
                  <IndicativePremium />
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    What it covers
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {quote.base.cover.map((c) => (
                      <li key={c} className="flex gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Known exclusions
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {quote.base.exclusions.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-destructive" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Limits: {quote.base.limits}. Insurer: {quote.base.insurer}. Full policy wording is
                shared and confirmed before purchase — read the exclusions section, it is where
                claims die.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              id="quote"
              className="scroll-mt-24 rounded-3xl border border-border bg-secondary p-5"
            >
              <p className="flex items-center gap-2 font-bold">
                <Shield className="h-4 w-4 text-primary" /> Request a bound quote
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Send your details. We ask the insurer for a formal quote with the real policy words,
                so you never buy from a summary.
              </p>
              <div className="mt-4">
                <EnquiryForm
                  compact
                  title="Insurance enquiry"
                  cta="Request my policy quote"
                  refPrefix="HTI"
                  fields={fields}
                  note={COMPLIANCE_NOTES.partners}
                  successTitle="Enquiry received by the insurance desk"
                  successLines={[
                    "We obtain the formal quote and policy wording from the partner insurer.",
                    "You see limits, sub-limits, excess and exclusions before you pay anything.",
                    "On purchase, the insurer issues the certificate in your name directly.",
                  ]}
                />
              </div>
            </div>
            <Notice tone="sea" title="Who decides a claim">
              The insurer underwrites and decides claims — not Hague Travel. We help you declare
              accurately, prepare evidence and chase the adjuster. {COMPLIANCE_NOTES.partners}
            </Notice>
          </div>
        </div>
      </Section>

      {/* Product matrix */}
      <Section
        tone="muted"
        eyebrow="Products compared"
        title="Six cover types, one honest table"
        sub="This is what a verified partner usually offers. The policy document is what counts."
      >
        <div className="overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b border-border bg-secondary/70">
              <tr>
                {["Product", "Limits", "Excess", "Scope", "Indicative from"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INSURANCE_PRODUCTS.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3.5">
                    <p className="font-bold">{p.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{p.type}</p>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">{p.limits}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{p.excess}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{p.scope}</td>
                  <td className="px-4 py-3.5 font-bold tabular-nums">{money(p.from)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Student & study cover",
              d: "Policies that satisfy visa or institution requirements (OSHC in Australia, OSHS where asked, EGH in the UK) plus electronics and baggage.",
            },
            {
              t: "Business & group cover",
              d: "One schedule for up to 60 travellers, with safety reporting and one named contact if something happens.",
            },
            {
              t: "Medical & evacuation",
              d: "Treatment at the nearest adequate facility, not the nearest hospital — with 24/7 assistance coordination.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 font-bold">
                <Umbrella className="h-4 w-4 text-gold" /> {x.t}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Claims"
        title="If you need to claim, this is the order of operations"
        size="sm"
      >
        <Steps
          items={[
            {
              title: "Call the insurer first",
              detail:
                "The 24/7 assistance number on your certificate authorises treatment — go direct unless you cannot.",
            },
            {
              title: "Keep every paper",
              detail:
                "Reports, receipts, police reports, boarding passes, medical notes. No documents, no claim.",
            },
            {
              title: "Notify us in parallel",
              detail:
                "Your consultant chases the adjuster, writes the narrative and tracks deadlines for you.",
            },
            {
              title: "Escalate if stalled",
              detail:
                "Complaint to the insurer, then the relevant ombudsman or regulator — we help you file it.",
            },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            to="/contact"
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            Talk to the insurance desk
          </Link>
          <Link
            to="/extras"
            className="rounded-full border border-input bg-card px-5 py-3 text-sm font-bold"
          >
            Add-ons that reduce risk
          </Link>
        </div>
        <ComplianceNote className="mt-6" text={COMPLIANCE_NOTES.partners} />
      </Section>
    </>
  );
}

function IndicativePremium() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gold/50 bg-accent px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-accent-foreground">
      <ShieldCheck className="h-3 w-3" /> Indicative · confirmed by the insurer
    </span>
  );
}
