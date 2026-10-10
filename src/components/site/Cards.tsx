import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, MapPin, Star, Users } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { formatDateRange, urgencyLabel } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  AcademyCohort,
  FlightRoute,
  Hotel,
  JobListing,
  StudentHousing,
  TourPackage,
} from "@/data/types";
import type { Testimonial } from "@/data/types";

function Stars({ value, className }: { value: number; className?: string | undefined }) {
  return (
    <span
      className={cn("flex items-center gap-0.5 text-gold", className)}
      aria-label={`${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-3 w-3", i < Math.round(value) ? "fill-current" : "opacity-35")}
        />
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------- packages */

export function PackageCard({ p, compact }: { p: TourPackage; compact?: boolean }) {
  const { money } = useCurrency();
  const urgency = urgencyLabel(p.bookingDeadline);
  return (
    <Link
      to="/packages/$slug"
      params={{ slug: p.slug }}
      className="group lift relative flex block overflow-hidden rounded-3xl bg-ink focus-visible:outline-none"
    >
      <img
        src={p.cover}
        alt={`${p.title}, ${p.destination}`}
        loading="lazy"
        className={cn(
          "w-full object-cover opacity-95 transition duration-700 group-hover:scale-105",
          compact ? "aspect-4/3" : "aspect-4/5",
        )}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-x-4 top-4 flex flex-wrap items-start gap-2">
        <span className="rounded-full glass px-3 py-1 text-[11px] font-semibold text-ink-foreground">
          {p.category}
        </span>
        {p.earlyBird ? (
          <span className="rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold text-gold-foreground">
            Early bird
          </span>
        ) : null}
        {p.spacesRemaining <= 6 ? (
          <span className="rounded-full bg-sunset-gradient px-3 py-1 text-[11px] font-bold text-sunset-foreground">
            {p.spacesRemaining} left
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground sm:p-6">
        <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-ink-foreground/70">
          <MapPin className="h-3 w-3" /> {p.destination} · {p.nights} nights
        </p>
        <h3 className="mt-2 font-display text-xl leading-tight sm:text-2xl">{p.title}</h3>
        <p className="mt-1.5 hidden text-xs text-ink-foreground/70 sm:block">
          {formatDateRange(p.departDate, p.returnDate)}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-foreground/60">
              Indicative from / person
            </p>
            <p className="font-display text-xl text-gold">
              {money(p.pricePerPerson, { compact: true })}
            </p>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-ink-foreground/75">
            <Users className="h-3.5 w-3.5" />
            {p.spacesRemaining} spaces
          </span>
        </div>
        {urgency ? (
          <p className="mt-2 text-[11px] font-bold text-sunset-foreground">{urgency}</p>
        ) : null}
      </div>
      <ArrowUpRight className="absolute right-4 top-16 h-8 w-8 rounded-full bg-card p-2 text-foreground opacity-0 transition duration-300 group-hover:opacity-100" />
    </Link>
  );
}

/* ----------------------------------------------------------------- routes */

export function RouteCard({ r }: { r: FlightRoute }) {
  const { money } = useCurrency();
  return (
    <Link
      to="/flights"
      search={{
        from: `${r.from} (${r.fromCode})`,
        to: `${r.to} (${r.toCode})`,
        tripType: r.stops === 0 ? ("One way" as const) : ("Round trip" as const),
        pax: 1,
        cabin: "Economy",
      }}
      className="lift flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {r.fromCode} → {r.toCode}
        </p>
        <p className="mt-1 truncate font-display text-lg">
          {r.from} <span className="text-gold">→</span> {r.to}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {r.stops === 0 ? "Non-stop" : `${r.stops} stop`} · {r.duration} · {r.seasonal}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Indicative from
        </p>
        <p className="font-semibold tabular-nums">{money(r.indicativeFrom)}</p>
      </div>
    </Link>
  );
}

/* ----------------------------------------------------------------- hotels */

export function HotelCard({ h, onOpen }: { h: Hotel; onOpen?: (id: string) => void }) {
  const { money } = useCurrency();
  return (
    <article className="lift overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative">
        <img
          src={h.image}
          alt={h.name}
          loading="lazy"
          className="aspect-16/11 w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[11px] font-bold capitalize">
          {h.kind}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-bold text-ink-foreground">
          {h.reviewScore.toFixed(1)}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
          {h.stars}★ · {h.city}, {h.country}
        </p>
        <h3 className="mt-1.5 text-lg leading-snug">{h.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {h.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {h.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-sm">
            <span className="font-semibold tabular-nums">{money(h.pricePerNight)}</span>
            <span className="text-xs text-muted-foreground"> / night · indicative</span>
          </p>
          <button
            type="button"
            onClick={() => onOpen?.(h.id)}
            className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
          >
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}

export function HousingCard({ h }: { h: StudentHousing }) {
  const { money } = useCurrency();
  return (
    <article className="lift flex flex-col overflow-hidden rounded-3xl border border-border bg-card sm:flex-row">
      <img
        src={h.image}
        alt={h.name}
        loading="lazy"
        className="h-36 w-full object-cover sm:h-auto sm:w-40 lg:w-48"
      />
      <div className="flex-1 p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
          {h.city}, {h.country}
        </p>
        <h3 className="mt-1.5 text-lg leading-snug">{h.name}</h3>
        <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Monthly budget</dt>
            <dd className="font-semibold tabular-nums">{money(h.monthlyBudget)} / month</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Deposit</dt>
            <dd className="font-medium">{h.deposit}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Move-in</dt>
            <dd className="font-medium">{h.moveInDates.join(" · ")}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Near</dt>
            <dd className="font-medium">{h.near}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          {h.roomTypes.join(" / ")} · Bills: {h.bills}
        </p>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- academy */

export function CohortCard({
  c,
  selected,
  onSelect,
}: {
  c: AcademyCohort;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  const statusTone =
    c.status === "Open"
      ? "bg-gold-gradient text-gold-foreground"
      : c.status === "Closing soon"
        ? "bg-sunset-gradient text-sunset-foreground"
        : "bg-secondary text-secondary-foreground";
  const filled = Math.round((c.seatsTaken / c.seats) * 100);
  return (
    <div
      className={cn(
        "lift relative flex h-full flex-col rounded-3xl border bg-card p-5 sm:p-6",
        selected ? "border-primary ring-2 ring-primary/25" : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-4xl leading-none text-primary sm:text-5xl">{c.month}</p>
          <p className="mt-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {c.cohort} · {c.year}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
            statusTone,
          )}
        >
          {c.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed">{c.focus}</p>
      <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <div className="flex justify-between gap-2">
          <dt>Classes</dt>
          <dd className="text-right font-medium text-foreground">{c.classes}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Runs</dt>
          <dd className="text-right font-medium text-foreground">
            {formatDateRange(c.startDate, c.endDate)}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Registration closes</dt>
          <dd className="text-right font-medium text-foreground">
            {urgencyLabel(c.registrationDeadline, 60) ?? "Open"}
          </dd>
        </div>
      </dl>
      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${filled}%` }} />
        </div>
        <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground">
          {c.seats - c.seatsTaken} of {c.seats} seats left
        </p>
      </div>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Fee</p>
          <p className="font-display text-xl">
            <Price n={c.fee} />
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSelect?.(c.id)}
          disabled={c.status === "Upcoming"}
          className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {c.status === "Upcoming" ? "Not open yet" : "Enrol"}
        </button>
      </div>
    </div>
  );
}

