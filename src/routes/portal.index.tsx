import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FileWarning,
  Plane,
  Plus,
  Sparkles,
  Ticket,
  Wallet,
} from "lucide-react";
import {
  CardSkeleton,
  DemoTag,
  EmptyState,
  KpiCard,
  PageHeading,
  Panel,
  StatusBadge,
  TableSkeleton,
  useDemoLoading,
} from "@/components/dashboard/UI";
import { Progress } from "@/components/ui/progress";
import {
  ENROLLED_COURSES,
  PORTAL_ACTIONS,
  PORTAL_BOOKINGS,
  PORTAL_DOCUMENTS,
  PORTAL_PROFILE,
  PORTAL_QUOTES,
} from "@/data/portal";
import { useCurrency } from "@/lib/currency";
import { formatDate, formatDateRange } from "@/lib/format";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/portal/")({
  head: pageMeta(
    "Portal Overview",
    "Your next trip, open flight quotes, document vault and Academy progress at a glance.",
    { robots: "noindex" },
  ),
  component: PortalOverview,
});

function PortalOverview() {
  const loading = useDemoLoading();
  const { money } = useCurrency();
  const nextTrip = PORTAL_BOOKINGS.find((b) => b.status === "Balance due") ?? PORTAL_BOOKINGS[0]!;
  const activeBookings = PORTAL_BOOKINGS.filter((b) => b.status !== "Completed");
  const openQuotes = PORTAL_QUOTES.filter((q) => q.status !== "Expired");
  const docsToAct = PORTAL_DOCUMENTS.filter((d) => d.state === "Action needed");
  const balance = PORTAL_BOOKINGS.reduce((total, b) => total + b.balance, 0);
  const course = ENROLLED_COURSES[0]!;

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Overview"
        title="Your travel life, in one place"
        sub="Bookings, money, papers and classes — updated by your consultant as each step is completed."
        actions={
          <>
            <DemoTag />
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-105"
            >
              <Plus className="h-4 w-4" /> Plan a new trip
            </Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Active bookings"
          value={activeBookings.length}
          hint="2 travellers on the next departure"
          icon={Plane}
        />
        <KpiCard
          label="Open flight quotes"
          value={openQuotes.length}
          hint="1 quote expires on 20 Nov"
          icon={Ticket}
          tone="gold"
        />
        <KpiCard
          label="Balance outstanding"
          value={money(balance)}
          hint="Next instalment due 2 Dec 2026"
          icon={Wallet}
          tone="warning"
        />
        <KpiCard
          label="Academy progress"
          value={`${course.progress}%`}
          hint={course.cohort}
          icon={BookOpen}
          tone="success"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-ink text-ink-foreground shadow-elegant">
          <img
            src={nextTrip.cover}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full glass px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                Next departure
              </span>
              <StatusBadge>{nextTrip.status}</StatusBadge>
            </div>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              {nextTrip.title}
            </h2>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-foreground/75">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-gold" />
                {formatDateRange(nextTrip.departDate, nextTrip.returnDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Plane className="h-4 w-4 text-gold" /> {nextTrip.destination}
              </span>
            </p>
            <div className="mt-6 max-w-md rounded-2xl border border-ink-foreground/15 bg-ink-foreground/[0.07] p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Paid {money(nextTrip.paid)}</span>
                <span className="text-gold">{money(nextTrip.balance)} left</span>
              </div>
              <Progress
                value={Math.round((nextTrip.paid / nextTrip.total) * 100)}
                className="mt-2 bg-ink-foreground/20 [&>div]:bg-gold"
              />
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-foreground/65">
                <Clock3 className="h-3.5 w-3.5" /> Balance due {formatDate(nextTrip.nextDue)} ·
                Booking {nextTrip.reference}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                to="/portal/bookings"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-bold text-gold-foreground shadow-gold"
              >
                Manage booking <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/packages/$slug"
                params={{ slug: nextTrip.packageSlug }}
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/25 px-4 py-2.5 text-sm font-bold text-ink-foreground transition hover:bg-ink-foreground/10"
              >
                Itinerary <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <Panel
          title="Today’s actions"
          sub="Small things that keep your file moving."
          bodyClassName="p-3 sm:p-4"
        >
          <ul className="space-y-2">
            {PORTAL_ACTIONS.map((action) => (
              <li key={action.title}>
                <Link
                  to={action.href as "/portal/documents"}
                  className="group flex items-start gap-3 rounded-2xl border border-border bg-background p-3.5 transition hover:border-gold/60 hover:bg-accent/30"
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg",
                      action.urgency === "Urgent"
                        ? "bg-destructive/10 text-destructive"
                        : action.urgency === "Soon"
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {action.urgency === "Urgent" ? (
                      <FileWarning className="h-3.5 w-3.5" />
                    ) : action.urgency === "Soon" ? (
                      <Clock3 className="h-3.5 w-3.5" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-snug">{action.title}</span>
                    <span className="mt-0.5 block text-[11px] leading-relaxed text-muted-foreground">
                      {action.detail}
                    </span>
                  </span>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel
          title="Active tour bookings"
          sub={`${activeBookings.length} reservations on file`}
          action={
            <Link to="/portal/bookings" className="text-xs font-bold text-primary hover:underline">
              View all
            </Link>
          }
          bodyClassName="p-0"
        >
          {loading ? (
            <div className="p-5">
              <TableSkeleton rows={2} columns={3} />
            </div>
          ) : activeBookings.length === 0 ? (
            <div className="p-5">
              <EmptyState
                icon={Plane}
                title="No active bookings yet"
                body="When you reserve a tour, its itinerary, payments and documents appear here."
                action={
                  <Link
                    to="/packages"
                    className="inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
                  >
                    Browse packages
                  </Link>
                }
              />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {activeBookings.map((booking) => (
                <li key={booking.id} className="flex gap-3.5 p-4 transition hover:bg-secondary/40">
                  <img
                    src={booking.cover}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-bold">{booking.title}</p>
                      <StatusBadge>{booking.status}</StatusBadge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {formatDateRange(booking.departDate, booking.returnDate)} ·{" "}
                      {booking.travellers} traveller{booking.travellers === 1 ? "" : "s"}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress
                        value={Math.round((booking.paid / booking.total) * 100)}
                        className="h-1.5 max-w-28"
                      />
                      <span className="text-[10px] font-bold tabular-nums text-muted-foreground">
                        {money(booking.balance)} left
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title="Flight quote status"
          sub="Indicative until the airline confirms."
          action={<DemoTag>Indicative</DemoTag>}
          bodyClassName="p-0"
        >
          {loading ? (
            <div className="p-5">
              <TableSkeleton rows={3} columns={3} />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {PORTAL_QUOTES.map((quote) => (
                <li key={quote.id} className="flex flex-wrap items-start gap-3 p-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <Plane className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold">{quote.route}</p>
                      <StatusBadge>{quote.status}</StatusBadge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {quote.tripType} · {quote.dates} · {quote.passengers} pax · {quote.cabin}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px]">
                      <span className="font-bold text-foreground">
                        from {money(quote.indicative)}
                      </span>
                      <span className="text-muted-foreground">{quote.airline}</span>
                      <span className="text-muted-foreground">Updated {quote.updated}</span>
                    </div>
                  </div>
                  <Link
                    to="/portal/bookings"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Details <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.15fr]">
        <Panel
          title="Document vault"
          sub={`${docsToAct.length} item needs attention`}
          action={
            <Link to="/portal/documents" className="text-xs font-bold text-primary hover:underline">
              Open vault
            </Link>
          }
          bodyClassName="p-0"
        >
          {loading ? (
            <div className="p-5">
              <TableSkeleton rows={4} columns={3} />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {PORTAL_DOCUMENTS.slice(0, 4).map((doc) => (
                <li key={doc.id} className="flex items-center gap-3 px-4 py-3.5">
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                      doc.state === "Action needed"
                        ? "bg-destructive/10 text-destructive"
                        : doc.state === "Verified"
                          ? "bg-success/10 text-success"
                          : "bg-secondary text-muted-foreground",
                    )}
                  >
                    <FileCheck2 className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{doc.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {doc.type} · {doc.owner}
                    </p>
                  </div>
                  <StatusBadge>{doc.state}</StatusBadge>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title="Academy learning"
          sub={course.cohort}
          action={
            <Link to="/portal/academy" className="text-xs font-bold text-primary hover:underline">
              Open classroom
            </Link>
          }
        >
          {loading ? (
            <CardSkeleton count={1} />
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xl">{course.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{course.nextClass}</p>
                </div>
                <span className="shrink-0 font-display text-2xl text-primary">
                  {course.progress}%
                </span>
              </div>
              <Progress value={course.progress} className="mt-4 h-2.5" />
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  { label: "Attendance", value: course.attendance },
                  { label: "Certificate", value: course.certificate },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-secondary/50 p-3"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/portal/academy"
                className="mt-4 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-ink-foreground transition hover:bg-ink/90"
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" /> Continue Module 2
                </span>
                <ArrowRight className="h-4 w-4 text-gold" />
              </Link>
            </div>
          )}
        </Panel>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <p className="flex items-start gap-2">
          <CircleDollarSign className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          Payments are demo records. Live deposits and balances will be processed by Paystack and
          appear here only after the webhook confirms them.
        </p>
        <span className="shrink-0 font-semibold text-foreground">
          Client ref {PORTAL_PROFILE.reference}
        </span>
      </div>
    </div>
  );
}
