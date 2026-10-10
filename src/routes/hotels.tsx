import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { contactFields, EnquiryForm, FeatureGrid, PageHero, Section } from "@/components/site/Blocks";
import { images, naira } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/hotels")({
  head: () => meta("Hotels & Long-Stay Accommodation", "Hotels, serviced apartments, villas and student or relocation housing worldwide."),
  component: Hotels,
});

const stays = [
  { n: "The Palm Residence", c: "Dubai Marina", s: 5, p: 285000, img: images.hotel, tag: "Hotel" },
  { n: "Kensington Gardens Suites", c: "London", s: 4, p: 240000, img: images.study, tag: "Serviced apartment" },
  { n: "Azure Lagoon Villas", c: "Maldives", s: 5, p: 610000, img: images.resort, tag: "Villa" },
  { n: "Harbourfront Studios", c: "Toronto", s: 4, p: 1450000, img: images.relocation, tag: "Long stay · monthly" },
];

function Hotels() {
  return (
    <>
      <PageHero image={images.hotel} eyebrow="Global Stays" title="Rest well, wherever you land." sub="Hotels, apartments and villas — plus long-stay homes for students and relocating professionals." />
      <Section eyebrow="Handpicked" title="Stays our travellers love">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stays.map((h) => (
            <article key={h.n} className="lift overflow-hidden rounded-3xl border bg-card">
              <img src={h.img} alt={h.n} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">{h.tag}</p>
                <h3 className="mt-1 text-lg">{h.n}</h3>
                <p className="text-sm text-muted-foreground">{h.c}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex text-gold">{Array.from({ length: h.s }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</span>
                  <span className="text-sm font-semibold">{naira(h.p)}<span className="text-xs font-normal text-muted-foreground">{h.tag.includes("monthly") ? "/mo" : "/night"}</span></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="muted" eyebrow="Long-stay & student housing" title="Moving abroad? We find your first home." sub="Monthly budgets, deposits, move-in dates and proximity to your university or workplace.">
        <FeatureGrid items={["Hotels, apartments, hostels & villas", "Filters by price, stars & amenities", "Family rooms & airport hotels", "Student accommodation near campus", "Relocation housing with deposits", "Vouchers, cancellation rules & support"]} />
        <div className="mt-12 max-w-3xl">
          <EnquiryForm title="Accommodation request" fields={[...contactFields, { name: "city", label: "City / area" }, { name: "type", label: "Stay type", options: ["Hotel", "Serviced apartment", "Student housing", "Relocation long-stay"] }, { name: "budget", label: "Budget (per night / month)" }, { name: "date", label: "Move-in / check-in", type: "date" }]} />
        </div>
      </Section>
    </>
  );
}
