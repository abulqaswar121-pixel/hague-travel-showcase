import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileCheck2,
  Heart,
  LifeBuoy,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { ComplianceNote, Notice, Pill, Reveal, Section, Tabs } from "@/components/site/Blocks";
import { PackageCard } from "@/components/site/Cards";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ACADEMY_PROGRESS,
  CUSTOMER,
  DOCUMENT_VAULT,
  ENQUIRIES,
  SAVED_PACKAGES,
  TRACKER_STEPS,
  APPLICATIONS,
} from "@/data/ops";
import { getPackageBySlug } from "@/data/packages";
import { images, BRAND, COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { formatDate, formatPrice } from "@/lib/format";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/dashboard")({
  head: pageMeta(
    "Your Travel Desk — Demo Dashboard",
    "A preview of the client dashboard: enquiry status, application trackers, document vault, Academy progress, saved packages and payment balances.",
    { robots: "noindex" },
  ),
  component: Dashboard,
});

const DOC_STATE: Record<string, { label: string; cls: string; icon: typeof CheckCircle2 }> = {
  verified: { label: "Verified", cls: "bg-success/15 text-success", icon: CheckCircle2 },
  received: { label: "Received", cls: "bg-secondary text-secondary-foreground", icon: FileCheck2 },
  action: {
    label: "Action needed",
    cls: "bg-sunset-gradient text-sunset-foreground",
    icon: AlertCircle,
  },
  missing: { label: "Missing", cls: "bg-destructive/15 text-destructive", icon: AlertCircle },
};

const ENQUIRY_TONE: Record<string, string> = {
  New: "bg-primary text-primary-foreground",
  "Quote sent": "bg-gold-gradient text-gold-foreground",
  "Awaiting documents": "bg-sunset-gradient text-sunset-foreground",
  "In progress": "bg-secondary text-secondary-foreground",
  Closed: "bg-secondary text-muted-foreground",
};

