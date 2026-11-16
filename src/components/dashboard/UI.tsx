import { useEffect, useState, type ReactNode } from "react";
import { Inbox, Loader2, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared building blocks for the two signed-in surfaces (customer portal and
 * staff back-office). They intentionally use the same tokens as the public
 * site so the product feels like one brand.
 */

export function useDemoLoading(delay = 420): boolean {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);
  return loading;
}

export function DemoTag({ children = "Demo data" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-accent px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-accent-foreground">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  );
}

export function PageHeading({
  eyebrow,
  title,
  sub,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2.5 font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
        {sub ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{sub}</p>
        ) : null}
        {children}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon: LucideIcon;
  tone?: "default" | "gold" | "success" | "warning";
}) {
  const iconTone = {
    default: "bg-secondary text-primary",
    gold: "bg-gold-gradient text-gold-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-destructive/10 text-destructive",
  } as const;
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <span className={cn("grid h-8 w-8 place-items-center rounded-xl", iconTone[tone])}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl leading-none tabular-nums sm:text-[1.8rem]">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function Panel({
  title,
  sub,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-3xl border border-border bg-card shadow-soft",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-display text-xl leading-tight">{title}</h2>
          {sub ? <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{sub}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
    </section>
  );
}

const STATUS_TONES: Record<string, string> = {
  // Customer
  Confirmed: "bg-success/12 text-success ring-success/30",
  "Balance due": "bg-accent text-accent-foreground ring-gold/40",
  Completed: "bg-secondary text-secondary-foreground ring-border",
  Cancelled: "bg-destructive/10 text-destructive ring-destructive/25",
  "Quote sent": "bg-accent text-accent-foreground ring-gold/40",
  "In review": "bg-secondary text-secondary-foreground ring-border",
  "In Review": "bg-secondary text-secondary-foreground ring-border",
  Ticketed: "bg-success/12 text-success ring-success/30",
  Expired: "bg-destructive/10 text-destructive ring-destructive/25",
  Verified: "bg-success/12 text-success ring-success/30",
  Received: "bg-secondary text-secondary-foreground ring-border",
  "Action needed": "bg-destructive/10 text-destructive ring-destructive/25",
  // Enquiry workflow
  New: "bg-primary/10 text-primary ring-primary/25",
  Contacted: "bg-accent text-accent-foreground ring-gold/40",
  Converted: "bg-success/12 text-success ring-success/30",
  Closed: "bg-secondary text-muted-foreground ring-border",
  // Academy + finance
  Paid: "bg-success/12 text-success ring-success/30",
  "Part-paid": "bg-accent text-accent-foreground ring-gold/40",
  Unpaid: "bg-destructive/10 text-destructive ring-destructive/25",
  Refunded: "bg-secondary text-secondary-foreground ring-border",
  "Fully paid": "bg-success/12 text-success ring-success/30",
  Active: "bg-success/12 text-success ring-success/30",
  Paused: "bg-secondary text-secondary-foreground ring-border",
};

export function StatusBadge({ children }: { children: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1",
        STATUS_TONES[children] ?? "bg-secondary text-secondary-foreground ring-border",
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  body,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/40 px-5 py-12 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-muted-foreground shadow-soft">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-display text-xl">{title}</p>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function TableSkeleton({ rows = 6, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2.5" aria-busy="true" aria-label="Loading records">
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3.5"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }).map((__, c) => (
            <span
              key={c}
              className={cn(
                "h-3 animate-pulse rounded-full bg-secondary",
                c === 0 ? "w-4/5" : c === columns - 1 ? "ml-auto w-1/2" : "w-3/5",
              )}
            />
          ))}
        </div>
      ))}
      <span className="sr-only">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading
      </span>
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-border bg-card p-5">
          <span className="block h-32 animate-pulse rounded-2xl bg-secondary" />
          <span className="mt-4 block h-4 w-3/4 animate-pulse rounded-full bg-secondary" />
          <span className="mt-2.5 block h-3 w-1/2 animate-pulse rounded-full bg-secondary" />
          <span className="mt-5 block h-2 w-full animate-pulse rounded-full bg-secondary" />
        </div>
      ))}
    </div>
  );
}

export function DetailRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/70 py-2.5 last:border-0">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className={cn("text-right text-sm", strong ? "font-bold" : "font-medium")}>{value}</dd>
    </div>
  );
}

export function Segmented({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: string; label: string; count?: number }[];
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  return (
    <div
      className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 py-1"
      role="group"
      aria-label={label}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition",
            value === option.id
              ? "border-transparent bg-primary text-primary-foreground shadow-soft"
              : "border-input bg-card text-muted-foreground hover:border-gold/60 hover:text-foreground",
          )}
        >
          {option.label}
          {typeof option.count === "number" ? (
            <span className="ml-1.5 text-[10px] opacity-70">{option.count}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export function InlineNotice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-gold/35 bg-accent/70 px-4 py-3 text-[11px] leading-relaxed text-accent-foreground">
      {children}
    </p>
  );
}
