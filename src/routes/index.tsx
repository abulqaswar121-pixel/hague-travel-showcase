import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarClock,
  Compass,
  FileText,
  GraduationCap,
  Handshake,
  Headphones,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { BookingPanel } from "@/components/site/BookingPanel";
import {
  ArrowLink,
  ButtonLink,
  ComplianceNote,
  FeatureGrid,
  Pill,
  Reveal,
  Section,
  Steps,
} from "@/components/site/Blocks";
import { PackageCard, RouteCard, TestimonialCard } from "@/components/site/Cards";
import { SmartLink } from "@/components/site/SmartLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDestinations } from "@/data/destinations";
import { getPopularRoutes } from "@/data/flights";
import { getFeaturedPackages } from "@/data/packages";
import { FAQS, TESTIMONIALS } from "@/data/services";
import { getCohorts } from "@/data/academy";
import { getJobs } from "@/data/jobs";
import { CohortMiniCard, JobCard } from "@/components/site/Cards";
import { BRAND, COMPLIANCE_NOTES, images, waLink, waMessages } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: pageMeta(
    "Flights, Holidays, Study Abroad & Relocation",
    "Book flights, hotels and curated tour packages, apply to study abroad, relocate for work and train for a travel career. Hague Travel pairs online convenience with real consultants.",
    { image: images.hero },
  ),
  component: Index,
});

const PILLARS = [
  {
    icon: Plane,
    t: "Flights & Travel",
    d: "Flights, hotels, packages, transfers, insurance and extras — quoted by a human.",
    to: "/flights",
  },
  {
    icon: GraduationCap,
    t: "Study Abroad",
    d: "Course selection, admissions, visa documentation, housing and pre-departure.",
    to: "/study-abroad",
  },
  {
    icon: Briefcase,
    t: "Work & Relocation",
    d: "Readiness assessment, pathway choice, family planning and settlement.",
    to: "/relocation",
  },
  {
    icon: FileText,
    t: "Passports & Docs",
    d: "New passports, renewals and checklists — guidance only, never issuance.",
    to: "/passports",
  },
  {
    icon: Compass,
    t: "Hague Experiences",
    d: "Beach, festive, honeymoon, cultural, pilgrimage and corporate departures.",
    to: "/packages",
  },
  {
    icon: Headphones,
    t: "Hague Travel Academy",
    d: "Quarterly virtual training for aspiring travel consultants.",
    to: "/academy",
  },
  {
    icon: Handshake,
    t: "Corporate Travel",
    d: "Flight desk, group moves, relocation contracts and travel management.",
    to: "/corporate",
  },
  {
    icon: Wallet,
    t: "Education Financing",
    d: "Budget, scholarships and verified lender referrals — not a loan from us.",
    to: "/relocation",
    hash: "financing",
  },
] as const;

const WHY = [
  {
    title: "Online convenience",
    detail: "Search, compare and request in seconds — no phone tag before you see a number.",
    icon: Sparkles,
  },
  {
    title: "Human experts",
    detail: "A named consultant owns your file from enquiry to arrival, on WhatsApp and phone.",
    icon: Headphones,
  },
  {
    title: "Honest pricing",
    detail:
      "Indicative until a supplier confirms. Government fees and our fees always on separate lines.",
    icon: BadgeCheck,
  },
  {
    title: "Whole journey",
    detail: "Ticket, visa pack, housing, baggage, pickup and settlement — planned as one trip.",
    icon: Compass,
  },
] as const;

