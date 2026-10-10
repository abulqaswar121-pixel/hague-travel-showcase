import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Users } from "lucide-react";
import { naira, type Pkg } from "@/data/site";

export function PackageCard({ p }: { p: Pkg }) {
  return (
    <Link to="/packages/$slug" params={{ slug: p.slug }} className="group lift relative block overflow-hidden rounded-3xl bg-ink">
      <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/5] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="rounded-full glass px-3 py-1 text-xs font-semibold text-ink-foreground">{p.category}</span>
        {p.earlyBird && <span className="rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold text-gold-foreground">Early bird</span>}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
        <p className="text-xs uppercase tracking-widest text-ink-foreground/70">{p.destination} · {p.nights} nights</p>
        <h3 className="mt-2 text-2xl leading-tight">{p.title}</h3>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-foreground/60">From / person</p>
            <p className="font-display text-xl text-gold">{naira(p.from)}</p>
          </div>
          <span className="flex items-center gap-1 text-xs text-ink-foreground/75"><Users className="h-3.5 w-3.5" />{p.spaces} spaces left</span>
        </div>
      </div>
      <ArrowUpRight className="absolute right-4 top-4 h-9 w-9 rounded-full bg-card p-2 text-foreground opacity-0 transition group-hover:opacity-100" />
    </Link>
  );
}
