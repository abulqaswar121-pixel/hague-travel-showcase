import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Compass, Handshake, Target, TrendingUp, Users } from "lucide-react";
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
import { images, BRAND, COMPLIANCE_NOTES } from "@/data/site";
import { getDestinations } from "@/data/destinations";
import { getCohorts } from "@/data/academy";
import { getPublishedPackages } from "@/data/packages";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/about")({
  head: pageMeta(
    "About Hague Travel",
    "Who we are, why Hague Travel exists, how we make money, and the four-phase roadmap from a consultant-led desk to automated bookings, relocation and a travel academy.",
  ),
  component: About,
});

const REVENUE_STREAMS = [
  {
    t: "Flight service fees & commissions",
    d: "A stated fee per ticket, plus any commission the carrier pays us. Disclosed on the quotation.",
  },
  {
    t: "Hotel and supplier commissions",
    d: "Negotiated rates from hotels and ground operators. Often cheaper for you than the public price.",
  },
  {
    t: "Package margins & group fees",
    d: "The margin we build into a Hague Experience, plus a management fee for running a group on the ground.",
  },
  {
    t: "Visa & documentation fees",
    d: "Our agency fee for assembling, checking and tracking an application. Never the government's fee.",
  },
  {
    t: "Passport assistance fees",
    d: "Documentation and appointment support — with NIS charges paid separately and receipted.",
  },
  {
    t: "Insurance commissions",
    d: "Where lawful, partners pay us a commission. Disclosed in writing; it does not change your premium.",
  },
  {
    t: "Relocation & education advisory",
    d: "Paid advisory retainers for relocation, admissions strategy and pre-departure programmes.",
  },
  {
    t: "Financing partner referrals",
    d: "Referral commission from education-finance partners. We are not a lender and never present an approval.",
  },
  {
    t: "Academy cohorts",
    d: "Paid quarterly training cohorts — our professional-programme revenue line.",
  },
  {
    t: "Corporate travel contracts",
    d: "Retainers and per-trip fees for managed corporate accounts.",
  },
  {
    t: "Supplier promotions",
    d: "Occasional sponsored placement with suppliers, always labelled as promoted and never affecting a ranking you cannot see.",
  },
  {
    t: "Recruitment services",
    d: "Employer-side moderation fees where legal and disclosed. Candidates never pay.",
  },
];

const ROADMAP = [
  {
    title: "Phase 1 · Foundation",
    detail:
      "Consultant-led desk with a credible public face: services, indicative pricing, enquiry capture, document checklists and a WhatsApp line that humans answer.",
  },
  {
    title: "Phase 2 · Booking automation",
    detail:
      "Live flight and hotel availability through supplier APIs or a GDS, instant quoting, online payment with invoices, and self-service status tracking.",
  },
  {
    title: "Phase 3 · Study & relocation",
    detail:
      "Structured application pipelines per country, deadline enforcement, document vaults, accommodation matching and relocation case management.",
  },
  {
    title: "Phase 4 · Academy & careers",
    detail:
      "Cohort delivery online, assessments, verified employer job board, and a graduate network that feeds our own and our partners' desks.",
  },
];

