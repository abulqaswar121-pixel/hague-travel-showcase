import { BedDouble, GraduationCap, Plane, ShieldCheck } from "lucide-react";
import { PARTNER_COVERAGE_NOTE, PARTNER_GROUPS } from "@/data/site";
import { cn } from "@/lib/utils";

const ICONS = {
  plane: Plane,
  bed: BedDouble,
  cap: GraduationCap,
} as const;

/**
 * Trust strip: three slowly moving partner rows. The duplicate set makes the
 * CSS marquee seamless; the duplicate is hidden from assistive technology.
 */
export function PartnerStrip() {
  return (
    <section
      aria-labelledby="partner-coverage-title"
      className="border-y border-border bg-card py-9 sm:py-11"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Verified supplier coverage</p>
            <h2 id="partner-coverage-title" className="mt-2 font-display text-2xl sm:text-3xl">
              Airlines, hotels and universities we work with
            </h2>
          </div>
          <p className="inline-flex max-w-sm items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            Live availability, fares and admission decisions are confirmed with the supplier or
            institution — never assumed from this strip.
          </p>
        </div>

        <div className="mt-7 space-y-3">
          {PARTNER_GROUPS.map((group, groupIndex) => {
            const Icon = ICONS[group.icon];
            const items = [...group.items, ...group.items];
            return (
              <div key={group.label} className="flex items-center gap-3 sm:gap-4">
                <div className="hidden w-40 shrink-0 items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground sm:flex">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {group.label}
                </div>
                <div
                  className="relative flex-1 overflow-hidden"
                  style={{
                    maskImage:
                      "linear-gradient(90deg, transparent 0, #000 5%, #000 95%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, transparent 0, #000 5%, #000 95%, transparent 100%)",
                  }}
                >
                  <div
                    className={cn(
                      "flex w-max animate-marquee items-center gap-2.5 hover:[animation-play-state:paused]",
                      groupIndex === 1 && "[animation-direction:reverse]",
                    )}
                    style={{ animationDuration: `${52 + groupIndex * 9}s` }}
                  >
                    {items.map((name, index) => (
                      <span
                        key={`${name}-${index}`}
                        aria-hidden={index >= group.items.length ? true : undefined}
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-[12px] font-bold text-foreground/85 shadow-sm sm:px-4 sm:text-[13px]"
                      >
                        <Icon className="h-3.5 w-3.5 text-gold" />
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-[10px] leading-relaxed text-muted-foreground">
          {PARTNER_COVERAGE_NOTE}
        </p>
      </div>
    </section>
  );
}
