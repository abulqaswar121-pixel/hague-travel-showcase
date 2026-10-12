import { useId } from "react";
import { cn } from "@/lib/utils";

/** Crisp vector globe: lit blue sphere, cream grid, orange orbit and white plane. Scales to any zoom. */
function GlobeEmblem({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const clip = `g-clip-${uid}`;
  const fill = `g-fill-${uid}`;
  return (
    <svg viewBox="0 0 104 100" className={className} aria-hidden focusable="false">
      <defs>
        <radialGradient id={fill} cx="38%" cy="32%" r="80%">
          <stop offset="0" stopColor="#4C9BE0" />
          <stop offset="0.6" stopColor="#1F5EAE" />
          <stop offset="1" stopColor="#123B78" />
        </radialGradient>
        <clipPath id={clip}>
          <circle cx="50" cy="52" r="33" />
        </clipPath>
      </defs>

      {/* orbit – back half (behind globe) */}
      <g transform="rotate(-28 50 52)">
        <path d="M4 52 A46 16 0 0 1 96 52" fill="none" stroke="#EE761B" strokeWidth="3.2" strokeLinecap="round" opacity="0.85" />
      </g>

      {/* globe */}
      <circle cx="50" cy="52" r="33" fill={`url(#${fill})`} />
      <g clipPath={`url(#${clip})`} fill="none" stroke="#FBF3E4" strokeWidth="0.9" opacity="0.7">
        <ellipse cx="50" cy="52" rx="13" ry="33" />
        <ellipse cx="50" cy="52" rx="24" ry="33" />
        <line x1="50" y1="19" x2="50" y2="85" />
        <line x1="17" y1="52" x2="83" y2="52" />
        <path d="M20 36 Q50 42 80 36" />
        <path d="M20 68 Q50 62 80 68" />
      </g>
      <circle cx="50" cy="52" r="33" fill="none" stroke="#FBF3E4" strokeWidth="1.4" opacity="0.9" />

      {/* orbit – front half (in front of globe) */}
      <g transform="rotate(-28 50 52)">
        <path d="M4 52 A46 16 0 0 0 96 52" fill="none" stroke="#EE761B" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* plane */}
      <g transform="translate(76 20) scale(1.05)">
        <path
          fill="#FFFFFF"
          stroke="#EE761B"
          strokeWidth="1"
          strokeLinejoin="round"
          d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
        />
      </g>
    </svg>
  );
}

/** Live-text wordmark + vector globe emblem. Crisp at any zoom, no box. */
export function BrandMark({ size = "md", tagline = false }: { size?: "md" | "lg"; tagline?: boolean }) {
  const lg = size === "lg";
  return (
    <span className="flex items-center gap-2.5">
      <GlobeEmblem className={cn("shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]", lg ? "h-16 w-16" : "h-11 w-11 lg:h-12 lg:w-12")} />
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
