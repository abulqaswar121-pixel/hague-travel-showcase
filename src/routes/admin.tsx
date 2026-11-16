import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  BookOpenCheck,
  CalendarRange,
  ClipboardList,
  ExternalLink,
  LayoutDashboard,
  LifeBuoy,
  MapPinned,
  Settings2,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";
import { DEMO_STAFF } from "@/data/staff";

export const Route = createFileRoute("/admin")({
  head: pageMeta(
    "Staff Back-Office",
    "Hague Travel staff console for tours, enquiries, bookings, payments and Academy cohorts.",
    { robots: "noindex" },
  ),
  component: AdminLayout,
});

const NAV = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Tour manager", to: "/admin/tours", icon: MapPinned },
  { label: "Enquiry desk", to: "/admin/enquiries", icon: ClipboardList },
  { label: "Bookings & payments", to: "/admin/bookings", icon: Wallet },
  { label: "Academy cohorts", to: "/admin/academy", icon: BookOpenCheck },
] as const;

function AdminLayout() {
  const pathname = useLocation({ select: (s) => s.pathname });
  const current = NAV.find((item) =>
    item.to === "/admin" ? pathname === item.to : pathname.startsWith(item.to),
  );

  return (
    <div className="min-h-screen bg-secondary/35 pb-16">
      <section className="relative overflow-hidden bg-ink pb-9 pt-36 text-ink-foreground lg:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background:
              "radial-gradient(42rem 18rem at 80% 0%, var(--color-sea) 0%, transparent 65%), radial-gradient(30rem 14rem at 8% 20%, var(--color-gold) 0%, transparent 68%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[11px] font-semibold text-ink-foreground/60">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              Staff back-office · demonstration preview · {DEMO_STAFF.role}
            </p>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-foreground/20 px-3 py-1.5 text-[11px] font-bold text-ink-foreground/80 transition hover:border-gold hover:text-gold"
              >
                Public site <ExternalLink className="h-3 w-3" />
              </Link>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-gradient text-[11px] font-black text-gold-foreground">
                {DEMO_STAFF.initials}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Hague Travel operations</p>
              <h1 className="mt-1.5 font-display text-3xl leading-tight sm:text-4xl">
                {current?.label ?? "Staff console"}
              </h1>
              <p className="mt-1.5 text-xs text-ink-foreground/65">
                {DEMO_STAFF.name} · {DEMO_STAFF.desk} desk · 09:14 WAT · demo records only
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  toast.info("Operations handbook", {
                    description: "This preview links to the live SOP library in production.",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/25 px-4 py-2.5 text-xs font-bold text-ink-foreground transition hover:bg-ink-foreground/10"
              >
                <LifeBuoy className="h-4 w-4" /> SOP library
              </button>
              <button
                type="button"
                onClick={() => toast.info("Settings are outside this preview.")}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-foreground/25 text-ink-foreground/80 transition hover:bg-ink-foreground/10"
                aria-label="Console settings"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="grid gap-6 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:items-start">
          <aside className="relative z-10 -mt-5 lg:sticky lg:top-28">
            <nav
              aria-label="Staff console"
              className="no-scrollbar flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1.5 shadow-soft lg:flex-col"
            >
              {NAV.map((item) => {
                const active =
                  item.to === "/admin" ? pathname === item.to : pathname.startsWith(item.to);
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
              <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <CalendarRange className="h-3.5 w-3.5 text-primary" /> Today at a glance
              </p>
              <ul className="mt-2.5 space-y-2 text-[11px] leading-relaxed text-muted-foreground">
                <li className="flex justify-between gap-2">
                  <span>New enquiries</span>
                  <span className="font-bold text-foreground">3</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Documents due</span>
                  <span className="font-bold text-foreground">5</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Departures (30 days)</span>
                  <span className="font-bold text-foreground">2</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Balances to chase</span>
                  <span className="font-bold text-foreground">4</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 hidden rounded-2xl border border-gold/40 bg-accent p-4 text-accent-foreground lg:block">
              <p className="text-[10px] font-black uppercase tracking-widest">Preview data</p>
              <p className="mt-1.5 text-[11px] leading-relaxed">
                Changes stay in this tab and reset on reload. No live customer, payment or supplier
                record is touched.
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
