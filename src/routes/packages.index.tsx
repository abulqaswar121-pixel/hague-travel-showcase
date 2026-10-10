import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Blocks";
import { PackageCard } from "@/components/site/Cards";
import { images, packages } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/packages/")({
  head: () => meta("Holiday & Tour Packages", "Beach escapes, festive breaks, honeymoons, African cultural tours and city breaks with flexible deposits."),
  component: Packages,
});

const cats = ["All", "Honeymoon", "Festive", "African Cultural", "City Break"];

function Packages() {
  const [c, setC] = useState("All");
  const list = c === "All" ? packages : packages.filter((p) => p.category === c);
  return (
    <>
      <PageHero image={images.resort} eyebrow="Hague Experiences" title="Holidays worth the wait." sub="Curated packages with flights, stays and experiences. Secure your spot with a deposit." />
      <Section title="Upcoming departures">
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {cats.map((x) => (
            <button key={x} onClick={() => setC(x)} className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${c === x ? "bg-primary text-primary-foreground" : "border bg-card"}`}>{x}</button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{list.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
      </Section>
    </>
  );
}
