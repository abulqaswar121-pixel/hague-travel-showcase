import officialLogo from "@/assets/hague-official-logo.png";
import officialEmblem from "@/assets/hague-official-ribbon-emblem.png";
import { cn } from "@/lib/utils";

/** Ribbon-and-airplane emblem only (no lettering). */
export function TravelEmblem({ className }: { className?: string }) {
  return (
    <img src={officialEmblem} alt="" aria-hidden="true" width={899} height={387} className={cn("object-contain", className)} />
  );
}

/** The client's official logo, sized to fit the header, menu and footer. */
export function BrandMark({ size = "md" }: { size?: "md" | "lg"; tagline?: boolean }) {
  return (
    <img
      src={officialLogo}
      alt="Hague Travel"
      width={600}
      height={451}
      className={cn("w-auto shrink-0 object-contain", size === "lg" ? "h-20" : "h-11 lg:h-12")}
    />
  );
}
