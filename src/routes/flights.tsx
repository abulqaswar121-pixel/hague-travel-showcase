import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Luggage, Plane, RefreshCw, Search, SlidersHorizontal, Users } from "lucide-react";
import {
  ComplianceNote,
  IndicativeTag,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
} from "@/components/site/Blocks";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import { BookingPanel } from "@/components/site/BookingPanel";
import { CABINS, TRIP_TYPES } from "@/components/site/search";
import { searchDemoFlights } from "@/data/flights";
import { AIRPORTS } from "@/data/flights";
import { images, COMPLIANCE_NOTES } from "@/data/site";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";
import type { FlightResult } from "@/data/types";

export interface FlightSearch {
  from?: string;
  to?: string;
  tripType?: string;
  depart?: string;
  ret?: string;
  pax?: number;
  cabin?: string;
  flexible?: string;
}

function str(search: RawSearch, key: string): string | undefined {
  const v = search[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

function num(search: RawSearch, key: string): number | undefined {
  const v = search[key];
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : Number.NaN;
  return Number.isFinite(n) ? n : undefined;
}

function readSearch(search: RawSearch): FlightSearch {
  const out: FlightSearch = {};
  const from = str(search, "from");
  const to = str(search, "to");
  const tripType = str(search, "tripType");
  const depart = str(search, "depart");
  const ret = str(search, "ret");
  const cabin = str(search, "cabin");
  const flexible = str(search, "flexible");
  const pax = num(search, "pax");
  if (from) out.from = from;
  if (to) out.to = to;
  if (tripType) out.tripType = tripType;
  if (depart) out.depart = depart;
  if (ret) out.ret = ret;
  if (cabin) out.cabin = cabin;
  if (flexible) out.flexible = flexible;
  if (pax) out.pax = pax;
  return out;
}

type RawSearch = Record<string, unknown>;

export const Route = createFileRoute("/flights")({
  head: pageMeta(
    "Flight Booking & Quotations",
    "Search domestic and international flights with cabins, bags and fare rules side by side. Prices are a guide until a consultant checks with the airline.",
  ),
  validateSearch: readSearch,
  component: Flights,
});

const quoteFields: FieldDef[] = [
  ...contactFields,
  { name: "route", label: "Route", placeholder: "Lagos (LOS) → London (LHR)", full: true },
  { name: "outbound", label: "Outbound date", type: "date" },
  { name: "inbound", label: "Return date", type: "date", required: false },
  {
    name: "paxGroup",
    label: "Passengers",
    type: "select",
    options: ["1 adult", "2 adults", "3–5", "Family (2+2)", "6–9", "10+ group"],
  },
  {
    name: "fareType",
    label: "Fare type",
    type: "select",
    options: ["Published", "Student / youth", "Corporate / contract", "Group", "Not sure"],
  },
  {
    name: "flexible",
    label: "Date flexibility",
    type: "select",
    options: ["Fixed dates", "±3 days", "±1 week", "Whole month"],
  },
  { name: "cabin", label: "Cabin", type: "select", options: [...CABINS] },
  {
    name: "notes",
    label: "Special requests",
    type: "textarea",
    required: false,
    placeholder:
      "Seat preferences, meals, extra baggage, unaccompanied minor, wheelchair, lap infants…",
    full: true,
    help: "Anything that affects price should be here now — it stops the quote changing later.",
  },
  {
    name: "consent",
    label: "I understand this is a quotation request",
    type: "checkbox",
    help: "No ticket is issued or confirmed until the airline or consolidator confirms availability and payment is received.",
  },
];

function Flights() {
  const search = Route.useSearch() as FlightSearch;
  const navigate = useNavigate();
  const { money } = useCurrency();
  const [selected, setSelected] = useState<FlightResult | null>(null);
  const [sort, setSort] = useState<"price" | "duration">("price");

  const trip =
    search.tripType && (TRIP_TYPES as readonly string[]).includes(search.tripType)
      ? (search.tripType as (typeof TRIP_TYPES)[number])
      : "Round trip";
  const cabin =
    search.cabin && (CABINS as readonly string[]).includes(search.cabin) ? search.cabin : "Economy";
  const from = search.from ?? "Lagos (LOS)";
  const to = search.to ?? "";
  const pax = search.pax && search.pax > 0 ? search.pax : 1;
  const flexible = search.flexible === "1";
  const searched = Boolean(search.to);

  const results = useMemo(
    () =>
      searched
        ? searchDemoFlights({ from, to, tripType: trip, cabin, pax, flexible }).sort((a, b) =>
            sort === "price"
              ? a.price - b.price
              : Number(a.duration.replace(/\D/g, "")) - Number(b.duration.replace(/\D/g, "")),
          )
        : [],
    [searched, from, to, trip, cabin, pax, flexible, sort],
  );

  return (
    <>
      <PageHero
        image={images.hero}
        eyebrow="Flights & Travel"
        title={
          <>
            Fly anywhere, <em className="text-gold">with a human</em> on your side.
          </>
        }
        sub="Compare cabins, bags and stops yourself. Then a consultant checks the live fare with the airline before we issue anything."
      />

      <div className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-5">
        <BookingPanel />
      </div>

      <Section
        eyebrow="Search results"
        title={
          searched ? `Indicative options · ${from} → ${to}` : "Run a search to see sample options"
        }
        sub="Sample results for this preview. Not live seats. Nothing here is booked."
        size="sm"
      >
        {searched ? (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>
                  <Users className="h-3 w-3" /> {pax} traveller{pax > 1 ? "s" : ""}
                </Pill>
                <Pill>{trip}</Pill>
                <Pill>{cabin}</Pill>
                {flexible ? <Pill tone="gold">Flexible dates</Pill> : null}
                {search.depart ? <Pill tone="muted">Departs {search.depart}</Pill> : null}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSort(sort === "price" ? "duration" : "price")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-input bg-card px-3.5 py-2 text-xs font-bold transition hover:bg-accent"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Sort:{" "}
                  {sort === "price" ? "Cheapest" : "Shortest"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/flights", search: {} as FlightSearch })}
                  className="inline-flex items-center gap-1.5 rounded-full border border-input bg-card px-3.5 py-2 text-xs font-bold transition hover:bg-accent"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {results.map((r, i) => (
                <Reveal key={r.id} delay={i * 55}>
                  <article
                    className={cn(
                      "grid items-center gap-4 rounded-2xl border bg-card p-4 transition-all sm:p-5 lg:grid-cols-[1.35fr_1.9fr_0.9fr_auto]",
                      selected?.id === r.id
                        ? "border-primary ring-2 ring-primary/25"
                        : "border-border hover:border-gold/60",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary">
                        <Plane className="h-4 w-4 text-primary" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{r.airline}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {r.flightNo} · {r.fareConditions}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                      <p className="font-display text-2xl leading-none">{r.departs}</p>
                      <div className="flex-1">
                        <p className="text-center text-[11px] font-semibold text-muted-foreground">
                          {r.duration}
                        </p>
                        <div className="relative my-1 h-px bg-border">
                          <span
                            className={cn(
                              "absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold",
                              r.stops === "Non-stop" ? "left-1/2 -translate-x-1/2" : "right-0",
                            )}
                          />
                        </div>
                        <p className="text-center text-[11px] text-muted-foreground">
                          {r.stops}
                          {r.via ? ` · ${r.via}` : ""}
                        </p>
                      </div>
                      <p className="font-display text-2xl leading-none">
                        {r.arrives}
                        {r.arriveDayPlus ? (
                          <span className="align-super text-[10px]">+1</span>
                        ) : null}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground lg:flex-col lg:items-start">
                      <p className="flex items-center gap-1.5">
                        <Luggage className="h-3.5 w-3.5" />
                        {r.baggage}
                      </p>
                      <p>{r.cabin}</p>
                      {r.seatsLeft <= 3 ? (
                        <p className="font-bold text-sunset">{r.seatsLeft} seats at this level</p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end">
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Indicative return
                        </p>
                        <p className="font-display text-xl leading-tight">{money(r.price)}</p>
                        <p className="text-[10px] text-muted-foreground">per traveller</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(r);
                          document
                            .getElementById("quote")
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="shrink-0 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                      >
                        Request this quote
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
              <Notice title="Nothing here is a ticket">
                <IndicativeTag className="mt-2" />
                <p className="mt-2">
                  Fares, seats and bags on this page are examples. Your consultant asks the airline
                  for the live price, then sends a written quote with the total fare, the bags and
                  the rules.
                </p>
              </Notice>
              <div className="rounded-2xl border border-border bg-secondary p-5 text-sm leading-relaxed">
                <p className="font-bold">Also handled by this desk</p>
                <ul className="mt-2.5 space-y-1.5 text-muted-foreground">
                  <li>· Group, family, student and corporate fares</li>
                  <li>· Multi-city and open-jaw routings</li>
                  <li>· Flexible-date searches across a month</li>
                  <li>· Re-issue, changes, refunds and no-show handling</li>
                  <li>· Extra baggage, sports gear and instruments</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-input bg-card p-8 text-center">
            <Search className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 font-semibold">No search yet</p>
            <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Use the panel above, or tap a route on the home page. This preview makes sample
              results, so you can see the full flow: search, compare, then a real quote from a
              person.
            </p>
          </div>
        )}
        <ComplianceNote className="mt-5" text={COMPLIANCE_NOTES.indicative} />
      </Section>

      <Section
        tone="muted"
        eyebrow="What this desk handles"
        title="Every kind of journey, one team"
        sub="One way, return or many cities. Nigeria or abroad. Published fares or group blocks."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Domestic & international",
              d: "Every Nigerian airport plus global connections, sourced from airlines and approved consolidators.",
            },
            {
              t: "One-way, return, multi-city",
              d: "Want two cities or mixed cabins? That is fine. We price it as one trip, not two tickets.",
            },
            {
              t: "Cabin, baggage & connections",
              d: "Compare total cost, layover risk and what your bag allowance actually is.",
            },
            {
              t: "Group, family, student, corporate",
              d: "Room blocks, payment plans, name-change rules and safety records.",
            },
            {
              t: "Flexible dates & special requests",
              d: "Whole-month searches, meals, wheelchair, UM, instruments, bassinet.",
            },
            {
              t: "Ticketing, changes & refunds",
              d: "Issuance, re-issue, voids, refund filings and supplier follow-through.",
            },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 45}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold">{x.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section id="quote" className="scroll-mt-24 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-5">
          <EnquiryForm
            title={
              selected
                ? `Flight quotation request — ${selected.airline}`
                : "Request a flight quotation"
            }
            description="A consultant checks live seats and sends a written quote. This form does not hold a seat or write a ticket."
            cta="Get my written quotation"
            refPrefix="HTQ"
            successTitle="Quotation request received"
            successLines={[
              "A consultant reviews your route within desk hours (typically under 2 hours).",
              "You receive a written quote: total fare, baggage, fare conditions and payment deadline.",
              "Only after you accept and pay is the ticket issued by the airline or consolidator.",
            ]}
            note={COMPLIANCE_NOTES.indicative}
            banner={
              selected ? (
                <div className="rounded-2xl bg-secondary p-4 text-sm">
                  <p className="font-bold">
                    {selected.airline} · {selected.departs}–{selected.arrives} · {selected.stops}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {selected.cabin} · {selected.baggage} · {selected.fareConditions}. Indicative{" "}
                    {money(selected.price)}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="mt-2 text-xs font-bold text-primary underline"
                  >
                    Clear selection
                  </button>
                </div>
              ) : null
            }
            fields={quoteFields}
          />
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Group, student and corporate enquiries are welcome — mention the size in special
            requests so we route you to the right desk. {COMPLIANCE_NOTES.fees}
          </p>
        </div>
      </section>

      <div className="sr-only" aria-hidden>
        {AIRPORTS.length} airports available in the preview
      </div>
      <p className="sr-only">{COMPLIANCE_NOTES.visa}</p>
    </>
  );
}
