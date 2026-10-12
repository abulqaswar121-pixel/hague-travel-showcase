import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Building2,
  Calculator,
  Check,
  FileSpreadsheet,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import {
  ComplianceNote,
  FeatureGrid,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  StatRow,
  Steps,
} from "@/components/site/Blocks";
import { images, COMPLIANCE_NOTES, BRAND, waLink, waMessages } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/corporate")({
  head: pageMeta(
    "Corporate & Business Travel Management",
    "Managed travel for companies: negotiated fares, rules your team follows, group moves, one invoice, safety cover and a named account team.",
  ),
  component: Corporate,
});

const fields: FieldDef[] = [
  ...contactFields,
  {
    name: "company",
    label: "Company or institution",
    placeholder: "Name and RC number if you have it",
  },
  {
    name: "volume",
    label: "Annual travel volume",
    type: "select",
    options: [
      "Under 20 trips",
      "20–100 trips",
      "100–500 trips",
      "500+ trips",
      "Mostly group movements",
    ],
  },
  {
    name: "profile",
    label: "Main travel profile",
    type: "select",
    options: [
      "Executives & board",
      "Field & project teams",
      "Rotational crew",
      "Conferences & events",
      "Pilgrimage & retreat groups",
      "Student / scholarship cohorts",
    ],
  },
  {
    name: "needs",
    label: "What you need from us",
    type: "textarea",
    rows: 4,
    full: true,
    placeholder:
      "Booking only, or booking plus visas, rooms, one invoice and reports. Tell us the pain, not the wish list.",
  },
  {
    name: "billing",
    label: "Invoicing preference",
    type: "select",
    options: [
      "Prepaid per trip",
      "Monthly consolidated invoice",
      "Credit terms after onboarding",
      "Not sure yet",
    ],
  },
  {
    name: "consent",
    label: "I understand fares and inventory are quoted live by our consultants",
    type: "checkbox",
    help: "Nothing on this page is an offer we can hold without supplier confirmation.",
  },
];

