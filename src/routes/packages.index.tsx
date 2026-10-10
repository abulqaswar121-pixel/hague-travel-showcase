import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Palmtree, Search, SlidersHorizontal, X } from "lucide-react";
import { ComplianceNote, PageHero, Pill, Reveal, Section } from "@/components/site/Blocks";
import { PackageCard } from "@/components/site/Cards";
import { PACKAGE_CATEGORIES, getPublishedPackages } from "@/data/packages";
import { images, COMPLIANCE_NOTES } from "@/data/site";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";
import type { Category } from "@/data/types";

export const Route = createFileRoute("/packages/")({
  head: pageMeta(
    "Holiday & Tour Packages",
    "Beach escapes, festive departures, honeymoons, family and group tours, African cultural journeys, city breaks, pilgrimage and corporate retreats — with deposits, deadlines and cancellation tiers on every listing.",
  ),
  component: PackagesIndex,
});

const BUDGETS = [
  { label: "Any budget", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under ₦1.5m", min: 0, max: 1_500_000 },
  { label: "₦1.5m – ₦2.5m", min: 1_500_000, max: 2_500_000 },
  { label: "₦2.5m – ₦4m", min: 2_500_000, max: 4_000_000 },
  { label: "₦4m+", min: 4_000_000, max: Number.POSITIVE_INFINITY },
] as const;

function PackagesIndex() {
  const all = getPublishedPackages();
  const navigate = useNavigate();
  const { money } = useCurrency();
  const [category, setCategory] = useState<Category | "All">("All");
  const [budget, setBudget] = useState<number>(0);
  const [flights, setFlights] = useState<"any" | "included" | "excluded">("any");
  const [earlyOnly, setEarlyOnly] = useState(false);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const b = BUDGETS[budget] as (typeof BUDGETS)[number];
    return all
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) => (p.pricePerPerson >= b.min && p.pricePerPerson < b.max ? true : false))
      .filter((p) =>
        flights === "any" ? true : flights === "included" ? p.flightsIncluded : !p.flightsIncluded,
      )
      .filter((p) => (earlyOnly ? p.earlyBird : true))
      .filter((p) =>
        q.trim() === ""
          ? true
          : `${p.title} ${p.destination} ${p.country}`
              .toLowerCase()
              .includes(q.toLowerCase().trim()),
      );
  }, [all, category, budget, flights, earlyOnly, q]);

  const activeFilters =
    (category !== "All" ? 1 : 0) +
    (budget !== 0 ? 1 : 0) +
    (flights !== "any" ? 1 : 0) +
    (earlyOnly ? 1 : 0) +
    (q ? 1 : 0);

  return (
    <>
      <PageHero
        image={images.resort}
        eyebrow="Hague Experiences"
        title={
          <>
            Holidays worth <em className="text-gold">the wait</em>.
          </>
        }
        sub="Managed listings, not flyers. Every package shows its itinerary, hotel category, meals, transfers, exclusions, deposit schedule, cancellation tiers, group size, remaining spaces and visa position before you enquire."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Deposits & staged payments</Pill>
          <Pill tone="gold">Early-bird pricing</Pill>
          <Pill tone="gold">Automatic expiry of past dates</Pill>
        </div>
      </PageHero>

      <Section
        eyebrow="Catalogue"
        title={`${list.length} departure${list.length === 1 ? "" : "s"} open`}
        sub="Filter by the nine package categories the CMS supports. Prices are indicative per person and confirmed against live supplier inventory."
        size="sm"
        action={
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setBudget(0);
              setFlights("any");
              setEarlyOnly(false);
              setQ("");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-input bg-card px-4 py-2 text-xs font-bold transition hover:bg-accent"
          >
            <X className="h-3.5 w-3.5" /> Clear {activeFilters > 0 ? `(${activeFilters})` : ""}
          </button>
        }
      >
        {/* Category chips */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {(["All", ...PACKAGE_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c as Category | "All")}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[13px] font-bold transition",
                category === c
                  ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                  : "border-input bg-card hover:border-gold/60",
              )}
            >
              {c}
              <span className="ml-1.5 text-[11px] font-semibold opacity-70">
                {c === "All" ? all.length : all.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>

        {/* Secondary filters */}
        <div className="mt-4 grid gap-3 rounded-3xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Search
            <div className="relative mt-1.5 normal-case tracking-normal">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Zanzibar, Dubai, Maldives…"
                className="field-base pl-9"
              />
            </div>
          </label>
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Budget per person
            <select
              className="field-base mt-1.5 normal-case tracking-normal"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            >
              {BUDGETS.map((b, i) => (
                <option key={b.label} value={i}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Flights
            <select
              className="field-base mt-1.5 normal-case tracking-normal"
              value={flights}
              onChange={(e) => setFlights(e.target.value as typeof flights)}
            >
              <option value="any">Any</option>
              <option value="included">Included</option>
              <option value="excluded">Excluded / on request</option>
            </select>
          </label>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setEarlyOnly(!earlyOnly)}
              className={cn(
                "flex h-[46px] w-full items-center justify-center gap-2 rounded-xl border px-3 text-xs font-bold transition",
                earlyOnly
                  ? "border-transparent bg-gold-gradient text-gold-foreground"
                  : "border-input hover:bg-accent",
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" /> Early-bird only
            </button>
          </div>
        </div>

        {list.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 60}>
                <PackageCard p={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-input bg-card p-10 text-center">
            <Palmtree className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 font-semibold">No departure matches those filters</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
              Past-date listings expire automatically. Tell us what you want and we will build it as
              a private group departure.
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/contact", search: { topic: "packages" } })}
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Build my trip
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {[
            {
              t: "Every listing is managed",
              d: "Authorised staff create, duplicate, schedule, publish, unpublish and archive packages without a developer. Seasonal campaigns, promo codes and early-bird pricing are set per listing.",
            },
            {
              t: "Prices confirmed, not invented",
              d: "What you see is indicative. Your consultant confirms live availability, hotel category and flight inventory before any invoice is raised.",
            },
            {
              t: "Capacity you can trust",
              d: "Minimum and maximum group size and remaining spaces are live fields — if the minimum is not met, we offer a date change or a full refund of unpaid balances.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-secondary p-5">
              <p className="font-bold">{x.t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
        <ComplianceNote
          className="mt-5"
          text={`${COMPLIANCE_NOTES.indicative} ${COMPLIANCE_NOTES.fees}`}
        />
      </Section>

      <Section
        tone="muted"
        eyebrow="How a booking works"
        title="Four steps, in writing, before money moves"
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Enquire",
              d: "Send the package, your dates and party size. We check spaces and live flight inventory.",
            },
            {
              t: "Written quote",
              d: "Price per person, single supplement, child rate, deposit and every exclusion — on one page.",
            },
            {
              t: "Deposit",
              d: "Paid against supplier terms. Your seats and hotel allocation are then held in your name.",
            },
            {
              t: "Balance & docs",
              d: "Balance by the stated deadline, then visa pack, insurance, transfers and pre-departure brief.",
            },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 55}>
              <li className="h-full rounded-2xl border border-border bg-card p-5">
                <span className="font-display text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2.5 font-bold">{s.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          Need a private departure for a church, association or company?{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/corporate" })}
            className="font-bold text-primary underline"
          >
            Talk to the corporate desk
          </button>{" "}
          about custom group pricing.
        </p>
      </Section>

      <div className="sr-only">{money(0)}</div>
    </>
  );
}
