import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  BedDouble,
  CalendarRange,
  GraduationCap,
  Palmtree,
  Plane,
  Search,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIRPORTS } from "@/data/flights";
import { PACKAGE_CATEGORIES } from "@/data/packages";
import { getDestinations } from "@/data/destinations";

const TABS = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: BedDouble },
  { id: "packages", label: "Holiday Packages", icon: Palmtree },
  { id: "consult", label: "Study & Relocation Consultation", icon: GraduationCap },
] as const;

type TabId = (typeof TABS)[number]["id"];

const flightSchema = z
  .object({
    tripType: z.enum(["Round trip", "One way", "Multi-city"]),
    from: z.string().min(1, "Choose where you're flying from"),
    to: z.string().min(1, "Choose a destination"),
    depart: z.string().min(1, "Pick a departure date"),
    ret: z.string().optional(),
    pax: z.coerce.number().min(1).max(99),
    cabin: z.enum(["Economy", "Premium Economy", "Business", "First"]),
    flexible: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.tripType === "Round trip" && !v.ret)
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["ret"], message: "Add a return date" });
    if (v.depart && v.ret && v.ret < v.depart)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ret"],
        message: "Return must be after departure",
      });
    if (v.from === v.to)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["to"],
        message: "Destination must differ from origin",
      });
  });

type FlightForm = z.input<typeof flightSchema>;

const control =
  "w-full rounded-xl border-0 bg-secondary/70 px-3.5 py-3 text-sm text-foreground outline-none ring-1 ring-transparent transition placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-primary/40";
const labelCls = "block text-[10px] font-black uppercase tracking-widest text-muted-foreground";

/**
 * The homepage "Plan your journey" panel. It validates the flight tab with zod,
 * then hands the search to the relevant service page via typed route search params.
 */
