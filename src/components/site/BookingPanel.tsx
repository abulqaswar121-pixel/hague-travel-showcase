import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BedDouble, GraduationCap, Palmtree, Plane, Search } from "lucide-react";

const tabs = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: BedDouble },
  { id: "packages", label: "Holidays", icon: Palmtree },
  { id: "consult", label: "Study & Relocate", icon: GraduationCap },
] as const;

export function BookingPanel() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("flights");
  const [trip, setTrip] = useState("Round trip");
  const navigate = useNavigate();
  const f = "w-full rounded-xl border-0 bg-background px-4 py-3.5 text-sm text-foreground outline-none ring-1 ring-border focus:ring-2 focus:ring-gold";
  const L = ({ l, children }: { l: string; children: React.ReactNode }) => (
    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{l}<div className="mt-1.5">{children}</div></label>
  );
  const go = () => {
    const to = tab === "flights" ? "/flights" : tab === "hotels" ? "/hotels" : tab === "packages" ? "/packages" : "/study-abroad";
    navigate({ to });
  };

  return (
    <div className="rounded-3xl bg-card p-3 shadow-elegant sm:p-4">
      <div className="flex gap-1 overflow-x-auto rounded-2xl bg-secondary p-1">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${tab === t.id ? "bg-primary text-primary-foreground shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}>
            <t.icon className="h-4 w-4" />{t.label}
          </button>
        ))}
      </div>
      <div className="p-3 pt-5">
        {tab === "flights" && (
          <>
            <div className="mb-4 flex gap-4 text-sm">
              {["Round trip", "One way", "Multi-city"].map((t) => (
                <button key={t} onClick={() => setTrip(t)} className={`border-b-2 pb-1 font-medium ${trip === t ? "border-gold text-foreground" : "border-transparent text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-5">
              <L l="From"><input className={f} defaultValue="Lagos (LOS)" /></L>
              <L l="To"><input className={f} placeholder="London (LHR)" /></L>
              <L l="Depart"><input type="date" className={f} /></L>
              <L l={trip === "One way" ? "Cabin" : "Return"}>{trip === "One way" ? <select className={f}><option>Economy</option><option>Premium</option><option>Business</option><option>First</option></select> : <input type="date" className={f} />}</L>
              <L l="Travellers"><select className={f}><option>1 Adult</option><option>2 Adults</option><option>Family (2+2)</option><option>Group (10+)</option></select></L>
            </div>
          </>
        )}
        {tab === "hotels" && (
          <div className="grid gap-3 md:grid-cols-4">
            <L l="Destination"><input className={f} placeholder="Dubai Marina" /></L>
            <L l="Check-in"><input type="date" className={f} /></L>
            <L l="Check-out"><input type="date" className={f} /></L>
            <L l="Guests"><select className={f}><option>2 adults · 1 room</option><option>Family room</option><option>Long stay (monthly)</option></select></L>
          </div>
        )}
        {tab === "packages" && (
          <div className="grid gap-3 md:grid-cols-3">
            <L l="Experience"><select className={f}><option>Beach & resort</option><option>Honeymoon</option><option>Festive season</option><option>African cultural</option><option>City breaks</option><option>Pilgrimage</option></select></L>
            <L l="When"><input type="month" className={f} /></L>
            <L l="Budget per person"><select className={f}><option>Under ₦1.5m</option><option>₦1.5m – ₦3m</option><option>₦3m+</option></select></L>
          </div>
        )}
        {tab === "consult" && (
          <div className="grid gap-3 md:grid-cols-3">
            <L l="I want to"><select className={f}><option>Study abroad</option><option>Relocate for work</option><option>Relocate with family</option></select></L>
            <L l="Destination"><select className={f}><option>United Kingdom</option><option>Canada</option><option>United States</option><option>Ireland</option><option>Germany</option><option>Australia</option></select></L>
            <L l="Timeline"><select className={f}><option>Next 3 months</option><option>3–6 months</option><option>6–12 months</option></select></L>
          </div>
        )}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">Interactive preview — live fares and confirmed bookings require supplier integration.</p>
          <div className="flex gap-2">
            <button onClick={() => navigate({ to: "/contact" })} className="flex-1 rounded-full border px-5 py-3 text-sm font-semibold sm:flex-none">Request assistance</button>
            <button onClick={go} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground shadow-gold sm:flex-none">
              <Search className="h-4 w-4" />Find options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
