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
    <span className="inline-flex shrink-0 flex-col items-center gap-0.5" aria-label="Hague Travel">
      <TravelEmblem className={cn("shrink-0", lg ? "h-14 w-32" : "h-6 w-[74px] lg:h-8 lg:w-[92px]")} />
      <span className="flex flex-col items-center font-sans leading-none font-extrabold uppercase tracking-normal">
        <span className={cn("text-ink-foreground", lg ? "text-4xl" : "text-lg lg:text-2xl")}>
          Hague
        </span>
        <span className={cn("mt-0.5 text-logo-gold", lg ? "text-lg" : "text-[9px] lg:text-[10px]")}>Travel</span>
      </span>
    </span>
  );
}
