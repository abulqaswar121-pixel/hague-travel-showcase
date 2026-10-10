import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Search, Star } from "lucide-react";
import { ComplianceNote, Notice, PageHero, Pill, Reveal, Section } from "@/components/site/Blocks";
import { HotelCard, HousingCard } from "@/components/site/Cards";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HOTEL_AMENITIES, getHotels, getStudentHousing } from "@/data/hotels";
import { images, COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/hotels")({
  head: pageMeta(
    "Hotels, Apartments & Long-Stay Housing",
    "Search hotels, serviced apartments and villas with star and amenity filters, plus dedicated long-stay housing for students and relocating professionals.",
  ),
  component: Hotels,
});

const enquiryFields: FieldDef[] = [
  ...contactFields,
  { name: "property", label: "Property or area", placeholder: "Kensington Gardens Suites, London" },
  { name: "checkIn", label: "Check-in", type: "date" },
  { name: "checkOut", label: "Check-out", type: "date" },
  {
    name: "rooms",
    label: "Rooms & guests",
    type: "select",
    options: [
      "1 room · 1 adult",
      "1 room · 2 adults",
      "1 room · 2+2 family",
      "2 rooms",
      "3+ rooms / group",
    ],
  },
  {
    name: "basis",
    label: "Board basis",
    type: "select",
    options: ["Room only", "Breakfast", "Half board", "Full board", "All inclusive"],
  },
  {
    name: "notes",
    label: "Requests",
    type: "textarea",
    required: false,
    full: true,
    placeholder: "Cot, connecting rooms, late check-out, airport distance, invoice to company…",
  },
  {
    name: "consent",
    label: "I understand rates are indicative until the supplier confirms",
    type: "checkbox",
    help: "Availability, rate and cancellation rules are confirmed with the property before any payment.",
  },
];

const housingFields: FieldDef[] = [
  ...contactFields,
  {
    name: "city",
    label: "City or university",
    placeholder: "Manchester / University of Manchester",
  },
  {
    name: "budget",
    label: "Monthly budget",
    type: "number",
    min: 100000,
    max: 4000000,
    help: "Rent plus bills, in naira. We search inside this number first.",
  },
  {
    name: "deposit",
    label: "Deposit you can fund",
    type: "select",
    options: ["Up to 1 month", "2 months", "3+ months", "Guarantor instead", "Not sure"],
  },
  { name: "moveIn", label: "Earliest move-in", type: "date" },
  {
    name: "duration",
    label: "Length of stay",
    type: "select",
    options: ["3–6 months", "6–12 months", "1 academic year", "2 years", "Rolling monthly"],
  },
  {
    name: "near",
    label: "Must be near",
    type: "select",
    options: [
      "University campus",
      "Workplace",
      "Transit line",
      "Safe residential area",
      "Budget first",
    ],
  },
  {
    name: "musts",
    label: "Non-negotiables",
    type: "textarea",
    required: false,
    full: true,
    placeholder: "En-suite, bills included, no shared kitchen, pet friendly, ground floor…",
  },
  {
    name: "consent",
    label: "I understand listings are indicative and viewed before signing",
    type: "checkbox",
    help: "We never ask you to pay a deposit to an unverified landlord or agent.",
  },
];