function Dashboard() {
  const { money } = useCurrency();
  const trip = CUSTOMER.upcomingTrip;

  return (
    <>
      {/* Demo header instead of a marketing hero */}
      <section className="border-b border-border bg-ink pt-24 pb-10 text-ink-foreground lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold-gradient font-display text-xl font-bold text-gold-foreground">
                {CUSTOMER.initials}
              </span>
              <div>
                <p className="eyebrow">Client dashboard · demo</p>
                <h1 className="mt-1.5 font-display text-3xl leading-tight sm:text-4xl">
                  Welcome back, {CUSTOMER.name.split(" ")[0]}
                </h1>
                <p className="mt-1.5 text-xs text-ink-foreground/70">
                  {CUSTOMER.tier} · {CUSTOMER.since} · Client ref {CUSTOMER.reference}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={waLink(waMessages.support)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-whatsapp-foreground"
              >
                <LifeBuoy className="h-4 w-4" /> Support desk
              </a>
              <button
                type="button"
                onClick={() => toast.info("Preview only — this demo has no sign-in.")}
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/25 px-4 py-2.5 text-sm font-bold text-ink-foreground transition hover:bg-ink-foreground/10"
              >
                Sign in properly
              </button>
            </div>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                l: "Open enquiries",
                v: String(ENQUIRIES.filter((e) => e.status !== "Closed").length),
                s: "2 answered today",
              },
              {
                l: "Applications in flight",
                v: String(APPLICATIONS.length),
                s: "1 needs your document",
              },
              { l: "Balance due", v: "₦671,000", s: "Package deposit plan" },
              {
                l: "Documents verified",
                v: `${DOCUMENT_VAULT.filter((d) => d.state === "Verified").length} of ${DOCUMENT_VAULT.length}`,
                s: "1 action needed",
              },
            ].map((k) => (
              <div key={k.l} className="rounded-2xl glass p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-ink-foreground/60">
                  {k.l}
                </p>
                <p className="mt-1.5 font-display text-2xl">{k.v}</p>
                <p className="mt-0.5 text-[11px] text-ink-foreground/60">{k.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 lg:py-14">
        <Notice tone="gold" title="Clearly labelled demo data">
          Everything below is example data baked into this preview to show what the real dashboard
          will contain. There is no account, no authentication and no stored personal information.{" "}
          {COMPLIANCE_NOTES.indicative}
        </Notice>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card p-6">
              <img
                src={images.resort}
                alt=""
                aria-hidden
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
              />
              <p className="eyebrow">Next trip</p>
              <h2 className="mt-2 font-display text-2xl leading-snug sm:text-3xl">{trip.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {trip.when} · Booking {trip.code}
              </p>
              <div className="mt-5 max-w-md">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Booking progress</span>
                  <span className="text-primary">{trip.progress}%</span>
                </div>
                <Progress value={trip.progress} className="mt-2" />
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5" /> {trip.next}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  to="/packages/$slug"
                  params={{ slug: "zanzibar-spice-shore" }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
                >
                  <Plane className="h-4 w-4" /> Open the itinerary
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Preview only — travel documents are issued in the live system.")
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-input px-4 py-2.5 text-sm font-bold transition hover:bg-accent"
                >
                  <FileCheck2 className="h-4 w-4" /> My e-tickets
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full rounded-3xl border border-border bg-secondary p-5">
              <p className="font-bold">Today's actions</p>
              <ul className="mt-3 space-y-2">
                {[
                  {
                    t: "Send 28-day bank statement",
                    d: "Blocks your UK visa submission",
                    tone: "destructive" as const,
                    to: "/study-abroad" as const,
                  },
                  {
                    t: "Confirm cabin preference",
                    d: "Quote HT-ENQ-78410 expires tomorrow",
                    tone: "gold" as const,
                    to: "/flights" as const,
                  },
                  {
                    t: "Pay Academy instalment 2",
                    d: "Due before Module 5 begins",
                    tone: "muted" as const,
                    to: "/academy" as const,
                  },
                  {
                    t: "Review cancellation window",
                    d: "Zanzibar: 30 days to full supplier credit",
                    tone: "muted" as const,
                    to: "/refund-policy" as const,
                  },
                ].map((a) => (
                  <li key={a.t}>
                    <Link
                      to={a.to}
                      className="group flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition hover:border-gold/70"
                    >
                      <span>
                        <span className="block text-sm font-bold leading-snug">{a.t}</span>
                        <span className="block text-[11px] text-muted-foreground">{a.d}</span>
                      </span>
                      <Badge
                        variant={a.tone === "destructive" ? "destructive" : "secondary"}
                        className="shrink-0 text-[9px] uppercase"
                      >
                        {a.tone === "destructive" ? "Urgent" : a.tone === "gold" ? "Soon" : "Info"}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-8">
          <Tabs
            ariaLabel="Dashboard sections"
            tabs={[
              { id: "enquiries", label: "Enquiries" },
              { id: "applications", label: "Applications" },
              { id: "documents", label: "Documents" },
              { id: "academy", label: "Academy" },
              { id: "saved", label: "Saved" },
            ]}
            panels={{
              enquiries: <EnquiriesPanel />,
              applications: <ApplicationsPanel />,
              documents: <DocumentsPanel />,
              academy: <AcademyPanel />,
              saved: <SavedPanel />,
            }}
          />
        </div>

        <Section eyebrow="Support" title="When something goes wrong" size="sm">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                t: "Escalation path",
                d: "Consultant → desk lead in 3 working days → managing partner in 7. Every step answered in writing.",
              },
              {
                icon: ClipboardList,
                t: "Status updates",
                d: "You are told at each event: documents required, quote prepared, payment, supplier confirmed, ticket issued.",
              },
              {
                icon: BookOpen,
                t: "Policy pages",
                d: "Refund windows, booking terms and the visa disclaimer are linked from every footer, not hidden in an attachment.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-5">
                <c.icon className="h-5 w-5 text-gold" />
                <p className="mt-3 font-semibold">{c.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <ComplianceNote className="mt-6" text={COMPLIANCE_NOTES.documents} />
        </Section>
      </div>
    </>
  );
}

function EnquiriesPanel() {
  return (
    <div className="rounded-3xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <p className="font-display text-xl">Enquiry & quotation log</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Every request you make is logged with the consultant who owns it.
          </p>
        </div>
        <Link
          to="/contact"
          className="rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
        >
          New enquiry
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Service</TableHead>
            <TableHead className="hidden md:table-cell">Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Consultant</TableHead>
            <TableHead className="hidden sm:table-cell">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ENQUIRIES.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-mono text-xs">{e.id}</TableCell>
              <TableCell className="font-semibold">{e.service}</TableCell>
              <TableCell className="hidden max-w-[22rem] text-sm text-muted-foreground md:table-cell">
                {e.subject}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
                    ENQUIRY_TONE[e.status] ?? "bg-secondary text-secondary-foreground",
                  )}
                >
                  {e.status}
                </span>
              </TableCell>
              <TableCell className="hidden text-sm lg:table-cell">{e.consultant}</TableCell>
              <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                {e.updated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-border p-4 text-xs text-muted-foreground">
        Indicative quotations expire on the date printed in the email. Nothing here is a confirmed
        booking — a booking exists only when the supplier confirms and we issue your documents.
      </div>
    </div>
  );
}

function ApplicationsPanel() {
  return (
    <div className="space-y-5">
      {APPLICATIONS.map((a) => (
        <div key={a.id} className="rounded-3xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl leading-snug">{a.programme}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {a.id} · {a.country} · consultant {a.consultant}
              </p>
            </div>
            <Pill tone={a.status === "In progress" ? "primary" : "gold"}>{a.status}</Pill>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
              <span>
                Stage {a.step} of {TRACKER_STEPS.length} · {TRACKER_STEPS[a.step - 1]}
              </span>
              <span>{Math.round((a.step / TRACKER_STEPS.length) * 100)}%</span>
            </div>
            <Progress value={(a.step / TRACKER_STEPS.length) * 100} className="mt-2" />
            <ol className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-1">
              {TRACKER_STEPS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold",
                    i + 1 < a.step
                      ? "bg-success/15 text-success"
                      : i + 1 === a.step
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                Documents
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {a.documents.map((d) => {
                  const s = DOC_STATE[d.state] ?? DOC_STATE["received"]!;
                  return (
                    <li
                      key={d.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/60 px-3.5 py-2.5"
                    >
                      <span className="flex items-center gap-2.5 text-sm">
                        <s.icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            d.state === "action" || d.state === "missing"
                              ? "text-destructive"
                              : "text-success",
                          )}
                        />
                        <span className="leading-snug">{d.name}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-[11px] text-muted-foreground">{d.date}</span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide",
                            s.cls,
                          )}
                        >
                          {s.label}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-2xl bg-accent p-4 text-accent-foreground">
              <p className="text-[11px] font-black uppercase tracking-widest">
                Next action · yours
              </p>
              <p className="mt-2 text-sm leading-relaxed font-medium">{a.nextAction}</p>
              <p className="mt-3 text-[11px] leading-relaxed opacity-80">
                Deadlines come from the university and the visa authority, not from us. Missing one
                restarts the queue — that is the only part of this process we genuinely cannot
                rescue.
              </p>
              <button
                type="button"
                onClick={() =>
                  toast.success("Marked as done in the demo tracker.", {
                    description: `${a.id} — status updates flow to your consultant.`,
                  })
                }
                className="mt-4 rounded-full bg-accent-foreground px-4 py-2 text-xs font-bold text-accent transition hover:opacity-90"
              >
                Mark done
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentsPanel() {
  return (
    <div className="rounded-3xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <p className="font-display text-xl">Document vault</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Encrypted at rest, visible to your assigned consultant only, purged 14 days after
            travel.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            toast.info("Preview only — file upload is disabled in this demo.", {
              description: COMPLIANCE_NOTES.documents,
            })
          }
          className="rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
        >
          Upload a document
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Added</TableHead>
            <TableHead className="hidden md:table-cell">Validity</TableHead>
            <TableHead>State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DOCUMENT_VAULT.map((d) => (
            <TableRow key={d.name}>
              <TableCell className="font-medium">{d.name}</TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">{d.type}</TableCell>
              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {d.added}
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {d.expiry}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
                    d.state === "Verified"
                      ? "bg-success/15 text-success"
                      : d.state === "Action needed"
                        ? "bg-destructive/15 text-destructive"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {d.state}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
        <p className="max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
          {COMPLIANCE_NOTES.documents}
        </p>
        <Link to="/passports" className="shrink-0 text-xs font-bold text-primary hover:underline">
          Passport & document desk
        </Link>
      </div>
    </div>
  );
}

function AcademyPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{ACADEMY_PROGRESS.cohort}</p>
            <p className="mt-2 font-display text-2xl leading-snug">Your progress</p>
          </div>
          <Pill tone="gold">{ACADEMY_PROGRESS.grade}</Pill>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span>Overall completion</span>
            <span className="text-primary">{ACADEMY_PROGRESS.overall}%</span>
          </div>
          <Progress value={ACADEMY_PROGRESS.overall} className="mt-2" />
          <p className="mt-2 text-[11px] text-muted-foreground">
            Attendance: {ACADEMY_PROGRESS.attendance}. Live attendance counts toward the
            certificate.
          </p>
        </div>
        <ul className="mt-5 divide-y divide-border">
          {ACADEMY_PROGRESS.modules.map((m) => (
            <li key={m.title} className="flex items-center justify-between gap-3 py-2.5">
              <span className="flex items-center gap-2.5 text-sm">
                {m.status === "Complete" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                ) : m.status === "In progress" ? (
                  <span className="h-4 w-4 shrink-0 rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <span className="h-4 w-4 shrink-0 rounded-full border-2 border-border" />
                )}
                <span
                  className={cn("leading-snug", m.status === "Locked" && "text-muted-foreground")}
                >
                  {m.title}
                </span>
              </span>
              <span className="shrink-0 text-xs font-bold tabular-nums text-muted-foreground">
                {m.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="font-bold">Assignments</p>
          <ul className="mt-3 space-y-2">
            {ACADEMY_PROGRESS.assignments.map((a) => (
              <li key={a.title} className="rounded-2xl bg-secondary p-3.5">
                <p className="text-sm font-semibold leading-snug">{a.title}</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-muted-foreground">Due {a.due}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide",
                      a.state === "To do"
                        ? "bg-sunset-gradient text-sunset-foreground"
                        : "bg-success/15 text-success",
                    )}
                  >
                    {a.state}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            Certificates are issued by Hague Travel Academy on passing the final assessment, and are
            not IATA or government accreditation.
          </p>
        </div>
        <Link
          to="/academy"
          className="flex items-center justify-between gap-3 rounded-3xl bg-ink-gradient p-6 text-ink-foreground transition hover:brightness-110"
        >
          <span>
            <span className="block font-display text-xl">Curriculum & materials</span>
            <span className="mt-1 block text-xs text-ink-foreground/70">
              Eight modules, recordings for 12 months
            </span>
          </span>
          <ArrowUpRight className="h-5 w-5 text-gold" />
        </Link>
      </div>
    </div>
  );
}

function SavedPanel() {
  const saved = SAVED_PACKAGES.map((slug) => getPackageBySlug(slug)).filter((p) => p !== undefined);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {saved.length} packages saved · indicative prices refreshed {formatDate("2026-08-28")}
        </p>
        <Link to="/packages" className="text-xs font-bold text-primary hover:underline">
          Browse all experiences
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {saved.map((p) => (
          <div key={p.slug} className="relative">
            <PackageCard p={p} />
            <button
              type="button"
              onClick={() => toast.info("Saved items are demo-only in this preview.")}
              aria-label={`Remove ${p.title} from saved`}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-destructive shadow-soft transition hover:scale-105"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
            </button>
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-success" /> Saving a package holds nothing.{" "}
        {BRAND.name} checks live availability only when you request a quotation.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Indicative price shown at save time, e.g.{" "}
        {formatPrice(saved[0]?.pricePerPerson ?? 0, "NGN")} per person.
      </p>
    </div>
  );
}
