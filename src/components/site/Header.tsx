import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Globe2, LayoutDashboard, Menu, MessageCircle, Plane, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/lib/currency";
import { SmartLink } from "./SmartLink";
import { BRAND, CURRENCIES, NAV_FLAT, NAV_GROUPS, waLink, waMessages } from "@/data/site";
import type { CurrencyCode } from "@/data/types";
import { toast } from "sonner";
import { MobileConsultBar } from "./Footer";

/**
 * Mega-menu header. Transparent over the dark hero, solid once scrolled.
 * Mobile gets a full-height slide-out drawer with expandable service groups.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("Flights & Travel");
  const navRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const { code, setCode } = useCurrency();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega menu on route change and on Escape.
  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const active = NAV_GROUPS.find(
    (g) =>
      pathname === g.to ||
      pathname.startsWith(`${g.to}/`) ||
      NAV_GROUPS.some((x) => x.children.some((c) => c.to === pathname || c.to === `${pathname}#`)),
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open ? "bg-ink/95 shadow-elegant backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div
          ref={navRef}
          className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-5 lg:h-20"
        >
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5 text-ink-foreground"
            aria-label={`${BRAND.name} home`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-gradient shadow-gold transition group-hover:rotate-12 lg:h-10 lg:w-10">
              <Plane className="h-4 w-4 -rotate-45 text-gold-foreground lg:h-[18px] lg:w-[18px]" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold tracking-tight lg:text-xl">
                {BRAND.name}
              </span>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-gold sm:block">
                {BRAND.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop mega nav */}
          <nav className="ml-auto hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {NAV_GROUPS.map((g) => (
              <button
                key={g.label}
                type="button"
                onClick={() => setOpen(open === g.label ? null : g.label)}
                onMouseEnter={() => setOpen(g.label)}
                aria-expanded={open === g.label}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold transition",
                  open === g.label || active?.label === g.label
                    ? "bg-ink-foreground/10 text-gold"
                    : "text-ink-foreground/80 hover:text-gold",
                )}
              >
                {g.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    open === g.label && "rotate-180",
                  )}
                />
              </button>
            ))}
            {NAV_FLAT.map((l) => (
              <SmartLink
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[13px] font-semibold transition",
                  pathname === l.to ? "text-gold" : "text-ink-foreground/80 hover:text-gold",
                )}
              >
                {l.label}
              </SmartLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-3">
            {/* Currency switcher — demo display conversion only */}
            <div
              className="hidden items-center gap-1 rounded-full border border-ink-foreground/20 p-0.5 sm:flex"
              role="group"
              aria-label="Display currency"
            >
              <Globe2 className="ml-1.5 h-3.5 w-3.5 text-gold" aria-hidden />
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCode(c.code as CurrencyCode)}
                  aria-pressed={code === c.code}
                  className={cn(
                    "rounded-full px-2 py-1 text-[11px] font-bold transition",
                    code === c.code
                      ? "bg-gold-gradient text-gold-foreground"
                      : "text-ink-foreground/70 hover:text-gold",
                  )}
                  title={
                    c.code === "NGN"
                      ? "Nigerian Naira — primary billing currency"
                      : `${c.label} display conversion (demo)`
                  }
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>

            <Link
              to="/dashboard"
              className="hidden h-9 w-9 place-items-center rounded-full border border-ink-foreground/20 text-ink-foreground/80 transition hover:border-gold hover:text-gold lg:grid"
              aria-label="Customer dashboard"
              title="Customer dashboard (demo)"
            >
              <LayoutDashboard className="h-4 w-4" />
            </Link>

            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-gold-gradient px-4 py-2.5 text-[13px] font-bold text-gold-foreground shadow-gold transition hover:brightness-105 sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" /> Talk to a consultant
            </a>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full glass text-ink-foreground xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mega panel */}
        {open ? (
          <div
            className="absolute inset-x-0 top-full hidden border-t border-ink-foreground/10 bg-ink/98 shadow-elegant backdrop-blur-xl xl:block"
            onMouseLeave={() => setOpen(null)}
          >
            {NAV_GROUPS.map((g) =>
              open === g.label ? (
                <div
                  key={g.label}
                  className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1.4fr_1fr]"
                >
                  <div>
                    <p className="eyebrow">{g.eyebrow}</p>
                    <p className="mt-2 max-w-md font-display text-2xl leading-snug text-ink-foreground">
                      {g.blurb}
                    </p>
                    <ul className="mt-6 grid gap-1 sm:grid-cols-2">
                      {g.children.map((c) => (
                        <li key={`${c.to}-${c.label}`}>
                          <SmartLink
                            to={c.to}
                            hash={c.hash}
                            className="group flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-ink-foreground/8"
                          >
                            <span>
                              <span className="block text-sm font-semibold text-ink-foreground group-hover:text-gold">
                                {c.label}
                              </span>
                              {c.description ? (
                                <span className="mt-0.5 block text-xs text-ink-foreground/55">
                                  {c.description}
                                </span>
                              ) : null}
                            </span>
                            {c.badge ? (
                              <span className="mt-1 shrink-0 rounded-full bg-ink-foreground/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-foreground/70">
                                {c.badge}
                              </span>
                            ) : null}
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                    <SmartLink
                      to={g.to}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold hover:gap-3"
                    >
                      Open {g.label} <ChevronDown className="h-4 w-4 -rotate-90" />
                    </SmartLink>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={g.image}
                      alt=""
                      loading="lazy"
                      className="h-full min-h-44 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-display text-lg leading-snug text-ink-foreground">
                        {BRAND.siteLine}
                      </p>
                      <p className="mt-1 text-xs text-ink-foreground/70">{BRAND.hours}</p>
                    </div>
                  </div>
                </div>
              ) : null,
            )}
          </div>
        ) : null}
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[70] xl:hidden",
          drawer ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!drawer}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300",
            drawer ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setDrawer(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(92vw,26rem)] flex-col bg-ink-gradient text-ink-foreground shadow-elegant transition-transform duration-400 ease-out",
            drawer ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal={drawer}
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between border-b border-ink-foreground/10 px-5 py-4">
            <span className="font-display text-lg font-semibold">
              {BRAND.name}
              <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">
                {BRAND.tagline}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full glass"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <div
              className="mb-4 flex items-center gap-1 rounded-full border border-ink-foreground/15 p-1"
              role="group"
              aria-label="Display currency"
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCode(c.code as CurrencyCode);
                    toast.dismiss();
                  }}
                  className={cn(
                    "flex-1 rounded-full py-2 text-[11px] font-bold transition",
                    code === c.code
                      ? "bg-gold-gradient text-gold-foreground"
                      : "text-ink-foreground/70",
                  )}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>

            {NAV_GROUPS.map((g) => {
              const isOpen = mobileGroup === g.label;
              return (
                <div key={g.label} className="border-b border-ink-foreground/10">
                  <button
                    type="button"
                    onClick={() => setMobileGroup(isOpen ? null : g.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-3.5 text-left font-display text-lg"
                  >
                    {g.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gold transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isOpen ? (
                    <ul className="animate-rise pb-3">
                      {g.children.map((c) => (
                        <li key={`${g.label}-${c.label}`}>
                          <SmartLink
                            to={c.to}
                            hash={c.hash}
                            onClick={() => setDrawer(false)}
                            className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-ink-foreground/80 transition hover:bg-ink-foreground/8 hover:text-gold"
                          >
                            {c.label}
                            {c.badge ? (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-ink-foreground/45">
                                partner
                              </span>
                            ) : null}
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}

            <ul className="mt-1">
              {NAV_FLAT.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setDrawer(false)}
                    className="block border-b border-ink-foreground/10 py-3.5 font-display text-lg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/dashboard"
                  onClick={() => setDrawer(false)}
                  className="block border-b border-ink-foreground/10 py-3.5 font-display text-lg"
                >
                  My dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  onClick={() => setDrawer(false)}
                  className="block border-b border-ink-foreground/10 py-3.5 font-display text-lg"
                >
                  Admin (demo)
                </Link>
              </li>
            </ul>

            <div className="mt-5 rounded-2xl bg-ink-foreground/8 p-4 text-xs leading-relaxed text-ink-foreground/70">
              Prices are a guide. Only an embassy or a government can approve a visa or a passport —
              we never promise an outcome.
            </div>
          </nav>

          <div className="border-t border-ink-foreground/10 p-4">
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 text-sm font-bold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp a consultant
            </a>
          </div>
        </div>
      </div>

      <MobileConsultBar />
    </>
  );
}
