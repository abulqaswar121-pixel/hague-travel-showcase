import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Briefcase,
  Building2,
  Compass,
  FileText,
  GraduationCap,
  Headphones,
  Palmtree,
  Plane,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { BookingPanel } from "@/components/site/BookingPanel";
import { PartnerStrip } from "@/components/site/PartnerStrip";
import {
  ArrowLink,
  ButtonLink,
  ComplianceNote,
  Pill,
  Reveal,
  Section,
} from "@/components/site/Blocks";
import { PackageCard, TestimonialCard } from "@/components/site/Cards";
import { SmartLink } from "@/components/site/SmartLink";
import { getFeaturedPackages } from "@/data/packages";
import { TESTIMONIALS } from "@/data/services";
import { BRAND, COMPLIANCE_NOTES, images, waLink, waMessages } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: pageMeta(
    "Flights, Holidays, Study Abroad & Relocation",
    "Flights, hotels, tours, study abroad, relocation and travel training — online tools with a real consultant, from first quote to landing.",
    { image: images.hero },
  ),
  component: Index,
});

const PILLARS = [
  {
    title: "Tours & holidays",
    eyebrow: "Hague Experiences",
    description:
      "Beach escapes, festive departures, honeymoons, family trips and cultural journeys — with the deposit plan and cancel rules in writing.",
    image: images.resort,
    to: "/packages",
    icon: Palmtree,
    tags: ["Beach", "Family", "Festive", "Honeymoon"],
    cta: "Browse departures",
  },
  {
    title: "Study abroad",
    eyebrow: "Admissions & visas",
    description:
      "Course shortlisting, applications, financial evidence and visa files for the UK, Canada, USA, Europe and Australia.",
    image: images.campus,
    to: "/study-abroad",
    icon: GraduationCap,
    tags: ["UK", "Canada", "USA", "Europe", "Australia"],
    cta: "Start an assessment",
  },
  {
    title: "Work & relocation",
    eyebrow: "Pathways & settling in",
    description:
      "Work permits, Express Entry, talent routes and family relocation — plus housing, schools and the practical landing plan.",
    image: images.relocation,
    to: "/relocation",
    icon: Briefcase,
    tags: ["Work permit", "Express Entry", "Talent visa"],
    cta: "Book a consultation",
  },
  {
    title: "Corporate travel",
    eyebrow: "B2B travel desk",
    description:
      "Staff flights, crew rotations, group moves and one clean monthly invoice — with a named account manager and credit facility options.",
    image: images.corporate,
    to: "/corporate",
    icon: Building2,
    tags: ["Credit facility", "Groups", "Monthly invoicing"],
    cta: "Request an RFP",
  },
] as const;

const MORE_DESKS = [
  { label: "Flights", to: "/flights", icon: Plane },
  { label: "Hotels & stays", to: "/hotels", icon: BedDouble },
  { label: "Passports & docs", to: "/passports", icon: FileText },
  { label: "Travel Academy", to: "/academy", icon: GraduationCap },
  { label: "Global jobs", to: "/jobs", icon: Compass },
  { label: "Insurance & extras", to: "/insurance", icon: ShieldCheck },
] as const;

const TRUST = [
  "One named consultant per file",
  "Transparent fees, always split out",
  "Pay in Naira, deposit in stages",
  "Visa & document discipline",
] as const;

