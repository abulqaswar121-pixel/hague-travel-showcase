import { createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, Check, Hotel, Plane, Users, X } from "lucide-react";
import { contactFields, EnquiryForm, Notice, PageHero } from "@/components/site/Blocks";
import { naira, packages } from "@/data/site";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const p = packages.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Package not found | Hague Travel" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.title} | Hague Travel`;
    const d = `${loaderData.nights} nights in ${loaderData.destination} from ${naira(loaderData.from)} per person.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: PackageDetail,
});

function PackageDetail() {
  const p = Route.useLoaderData();
  const facts = [
    { i: CalendarDays, l: "Dates", v: `${p.departs} – ${p.returns}` },
    { i: Hotel, l: "Hotel", v: p.hotel },
    { i: Plane, l: "Flights", v: p.flights ? "Included" : "Excluded" },
    { i: Users, l: "Group size", v: `${p.group} · ${p.spaces} left` },
  ];
  return (
    <>
      <PageHero image={p.image} eyebrow={`${p.category} · ${p.destination}`} title={p.title} sub={`${p.nights} nights of unforgettable moments, from ${naira(p.from)} per person.`} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.l} className="rounded-2xl border bg-card p-4"><f.i className="h-5 w-5 text-gold" /><p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{f.l}</p><p className="text-sm font-medium">{f.v}</p></div>
            ))}
          </div>
          <div>
            <h2 className="text-3xl">Itinerary</h2>
            <ol className="mt-6 space-y-0 border-l-2 border-gold/40 pl-6">
              {p.itinerary.map((d, i) => (
                <li key={d} className="relative pb-6"><span className="absolute -left-[33px] grid h-4 w-4 place-items-center rounded-full bg-gold" /><p className="text-xs font-bold uppercase tracking-widest text-gold">Day {i + 1}</p><p className="mt-1">{d}</p></li>
              ))}
            </ol>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div><h3 className="text-xl">Included</h3><ul className="mt-3 space-y-2 text-sm">{p.includes.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{x}</li>)}</ul></div>
            <div><h3 className="text-xl">Not included</h3><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{p.excludes.map((x) => <li key={x} className="flex gap-2"><X className="h-4 w-4" />{x}</li>)}</ul></div>
          </div>
          <Notice><strong>Visa:</strong> {p.visa}. Approval rests solely with the relevant authority. <strong>Cancellation:</strong> deposits are non-refundable within 30 days of departure; full terms shared before payment.</Notice>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-ink-gradient p-7 text-ink-foreground shadow-elegant">
            <p className="text-xs uppercase tracking-widest text-ink-foreground/60">Price per person (sharing)</p>
            <p className="font-display text-4xl text-gold">{naira(p.from)}</p>
            <div className="mt-4 space-y-1 text-sm text-ink-foreground/80">
              <p>Single occupancy: {naira(p.single)}</p>
              <p>Child (2–11): {naira(p.child)}</p>
              <p className="pt-2 text-gold">{p.deposit}</p>
              <p>{p.deadline}</p>
            </div>
          </div>
          <div className="mt-5"><EnquiryForm title="Reserve your spot" cta="Reserve with deposit" fields={[...contactFields, { name: "guests", label: "Guests", options: ["1", "2", "3", "4", "5+"] }]} /></div>
        </aside>
      </div>
    </>
  );
}
