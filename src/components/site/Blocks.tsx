import { useEffect, useRef, useState, type ReactNode } from "react";
import { SmartLink } from "./SmartLink";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Info,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPLIANCE_NOTES } from "@/data/site";

/* --------------------------------------------------------------- motion */

/** Fade/slide section reveal. Observes in an effect so SSR output stays clean. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string | undefined;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------- page hero */

export function PageHero({
  image,
  eyebrow,
  title,
  sub,
  children,
  align = "left",
  size = "lg",
}: {
  image: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string | undefined;
  children?: ReactNode | undefined;
  align?: "left" | "center";
  size?: "lg" | "md";
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink",
        size === "lg" ? "pt-32 pb-16 lg:pt-44 lg:pb-24" : "pt-28 pb-14 lg:pt-36 lg:pb-20",
      )}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        fetchPriority={size === "lg" ? "high" : "auto"}
        className="absolute inset-0 -z-10 h-full w-full object-cover animate-kenburns"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className={cn("mx-auto max-w-7xl px-5", align === "center" && "text-center")}>
        <div
          className={cn(
            "text-ink-foreground",
            align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl",
          )}
        >
          <p className="eyebrow animate-rise">{eyebrow}</p>
          <h1
            className={cn(
              "mt-4 font-medium leading-[1.04] animate-rise",
              size === "lg" ? "text-4xl sm:text-6xl lg:text-7xl" : "text-3xl sm:text-5xl",
            )}
          >
            {title}
          </h1>
          {sub ? (
            <p
              className={cn(
                "mt-5 text-base leading-relaxed text-ink-foreground/85 animate-rise sm:text-lg",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-xl",
              )}
            >
              {sub}
            </p>
          ) : null}
          {align === "center" ? null : (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-foreground/70 animate-rise">
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-gold" /> Consultant-handled
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-gold" /> Pay in Naira
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-gold" /> Indicative prices, never invented
                bookings
              </span>
            </div>
          )}
          {children ? <div className="mt-8 animate-rise">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- section */

export function Section({
  id,
  eyebrow,
  title,
  sub,
  children,
  tone = "default",
  align = "left",
  size = "lg",
  action,
}: {
  id?: string | undefined;
  eyebrow?: string | undefined;
  title: ReactNode;
  sub?: string | undefined;
  children: ReactNode;
  tone?: "default" | "muted" | "ink" | "card";
  align?: "left" | "center";
  size?: "lg" | "sm";
  action?: ReactNode | undefined;
}) {
  const bg =
    tone === "ink"
      ? "bg-ink-gradient text-ink-foreground"
      : tone === "muted"
        ? "bg-secondary"
        : tone === "card"
          ? "bg-card"
          : "";
  return (
    <section
      id={id}
      className={cn(bg, size === "lg" ? "py-16 sm:py-20 lg:py-28" : "py-10 sm:py-14")}
    >
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div
            className={cn(
              "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
              align === "center" && "sm:flex-col sm:items-center",
            )}
          >
            <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
              {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
              <h2
                className={cn(
                  "mt-3 leading-[1.1]",
                  size === "lg" ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl",
                )}
              >
                {title}
              </h2>
              {sub ? (
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed sm:text-base",
                    tone === "ink" ? "text-ink-foreground/75" : "text-muted-foreground",
                  )}
                >
                  {sub}
                </p>
              ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- notices & badges */

export function Notice({
  tone = "gold",
  icon: Icon = Info,
  children,
  title,
  className,
}: {
  tone?: "gold" | "sea" | "destructive";
  icon?: typeof Info;
  children: ReactNode;
  title?: string | undefined;
  className?: string | undefined;
}) {
  const map = {
    gold: "border-gold/50 bg-accent text-accent-foreground",
    sea: "border-primary/25 bg-secondary text-secondary-foreground",
    destructive: "border-destructive/40 bg-destructive/10 text-foreground",
  } as const;
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed sm:p-5",
        map[tone],
        className,
      )}
      role="note"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        {title ? <p className="font-bold">{title}</p> : null}
        <div className={cn(title && "mt-1", "text-pretty")}>{children}</div>
      </div>
    </div>
  );
}

export function ComplianceNote({
  text = COMPLIANCE_NOTES.indicative,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
      {text}
    </p>
  );
}

export function Pill({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "gold" | "primary" | "success" | "destructive";
  className?: string;
}) {
  const map = {
    muted: "bg-secondary text-secondary-foreground",
    gold: "bg-gold-gradient text-gold-foreground",
    primary: "bg-primary text-primary-foreground",
    success: "bg-success/15 text-foreground ring-1 ring-success/40",
    destructive: "bg-destructive/12 text-destructive ring-1 ring-destructive/30",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none tracking-wide",
        map[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function IndicativeTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gold/50 bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent-foreground",
        className,
      )}
    >
      <BadgeCheck className="h-3 w-3" /> Indicative — request a confirmed quote
    </span>
  );
}

/* ------------------------------------------------------------- grids/lists */