function Index() {
  const packages = getFeaturedPackages().slice(0, 4);

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative isolate overflow-hidden bg-ink pb-14 pt-44 lg:pb-20 lg:pt-48">
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
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="gold">
              <Sparkles className="h-3 w-3" /> Your Journey. Our Responsibility.
            </Pill>
            <span className="rounded-full border border-ink-foreground/25 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-foreground/75">
              flights · holidays · study · relocation · corporate
            </span>
          </div>
          <div className="mt-5 max-w-3xl text-ink-foreground">
            <h1 className="font-display text-[2.7rem] font-medium leading-[0.98] animate-rise sm:text-6xl lg:text-8xl">
              Your World.
              <br />
              <em className="text-gold">Your Next Chapter.</em>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-foreground/85 animate-rise sm:text-lg">
              {BRAND.heroSub}
            </p>
          </div>

          <div className="mt-8 animate-rise lg:mt-10" style={{ animationDelay: "160ms" }}>
            <BookingPanel />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-ink-foreground/80">
            {TRUST.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-gold" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ PARTNER TRUST STRIP */}
      <PartnerStrip />

      {/* ------------------------------------------------------ FOUR PILLARS */}
      <Section
        eyebrow="Four desks. One journey."
        title="What are you planning?"
        sub="Start with the outcome you need. Every desk has a real consultant, a written quote and the paperwork checked before anything is submitted."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 60}>
              <SmartLink
                to={pillar.to}
                className="group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-3xl bg-ink text-ink-foreground shadow-soft transition hover:-translate-y-1.5 hover:shadow-elegant"
              >
                <img
                  src={pillar.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/20" />
                <div className="flex items-start justify-between p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-gradient text-gold-foreground shadow-gold">
                    <pillar.icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-5 w-5 translate-x-1 text-ink-foreground/60 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <div className="mt-auto p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold">
                    {pillar.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{pillar.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-foreground/72">
                    {pillar.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink-foreground/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-gold">
                    {pillar.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </SmartLink>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
          {MORE_DESKS.map((desk) => (
            <SmartLink
              key={desk.label}
              to={desk.to}
              className="group flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-3 text-xs font-bold transition hover:border-gold/60 hover:bg-accent/40"
            >
              <desk.icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{desk.label}</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </SmartLink>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------- FEATURED PACKAGES */}
      <Section
        tone="muted"
        eyebrow="Hague Experiences · live departures"
        title="Featured holidays, with the real terms shown"
        sub="Dates, indicative prices, seats left and the deposit plan on every card. Reserve with a deposit; the balance is staged and the cancel rules are written down."
        action={<ArrowLink to="/packages">All packages</ArrowLink>}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.slug} delay={index * 60}>
              <PackageCard p={pkg} reserveLabel="Reserve with deposit" />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <Wallet className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-xl leading-snug">
                Deposits from 30%, balance in steps
              </p>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                A deposit starts a reservation request. Space is held only after the supplier
                confirms availability and you receive the written quotation.
              </p>
            </div>
          </div>
          <ButtonLink to="/packages" variant="primary" className="shrink-0">
            Compare departures <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        <ComplianceNote className="mt-4" text={COMPLIANCE_NOTES.indicative} />
      </Section>

      {/* ----------------------------------------------------------- REVIEWS */}
      <Section
        eyebrow="Client reviews"
        title="The trips, visas and moves that worked"
        sub="A few client stories from the demonstration catalogue. Every review is about the human work — not a promise of an approval, fare or vacancy."
        action={<ArrowLink to="/contact">Talk to the desk</ArrowLink>}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 70}>
              <TestimonialCard t={testimonial} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Headphones,
              title: "A person, not a chatbot",
              body: "One named consultant owns your file from first message to landing — and answers in your timezone.",
            },
            {
              icon: BadgeCheck,
              title: "No invented confirmations",
              body: "Fares, hotel rooms and visa outcomes are confirmed by the supplier or authority. Nothing is promised early.",
            },
            {
              icon: ShieldCheck,
              title: "Fees on separate lines",
              body: "Government, university and supplier charges sit apart from our advisory fee on every invoice.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-4">
              <item.icon className="h-5 w-5 text-primary" />
              <p className="mt-2.5 text-sm font-bold">{item.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- CTA BAND */}
      <section className="relative isolate overflow-hidden bg-ink px-4 py-16 sm:px-5 lg:py-24">
        <img
          src={images.city}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl text-ink-foreground">
              <p className="eyebrow">Ready when you are</p>
              <h2 className="mt-3 font-display text-3xl leading-[1.08] sm:text-5xl">
                Tell us the trip. We’ll tell you the truth.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-foreground/80 sm:text-base">
                Send your dates, destination and who is travelling. Within desk hours you get
                options, a written price and the documents you need — from a consultant who will
                still be there when you land.
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
                <ButtonLink to="/contact" variant="outline">
                  Request a callback <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-ink-foreground/50">
                {BRAND.hours} · {BRAND.phone} · {BRAND.email}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
