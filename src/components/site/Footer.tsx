import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { WHATSAPP, nav } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-ink-gradient text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl">Hague Travel</p>
            <p className="mt-1 text-sm text-gold">Your Journey. Our Responsibility.</p>
            <p className="mt-5 max-w-md text-sm text-ink-foreground/65">
              Flights, holidays, study abroad, relocation and travel-industry careers — online convenience with real experts beside you.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-foreground/75">
              {nav.slice(0, 5).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-foreground/75">
              {nav.slice(5).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>)}
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-ink-foreground/10 pt-6 text-xs leading-relaxed text-ink-foreground/50">
          Fares shown are indicative until confirmed by a supplier. Visa and passport decisions rest solely with the relevant authority. Government fees are shown separately from agency fees. Academy certificates are not IATA or government accreditation.
          <p className="mt-3">© {new Date().getFullYear()} Hague Travel. Demo preview.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-ink-foreground shadow-elegant transition hover:scale-110">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