function Corporate() {
  return (
    <>
      <PageHero
        image={images.corporate}
        eyebrow="Corporate & Business Travel"
        title={
          <>
            One account team for every <em className="text-gold">business trip</em>.
          </>
        }
        sub="Negotiated fares, rules your team follows, group moves, one invoice, and safety reporting — handled by consultants who answer the phone."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Named account manager</Pill>
          <Pill>24/7 traveller line</Pill>
          <Pill>Consolidated invoicing</Pill>
        </div>
      </PageHero>

      <Section
        eyebrow="Why companies switch"
        title="Travel spend leaks in the gaps between systems"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Most Nigerian companies run travel on an app, a friendly agent, a hotel's direct line
              and the executive's assistant. Each one works alone, so nobody sees the whole cost and
              nobody owns the risk.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We take the whole loop: policy, booking, visas, ground arrangements, invoices and a
              monthly report your finance team can actually close on.
            </p>
            <div className="mt-6">
              <StatRow
                items={[
                  { value: "≤ 2h", label: "Quotation turnaround" },
                  { value: "24/7", label: "Traveller support line" },
                  { value: "1", label: "Consolidated monthly invoice" },
                  { value: "9", label: "Reporting fields per trip" },
                ]}
              />
            </div>
          </div>
          <FeatureGrid
            items={[
              "Corporate rates negotiated with airlines and hotel groups on your lane mix",
              "Travel policy coded into the booking flow — class, fare cap, advance notice",
              "Visa and documentation desk for staff and dependants, with per-country checklists",
              "Group movement planning: crew rotations, conference delegations, retreats",
              "Safety reporting: who is where, and who cannot be reached",
              "Consolidated invoicing with cost-centre codes on every line",
              "Rebooking, refunds and no-show handling chased by us, not your assistant",
              "Monthly review meeting with spend, savings and leakage analysis",
            ]}
          />
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="How an account runs"
        title="Four stages from first call to steady state"
      >
        <Steps
          items={[
            {
              title: "Travel audit",
              detail:
                "Twelve months of itineraries and invoices analysed: lanes, cabins, lead times, leakage, hotel clusters, visa load.",
            },
            {
              title: "Policy & rates",
              detail:
                "We agree a written travel policy, then negotiate fares and rates against your real lane mix — not wishful volume.",
            },
            {
              title: "Onboarding",
              detail:
                "Traveller profiles, passport and visa data, preferences, approvals, invoicing codes, and a WhatsApp line for the whole company.",
            },
            {
              title: "Run & review",
              detail:
                "We book, document, monitor and rebook exceptions; monthly report and review; quarterly policy tuning as volumes shift.",
            },
          ]}
        />
        <Notice className="mt-6" tone="sea" title="What we will not claim">
          {COMPLIANCE_NOTES.indicative} Savings depend on your routes, your season and your
          suppliers. We give ranges we modelled, never made-up percentages.
        </Notice>
      </Section>

      <Section eyebrow="Service levels" title="The commitments we put in writing">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BadgeCheck,
              t: "Response",
              d: "Enquiries acknowledged in 30 minutes in-hours; quotations within 2 working hours; urgent in-trip issues on a 5-minute callback.",
            },
            {
              icon: Users,
              t: "People",
              d: "A named account manager and a named deputy. You never explain your policy twice, and no ticket queue sits between us.",
            },
            {
              icon: FileSpreadsheet,
              t: "Paperwork",
              d: "Every charge split into supplier cost, government or carrier charges and our service fee. One consolidated invoice per cycle.",
            },
            {
              icon: ShieldCheck,
              t: "Care",
              d: "Traveller location register, incident escalation path, insurer coordination and a documented hand-back if you ever leave us.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 60}>
              <div className="lift h-full rounded-3xl border border-border bg-card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary">
                  <c.icon className="h-5 w-5 text-primary" />
                </span>
                <p className="mt-4 font-semibold">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section
        id="groups"
        className="scroll-mt-24 bg-ink-gradient py-14 text-ink-foreground lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Group movements</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Delegations, crews, retreats and cohorts
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-foreground/80">
              Groups are where travel goes wrong: names change, passports expire, one person is on a
              different fare class, and the invoice is forty lines late. We run a group move as one
              file, one invoice and one owner.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Name-change and passport-expiry tracking against the manifest",
                "Seat-block negotiation with the carrier before deposits are taken",
                "Rooming lists and shared arrangements agreed with the hotel in writing",
                "Group documentation packs and per-traveller visa checklists",
                "On-the-ground lead, transfers and a 24/7 incident number",
                "One invoice, split by cost centre",
              ].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="leading-snug text-ink-foreground/90">{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl glass p-6">
              <p className="flex items-center gap-2 font-bold">
                <Calculator className="h-4 w-4 text-gold" /> Indicative management fee
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/85">
                Small accounts usually pay a fee per trip. Bigger books move to a monthly retainer
                plus a per-trip fee, so the price matches the real workload.
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                {[
                  { l: "SME (up to 20 trips a year)", m: "₦15,000 per trip, no retainer" },
                  { l: "Mid-market (20–100 trips)", m: "₦350,000 retainer + ₦9,000 per trip" },
                  { l: "Enterprise (100+ trips)", m: "Custom retainer, volume-based" },
                  {
                    l: "Group movement (30+ pax)",
                    m: "₦25,000 per traveller, all-in coordination",
                  },
                ].map((r) => (
                  <div
                    key={r.l}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink-foreground/15 pb-2"
                  >
                    <dt className="text-ink-foreground/70">{r.l}</dt>
                    <dd className="font-bold text-gold">{r.m}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[11px] leading-relaxed text-ink-foreground/60">
                {COMPLIANCE_NOTES.fees}
              </p>
            </div>
            <div className="rounded-3xl glass p-6">
              <p className="flex items-center gap-2 font-bold">
                <LineChart className="h-4 w-4 text-gold" /> What your finance team gets
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/85">
                A monthly workbook: spend by cost centre, traveller, lane and cabin; how often
                policy was followed; refund and no-show losses; and every change we made with a
                supplier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Also for businesses" title="Beyond the ticket" size="sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Staff relocation",
              d: "Offers, permits, housing search, school run, shipping and first-weeks logistics for transferred employees.",
              to: "/relocation" as const,
            },
            {
              t: "Passport & documentation",
              d: "Corporate passport batches, renewals, affidavits and attestations handled by the documentation desk.",
              to: "/passports" as const,
            },
            {
              t: "Business travel insurance",
              d: "One group policy on one schedule, safety reporting, and one named contact if something happens.",
              to: "/insurance" as const,
            },
            {
              t: "Training for in-house travel",
              d: "Your admin staff learn booking fundamentals and fare rules through the Academy's corporate cohort.",
              to: "/academy" as const,
            },
            {
              t: "Recruitment support",
              d: "Verified role categories and moderation for hospitality, travel and logistics hiring.",
              to: "/jobs" as const,
            },
            {
              t: "Meetings & off-sites",
              d: "Venue sourcing, room blocks, transfers, and one invoice for the whole event.",
              to: "/packages" as const,
            },
          ].map((x) => (
            <Link key={x.t} to={x.to} className="lift rounded-3xl border border-border bg-card p-5">
              <p className="font-semibold leading-snug">{x.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              <p className="mt-3 text-xs font-bold text-primary">Read more →</p>
            </Link>
          ))}
        </div>
      </Section>

      <section id="enquiry" className="scroll-mt-24 bg-secondary py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-5 lg:grid-cols-[1.1fr_1fr]">
          <EnquiryForm
            title="Request a corporate travel review"
            description="Send us your volume and profile. We come back with a written review of where your travel money leaks and a proposed structure."
            cta="Request the review"
            refPrefix="HTC"
            fields={fields}
            note="No fares are quoted here. Any figure we send later is a written, dated quote with an expiry."
            successTitle="Corporate review requested"
            successLines={[
              "The account desk reviews your volume profile and prepares an audit scope.",
              "We propose a call with two travellers' timelines and twelve months of invoices.",
              "You receive a written structure: policy, rates, fees, invoicing and reporting.",
            ]}
          />
          <div className="space-y-3">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="flex items-center gap-2 font-bold">
                <Building2 className="h-4 w-4 text-primary" /> {BRAND.company}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Corporate desk · {BRAND.address}. Traveller line open {BRAND.hours}. For urgent
                in-trip issues at any hour, use the 24/7 number on your booking confirmation.
              </p>
              <a
                href={waLink(waMessages.corporate)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-whatsapp-foreground"
              >
                Message the corporate desk
              </a>
            </div>
            <ComplianceNote text={COMPLIANCE_NOTES.partners} />
          </div>
        </div>
      </section>
    </>
  );
}