function Hotels() {
  const hotels = getHotels();
  const housing = getStudentHousing();
  const { money } = useCurrency();
  const [q, setQ] = useState("");
  const [stars, setStars] = useState<number | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [max, setMax] = useState<number>(700000);
  const [enquiring, setEnquiring] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      hotels.filter((h) => {
        const text = `${h.name} ${h.city} ${h.country} ${h.kind}`.toLowerCase();
        const okQ = q.trim() === "" || text.includes(q.toLowerCase().trim());
        const okStars = stars === null || h.stars >= stars;
        const okAmen = amenities.every((a) => h.amenities.includes(a));
        const okMax = h.pricePerNight <= max;
        return okQ && okStars && okAmen && okMax;
      }),
    [hotels, q, stars, amenities, max],
  );

  const toggleAmenity = (a: string) =>
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  return (
    <>
      <PageHero
        image={images.hotel}
        eyebrow="Global Stays"
        title={
          <>
            Rest well, <em className="text-gold">wherever</em> you land.
          </>
        }
        sub="Hotels, serviced apartments, hostels and villas with the filters you expect — plus a dedicated long-stay desk for students and relocating professionals."
      />

      <Section eyebrow="Search" title="Find the stay, then let us hold it" size="sm">
        <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
            <label
              className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground"
              htmlFor="hq"
            >
              Destination
            </label>
            <div className="mt-1.5 flex gap-2">
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="hq"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="City, hotel or area"
                  className="w-full rounded-xl border border-input bg-background py-3 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-4 text-sm font-bold text-gold-foreground shadow-gold"
              >
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  htmlFor="hcheckin"
                >
                  Check-in
                </label>
                <input id="hcheckin" type="date" className="field-base mt-1.5" />
              </div>
              <div>
                <label
                  className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  htmlFor="hout"
                >
                  Check-out
                </label>
                <input id="hout" type="date" className="field-base mt-1.5" />
              </div>
              <div>
                <label
                  className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  htmlFor="hguests"
                >
                  Guests & rooms
                </label>
                <select id="hguests" className="field-base mt-1.5">
                  <option>2 adults · 1 room</option>
                  <option>1 adult · 1 room</option>
                  <option>Family 2 + 2</option>
                  <option>Group 10+</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-secondary p-4 sm:p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Filters
            </p>
            <div className="mt-3">
              <p className="text-xs font-bold">Star rating</p>
              <div className="mt-1.5 flex gap-1.5">
                {[3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStars(stars === s ? null : s)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold transition",
                      stars === s
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-input bg-card hover:bg-accent",
                    )}
                  >
                    {s}
                    <Star className="h-3 w-3 fill-current" />+
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold">Max per night · {money(max, { compact: true })}</p>
              <input
                type="range"
                min={50000}
                max={700000}
                step={10000}
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--color-primary)]"
              />
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold">Amenities</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {HOTEL_AMENITIES.slice(0, 7).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition",
                      amenities.includes(a)
                        ? "border-transparent bg-gold-gradient text-gold-foreground"
                        : "border-input bg-card hover:bg-accent",
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Availability"
        title={`${filtered.length} stay${filtered.length === 1 ? "" : "s"} matching your filters`}
        sub="Rates are indicative per room per night. Cancellation rules and inclusions are confirmed with the property before payment."
        size="sm"
      >
        {filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((h, i) => (
              <Reveal key={h.id} delay={i * 45}>
                <HotelCard
                  h={h}
                  onOpen={(id) => {
                    setEnquiring(id);
                    document
                      .getElementById("enquiry")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <Notice tone="sea" icon={Search} title="Nothing matched — widen the search">
            Try removing an amenity or raising the nightly budget. Or send us the brief: our desk
            sources inventory beyond what is displayed here.
          </Notice>
        )}
        <ComplianceNote className="mt-5" text={COMPLIANCE_NOTES.indicative} />
      </Section>

      {/* Long-stay / student housing tab */}
      <section className="bg-ink-gradient py-14 text-ink-foreground lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <Tabs defaultValue="short" className="mt-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Two desks, one booking team</p>
                <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  Nights, or months.
                </h2>
              </div>
              <TabsList className="w-full justify-start rounded-full bg-ink-foreground/10 p-1 sm:w-auto">
                <TabsTrigger
                  value="short"
                  className="rounded-full px-4 text-xs data-[state=active]:bg-gold-gradient data-[state=active]:text-gold-foreground sm:text-sm"
                >
                  Hotels & short stays
                </TabsTrigger>
                <TabsTrigger
                  value="long"
                  className="rounded-full px-4 text-xs data-[state=active]:bg-gold-gradient data-[state=active]:text-gold-foreground sm:text-sm"
                >
                  Long-stay & student housing
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="short" className="mt-6">
              <div className="rounded-3xl glass p-6">
                <p className="max-w-2xl text-sm leading-relaxed text-ink-foreground/85">
                  Booking vouchers, cancellation rules and reservation support come from our hotel
                  desk. Family rooms, airport hotels and long-stay rates are all requested against
                  the same file as your flight, so a delay on one leg rebooks the other without you
                  chasing anyone.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Pill>Vouchers by email</Pill>
                  <Pill>Cancellation rules stated upfront</Pill>
                  <Pill>Company invoicing</Pill>
                  <Pill>Airport hotels</Pill>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="long" className="mt-6 space-y-5">
              <div className="rounded-3xl glass p-6">
                <p className="max-w-2xl text-sm leading-relaxed text-ink-foreground/85">
                  A separate long-stay category for students and relocating professionals: monthly
                  budgets, deposits, move-in dates and proximity to your university or workplace. We
                  verify the landlord or provider, review the tenancy terms with you, and never ask
                  you to send a deposit to an unconfirmed account.
                </p>
              </div>
              <div className="grid gap-4">
                {housing.map((h, i) => (
                  <Reveal key={h.id} delay={i * 50}>
                    <div className="rounded-3xl bg-card/95 p-1.5 text-card-foreground">
                      <HousingCard h={h} />
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill tone="gold">Bills explained</Pill>
                <Pill tone="gold">Deposit rules per country</Pill>
                <Pill tone="gold">Viewing coordination</Pill>
                <Pill tone="gold">Tenancy-term review</Pill>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 py-14 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-5 lg:grid-cols-2">
          <div>
            <Tabs defaultValue="hotel" className="mb-4">
              <TabsList className="rounded-full bg-secondary p-1">
                <TabsTrigger
                  value="hotel"
                  className="rounded-full px-4 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm"
                >
                  Hotel enquiry
                </TabsTrigger>
                <TabsTrigger
                  value="housing"
                  className="rounded-full px-4 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm"
                >
                  Long-stay request
                </TabsTrigger>
              </TabsList>
              <TabsContent value="hotel" className="mt-4">
                <EnquiryForm
                  title={enquiring ? "Accommodation enquiry" : "Enquire about a stay"}
                  description="We check live room availability, exact rate and cancellation rules with the property, then send it in writing."
                  cta="Send accommodation enquiry"
                  refPrefix="HTH"
                  fields={enquiryFields}
                  note={COMPLIANCE_NOTES.indicative}
                  successTitle="Enquiry received"
                  successLines={[
                    "The property is contacted for live availability against your dates.",
                    "You receive a written rate card: room type, board basis, taxes and cancellation deadline.",
                    "Nothing is paid until you confirm that card in writing.",
                  ]}
                />
              </TabsContent>
              <TabsContent value="housing" className="mt-4">
                <EnquiryForm
                  title="Student & relocation housing request"
                  description="Tell us the budget, the deposit you can fund and where you need to be. We shortlist verified options before you fly."
                  cta="Request housing shortlist"
                  refPrefix="HTL"
                  fields={housingFields}
                  note="We never ask you to transfer a deposit to an unverified account. Tenancy terms are reviewed with you before signature."
                  successTitle="Housing brief received"
                  successLines={[
                    "We shortlist verified providers inside your monthly budget.",
                    "You get deposits, bills, move-in dates and a link to view remotely.",
                    "We review the tenancy terms with you before you sign anything.",
                  ]}
                />
              </TabsContent>
            </Tabs>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Prefer to talk?{" "}
              <a
                href={waLink(waMessages.hotels)}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-primary underline"
              >
                Message the hotel desk on WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="space-y-3">
            <img
              src={images.hotel}
              alt="Hotel room with warm lighting"
              loading="lazy"
              className="aspect-4/3 w-full rounded-3xl object-cover shadow-soft"
            />
            <div className="rounded-3xl border border-border bg-secondary p-5">
              <p className="font-bold">What our hotel desk handles</p>
              <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li>· Hotels, serviced apartments, hostels and holiday villas</li>
                <li>· Filters for location, price, star rating and amenities</li>
                <li>· Family rooms, airport hotels and long-stay accommodation</li>
                <li>· Student halls and relocation housing near campus</li>
                <li>· Booking vouchers, cancellation rules and reservation support</li>
                <li>· Room-block negotiation for groups and corporate moves</li>
              </ul>
            </div>
            <Notice title="Taxes and levies">
              City tax, tourism levies and service charges are shown separately on your confirmation
              so the number you pay matches the number you approved.
            </Notice>
          </div>
        </div>
      </section>
    </>
  );
}
