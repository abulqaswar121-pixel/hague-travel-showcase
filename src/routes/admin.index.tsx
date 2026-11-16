import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  CalendarDays,
  ClipboardList,
  Download,
  MapPin,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  DemoTag,
  KpiCard,
  PageHeading,
  Panel,
  StatusBadge,
  TableSkeleton,
  useDemoLoading,
} from "@/components/dashboard/UI";
import { Button } from "@/components/ui/button";
import { ADMIN_BOOKINGS, ADMIN_ENQUIRIES, ADMIN_REVENUE_TREND } from "@/data/admin";
import { ACTIVITY_LOG, PAYMENTS } from "@/data/ops";
import { getPublishedPackages } from "@/data/packages";
import { useCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/format";
import { downloadText } from "@/lib/download";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/admin/")({
  head: pageMeta(
    "Staff Overview",
    "Live operational picture for Hague Travel: enquiries, revenue, upcoming tours and new leads.",
    { robots: "noindex" },
  ),
  component: AdminOverview,
});

function AdminOverview() {
  const loading = useDemoLoading();
  const { money } = useCurrency();
  const tours = getPublishedPackages();

  const newLeads = ADMIN_ENQUIRIES.filter((enquiry) => enquiry.status === "New");
  const inPipeline = ADMIN_ENQUIRIES.filter(
    (enquiry) => enquiry.status !== "Closed" && enquiry.status !== "Converted",
  );
  const collected = ADMIN_BOOKINGS.reduce((sum, booking) => sum + booking.paid, 0);
  const outstanding = ADMIN_BOOKINGS.reduce((sum, booking) => sum + booking.balance, 0);
  const upcoming = ADMIN_BOOKINGS.filter(
    (booking) => booking.status !== "Cancelled" && booking.departDate >= "2026-11-16",
  ).sort((a, b) => a.departDate.localeCompare(b.departDate));
  const conversion = Math.round(
    (ADMIN_ENQUIRIES.filter((enquiry) => enquiry.status === "Converted").length /
      ADMIN_ENQUIRIES.length) *
      100,
  );

  const byDesk = [
    { desk: "Flights", count: ADMIN_ENQUIRIES.filter((e) => e.service === "Flights").length },
    {
      desk: "Study Abroad",
      count: ADMIN_ENQUIRIES.filter((e) => e.service === "Study Abroad").length,
    },
    { desk: "Relocation", count: ADMIN_ENQUIRIES.filter((e) => e.service === "Relocation").length },
    {
      desk: "Holidays",
      count: ADMIN_ENQUIRIES.filter((e) => e.service === "Holiday packages").length,
    },
    { desk: "Corporate", count: ADMIN_ENQUIRIES.filter((e) => e.service === "Corporate").length },
    {
      desk: "Other",
      count: ADMIN_ENQUIRIES.filter(
        (e) =>
          !["Flights", "Study Abroad", "Relocation", "Holiday packages", "Corporate"].includes(
            e.service,
          ),
      ).length,
    },
  ];
  const maxDesk = Math.max(...byDesk.map((item) => item.count));

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Overview"
        title="The whole desk, in one picture"
        sub="Enquiries, money, departures and new leads. Figures are demo records and update only in this browser tab."
        actions={
          <>
            <DemoTag>Preview metrics</DemoTag>
            <Button
              variant="outline"
              onClick={() => {
                const csv = [
                  "reference,client,tour,total,paid,balance,status,departure",
                  ...ADMIN_BOOKINGS.map((b) =>
                    [
                      b.reference,
                      b.client,
                      b.tour,
                      b.total,
                      b.paid,
                      b.balance,
                      b.status,
                      b.departDate,
                    ]
                      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
                      .join(","),
                  ),
                ].join("\n");
                downloadText("hague-travel-bookings-snapshot.csv", csv);
                toast.success("Demo bookings snapshot downloaded");
              }}
            >
              <Download className="h-4 w-4" /> Export snapshot
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total enquiries"
          value={ADMIN_ENQUIRIES.length}
          hint={`${inPipeline.length} open · ${conversion}% converted`}
          icon={ClipboardList}
        />
        <KpiCard
          label="Revenue collected"
          value={money(collected)}
          hint={`${money(outstanding)} still to collect`}
          icon={Banknote}
          tone="success"
        />
        <KpiCard
          label="Upcoming tours"
          value={upcoming.length}
          hint={`${tours.length} experiences live in the catalogue`}
          icon={CalendarDays}
          tone="gold"
        />
        <KpiCard
          label="New leads"
          value={newLeads.length}
          hint="Unassigned · respond within 2 hours"
          icon={UserPlus}
          tone="warning"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Collections vs pipeline"
          sub="₦ millions over the last six months · demo values"
          action={
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-success">
              <TrendingUp className="h-3.5 w-3.5" /> +18.4% MoM
            </span>
          }
        >
          {loading ? (
            <div className="h-60 animate-pulse rounded-2xl bg-secondary" />
          ) : (
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ADMIN_REVENUE_TREND}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="collectedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="pipelineFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--color-border)"
                    strokeDasharray="4 6"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [`₦${value}m`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="collected"
                    name="Collected"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    fill="url(#collectedFill)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pipeline"
                    name="Pipeline"
                    stroke="var(--color-gold)"
                    strokeWidth={2}
                    fill="url(#pipelineFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" /> Collected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gold" /> Quoted pipeline
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-gold" /> No live financial posting
            </span>
          </div>
        </Panel>

        <Panel title="Enquiries by desk" sub="Where the demand is this month">
          <ul className="space-y-3">
            {byDesk.map((item) => (
              <li key={item.desk}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{item.desk}</span>
                  <span className="tabular-nums text-muted-foreground">{item.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gold-gradient"
                    style={{ width: `${Math.max(6, (item.count / maxDesk) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/admin/enquiries"
            className="mt-5 flex items-center justify-between rounded-xl bg-ink px-3.5 py-3 text-xs font-bold text-ink-foreground transition hover:bg-ink/90"
          >
            Open the enquiry desk <ArrowRight className="h-3.5 w-3.5 text-gold" />
          </Link>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <Panel
          title="Newest enquiries"
          sub="The top of the shared inbox — every desk, one queue"
          action={
            <Link to="/admin/enquiries" className="text-xs font-bold text-primary hover:underline">
              View all
            </Link>
          }
          bodyClassName="p-0"
        >
          {loading ? (
            <div className="p-5">
              <TableSkeleton rows={5} columns={4} />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {ADMIN_ENQUIRIES.slice(0, 5).map((enquiry) => (
                <li key={enquiry.id} className="flex items-start gap-3 p-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <ClipboardList className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold">{enquiry.subject}</p>
                      <StatusBadge>{enquiry.status}</StatusBadge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {enquiry.client} · {enquiry.service} · {enquiry.channel} · {enquiry.received}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {enquiry.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title="Upcoming departures"
          sub={`${upcoming.length} tours with travellers booked`}
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-border">
            {upcoming.slice(0, 5).map((booking) => (
              <li key={booking.id} className="flex items-center gap-3 px-4 py-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{booking.tour}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {formatDate(booking.departDate)} · {booking.travellers} pax
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-bold text-muted-foreground">
                  {booking.consultant}
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/admin/tours"
            className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-3 text-xs font-bold text-primary"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Manage all departures
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
        <Panel
          title="Recent staff activity"
          sub="A simple audit trail of the last actions"
          action={
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <Users className="h-3.5 w-3.5" /> 7 staff on shift
            </span>
          }
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-border">
            {ACTIVITY_LOG.map((entry) => (
              <li key={entry.at + entry.what} className="flex gap-3 px-4 py-3">
                <span className="w-14 shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {entry.at}
                </span>
                <p className="text-xs leading-relaxed">
                  <strong>{entry.who}</strong> {entry.what}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Finance pulse" sub="Demo ledger snapshot">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Collected", value: money(collected), tone: "text-success" },
              { label: "Outstanding", value: money(outstanding), tone: "text-primary" },
              {
                label: "Deposits recorded",
                value: money(
                  PAYMENTS.filter((p) => p.status !== "Refunded").reduce(
                    (sum, p) => sum + p.amount,
                    0,
                  ),
                ),
                tone: "text-foreground",
              },
              {
                label: "Refunds",
                value: money(
                  PAYMENTS.filter((p) => p.status === "Refunded").reduce(
                    (sum, p) => sum + p.amount,
                    0,
                  ),
                ),
                tone: "text-destructive",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-secondary/40 p-3.5"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </p>
                <p className={cn("mt-1.5 font-display text-xl tabular-nums", item.tone)}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/admin/bookings"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Reconcile bookings & payments <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Panel>
      </div>
    </div>
  );
}
