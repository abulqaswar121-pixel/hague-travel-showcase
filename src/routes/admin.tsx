import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  CalendarClock,
  CheckCircle2,
  Eye,
  Megaphone,
  Package as PackageIcon,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users2,
  XCircle,
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Notice, Pill, Reveal, Section, Tabs } from "@/components/site/Blocks";
import { formatPrice } from "@/lib/format";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { getPackages, getPublishedPackages } from "@/data/packages";
import {
  ACTIVITY_LOG,
  BANNERS,
  EMPLOYER_QUEUE,
  PAYMENTS,
  PROMO_CODES,
  REVENUE_SPLIT,
  SALES_BY_MONTH,
  STAFF_ROLES,
} from "@/data/ops";
import type { PackageStatus } from "@/data/types";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/admin")({
  head: pageMeta(
    "Admin Console — Demo",
    "A look inside the Hague Travel back office: the package manager, promo codes that expire, banners, employer reviews, payments and reports.",
    { robots: "noindex" },
  ),
  component: Admin,
});

const STATUSES: PackageStatus[] = ["draft", "scheduled", "published", "unpublished", "archived"];

const STATUS_STYLE: Record<PackageStatus, string> = {
  draft: "bg-secondary text-muted-foreground",
  scheduled: "bg-gold-gradient text-gold-foreground",
  published: "bg-success text-success-foreground",
  unpublished: "bg-sunset-gradient text-sunset-foreground",
  archived: "bg-secondary text-muted-foreground line-through",
};

const chartConfig = {
  flights: { label: "Flights", color: "var(--color-chart-1)" },
  packages: { label: "Packages", color: "var(--color-chart-2)" },
  study: { label: "Study & visa", color: "var(--color-chart-3)" },
  academy: { label: "Academy", color: "var(--color-chart-4)" },
} satisfies Record<string, { label: string; color: string }>;