function About() {
  const destinations = getDestinations();
  const cohorts = getCohorts();
  const packages = getPublishedPackages();

  return (
    <>
      <PageHero
        image={images.island}
        eyebrow="About Hague Travel"
        title={<>{BRAND.tagline.replace(".", "")}</>}
        sub="We are the travel desk we wished existed when we were booking for other people's families: honest prices, visible paperwork, and a named person who answers."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">{BRAND.group}</Pill>
          <Pill>Lagos · remote support worldwide</Pill>
          <Pill>{BRAND.rc}</Pill>
        </div>
      </PageHero>

      <Section eyebrow="Why we exist" title="Most agencies sell a ticket. We plan the journey.">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-4 text-sm leading-relaxed sm:text-[15px]">
            <p>
              The Nigerian travel market runs on two habits. One is the self-service marketplace:
              fast, cheap, no human, and completely silent the moment a flight is cancelled or a
              visa needs an explanation. The other is the WhatsApp consultant: responsive,
              knowledgeable, and impossible to audit — no invoice, no paper trail, no visible price.
            </p>
            <p>
              Hague Travel was built to hold both halves at once. The self-service tools to search,
              compare and understand a price. The human consultant to negotiate it, document it and
              defend it. And a rule nobody can break: we never present something as confirmed when a
              supplier has not confirmed it.
            </p>
            <p>
              That is why every number on this site is labelled indicative, why government fees are
              printed separately from our fee, and why a visa page tells you plainly that the
              decision is not ours to make. Trust is not a tagline; it is the willingness to say
              what you cannot do.
            </p>
            <div className="rounded-3xl border border-border bg-secondary p-5">
              <p className="flex items-center gap-2 font-bold">
                <Target className="h-4 w-4 text-primary" /> Our mission
              </p>
              <p className="mt-2.5 font-display text-lg leading-relaxed sm:text-xl">
                To make travel, international education, relocation and professional development
                more accessible through dependable services, transparent processes and personalized
                support.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <StatRow
              items={[
                { value: `${packages.length}`, label: "Live package examples" },
                { value: `${destinations.length}`, label: "Study destinations covered" },
                { value: `${cohorts.length}`, label: "Academy cohorts planned" },
                { value: "12", label: "Disclosed revenue lines" },
              ]}
            />
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="flex items-center gap-2 font-bold">
                <Compass className="h-4 w-4 text-gold" /> What we are not
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>· Not a visa mill. No guarantees, no "connections", no processed documents.</li>
                <li>
                  · Not a lender. Financing is referral and application support, with the partner
                  named.
                </li>
                <li>
                  · Not an insurer. The underwriter decides claims; we help you file them properly.
                </li>
                <li>
                  · Not a recruiter that charges you. Employers pay for moderation; candidates pay
                  nothing.
                </li>
                <li>
                  · Not an airline or hotel. We are the desk between you and them — and we show you
                  the paperwork.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="What we believe"
        title="Five standards the whole company is measured on"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Handshake,
              t: "Say what we cannot do",
              d: "Visa approval, seat inventory, claim decisions and passport issuance are not ours. We state it before you pay, not after you ask.",
            },
            {
              icon: TrendingUp,
              t: "Price in the open",
              d: "Government charges, supplier costs and our fee appear as three lines on every invoice. If we earn a commission somewhere, you are told.",
            },
            {
              icon: Users,
              t: "One named person",
              d: "You get a consultant, not a ticket queue. They own your file, they chase the supplier, and they are still there when the flight is cancelled.",
            },
            {
              icon: Building2,
              t: "Paper over promises",
              d: "Quotations with expiry dates, vouchers with names on them, receipts, and a written escalation trail. The file is the service.",
            },
            {
              icon: Compass,
              t: "Teach, then hire",
              d: "The Academy exists because good consultants are scarce. We train people properly, and our partners get first look at the ones who pass.",
            },
            {
              icon: Target,
              t: "Grow in phases",
              d: "We automate what is proven, not what is promised. Suppliers, payments and inventory come online when the desk already runs them well.",
            },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 50}>
              <div className="lift h-full rounded-3xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-ink-foreground">
                  <v.icon className="h-5 w-5 text-gold" />
                </span>
                <p className="mt-4 font-semibold leading-snug">{v.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="How we make money" title="Twelve revenue streams, all disclosed">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          A travel business that will not explain its economics should not be trusted with your
          itinerary. These are our lines — each one either a fee we charge or a commission a partner
          pays, with the disclosure that goes with it.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REVENUE_STREAMS.map((r, i) => (
            <Reveal key={r.t} delay={i * 35}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <p className="flex items-start gap-2 font-semibold leading-snug">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-gradient text-[10px] font-black text-gold-foreground">
                    {i + 1}
                  </span>
                  {r.t}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <ComplianceNote className="mt-8" text={COMPLIANCE_NOTES.partners} />
      </Section>

      <section className="bg-ink-gradient py-14 text-ink-foreground lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <p className="eyebrow">Roadmap</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Four phases, in the order they earn their keep
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-foreground/75">
            This preview is the completed Phase 1 surface. Phases 2 to 4 are the real build: a
            database of client files, payment rails with invoices and refunds, supplier APIs or GDS
            ticketing, and the case-management spine behind every desk on this site.
          </p>
          <div className="mt-9">
            <Steps items={ROADMAP} />
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "Phase 1", l: "Consultant-led desk & public trust", tone: "text-gold" },
              {
                v: "Phase 2",
                l: "Live availability, payments, self-service",
                tone: "text-ink-foreground",
              },
              { v: "Phase 3", l: "Study & relocation pipelines", tone: "text-ink-foreground" },
              {
                v: "Phase 4",
                l: "Academy, careers & partner network",
                tone: "text-ink-foreground",
              },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl glass p-4">
                <p className={`font-display text-xl ${x.tone}`}>{x.v}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase leading-snug tracking-wider text-ink-foreground/70">
                  {x.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section
        eyebrow="Where we work"
        title="Destinations our desks handle today"
        sub="Coverage is partner-led and changes with intake seasons; the list below is what our consultants currently file against."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={i * 35}>
              <Link
                to="/study-abroad/$country"
                params={{ country: d.slug }}
                className="lift flex h-full flex-col rounded-2xl border border-border bg-card p-4"
              >
                <span className="text-2xl leading-none" aria-hidden>
                  {d.flag}
                </span>
                <p className="mt-2.5 font-semibold leading-snug">{d.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {d.intakes.slice(0, 2).join(" · ")}
                </p>
                <p className="mt-3 text-[11px] font-bold text-primary">Country page →</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Notice className="mt-6" tone="sea" title="Coverage is honest, not aspirational">
          Destinations and institutions are subject to partner coverage. Where we cannot serve a
          country well, we say so and refer you to someone who can — that referral costs you nothing
          and earns us nothing.
        </Notice>
        <div className="mt-8">
          <FeatureGrid
            columns={2}
            items={[
              "Consultant-led quotations on every service",
              "Government fees always itemised separately",
              "No booking shown as confirmed without a supplier",
              "Encrypted document handling with a purge date",
              "Referral commissions disclosed in writing",
              "Escalation path published, not hidden",
              "Academy certificates described accurately",
              "Candidates never pay for job access",
            ]}
          />
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Talk to us"
        title="Start with a question, not a booking"
        size="sm"
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {BRAND.heroSub} Our desk is open {BRAND.hours}, and you will get a person.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/contact"
              className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              Contact the desk
            </Link>
            <Link
              to="/packages"
              className="rounded-full border border-input bg-card px-5 py-3 text-sm font-bold"
            >
              Browse Hague Experiences
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
