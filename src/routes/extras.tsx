import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accessibility,
  Armchair,
  Bus,
  Car,
  CarFront,
  KeyRound,
  Luggage,
  Map,
  Smartphone,
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
  Tabs,
} from "@/components/site/Blocks";
import {
  DESTINATION_GUIDES,
  PACKING_CHECKLISTS,
  TRAVEL_EXTRAS,
  SERVICE_IMAGES,
} from "@/data/services";
import { COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { useCurrency } from "@/lib/currency";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/extras")({
  head: pageMeta(
    "Airport Transfers, Lounges, eSIM & Travel Extras",
    "Airport pickups, group coaches, lounge access, SIM and eSIM data, extra baggage, special assistance, car hire, destination guides and printable packing checklists.",
  ),
  component: Extras,
});

const ICONS: Record<string, typeof Car> = {
  Car,
  CarFront,
  Bus,
  Armchair,
  Smartphone,
  Accessibility,
  KeyRound,
  Luggage,
};

const fields: FieldDef[] = [
  ...contactFields,
  {
    name: "extra",
    label: "What do you need?",
    type: "select",
    options: TRAVEL_EXTRAS.map((e) => e.title),
  },
  { name: "when", label: "Date & time of service", type: "date" },
  {
    name: "airport",
    label: "Airport or city",
    placeholder: "LOS Terminal 1 / Manchester city centre",
    full: true,
  },
  {
    name: "party",
    label: "Party size & bags",
    type: "select",
    options: ["1 · 1 bag", "2 · 2 bags", "Family 2+2 · 6 bags", "Group 10+", "Group 30+"],
  },
  {
    name: "flight",
    label: "Flight number",
    required: false,
    placeholder: "BA5484 — so we track your arrival",
  },
  {
    name: "notes",
    label: "Special requirements",
    type: "textarea",
    required: false,
    full: true,
    placeholder:
      "Wheelchair, child seat, oversize sports gear, late-night arrival, meet inside customs…",
  },
  {
    name: "consent",
    label: "I understand add-ons are subject to supplier availability",
    type: "checkbox",
    help: "We confirm the vehicle, lounge or SIM is actually available before charging you.",
  },
];