export function BookingPanel() {
  const [tab, setTab] = useState<TabId>("flights");
  const navigate = useNavigate();
  const destinations = getDestinations();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FlightForm>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      tripType: "Round trip",
      from: "Lagos (LOS)",
      to: "",
      depart: "",
      pax: 1,
      cabin: "Economy",
      flexible: false,
    },
  });

  const tripType = watch("tripType") ?? "Round trip";
  const pax = Number(watch("pax") ?? 1);
  const swap = () => {
    const from = watch("from");
    const to = watch("to");
    const el = (name: string) => document.querySelector<HTMLSelectElement>(`[name="${name}"]`);
    const fromEl = el("from");
    const toEl = el("to");
    if (fromEl) fromEl.value = to ?? "";
    if (toEl) toEl.value = from ?? "";
  };

  const onFlightSubmit = handleSubmit((values) => {
    navigate({
      to: "/flights",
      search: {
        from: values.from,
        to: values.to,
        tripType: values.tripType,
        depart: values.depart,
        ret: values.ret ?? "",
        pax: Number(values.pax),
        cabin: values.cabin,
        flexible: values.flexible ? "1" : "0",
      },
    });
  });

  const go = () => {
    if (tab === "flights") {
      void onFlightSubmit();
      return;
    }
    if (tab === "hotels") {
      navigate({ to: "/hotels" });
      return;
    }
    if (tab === "packages") {
      navigate({ to: "/packages" });
      return;
    }
    navigate({ to: "/study-abroad" });
  };

  return (
    <div className="rounded-[1.75rem] border border-card/25 bg-card p-2.5 shadow-elegant sm:p-3">
      <div
        className="no-scrollbar flex gap-1 overflow-x-auto rounded-2xl bg-secondary p-1"
        role="tablist"
        aria-label="Plan your journey"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-bold transition-all duration-300 sm:px-4",
              tab === t.id
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="animate-rise p-3 pt-5 sm:p-4">
        {tab === "flights" ? (
          <form onSubmit={onFlightSubmit} noValidate>
            <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {(["Round trip", "One way", "Multi-city"] as const).map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    value={t}
                    {...register("tripType")}
                    className="h-3.5 w-3.5 accent-[var(--color-primary)]"
                  />
                  <span
                    className={cn(
                      "font-medium",
                      tripType === t ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t}
                  </span>
                </label>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-5">
              <div className="md:col-span-2">
                <label className={labelCls} htmlFor="bp-from">
                  From
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="bp-from"
                    {...register("from")}
                    className={cn(control, errors.from && "ring-2 ring-destructive/50")}
                  >
                    {AIRPORTS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </div>
                {errors.from ? (
                  <p className="mt-1 text-[11px] font-semibold text-destructive">
                    {errors.from.message}
                  </p>
                ) : null}
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className={labelCls} htmlFor="bp-to">
                    To
                  </label>
                  <button
                    type="button"
                    onClick={swap}
                    className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    Swap
                  </button>
                </div>
                <div className="mt-1.5">
                  <select
                    id="bp-to"
                    {...register("to")}
                    className={cn(control, errors.to && "ring-2 ring-destructive/50")}
                  >
                    <option value="">Select destination…</option>
                    {AIRPORTS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </div>
                {errors.to ? (
                  <p className="mt-1 text-[11px] font-semibold text-destructive">
                    {errors.to.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className={labelCls} htmlFor="bp-cabin">
                  Cabin
                </label>
                <div className="mt-1.5">
                  <select id="bp-cabin" {...register("cabin")} className={control}>
                    {["Economy", "Premium Economy", "Business", "First"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls} htmlFor="bp-depart">
                  <CalendarRange className="mr-1 inline h-3 w-3" /> Depart
                </label>
                <input
                  id="bp-depart"
                  type="date"
                  {...register("depart")}
                  className={cn(control, "mt-1.5", errors.depart && "ring-2 ring-destructive/50")}
                />
                {errors.depart ? (
                  <p className="mt-1 text-[11px] font-semibold text-destructive">
                    {errors.depart.message}
                  </p>
                ) : null}
              </div>
              <div className="md:col-span-2">
                <label className={labelCls} htmlFor="bp-ret">
                  {tripType === "One way" ? "Return (not required)" : "Return"}
                </label>
                <input
                  id="bp-ret"
                  type="date"
                  {...register("ret")}
                  className={cn(control, "mt-1.5", errors.ret && "ring-2 ring-destructive/50")}
                />
                {errors.ret ? (
                  <p className="mt-1 text-[11px] font-semibold text-destructive">
                    {errors.ret.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className={labelCls} htmlFor="bp-pax">
                  <Users className="mr-1 inline h-3 w-3" /> Passengers
                </label>
                <input
                  id="bp-pax"
                  type="number"
                  min={1}
                  max={99}
                  {...register("pax")}
                  className={cn(control, "mt-1.5")}
                />
              </div>
            </div>
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                {...register("flexible")}
                className="h-3.5 w-3.5 accent-[var(--color-primary)]"
              />
              My dates are flexible — show me cheaper nearby days
            </label>
          </form>
        ) : null}

        {tab === "hotels" ? (
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <label className={labelCls}>Destination</label>
              <input className={cn(control, "mt-1.5")} placeholder="City, hotel or area" />
            </div>
            <div>
              <label className={labelCls}>Check-in</label>
              <input type="date" className={cn(control, "mt-1.5")} />
            </div>
            <div>
              <label className={labelCls}>Check-out</label>
              <input type="date" className={cn(control, "mt-1.5")} />
            </div>
            <div>
              <label className={labelCls}>Guests &amp; rooms</label>
              <select className={cn(control, "mt-1.5")}>
                <option>2 adults · 1 room</option>
                <option>1 adult · 1 room</option>
                <option>Family (2+2)</option>
                <option>Group (10+)</option>
              </select>
            </div>
          </div>
        ) : null}

        {tab === "packages" ? (
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className={labelCls}>Experience</label>
              <select className={cn(control, "mt-1.5")}>
                {PACKAGE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>When</label>
              <input type="month" className={cn(control, "mt-1.5")} />
            </div>
            <div>
              <label className={labelCls}>Budget per person</label>
              <select className={cn(control, "mt-1.5")}>
                <option>Under ₦1.5m</option>
                <option>₦1.5m – ₦2.5m</option>
                <option>₦2.5m – ₦4m</option>
                <option>₦4m+</option>
              </select>
            </div>
          </div>
        ) : null}

        {tab === "consult" ? (
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className={labelCls}>I want to</label>
              <select className={cn(control, "mt-1.5")}>
                <option>Study abroad</option>
                <option>Relocate for work</option>
                <option>Relocate with family</option>
                <option>Finance my tuition (referral)</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Destination</label>
              <select className={cn(control, "mt-1.5")}>
                {destinations.map((d) => (
                  <option key={d.slug}>{d.name}</option>
                ))}
                <option>Not sure yet — advise me</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Timeline</label>
              <select className={cn(control, "mt-1.5")}>
                <option>Next 3 months</option>
                <option>3–6 months</option>
                <option>6–12 months</option>
                <option>Exploring</option>
              </select>
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[11px] leading-relaxed text-muted-foreground">
            Interactive preview. Live fares, hotel inventory and confirmed bookings require supplier
            integration.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/contact",
                  search: { topic: tab === "consult" ? "relocation" : tab },
                })
              }
              className="rounded-full border border-input px-5 py-3 text-sm font-bold transition hover:bg-accent"
            >
              Request assistance
            </button>
            <button
              type="button"
              onClick={go}
              className="flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105"
            >
              <Search className="h-4 w-4" /> Find options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Compact variant reused by service pages so the panel feels continuous. */
export function PanelHint({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-3 text-[11px] leading-relaxed text-muted-foreground"
      onClick={() => toast.dismiss()}
    >
      {children}
    </p>
  );
}