function Admin() {
  const { money } = useCurrency();
  const published = getPublishedPackages();
  const all = getPackages();

  const [rows, setRows] = useState(() =>
    all.map((p) => ({
      slug: p.slug,
      title: p.title,
      destination: p.destination,
      departDate: p.departDate,
      price: p.pricePerPerson,
      spaces: p.spacesRemaining,
      featured: p.featured,
      status: p.status,
    })),
  );
  const [employerState, setEmployerState] = useState<Record<string, string>>(() =>
    Object.fromEntries(EMPLOYER_QUEUE.map((e) => [e.id, e.state])),
  );

  const kpis = useMemo(() => {
    const revenue = PAYMENTS.reduce(
      (t, p) => t + (p.status === "Refunded" ? 0 : p.amount - p.balance),
      0,
    );
    const outstanding = PAYMENTS.reduce((t, p) => t + p.balance, 0);
    const pending = EMPLOYER_QUEUE.filter((e) => e.state === "Awaiting verification").length;
    const expiring = PROMO_CODES.filter(
      (c) =>
        c.status === "Active" &&
        new Date(c.expires).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 45,
    ).length;
    return { revenue, outstanding, pending, expiring };
  }, []);

  const setStatus = (slug: string, status: PackageStatus) => {
    setRows((rs) => rs.map((r) => (r.slug === slug ? { ...r, status } : r)));
    toast.success(`${slug} → ${status}`, {
      description:
        status === "published"
          ? "Visible on /packages immediately (demo state only)."
          : "No public change in this preview.",
    });
  };

  const toggleFeatured = (slug: string) => {
    setRows((rs) => rs.map((r) => (r.slug === slug ? { ...r, featured: !r.featured } : r)));
    toast.info("Featured flag updated in the demo");
  };

  return (
    <>
      <section className="bg-ink pt-24 pb-10 text-ink-foreground lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Back office · demo</p>
              <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Hague Travel console
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-foreground/75">
                What our team sees: the package manager behind every listing on this site, the
                money, the review queue and the reports. Preview data — no live records.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="gold">Role: Administrator</Pill>
              <Pill>22 Aug 2026 · 09:14 WAT</Pill>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                l: "Collected (90 days)",
                v: money(kpis.revenue),
                s: "7 invoices, 2 partially paid",
                icon: TrendingUp,
              },
              {
                l: "Outstanding balances",
                v: money(kpis.outstanding),
                s: "Reminder run scheduled Friday",
                icon: CalendarClock,
              },
              {
                l: "Published experiences",
                v: `${published.length} of ${rows.length}`,
                s: `${rows.filter((r) => r.status === "scheduled").length} scheduled, ${rows.filter((r) => r.status === "draft").length} drafts`,
                icon: PackageIcon,
              },
              {
                l: "Awaiting moderation",
                v: String(kpis.pending),
                s: "Employers + promo expiry",
                icon: Users2,
              },
            ].map((k) => (
              <div key={k.l} className="rounded-2xl glass p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-ink-foreground/60">
                    {k.l}
                  </p>
                  <k.icon className="h-4 w-4 text-gold" />
                </div>
                <p className="mt-1.5 font-display text-2xl leading-none">{k.v}</p>
                <p className="mt-1.5 text-[11px] text-ink-foreground/60">{k.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 lg:py-12">
        <Notice tone="gold" title="Demo console with no persistence">
          Every button here shows the workflow. Status changes, review decisions and toggles only
          update this screen, and are lost when you reload.
        </Notice>

        <div className="mt-8">
          <Tabs
            ariaLabel="Admin sections"
            tabs={[
              { id: "packages", label: "Experiences CMS" },
              { id: "reports", label: "Reports" },
              { id: "campaigns", label: "Campaigns & promos" },
              { id: "moderation", label: "Moderation" },
              { id: "finance", label: "Payments" },
              { id: "team", label: "Team & audit" },
            ]}
            panels={{
              packages: (
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-xl">Tour packages</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Draft, then scheduled, then published. Old offers expire on their own, and
                        scheduled ones go live at 00:01 WAT on their date.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        toast.info("Package editor is part of the Phase 2 build.", {
                          description: "This preview shows the listing and status workflow.",
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
                    >
                      <Sparkles className="h-4 w-4" /> New experience
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-3xl border border-border bg-card">
                    <table className="w-full min-w-[52rem] text-left text-sm">
                      <thead className="border-b border-border bg-secondary/70">
                        <tr>
                          {[
                            "Experience",
                            "Departure",
                            "Indicative price",
                            "Spaces",
                            "Status",
                            "Featured",
                            "",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr
                            key={r.slug}
                            className="border-b border-border last:border-0 hover:bg-secondary/40"
                          >
                            <td className="px-4 py-3">
                              <p className="font-semibold leading-snug">{r.title}</p>
                              <p className="text-[11px] text-muted-foreground">
                                {r.destination} · <span className="font-mono">{r.slug}</span>
                              </p>
                            </td>
                            <td className="px-4 py-3 tabular-nums text-muted-foreground">
                              {r.departDate}
                            </td>
                            <td className="px-4 py-3 font-semibold tabular-nums">
                              {formatPrice(r.price, "NGN")}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-muted-foreground">
                              {r.spaces}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={cn(
                                    "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
                                    STATUS_STYLE[r.status],
                                  )}
                                >
                                  {r.status}
                                </span>
                                <Select
                                  value={r.status}
                                  onValueChange={(v) => setStatus(r.slug, v as PackageStatus)}
                                >
                                  <SelectTrigger
                                    className="h-8 w-[9.5rem] text-xs"
                                    aria-label={`Status for ${r.title}`}
                                  >
                                    <SelectValue placeholder="Set status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {STATUSES.map((s) => (
                                      <SelectItem key={s} value={s} className="text-xs capitalize">
                                        {s}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Switch
                                  id={`feat-${r.slug}`}
                                  checked={r.featured}
                                  onCheckedChange={() => toggleFeatured(r.slug)}
                                />
                                <Label htmlFor={`feat-${r.slug}`} className="sr-only">
                                  Feature {r.title}
                                </Label>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {r.status === "published" ? (
                                <Link
                                  to="/packages/$slug"
                                  params={{ slug: r.slug }}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                                >
                                  <Eye className="h-3.5 w-3.5" /> View
                                </Link>
                              ) : (
                                <span className="text-[11px] text-muted-foreground">
                                  not public
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    Every published experience must carry: itinerary, inclusions and exclusions,
                    hotel category and room basis, meal plan, transfer arrangements, indicative
                    price with single supplement and child pricing, group size, capacity remaining,
                    booking deadline, deposit and balance due dates, cancellation policy, visa
                    requirements and assistance level, and a campaign tag.{" "}
                    {COMPLIANCE_NOTES.indicative}
                  </p>
                </div>
              ),

              reports: (
                <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="font-display text-xl">Revenue by line</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          NGN millions, last 7 months · illustrative data
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        {Object.entries(chartConfig).map(([k, v]) => (
                          <span
                            key={k}
                            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold text-secondary-foreground"
                          >
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: v.color }}
                            />
                            {v.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChartContainer config={chartConfig} className="mt-4 h-[300px] w-full">
                      <BarChart
                        data={SALES_BY_MONTH}
                        margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                      >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          fontSize={11}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          fontSize={11}
                          tickFormatter={(v) => `₦${v}m`}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="flights" fill="var(--color-flights)" radius={[4, 4, 0, 0]} />
                        <Bar
                          dataKey="packages"
                          fill="var(--color-packages)"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar dataKey="study" fill="var(--color-study)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="academy" fill="var(--color-academy)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-border bg-card p-5">
                      <p className="font-display text-lg">Revenue split</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Share of gross margin by stream
                      </p>
                      <ChartContainer config={{}} className="mx-auto h-[210px] w-full">
                        <PieChart>
                          <ChartTooltip
                            content={<ChartTooltipContent hideLabel nameKey="name" />}
                          />
                          <Pie
                            data={REVENUE_SPLIT}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={48}
                            outerRadius={80}
                            paddingAngle={2}
                          >
                            {REVENUE_SPLIT.map((e) => (
                              <Cell key={e.name} fill={e.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                      <ul className="mt-2 space-y-1.5 text-xs">
                        {REVENUE_SPLIT.map((r) => (
                          <li key={r.name} className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ background: r.fill }}
                              />
                              {r.name}
                            </span>
                            <span className="font-bold tabular-nums">{r.value}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-border bg-card p-5">
                      <p className="font-display text-lg">Study &amp; relocation trend</p>
                      <ChartContainer config={chartConfig} className="h-[150px] w-full">
                        <LineChart
                          data={SALES_BY_MONTH}
                          margin={{ top: 6, right: 8, left: -22, bottom: 0 }}
                        >
                          <CartesianGrid vertical={false} strokeDasharray="3 3" />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                          <YAxis tickLine={false} axisLine={false} fontSize={11} />
                          <ReferenceLine y={10} stroke="var(--color-gold)" strokeDasharray="4 4" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="study"
                            stroke="var(--color-study)"
                            strokeWidth={2.5}
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="packages"
                            stroke="var(--color-packages)"
                            strokeWidth={2.5}
                            dot={false}
                          />
                        </LineChart>
                      </ChartContainer>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                        August is the study peak. The dashed gold line is the ₦10m monthly target
                        the desk works to.
                      </p>
                    </div>
                  </div>
                </div>
              ),

              campaigns: (
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <p className="flex items-center gap-2 font-bold">
                      <Megaphone className="h-4 w-4 text-gold" /> Site banners
                    </p>
                    <ul className="mt-4 space-y-3">
                      {BANNERS.map((b) => (
                        <li
                          key={b.id}
                          className="rounded-2xl border border-border bg-secondary/60 p-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <p className="font-semibold leading-snug">{b.title}</p>
                            <Badge variant="secondary" className="text-[9px] uppercase">
                              {b.status}
                            </Badge>
                          </div>
                          <p className="mt-1.5 text-[11px] text-muted-foreground">
                            {b.placement} · {b.window} · CTA “{b.cta}”
                          </p>
                          <p className="mt-1 font-mono text-[11px] text-primary">{b.link}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                      Banners switch off when their window ends, so the homepage never advertises a
                      trip that has already gone.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <p className="font-bold">Promo codes</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {kpis.expiring} code(s) expire within 45 days and will be flagged to the
                      marketing desk.
                    </p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Use</TableHead>
                          <TableHead className="text-right">Redeemed</TableHead>
                          <TableHead>Expires</TableHead>
                          <TableHead>State</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {PROMO_CODES.map((c) => {
                          const days = Math.round(
                            (new Date(c.expires).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                          );
                          const expired = days < 0;
                          return (
                            <TableRow key={c.code}>
                              <TableCell className="font-mono text-xs font-bold">
                                {c.code}
                              </TableCell>
                              <TableCell className="text-xs">{c.description}</TableCell>
                              <TableCell className="text-right text-xs tabular-nums">
                                {c.uses}/{c.limit}
                              </TableCell>
                              <TableCell className="text-xs tabular-nums text-muted-foreground">
                                {c.expires}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={cn(
                                    "rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide",
                                    expired
                                      ? "bg-secondary text-muted-foreground"
                                      : days < 45
                                        ? "bg-sunset-gradient text-sunset-foreground"
                                        : "bg-success/15 text-success",
                                  )}
                                >
                                  {expired ? "Expired" : days < 45 ? `${days}d left` : "Active"}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ),

              moderation: (
                <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <p className="flex items-center gap-2 font-bold">
                      <ShieldAlert className="h-4 w-4 text-destructive" /> Employer & vacancy queue
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Nothing reaches the public job board without an approval decision here.
                    </p>
                    <ul className="mt-4 space-y-3">
                      {EMPLOYER_QUEUE.map((e) => {
                        const state = employerState[e.id] ?? e.state;
                        return (
                          <li
                            key={e.id}
                            className="rounded-2xl border border-border bg-secondary/60 p-4"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <p className="font-semibold leading-snug">
                                  {e.name}{" "}
                                  <span className="font-mono text-[11px] text-muted-foreground">
                                    {e.id}
                                  </span>
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {e.role} · {e.country} · submitted {e.submitted}
                                </p>
                                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                                  Verification note: {e.note}
                                </p>
                              </div>
                              <span
                                className={cn(
                                  "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
                                  state === "Approved"
                                    ? "bg-success/15 text-success"
                                    : state === "Rejected"
                                      ? "bg-destructive/15 text-destructive"
                                      : "bg-gold-gradient text-gold-foreground",
                                )}
                              >
                                {state}
                              </span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEmployerState((s) => ({ ...s, [e.id]: "Approved" }));
                                  toast.success(`${e.name} approved for one listing`, {
                                    description:
                                      "Never charge candidates. Re-check CAC status quarterly.",
                                  });
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full bg-success px-3.5 py-2 text-[11px] font-bold text-success-foreground transition hover:opacity-90"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" /> Approve listing
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEmployerState((s) => ({ ...s, [e.id]: "Rejected" }));
                                  toast.error(`${e.name} rejected`, {
                                    description:
                                      "Reason logged and sent to the candidate inbox if anyone applied.",
                                  });
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full border border-destructive px-3.5 py-2 text-[11px] font-bold text-destructive transition hover:bg-destructive/10"
                              >
                                <XCircle className="h-3.5 w-3.5" /> Reject
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-border bg-card p-5">
                      <p className="font-bold">Moderation rules, enforced</p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {[
                          "No candidate fees, ever — reject any employer who charges",
                          "No promised visas, salaries or earnings in listing copy",
                          "Employer must be a registered entity with a reachable human",
                          "Listing copy edited to remove urgency manipulation",
                          "Rejected employers are logged with the reason",
                        ].map((x) => (
                          <li key={x} className="flex gap-2.5">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            {x}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                        {COMPLIANCE_NOTES.jobs}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-ink-gradient p-5 text-ink-foreground">
                      <p className="font-bold">Case load by desk</p>
                      <ul className="mt-3 space-y-2 text-sm">
                        {[
                          { d: "Study & visa", n: 34, w: 82 },
                          { d: "Flights", n: 21, w: 54 },
                          { d: "Packages", n: 17, w: 44 },
                          { d: "Relocation", n: 12, w: 31 },
                          { d: "Academy", n: 9, w: 24 },
                        ].map((x) => (
                          <li key={x.d}>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold">{x.d}</span>
                              <span className="tabular-nums text-ink-foreground/70">
                                {x.n} open
                              </span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-foreground/15">
                              <div
                                className="h-full rounded-full bg-gold-gradient"
                                style={{ width: `${x.w}%` }}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),

              finance: (
                <div className="rounded-3xl border border-border bg-card">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
                    <div>
                      <p className="font-display text-xl">Invoices, balances &amp; refunds</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Government and supplier charges always sit on their own lines, apart from
                        our fees.
                      </p>
                    </div>
                    <Pill tone="gold">{COMPLIANCE_NOTES.fees.slice(0, 44)}…</Pill>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead className="hidden sm:table-cell">Client</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Invoiced</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PAYMENTS.map((p) => (
                        <TableRow key={p.ref}>
                          <TableCell className="font-mono text-xs">{p.ref}</TableCell>
                          <TableCell className="hidden text-xs sm:table-cell">{p.client}</TableCell>
                          <TableCell className="text-sm font-medium">{p.item}</TableCell>
                          <TableCell className="text-right text-sm tabular-nums">
                            {money(p.amount)}
                          </TableCell>
                          <TableCell
                            className={cn(
                              "text-right text-sm font-bold tabular-nums",
                              p.balance > 0 ? "text-sunset" : "text-muted-foreground",
                            )}
                          >
                            {p.balance > 0 ? money(p.balance) : "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
                                p.status === "Paid"
                                  ? "bg-success/15 text-success"
                                  : p.status === "Refunded"
                                    ? "bg-secondary text-secondary-foreground"
                                    : "bg-gold-gradient text-gold-foreground",
                              )}
                            >
                              {p.status}
                            </span>
                          </TableCell>
                          <TableCell className="hidden text-xs tabular-nums text-muted-foreground md:table-cell">
                            {p.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="grid gap-3 border-t border-border p-5 sm:grid-cols-3">
                    {[
                      {
                        l: "Collection method",
                        v: "Paystack / Flutterwave split, or bank transfer against an invoice. Cards never touch our servers.",
                      },
                      {
                        l: "Refunds",
                        v: "Paid back to the original method when the supplier authorises; 14–60 days depending on the carrier.",
                      },
                      {
                        l: "Receipts",
                        v: "Auto-issued per payment, with the fee split shown, and stored against the client file.",
                      },
                    ].map((x) => (
                      <div key={x.l} className="rounded-2xl bg-secondary p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          {x.l}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed">{x.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ),

              team: (
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <p className="font-bold">Roles & permissions</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Least privilege by default; document access is role-scoped and logged.
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {STAFF_ROLES.map((r) => (
                        <li
                          key={r.role}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-secondary p-3.5"
                        >
                          <span>
                            <span className="block text-sm font-bold">{r.role}</span>
                            <span className="block text-[11px] text-muted-foreground">
                              {r.scope}
                            </span>
                          </span>
                          <Pill>{r.people} people</Pill>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-border bg-card p-5">
                    <p className="font-bold">Audit log</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Every change to a client file is written here, with the name and the time.
                    </p>
                    <ol className="mt-4 space-y-2.5">
                      {ACTIVITY_LOG.map((l, i) => (
                        <Reveal as="li" key={i} delay={i * 40}>
                          <li className="flex gap-3 rounded-2xl border border-border p-3.5">
                            <span className="w-14 shrink-0 text-[11px] font-bold tabular-nums text-gold">
                              {l.at}
                            </span>
                            <span className="text-sm leading-snug">
                              <span className="font-semibold">{l.who}</span> {l.what}
                            </span>
                          </li>
                        </Reveal>
                      ))}
                    </ol>
                    <div className="mt-4 rounded-2xl bg-secondary p-4 text-[11px] leading-relaxed text-muted-foreground">
                      We keep identity documents for 14 days after travel, then delete them unless
                      you ask us to hold them. Invoices and payment records stay 6 years. Every file
                      view is logged.
                    </div>
                  </div>
                </div>
              ),
            }}
          />
        </div>

        <Section eyebrow="Build notes" title="What the real console must add" size="sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Postgres-backed package, client and case records with real permissions and SSO",
              "Payment webhooks, invoice numbers, and refunds matched to the ledger",
              "Airline/GDS availability and ticketing; hotel content and room-block APIs",
              "Automated document expiry, deadline reminders and WhatsApp/email notifications",
            ].map((x) => (
              <div
                key={x}
                className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
              >
                {x}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
