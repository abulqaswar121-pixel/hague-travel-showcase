import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Luggage, Plane } from "lucide-react";
import { BookingPanel } from "@/components/site/BookingPanel";
import { contactFields, EnquiryForm, FeatureGrid, Notice, PageHero, Section } from "@/components/site/Blocks";
import { images, naira } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/flights")({
  head: () => meta("Flight Booking", "Domestic and international flights, multi-city, group and student fares with consultant-confirmed quotations."),
  component: Flights,
});

const results = [
  { airline: "British Airways", dep: "23:15", arr: "05:40", dur: "6h 25m", stops: "Non-stop", bag: "2 × 23kg", price: 1285000, fare: "Changeable with fee" },
  { airline: "Virgin Atlantic", dep: "22:30", arr: "05:10", dur: "6h 40m", stops: "Non-stop", bag: "1 × 23kg", price: 1198000, fare: "Non-refundable" },
  { airline: "Qatar Airways", dep: "14:50", arr: "06:55+1", dur: "15h 05m", stops: "1 stop · DOH", bag: "2 × 23kg", price: 1046000, fare: "Refundable with fee" },
  { airline: "Turkish Airlines", dep: "09:20", arr: "19:45", dur: "13h 25m", stops: "1 stop · IST", bag: "2 × 23kg", price: 982000, fare: "Changeable with fee" },
];

function Flights() {
  const [quote, setQuote] = useState<string | null>(null);
  return (
    <>
      <PageHero image={images.hero} eyebrow="Flights & Travel" title="Fly anywhere, with a human on your side." sub="Compare cabins, baggage and connections — then let a consultant lock in the best confirmed fare." />
      <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-5"><BookingPanel /></div>
      <Section eyebrow="Sample results · Lagos → London" title="Indicative options">
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.airline} className="lift grid items-center gap-4 rounded-2xl border bg-card p-5 md:grid-cols-[1.4fr_2fr_1fr_auto]">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-secondary"><Plane className="h-4 w-4 text-primary" /></span><div><p className="font-semibold">{r.airline}</p><p className="text-xs text-muted-foreground">{r.fare}</p></div></div>
              <div className="flex items-center gap-4"><p className="font-display text-2xl">{r.dep}</p><div className="flex-1 text-center text-xs text-muted-foreground"><div className="h-px bg-border" /><p className="mt-1">{r.dur} · {r.stops}</p></div><p className="font-display text-2xl">{r.arr}</p></div>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Luggage className="h-4 w-4" />{r.bag}</p>
              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                <div className="text-right"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Indicative</p><p className="font-display text-xl">{naira(r.price)}</p></div>
                <button onClick={() => { setQuote(r.airline); document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Request quote</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6"><Notice>Fares are indicative only. No ticket is confirmed until the airline or supplier confirms your booking and payment.</Notice></div>
      </Section>
      <Section tone="muted" eyebrow="What we handle" title="Every kind of journey">
        <FeatureGrid items={["Domestic & international flights", "One-way, return & multi-city", "Cabin, baggage & connection comparison", "Group, family, student & corporate fares", "Flexible-date & special requests", "Ticketing, changes & refund assistance"]} />
      </Section>
      <section id="quote" className="py-20"><div className="mx-auto max-w-3xl px-5">
        <EnquiryForm title={quote ? `Flight quotation — ${quote}` : "Request a flight quotation"} cta="Get my confirmed quote" note="A consultant replies within 2 hours (8am–10pm WAT)."
          fields={[...contactFields, { name: "route", label: "Route", full: true }, { name: "dates", label: "Travel dates" }, { name: "pax", label: "Passengers", options: ["1", "2", "3–5", "6–9", "10+ (group)"] }, { name: "notes", label: "Special requests", type: "textarea", full: true }]} />
      </div></section>
    </>
  );
}