/** Small helper so a component can read the currency context without prop drilling. */
function Price({ n }: { n: number }) {
  const { money } = useCurrency();
  return <>{money(n)}</>;
}

export function CohortMiniCard({
  c,
  onSelect,
}: {
  c: AcademyCohort;
  onSelect?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(c.id)}
      className="lift group flex h-full w-full flex-col rounded-2xl border border-border bg-card p-5 text-left"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-3xl leading-none text-primary sm:text-4xl">
          {c.month}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide",
            c.status === "Open"
              ? "bg-gold-gradient text-gold-foreground"
              : c.status === "Closing soon"
                ? "bg-sunset-gradient text-sunset-foreground"
                : "bg-secondary text-secondary-foreground",
          )}
        >
          {c.status}
        </span>
      </div>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {c.cohort}
      </p>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed">{c.focus}</p>
      <p className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
        Enrol <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </p>
    </button>
  );
}

/* ------------------------------------------------------------------- jobs */

export function JobCard({ job }: { job: JobListing }) {
  return (
    <Link
      to="/jobs/$id"
      params={{ id: job.id }}
      className="lift group flex h-full flex-col rounded-3xl border border-border bg-card p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-secondary-foreground">
          {job.workMode}
        </span>
        <span className="rounded-full border border-gold/50 px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
          {job.employmentType}
        </span>
      </div>
      <h3 className="mt-3 text-lg leading-snug group-hover:text-primary">{job.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {job.employer} · {job.country} · {job.experience}
      </p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {job.summary}
      </p>
      <p className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
        View role <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

/* ----------------------------------------------------------- testimonials */

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
      <Stars value={t.rating} />
      <blockquote className="mt-4 flex-1 font-display text-lg leading-snug">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-gradient font-display text-sm text-ink-foreground">
          {t.name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </span>
        <span className="text-xs leading-relaxed">
          <span className="block font-bold">{t.name}</span>
          <span className="block text-muted-foreground">
            {t.role} · {t.service}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ misc pieces */

export function CalendarPill({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
      <CalendarDays className="h-3.5 w-3.5" />
      {formatDateRange(from, to)}
    </span>
  );
}