function Extras() {
  const { money } = useCurrency();
  return (
    <>
      <PageHero
        image={SERVICE_IMAGES.hero}
        eyebrow="Transfers & Travel Extras"
        title={
          <>
            The parts that make a trip <em className="text-gold">work</em>.
          </>
        }
        sub="Airport transfers, lounge access, connectivity, baggage, assistance and the destination knowledge a guide would give you — arranged on the same file as your flight."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Added to any booking</Pill>
          <Pill>Fixed prices, no surge</Pill>
          <Pill>Supplier-vetted</Pill>
        </div>
      </PageHero>

      <Section
        eyebrow="Ground & comfort"
        title="Add-ons, priced"
        sub="Indicative prices confirmed against the supplier before you pay."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRAVEL_EXTRAS.map((x, i) => {
            const Icon = ICONS[x.icon] ?? Car;
            return (
              <Reveal key={x.id} delay={i * 45}>
                <div className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <p className="mt-4 font-semibold leading-snug">{x.title}</p>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {x.description}
                  </p>
                  <ul className="mt-3 space-y-1 text-[11px] text-muted-foreground">
                    {x.bullets.map((b) => (
                      <li key={b}>· {b}</li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-border pt-3 text-sm">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Indicative from
                    </span>
                    <br />
                    <span className="font-display text-xl">{money(x.priceFrom)}</span>
                    <span className="text-xs text-muted-foreground"> {x.unit}</span>
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <section
        id="transfers"
        className="scroll-mt-24 bg-ink-gradient py-14 text-ink-foreground lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Transfers, done properly</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              A driver who is already tracking your flight
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-foreground/80">
              Every transfer is booked against your flight number. If you are delayed, the driver
              knows before you reach the curb — that single detail is why families and groups use
              this desk instead of a ride-hail app at 3am.
            </p>
            <div className="mt-7">
              <FeatureGrid
                tone="dark"
                columns={2}
                items={[
                  "Airport pickup and drop-off",
                  "Private vehicles & group coaches",
                  "Meet-and-greet with name board",
                  "Baggage and special-assistance requests",
                  "Child seats and wheelchair vans",
                  "Local transport & car hire via suppliers",
                  "Unaccompanied minor escort",
                  "Corporate invoicing for staff travel",
                ]}
              />
            </div>
          </div>
          <Tabs
            tabs={[
              { id: "arrivals", label: "Arrivals" },
              { id: "departures", label: "Departures" },
              { id: "groups", label: "Groups" },
            ]}
            panels={{
              arrivals: (
                <div className="rounded-3xl glass p-6">
                  <p className="font-display text-2xl">Arrival protocol</p>
                  <ol className="mt-4 space-y-2.5 text-sm text-ink-foreground/85">
                    {[
                      "We monitor your inbound flight from wheels-up",
                      "Driver is at the meeting point before you land",
                      "WhatsApp message with name, photo and plate",
                      "Assistance through immigration if you booked it",
                      "Bottled water, phone charger and a printed first-day plan",
                      "Drop-off with a walk-through of your building or hotel",
                    ].map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-[10px] font-black text-gold-foreground">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              ),
              departures: (
                <div className="rounded-3xl glass p-6">
                  <p className="font-display text-2xl">Departure protocol</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/85">
                    {[
                      "Pickup time calculated backwards from check-in close, with traffic buffer",
                      "Baggage count confirmed the night before",
                      "Check-in and baggage-drop assistance on request",
                      "Fast-track and lounge added where the terminal supports it",
                      "Return transfer booked against the same file",
                    ].map((s) => (
                      <li key={s} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
              groups: (
                <div className="rounded-3xl glass p-6">
                  <p className="font-display text-2xl">Group & corporate moves</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-foreground/85">
                    Coaches for 30–50 travellers, split pickups across terminals, luggage trailers,
                    a ground manager with a manifest, and one consolidated invoice. Used for
                    pilgrimage groups, retreats, school teams and rotational crew moves.
                  </p>
                  <Link
                    to="/corporate"
                    className="mt-5 inline-flex rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-gold-foreground"
                  >
                    Corporate travel desk
                  </Link>
                </div>
              ),
            }}
          />
        </div>
      </section>

      <Section
        eyebrow="Knowledge"
        title="Destination guides & packing checklists"
        sub="Written by the consultants who send clients there. No affiliate padding — just what actually matters on day one."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATION_GUIDES.map((g, i) => (
            <Reveal key={g.city} delay={i * 50}>
              <article className="lift h-full rounded-3xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-display text-xl">
                    <Map className="h-4 w-4 text-gold" /> {g.city}
                  </p>
                  <Pill>{g.reading} read</Pill>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{g.country}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {g.covers.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PACKING_CHECKLISTS.map((c) => (
            <div key={c.id} className="rounded-3xl border border-border bg-secondary p-5">
              <p className="font-bold">{c.title}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <span className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded border-2 border-primary/50" />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-muted-foreground">
                Ask your consultant for the printable version with your booking.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section id="add" className="scroll-mt-24 py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-5 lg:grid-cols-[1.1fr_1fr]">
          <EnquiryForm
            title="Add an extra to my trip"
            description="Transfers, lounges, eSIM, baggage, assistance or car hire. Mention your booking reference and we add it to the same file."
            cta="Request this add-on"
            refPrefix="HTX"
            fields={fields}
            note={COMPLIANCE_NOTES.indicative}
            successTitle="Add-on request received"
            successLines={[
              "We confirm supplier availability and the fixed price in writing.",
              "Vouchers and instructions arrive by email before travel day.",
              "Anything that touches your flight is recorded in the booking.",
            ]}
          />
          <div className="space-y-3">
            <Notice title="Not a booking until the supplier confirms">
              Add-on prices on this page are indicative. A driver, lounge slot or eSIM bundle is
              only yours once the supplier confirms and we send a voucher.
            </Notice>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="font-bold">Frequently added together</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>· Students: transfer + eSIM + extra bag + arrival orientation</li>
                <li>· Honeymoons: lounge + private transfer + champagne on arrival</li>
                <li>· Groups: coach + ground manager + split-terminal pickups</li>
                <li>· Business: lounge + fast-track + invoiced transfers</li>
              </ul>
              <a
                href={waLink(waMessages.general)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp-foreground"
              >
                Ask the extras desk
              </a>
            </div>
            <ComplianceNote text={COMPLIANCE_NOTES.fees} />
          </div>
        </div>
      </section>
    </>
  );
}
