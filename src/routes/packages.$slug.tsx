import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  Clock,
  Hotel,
  Luggage,
  Minus,
  Plane,
  ShieldCheck,
  Users,
  Utensils,
} from "lucide-react";
import {
  ComplianceNote,
  FeeSplit,
  IndicativeTag,
  Notice,
  Pill,
  Reveal,
  Section,
} from "@/components/site/Blocks";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import type { ItineraryDay } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { useCurrency } from "@/lib/currency";
import { getPackageBySlug, getPublishedPackages } from "@/data/packages";
import { COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { cn } from "@/lib/utils";
import { formatDate, formatDateRange } from "@/lib/format";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const p = getPackageBySlug(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Package not found | Hague Travel" },
          { name: "robots", content: "noindex" },
        ],
      };
    const title = `${loaderData.title} — ${loaderData.destination}`;
    const description = `${loaderData.nights} nights in ${loaderData.destination}, ${formatDateRange(loaderData.departDate, loaderData.returnDate)}. Indicative from ${formatPrice(loaderData.pricePerPerson, "NGN")} per person with ${loaderData.hotelCategory}.`;
    return {
      meta: [
        { title: `${title} | Hague Travel` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} | Hague Travel` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: loaderData.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: loaderData.cover },
      ],
    };
  },
  component: PackageDetail,
});

function PackageDetail() {
  const p = Route.useLoaderData();
  const { money } = useCurrency();
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"enquire" | "reserve">("enquire");

  // The brief requires the full day-by-day programme on every experience page, so an
  // intentionally open day is still shown as a day — with what it actually includes.
  const covered = new Set(p.itinerary.map((d) => d.day));
  const itinerary: ItineraryDay[] = [
    ...p.itinerary,
    ...Array.from({ length: p.days }, (_, i) => i + 1)
      .filter((day) => !covered.has(day))
      .map((day) => ({
        day,
        title: "Open day — free at leisure",
        detail:
          "Nothing scheduled. Rest, explore independently, or ask us to add an excursion, a driver or a reservation for the day; anything we add is quoted before it is booked.",
        meals: p.meals[0] ?? "As arranged",
      })),
  ].sort((a, b) => a.day - b.day);

  const facts = [
    { i: CalendarDays, l: "Departure", v: formatDate(p.departDate) },
    { i: CalendarDays, l: "Return", v: formatDate(p.returnDate) },
    { i: Clock, l: "Duration", v: `${p.nights} nights / ${p.days} days` },
    { i: Plane, l: "Flights", v: p.flightsIncluded ? "Included" : "Excluded — quoted on request" },
    { i: Hotel, l: "Hotel category", v: p.hotelCategory },
    { i: Users, l: "Group size", v: `${p.minGroup}–${p.maxGroup} guests` },
    { i: Utensils, l: "Board", v: p.meals[0] ?? "As listed" },
    { i: Luggage, l: "Booking deadline", v: formatDate(p.bookingDeadline) },
  ];

  const enquiryFields: FieldDef[] = [
    ...contactFields,
    {
      name: "guests",
      label: "Guests",
      type: "select",
      options: [
        "1 adult",
        "2 adults",
        "2 adults + 1 child",
        "2 adults + 2 children",
        "3–5 travellers",
        "6+ (group)",
      ],
    },
    {
      name: "occupancy",
      label: "Room preference",
      type: "select",
      options: ["Shared (twin/double)", "Single occupancy", "Family room", "Not sure — advise me"],
    },
    {
      name: "budget",
      label: "Budget per person",
      type: "select",
      options: ["As advertised", "Up to +20%", "Open to cheaper dates"],
    },
    {
      name: "visa",
      label: "Visa status for this destination",
      type: "select",
      options: [
        "Not started — please assist",
        "Application in progress",
        "Already held",
        "Not required",
      ],
    },
    {
      name: "notes",
      label: "Anything we should know",
      type: "textarea",
      required: false,
      full: true,
      placeholder:
        "Anniversary, dietary needs, passport expiry, preferred airline, seating together…",
    },
    {
      name: "consent",
      label:
        mode === "reserve"
          ? "I understand a deposit holds space, subject to supplier confirmation"
          : "I understand this is an enquiry, not a booking",
      type: "checkbox",
      help:
        mode === "reserve"
          ? "We confirm live availability and your written quotation first. A seat is only held once the supplier confirms."
          : "No payment is taken by this form and no space is held until we confirm availability with you.",
    },
  ];

  const related = getPublishedPackages()
    .filter((x) => x.slug !== p.slug && (x.category === p.category || x.country === p.country))
    .slice(0, 3);

  return (
    <>
      {/* Gallery hero */}
      <section className="relative isolate bg-ink pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="grid gap-3 lg:grid-cols-[2.2fr_1fr]">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={p.gallery[active] ?? p.cover}
                alt={`${p.title} — image ${active + 1}`}
                className="aspect-4/3 w-full object-cover sm:aspect-16/9 lg:aspect-16/10"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-5 pt-16 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="gold">{p.category}</Pill>
                  {p.earlyBird ? (
                    <Pill tone="gold">
                      Early bird · {money(p.earlyBirdSaving, { compact: true })} off
                    </Pill>
                  ) : null}
                  {p.promoCode ? <Pill>Code {p.promoCode}</Pill> : null}
                  {p.spacesRemaining <= 6 ? (
                    <Pill tone="destructive">Only {p.spacesRemaining} spaces left</Pill>
                  ) : null}
                </div>
                <h1 className="mt-3 font-display text-3xl leading-[1.05] text-ink-foreground sm:text-5xl">
                  {p.title}
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-foreground/75">
                  <span>{p.destination}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDateRange(p.departDate, p.returnDate)}</span>
                  <span aria-hidden>·</span>
                  <span>
                    {p.rating.toFixed(1)} ★ from {p.reviews} reviews
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
              {p.gallery.map((g, i) => (
                <button
                  key={`${g}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={active === i}
                  className={cn(
                    "overflow-hidden rounded-2xl border-2 transition",
                    active === i
                      ? "border-gold"
                      : "border-transparent opacity-75 hover:opacity-100",
                  )}
                >
                  <img
                    src={g}
                    alt=""
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 lg:grid-cols-[1.65fr_1fr] lg:py-16">
        {/* main column */}
        <div className="min-w-0 space-y-10">
          <Reveal>
            <p className="text-lg leading-relaxed sm:text-xl">{p.blurb}</p>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.l} className="rounded-2xl border border-border bg-card p-3.5">
                  <f.i className="h-4 w-4 text-gold" />
                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {f.l}
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold leading-snug">{f.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Notice title="Visa position for this trip">
            {p.visaRequirement} {p.visaAssistance} {COMPLIANCE_NOTES.visa}
          </Notice>

          {/* Itinerary */}
          <Reveal>
            <section>
              <h2 className="text-2xl sm:text-3xl">Day-by-day itinerary</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Sequence can shift with flight times and local conditions. Anything we change on the
                ground, we tell you about before you are on the coach.
              </p>
              <ol className="mt-6 space-y-3 border-l-2 border-gold/40 pl-5 sm:pl-6">
                {itinerary.map((d, i) => (
                  <li key={d.day} className="relative">
                    <span className="absolute -left-[27px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gold ring-4 ring-background sm:-left-[31px]" />
                    <div
                      className={cn(
                        "rounded-2xl border p-4 transition",
                        i === active % itinerary.length
                          ? "border-gold/60 bg-accent/40"
                          : "border-border bg-card",
                      )}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gold">
                          Day {d.day}
                          {d.title.startsWith("Open day") ? (
                            <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                              no scheduled items
                            </span>
                          ) : null}
                        </p>
                        <p className="text-[11px] font-semibold text-muted-foreground">{d.meals}</p>
                      </div>
                      <p className="mt-1 font-display text-lg leading-snug">{d.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {d.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {/* Inclusions / exclusions */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-5">
                <p className="flex items-center gap-2 font-bold">
                  <Check className="h-4 w-4 text-success" /> What's included
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {p.inclusions.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  Meals
                </p>
                <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                  {p.meals.map((m) => (
                    <li key={m}>· {m}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="h-full rounded-3xl border border-border bg-card p-5">
                <p className="flex items-center gap-2 font-bold">
                  <Minus className="h-4 w-4 text-destructive" /> Not included
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {p.exclusions.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  Activities
                </p>
                <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                  {p.activities.map((a) => (
                    <li key={a}>· {a}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  Transfers
                </p>
                <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                  {p.transfers.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  Room basis
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{p.roomBasis}</p>
              </div>
            </Reveal>
          </div>

          {/* Payment + cancellation */}
          <Reveal>
            <section className="rounded-3xl border border-border bg-secondary p-5 sm:p-7">
              <h2 className="text-2xl">Deposit, payment deadlines & cancellation</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-card p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Deposit
                  </p>
                  <p className="mt-1.5 font-display text-2xl text-primary">{p.depositPct}%</p>
                  <p className="mt-1 text-sm leading-relaxed">{p.depositDue}</p>
                </div>
                <div className="rounded-2xl bg-card p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Balance
                  </p>
                  <p className="mt-1.5 font-display text-lg leading-snug">{p.balanceDue}</p>
                </div>
                <div className="rounded-2xl bg-card p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Capacity
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed">
                    Minimum {p.minGroup} · maximum {p.maxGroup} ·{" "}
                    <span className="font-bold">{p.spacesRemaining} spaces remaining</span>
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                Cancellation policy
              </p>
              <ul className="mt-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {p.cancellationPolicy.map((c) => (
                  <li
                    key={c.window}
                    className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm"
                  >
                    <span className="font-semibold">{c.window}</span>
                    <span className="text-muted-foreground">{c.charge}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-gold/50 bg-accent p-4 text-sm leading-relaxed text-accent-foreground">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Supplier penalties are real and non-negotiable: flight inventory, hotel room
                  blocks and coach hire are committed the moment we confirm you. Our full terms,
                  including the complaints route, are on the {""}
                  <Link to="/refund-policy" className="font-bold underline">
                    Refund & Cancellation Policy
                  </Link>
                  .
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl">Fee breakdown</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Money paid to a government or authority is never mixed with our service fee. This is
                the same split you will see on your invoice.
              </p>
              <div className="mt-5">
                <FeeSplit
                  government={[
                    { label: "Visa / entry clearance fee", amount: "At the published rate" },
                    { label: "Biometrics or centre charge", amount: "Where applicable" },
                    { label: "Tourism, airport & city taxes", amount: "Included where stated" },
                  ]}
                  agency={[
                    {
                      label: "Package arrangement & supplier management",
                      amount: money(Math.round(p.pricePerPerson * 0.08), { compact: true }),
                    },
                    { label: "Documentation review", amount: "₦0 for this departure" },
                    { label: "24/7 on-trip support line", amount: "Included" },
                  ]}
                  thirdParty={[
                    { label: "Travel insurance", amount: "From ₦21,000 (see Insurance)" },
                    { label: "Optional add-ons", amount: "Quoted individually" },
                    { label: "Visa assistance service", amount: "From ₦60,000" },
                  ]}
                />
              </div>
            </section>
          </Reveal>
        </div>

        {/* sticky booking rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl bg-ink-gradient text-ink-foreground shadow-elegant">
            <div className="p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-ink-foreground/60">
                Indicative price per person
              </p>
              <p className="mt-1 font-display text-4xl text-gold">{money(p.pricePerPerson)}</p>
              <p className="mt-1 text-xs text-ink-foreground/60">
                Sharing {p.roomBasis.toLowerCase()}
              </p>
              <div className="mt-5 space-y-2 border-t border-ink-foreground/15 pt-4 text-sm">
                <p className="flex justify-between gap-3">
                  <span className="text-ink-foreground/70">Single occupancy</span>
                  <span className="font-semibold">
                    {money(p.pricePerPerson + p.singleSupplement)}
                  </span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-ink-foreground/70">Child (2–11, sharing)</span>
                  <span className="font-semibold">
                    {p.childPrice > 0 ? money(p.childPrice) : "Not available"}
                  </span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-ink-foreground/70">Early-bird saving</span>
                  <span className="font-semibold text-gold">
                    {p.earlyBird ? `− ${money(p.earlyBirdSaving, { compact: true })}` : "Ended"}
                  </span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-ink-foreground/70">Deposit</span>
                  <span className="font-semibold">{p.depositPct}%</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-ink-foreground/70">Book by</span>
                  <span className="font-semibold">{formatDate(p.bookingDeadline)}</span>
                </p>
              </div>
              <div className="mt-5">
                <IndicativeTag className="!border-gold/40 !bg-ink-foreground/10 !text-ink-foreground/80" />
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-ink/60 p-4 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={() => {
                  setMode("reserve");
                  document
                    .getElementById("reserve")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex-1 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105"
              >
                Reserve with deposit
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("enquire");
                  document
                    .getElementById("reserve")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex-1 rounded-full border border-ink-foreground/25 px-5 py-3 text-sm font-bold text-ink-foreground transition hover:bg-ink-foreground/10"
              >
                Enquire first
              </button>
              <a
                href={waLink(`${waMessages.packages} — ${p.title} (${p.slug})`)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full bg-whatsapp px-5 py-3 text-center text-sm font-bold text-whatsapp-foreground"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-border bg-card p-5 text-sm">
            <p className="flex items-center gap-2 font-bold">
              <ShieldCheck className="h-4 w-4 text-success" /> Flight note
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{p.flightNote}</p>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              {COMPLIANCE_NOTES.partners}
            </p>
          </div>

          <div className="mt-4 rounded-3xl border border-border bg-card p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Also on this trip
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                ·{" "}
                <Link to="/insurance" className="font-semibold text-primary underline">
                  Travel insurance quote
                </Link>
              </li>
              <li>
                ·{" "}
                <Link to="/extras" className="font-semibold text-primary underline">
                  Airport transfers & extras
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
                <Link to="/hotels" className="font-semibold text-primary underline">
                  Pre/post-stay nights
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* related */}
      {related.length ? (
        <Section tone="muted" eyebrow="You might also like" title="Similar departures" size="sm">
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 60}>
                <Link
                  to="/packages/$slug"
                  params={{ slug: r.slug }}
                  className="lift group block overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <img
                    src={r.cover}
                    alt={r.title}
                    loading="lazy"
                    className="aspect-16/10 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
                      {r.category}
                    </p>
                    <p className="mt-1.5 font-display text-lg leading-snug">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {r.destination} · from {money(r.pricePerPerson, { compact: true })}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <section id="reserve" className="scroll-mt-24 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-5">
          <div className="mb-4 flex gap-1.5 rounded-full bg-secondary p-1">
            {(["enquire", "reserve"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 rounded-full py-2.5 text-sm font-bold capitalize transition",
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground",
                )}
              >
                {mode === m
                  ? m === "enquire"
                    ? "Ask a question"
                    : "Reserve with deposit"
                  : m === "enquire"
                    ? "Enquire"
                    : "Reserve"}
              </button>
            ))}
          </div>
          <EnquiryForm
            title={mode === "reserve" ? `Reserve a space — ${p.title}` : `Ask about ${p.title}`}
            description={
              mode === "reserve"
                ? "This starts a reservation request. We confirm live spaces and flight inventory with the supplier, send you the written quotation and deposit instructions, and only then is space held."
                : "Questions on itinerary, rooming, visas, fitness level or what is genuinely included — a consultant who has run this departure answers."
            }
            cta={mode === "reserve" ? "Start my reservation" : "Send enquiry"}
            refPrefix={mode === "reserve" ? "HTP" : "HTE"}
            fields={enquiryFields}
            note={COMPLIANCE_NOTES.indicative}
            successTitle={mode === "reserve" ? "Reservation request received" : "Enquiry received"}
            successLines={
              mode === "reserve"
                ? [
                    "Supplier confirms spaces, flight inventory and hotel availability.",
                    "You receive a written quotation with deposit amount and payment deadline.",
                    `Deposit (${p.depositPct}%) is paid against that quotation, then your space is held.`,
                    "Visa documentation pack and pre-departure brief follow.",
                  ]
                : [
                    "A consultant replies with answers, current pricing and what is genuinely included.",
                    "If you like it, you can move straight to a reservation from the same thread.",
                  ]
            }
          />
          <ComplianceNote className="mt-4 text-center" text={COMPLIANCE_NOTES.fees} />
        </div>
      </section>
    </>
  );
}
