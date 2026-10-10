import { Link } from "@tanstack/react-router";
import { Menu, Plane, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ink/90 backdrop-blur-xl shadow-elegant" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20">
        <Link to="/" className="flex items-center gap-2.5 text-ink-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-gradient shadow-gold">
            <Plane className="h-4 w-4 -rotate-45 text-gold-foreground" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-tight">Hague Travel</span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-gold">Your Journey. Our Responsibility.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-ink-foreground/80 transition hover:text-gold" activeProps={{ className: "!text-gold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold sm:inline-flex">
            Talk to a consultant
          </Link>
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full glass text-ink-foreground xl:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink-gradient px-6 py-5 animate-in fade-in xl:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-ink-foreground">Hague Travel</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full glass text-ink-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-1">
            {[{ to: "/", label: "Home" }, ...nav, { to: "/contact", label: "Contact" }].map((n, i) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} style={{ animationDelay: `${i * 40}ms` }}
                className="animate-rise border-b border-ink-foreground/10 py-3.5 font-display text-2xl text-ink-foreground">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
