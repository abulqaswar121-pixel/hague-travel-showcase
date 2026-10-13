import officialEmblem from "@/assets/hague-official-ribbon-emblem.png";
import { cn } from "@/lib/utils";

/** Transparent recreation of the client's official ribbon-and-airplane emblem. */
export function TravelEmblem({ className }: { className?: string }) {
  return (
    <img src={officialEmblem} alt="" aria-hidden="true" width={899} height={387} className={cn("object-contain", className)} />
  );
}

/** Shared official emblem with live, zoom-safe stacked lettering. */
export function BrandMark({ size = "md" }: { size?: "md" | "lg"; tagline?: boolean }) {
  const lg = size === "lg";
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5" aria-label="Hague Travel">
      <TravelEmblem className={cn("shrink-0", lg ? "h-12 w-28" : "h-8 w-[74px] lg:h-10 lg:w-[92px]")} />
      <span className="flex flex-col items-center font-sans leading-none font-extrabold uppercase tracking-normal">
        <span className={cn("text-ink-foreground", lg ? "text-4xl" : "text-2xl lg:text-[28px]")}>
          Hague
        </span>
        <span className={cn("mt-1 text-logo-gold", lg ? "text-lg" : "text-xs")}>Travel</span>
      </span>
    </span>
  );
}