function Index() {
  const packages = getFeaturedPackages();
  const routesList = getPopularRoutes(6);
  const destinations = getDestinations();
  const cohorts = getCohorts();
  const jobs = getJobs().slice(0, 3);
  const festive = packages[0];

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative isolate overflow-hidden bg-ink pb-14 pt-28 lg:pb-20 lg:pt-36">
        <img
          src={images.hero}
          alt="Aircraft wing above a bank of clouds at sunset"
          fetchPriority="high"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 h-full w-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="max-w-3xl text-ink-foreground">
            <p className="eyebrow animate-rise">
              {BRAND.name} · {BRAND.group}
            </p>
            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[0.98] animate-rise sm:text-6xl lg:text-8xl">
              Your World.
              <br />
              <em className="text-gold">Your Next Chapter.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/85 animate-rise sm:text-lg">
              {BRAND.heroSub}
            </p>
          </div>

          <div className="mt-9 animate-rise lg:mt-12" style={{ animationDelay: "160ms" }}>
            <BookingPanel />
          </div>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 text-[13px] text-ink-foreground/80">
            {[
              "Pay in Naira",
              "Consultants on desk 6 days a week",
              "Transparent fees",
              "Visa & document discipline",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-gold" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- OFFER MARQUEE */}
      <div className="border-y border-border bg-accent py-2.5">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 text-[11px] font-black uppercase tracking-widest text-accent-foreground sm:text-xs">
            {[
              "Festive Dubai — 6 seats left",
              "Zanzibar early bird ₦120,000 off",
              "January intakes: free eligibility assessment",
              "Academy Cohort 01 closing soon",
              "Umrah January group open",
              "Student fares with 3rd bag",
              "Corporate travel desk for rotational crews",
            ]
              .concat([
                "Festive Dubai — 6 seats left",
                "Zanzibar early bird ₦120,000 off",
                "January intakes: free eligibility assessment",
                "Academy Cohort 01 closing soon",
                "Umrah January group open",
                "Student fares with 3rd bag",
                "Corporate travel desk for rotational crews",
              ])
              .map((t, i) => (
                <span key={`${t}-${i}`} className="flex shrink-0 items-center gap-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- PILLARS */}
      <Section
        eyebrow="One platform, every journey"
        title="Where can I book my next trip — and what can you help me pursue?"
        sub="Everything below is handled by a consultant, not a chatbot. Start anywhere."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 45}>
              <SmartLink
                to={p.to}
                hash={"hash" in p ? (p.hash as string | undefined) : undefined}
                className="group lift flex h-full flex-col rounded-3xl border border-border bg-card p-5 sm:p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground transition group-hover:bg-gold-gradient group-hover:text-gold-foreground">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg leading-snug">{p.t}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                <span className="mt-5 flex items-center gap-1 text-sm font-bold text-primary">
                  Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </SmartLink>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------- FEATURED PACKAGES */}
      <Section
        tone="muted"
        eyebrow="Hague Experiences"
        title="Featured holidays & seasonal offers"
        sub="Deposits and staged payments where supplier terms allow. Every departure shows its own cancellation tiers."
        action={<ArrowLink to="/packages">All packages</ArrowLink>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <PackageCard p={p} />
            </Reveal>
          ))}
        </div>
        {festive ? (
          <Reveal delay={120}>
            <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-3xl border border-gold/45 bg-ink-gradient p-6 text-ink-foreground sm:flex-row sm:items-center sm:p-8">
              <div>
                <Pill tone="gold">Seasonal deadline</Pill>
                <p className="mt-3 font-display text-2xl leading-snug sm:text-3xl">
                  {festive.title} — book by {festive.bookingDeadline.slice(8, 10)}{" "}
                  {new Date(`${festive.bookingDeadline}T12:00:00`).toLocaleString("en-GB", {
                    month: "short",
                  })}{" "}
                  {festive.bookingDeadline.slice(0, 4)}
                </p>
                <p className="mt-2 max-w-xl text-sm text-ink-foreground/75">
                  {festive.depositDue}. Promo code {festive.promoCode ?? "HAGUE"} applies at enquiry
                  — {festive.exclusions[0]}.
                </p>
              </div>
              <Link
                to="/packages/$slug"
                params={{ slug: festive.slug }}
                className="shrink-0 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground shadow-gold"
              >
                View itinerary
              </Link>
            </div>
          </Reveal>
        ) : null}
      </Section>

      {/* -------------------------------------------------- POPULAR ROUTES */}
      <Section
        eyebrow="Popular international routes"
        title="Where Nigerians are flying this season"
        sub="Indicative return economy fares. A consultant confirms live availability, baggage rules and fare conditions before anything is issued."
        action={<ArrowLink to="/flights">Search flights</ArrowLink>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routesList.map((r, i) => (
            <Reveal key={r.id} delay={i * 40}>
              <RouteCard r={r} />
            </Reveal>
          ))}
        </div>
        <ComplianceNote className="mt-5" text={COMPLIANCE_NOTES.indicative} />
      </Section>

      {/* --------------------------------------------------- STUDY ABROAD */}
      <section className="bg-ink-gradient text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <div className="relative">
              <img
                src={images.campus}
                alt="University campus quadrangle in autumn light"
                loading="lazy"
                className="aspect-4/5 w-full rounded-3xl object-cover shadow-elegant sm:aspect-16/11 lg:aspect-4/5"
              />
              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-card p-4 text-card-foreground shadow-elegant sm:left-6 sm:right-auto sm:p-5">
                <p className="font-display text-3xl text-gold">8 steps</p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  destination → pre-departure
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="eyebrow">Study abroad</p>
              <h2 className="mt-3 font-display text-3xl leading-[1.08] sm:text-5xl">
                From admission letter to your first lecture.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-foreground/75 sm:text-base">
                Course matching, applications, financial-evidence discipline, visa documentation,
                housing, flights and orientation — one guided journey, with the decision-making
                authority of universities and embassies stated plainly at every step.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {destinations.map((c) => (
                  <Link
                    key={c.slug}
                    to="/study-abroad/$country"
                    params={{ country: c.slug }}
                    className="group rounded-2xl glass p-3.5 transition hover:bg-ink-foreground/15 sm:p-4"
                  >
                    <p className="text-2xl leading-none">{c.flag}</p>
                    <p className="mt-2 text-sm font-bold leading-snug">{c.name}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-ink-foreground/60">
                      {c.intakes[0]}
                    </p>
                  </Link>
                ))}
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-ink-foreground/50">
                Countries shown are subject to verified partner coverage — we confirm the desk
                before you pay anything.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <ButtonLink to="/study-abroad" variant="gold">
                  Start eligibility assessment
                </ButtonLink>
                <ButtonLink to="/study-abroad" variant="outline">
                  See the journey
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------- JOBS + ACADEMY SPLIT */}
      <Section
        eyebrow="Verified overseas job categories"
        title="Opportunities we can genuinely prepare you for"
        sub="Example role categories, not live vacancies. Each one maps to an Academy module so you know exactly what to learn next."
        action={<ArrowLink to="/jobs">Careers portal</ArrowLink>}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {jobs.map((j, i) => (
            <Reveal key={j.id} delay={i * 60}>
              <JobCard job={j} />
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{COMPLIANCE_NOTES.jobs}</p>
      </Section>

      {/* --------------------------------------------------- ACADEMY COHORTS */}
      <Section
        tone="muted"
        eyebrow="Hague Travel Academy"
        title="Upcoming cohorts — Feb · May · Aug · Nov"
        sub="Paid virtual training for aspiring consultants: live classes, recordings, assignments, practical booking exercises and a final assessment."
        action={<ArrowLink to="/academy">Programme & curriculum</ArrowLink>}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cohorts.map((c, i) => (
            <Reveal key={c.id} delay={i * 55}>
              <CohortMiniCard c={c} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <CalendarClock className="h-4 w-4 text-gold" /> Cohort 01 registration closes soon — 4
            seats left at the early rate.
          </p>
          <ArrowLink to="/academy" hash="enrol">
            Enrol
          </ArrowLink>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{COMPLIANCE_NOTES.academy}</p>
      </Section>

      {/* --------------------------------------------------- PASSPORTS/DOCS */}
      <Section
        eyebrow="Passports & documentation"
        title="The paperwork that decides everything else"
        sub="Assistance, checklists and appointment discipline — issuance stays with the government."
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={images.documents}
                alt="Passports, boarding passes and travel documents laid out"
                loading="lazy"
                className="aspect-16/9 w-full object-cover"
              />
              <div className="bg-card p-6">
                <h3 className="text-xl leading-snug">
                  Government fees and our fees, always on separate lines
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We quote the authority's charge and our service charge independently, in writing,
                  before you pay either. You can also choose to self-submit and use us for document
                  review only.
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <FeatureGrid
                    columns={2}
                    items={[
                      "New passport assistance",
                      "Renewal & replacement guidance",
                      "Photo specification checks",
                      "Appointment scheduling",
                      "Secure document upload",
                      "Status follow-up",
                    ]}
                  />
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <ButtonLink to="/passports" variant="primary">
                    Passport services
                  </ButtonLink>
                  <ButtonLink to="/passports" variant="outline" hash="checklists">
                    Document checklists
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl border border-border bg-secondary p-6 sm:p-7">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-xl leading-snug">How we handle your documents</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                {[
                  COMPLIANCE_NOTES.documents,
                  COMPLIANCE_NOTES.visa,
                  COMPLIANCE_NOTES.fees,
                  COMPLIANCE_NOTES.partners,
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-2.5 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------ WHY HAGUE TRAVEL */}
      <Section
        tone="muted"
        eyebrow="Why Hague Travel"
        title="Online convenience and human experts — not one or the other"
        sub="The differentiator is that we do not stop at the ticket."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 50}>
              <div className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                <w.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-lg leading-snug">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Steps
            items={[
              {
                title: "Tell us the trip",
                detail: "Search yourself, or send one message with what you know.",
              },
              {
                title: "Get a written quote",
                detail: "Live supplier pricing, baggage and fare rules in one document.",
              },
              {
                title: "Pay in stages",
                detail: "Deposit, balance and deadlines set out before money moves.",
              },
              {
                title: "Travel with support",
                detail: "A named consultant on WhatsApp before, during and after.",
              },
            ]}
          />
        </div>
      </Section>

      {/* ----------------------------------------------------- TESTIMONIALS */}
      <Section
        eyebrow="Real journeys"
        title="Trusted by travellers, students and families"
        sub="Verified reviews from completed bookings — the ones we can name."
        action={<ArrowLink to="/contact">Work with us</ArrowLink>}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <Reveal key={t.id} delay={i * 45}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
          <Quote className="h-6 w-6 shrink-0 text-gold" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            “They told me my bank statement format would fail before the embassy did. That one
            correction is the reason I'm in Manchester today.”
            <span className="mt-1 block font-semibold text-foreground">
              — Postgraduate client, January intake 2026
            </span>
          </p>
        </div>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-5 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <div>
              <p className="eyebrow">FAQs</p>
              <h2 className="mt-3 font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
                Honest answers, before you ask.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                The five questions we get every day. The rest live in the help centre — including
                how complaints and refunds are handled.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <ButtonLink to="/faqs" variant="primary">
                  All FAQs
                </ButtonLink>
                <ButtonLink
                  to="/refund-policy"
                  variant="outline"
                  className="border-input text-foreground hover:bg-accent"
                >
                  Refund & cancellation
                </ButtonLink>
              </div>
              <div className="mt-8 overflow-hidden rounded-3xl border border-border">
                <img
                  src={images.resort}
                  alt="Beach resort at golden hour"
                  loading="lazy"
                  className="aspect-16/9 w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Accordion
              type="single"
              collapsible
              className="rounded-3xl border border-border bg-card px-5"
            >
              {FAQS.slice(0, 6).map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-[15px] font-semibold leading-snug">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- CTA BAND */}
      <section className="relative isolate overflow-hidden bg-ink px-4 py-16 sm:px-5 lg:py-24">
        <img
          src={images.dubai}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl text-ink-foreground">
              <p className="eyebrow">How do I get personal help?</p>
              <h2 className="mt-3 font-display text-3xl leading-[1.08] sm:text-5xl">
                Speak to a real consultant — today.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-foreground/80 sm:text-base">
                {BRAND.hours}. Send one message with your dates and destination; we come back with
                options, prices and the paperwork you'll need.
              </p>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={waLink(waMessages.general)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold text-whatsapp-foreground transition hover:brightness-105"
                >
                  <Headphones className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-bold text-ink-foreground"
                >
                  Request a callback <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-ink-foreground/50">
                {COMPLIANCE_NOTES.indicative}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
