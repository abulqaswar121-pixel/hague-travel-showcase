import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SmartLink } from "./SmartLink";
import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, COMPLIANCE_NOTES, FOOTER_COLUMNS, WHATSAPP, waLink, waMessages } from "@/data/site";

export function WhatsAppFab() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <a
      href={waLink(waMessages.general)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with a Hague Travel consultant on WhatsApp"
      className={cn(
        "fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-elegant transition-all duration-500 hover:scale-105 lg:bottom-6 lg:right-6",
        mounted ? "opacity-100" : "opacity-0",
      )}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}

/** Sticky mobile bar — the fastest route to a human on a 390px screen. */
export function MobileConsultBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-3 py-2.5 backdrop-blur-lg transition-transform duration-400 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-2">
        <a
          href={waLink(waMessages.support)}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-bold text-whatsapp-foreground"
        >
          <MessageCircle className="h-4 w-4" /> Talk to a consultant
        </a>
        <Link
          to="/contact"
          className="rounded-full border border-input px-4 py-3 text-sm font-semibold"
        >
          Callback
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink-gradient text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-16 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2.4fr]">
          <div>
            <p className="font-display text-3xl leading-tight">{BRAND.name}</p>
            <p className="mt-1.5 text-sm font-semibold text-gold">{BRAND.tagline}</p>
            <p className="mt-2 text-xs text-ink-foreground/55">{BRAND.group}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
              {BRAND.siteLine}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-foreground/70">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-gold">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {BRAND.hours}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {BRAND.address}
              </li>
            </ul>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-whatsapp-foreground transition hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" /> Chat with the travel desk
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="eyebrow">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/70">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.to}`}>
                      <SmartLink to={l.to} hash={l.hash} className="transition hover:text-gold">
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-5">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> How this preview works
          </p>
          <div className="mt-3 grid gap-3 text-xs leading-relaxed text-ink-foreground/60 sm:grid-cols-2 lg:grid-cols-3">
            <p>{COMPLIANCE_NOTES.indicative}</p>
            <p>{COMPLIANCE_NOTES.visa}</p>
            <p>{COMPLIANCE_NOTES.fees}</p>
            <p>{COMPLIANCE_NOTES.passport}</p>
            <p>{COMPLIANCE_NOTES.partners}</p>
            <p>{COMPLIANCE_NOTES.academy}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.company} · {BRAND.rc}. Demonstration preview — no
            live fares, inventory, payments or bookings.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <Link to="/terms" className="hover:text-gold">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link to="/refund-policy" className="hover:text-gold">
              Refunds
            </Link>
            <Link to="/visa-disclaimer" className="hover:text-gold">
              Visa disclaimer
            </Link>
            <Link to="/faqs" className="hover:text-gold">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
