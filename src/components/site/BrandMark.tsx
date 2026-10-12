import emblem from "@/assets/hague-emblem-light.png";
import { cn } from "@/lib/utils";

/** Live-text wordmark + transparent globe emblem. Crisp at any zoom, no box. */
export function BrandMark({ size = "md", tagline = false }: { size?: "md" | "lg"; tagline?: boolean }) {
  const lg = size === "lg";
  return (
    <span className="flex items-center gap-2.5">
      <img src={emblem} alt="" aria-hidden width={256} height={237} className={cn("shrink-0 object-contain", lg ? "h-14 w-14" : "h-10 w-10 lg:h-11 lg:w-11")} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display font-bold uppercase tracking-[0.08em] text-ink-foreground", lg ? "text-2xl" : "text-lg lg:text-xl")}>
          Hague <span className="text-gold">Travel</span>
        </span>
        {tagline ? (
          <span className={cn("mt-1 font-semibold tracking-wide text-ink-foreground/70", lg ? "text-xs" : "text-[10px]")}>
            Explore. Experience. Remember.
          </span>
        ) : null}
      </span>
    </span>
  );
}