export function FeatureGrid({
  items,
  tone = "card",
  columns = 3,
}: {
  items: string[];
  tone?: "card" | "dark";
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {items.map((f, i) => (
        <Reveal as="li" key={f} delay={i * 45}>
          <li
            className={cn(
              "flex h-full items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
              tone === "dark"
                ? "border-ink-foreground/15 bg-ink-foreground/5 text-ink-foreground"
                : "border-border bg-card text-foreground",
            )}
          >
            <CheckCircle2
              className={cn(
                "mt-0.5 h-4.5 w-4.5 shrink-0",
                tone === "dark" ? "text-gold" : "text-success",
              )}
            />
            <span>{f}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export function Steps({
  items,
  total,
}: {
  items: { title: string; detail: string }[];
  total?: number;
}) {
  const count = total ?? items.length;
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 60}>
          <div className="lift relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5">
            <span className="font-display text-4xl leading-none text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-semibold leading-snug">{s.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
            {i + 1 < count ? (
              <ArrowRight className="absolute right-4 top-5 h-4 w-4 text-muted-foreground/40" />
            ) : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** Horizontal stepper used by the study-abroad journey. */
export function Stepper({ items }: { items: { title: string; detail: string }[] }) {
  return (
    <ol className="relative grid gap-4 md:grid-cols-4">
      <span
        aria-hidden
        className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-gold via-primary to-transparent md:block"
      />
      {items.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 70}>
          <div className="relative flex h-full gap-3 rounded-2xl border border-border bg-card p-4 md:block">
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm text-ink-foreground shadow-soft md:mb-3">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold leading-snug">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------- link bits */

export function ArrowLink({
  to,
  children,
  className,
  hash,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  hash?: string;
}) {
  return (
    <SmartLink
      to={to}
      hash={hash}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-bold text-primary transition hover:gap-2.5",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </SmartLink>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
  hash,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "outline" | "ghost" | "whatsapp";
  className?: string | undefined;
  hash?: string | undefined;
}) {
  const map = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    gold: "bg-gold-gradient text-gold-foreground shadow-gold hover:brightness-105",
    outline: "border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10",
    ghost: "text-foreground hover:bg-accent",
    whatsapp: "bg-whatsapp text-whatsapp-foreground hover:brightness-105",
  } as const;
  return (
    <SmartLink
      to={to}
      hash={hash}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition",
        map[variant],
        className,
      )}
    >
      {children}
    </SmartLink>
  );
}

/** Fee table that keeps government and agency money visibly separate. */
export function FeeSplit({
  government = [],
  agency = [],
  thirdParty = [],
}: {
  government?: { label: string; amount: string }[] | undefined;
  agency?: { label: string; amount: string }[] | undefined;
  thirdParty?: { label: string; amount: string }[] | undefined;
}) {
  const groups = [
    {
      title: "Government / authority fees",
      items: government,
      tone: "bg-secondary text-secondary-foreground",
      note: "Paid to the authority, never to us.",
    },
    {
      title: "Hague Travel agency fees",
      items: agency,
      tone: "bg-accent text-accent-foreground",
      note: "Our service charge, quoted before you commit.",
    },
    {
      title: "Third-party charges",
      items: thirdParty,
      tone: "bg-card text-muted-foreground",
      note: "Centres, insurers, couriers — disclosed at invoice.",
    },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {groups.map((g) => (
        <div key={g.title} className={cn("rounded-2xl border border-border p-5", g.tone)}>
          <p className="text-[11px] font-black uppercase tracking-widest">{g.title}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {g.items.map((i) => (
              <li
                key={i.label}
                className="flex items-start justify-between gap-3 border-b border-border/60 pb-2 last:border-0"
              >
                <span className="leading-snug">{i.label}</span>
                <span className="shrink-0 font-bold tabular-nums">{i.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed opacity-75">{g.note}</p>
        </div>
      ))}
    </div>
  );
}

export function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
          <dt className="font-display text-2xl text-primary sm:text-3xl">{s.value}</dt>
          <dd className="mt-1 text-[11px] font-semibold uppercase leading-snug tracking-wider text-muted-foreground">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Accessible tab switcher with a smooth panel change, used where the shadcn
 * Tabs primitives would be heavier than the layout needs.
 */
export function Tabs({
  tabs,
  panels,
  ariaLabel,
  className,
  tone = "light",
}: {
  tabs: readonly { id: string; label: string }[];
  panels: Record<string, ReactNode>;
  ariaLabel?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const [active, setActive] = useState<string>(tabs[0]?.id ?? "");

  useEffect(() => {
    if (tabs.some((t) => t.id === active)) return;
    setActive(tabs[0]?.id ?? "");
  }, [tabs, active]);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel ?? "Content tabs"}
        className={cn(
          "no-scrollbar flex gap-1 overflow-x-auto rounded-full p-1",
          tone === "dark" ? "bg-ink-foreground/10" : "border border-border bg-secondary",
        )}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold transition-all duration-300",
              active === t.id
                ? tone === "dark"
                  ? "bg-gold-gradient text-gold-foreground shadow-soft"
                  : "bg-primary text-primary-foreground shadow-soft"
                : tone === "dark"
                  ? "text-ink-foreground/70 hover:text-ink-foreground"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={active} role="tabpanel" className="animate-rise mt-4">
        {panels[active]}
      </div>
    </div>
  );
}
