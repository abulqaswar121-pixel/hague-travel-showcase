import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Plane,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";
import { PORTAL_PROFILE } from "@/data/portal";
import { BRAND, waLink, waMessages } from "@/data/site";

export const Route = createFileRoute("/portal")({
  head: pageMeta(
    "Customer Portal",
    "Your Hague Travel bookings, flight quotes, documents and Academy learning in one secure customer portal.",
    { robots: "noindex" },
  ),
  component: PortalLayout,
});

const NAV = [
  { label: "Overview", to: "/portal", icon: LayoutDashboard },
  { label: "Bookings & payments", to: "/portal/bookings", icon: Plane },
  { label: "Academy learning", to: "/portal/academy", icon: BookOpen },
  { label: "Profile & documents", to: "/portal/documents", icon: FileText },
] as const;

function PortalLayout() {
  const pathname = useLocation({ select: (s) => s.pathname });

  return (
    <div className="min-h-screen bg-secondary/35 pb-16">
      <section className="relative overflow-hidden bg-ink pb-10 pt-36 text-ink-foreground lg:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(45rem 20rem at 18% 0%, var(--color-gold) 0%, transparent 60%), radial-gradient(36rem 18rem at 92% 10%, var(--color-sea) 0%, transparent 62%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-ink-foreground/60">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              Secure client area · demonstration preview
            </p>
            <Link to="/" className="transition hover:text-gold">
              haguetravel.com <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold-gradient font-display text-xl font-bold text-gold-foreground shadow-gold">
                {PORTAL_PROFILE.initials}
              </span>
              <div>
                <p className="eyebrow">Customer portal</p>
                <h1 className="mt-1.5 font-display text-3xl leading-tight sm:text-4xl">
                  Hello, {PORTAL_PROFILE.name.split(" ")[0]}.
                </h1>
                <p className="mt-1.5 text-xs text-ink-foreground/65">
                  {PORTAL_PROFILE.tier} · {PORTAL_PROFILE.since} · {PORTAL_PROFILE.reference}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={waLink(waMessages.support)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-whatsapp-foreground transition hover:brightness-105"
              >
                <LifeBuoy className="h-4 w-4" /> Support desk
              </a>
              <button
                type="button"
                onClick={() => toast.info("Preview only — sign-in is disabled in this demo.")}
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/25 px-4 py-2.5 text-sm font-bold text-ink-foreground transition hover:bg-ink-foreground/10"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="grid gap-6 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:items-start">
          <aside className="relative z-10 -mt-5 lg:sticky lg:top-28">
            <nav
              aria-label="Customer portal"
              className="no-scrollbar flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1.5 shadow-soft lg:flex-col"
            >
              {NAV.map((item) => {
                const active =
                  item.to === "/portal" ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-3 text-[13px] font-bold transition lg:w-full",
                      active
                        ? "bg-ink text-ink-foreground shadow-soft"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", active ? "text-gold" : "text-primary")} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 hidden rounded-2xl border border-border bg-card p-4 shadow-soft lg:block">
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-primary" />
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Your consultant
                </p>
              </div>
              <p className="mt-2.5 text-sm font-bold">{PORTAL_PROFILE.consultant}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                One named consultant owns your file. Desk hours{" "}
                {BRAND.hours.replace("Mon–Sat, ", "")}.
              </p>
              <a
                href={waLink(waMessages.support)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-xs font-bold text-primary hover:underline"
              >
                Message {PORTAL_PROFILE.consultant.split(" ")[0]} →
              </a>
            </div>

            <div className="mt-4 hidden rounded-2xl border border-border bg-secondary/70 p-4 lg:block">
              <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" /> Document safety
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                Encrypted upload, role-scoped access and a 14-day purge after travel. Only your
                consultant can open your files.
              </p>
            </div>
          </aside>

          <main className="min-w-0 pt-6 lg:pt-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
