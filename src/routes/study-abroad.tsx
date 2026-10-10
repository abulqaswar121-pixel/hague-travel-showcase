import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowRight, PhoneCall, ShieldAlert } from "lucide-react";
import { Notice, Section } from "@/components/site/Blocks";
import { getDestinations } from "@/data/destinations";
import { BRAND, COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

/**
 * Layout route for /study-abroad. It owns the shared country switcher and the
 * closing disclaimer band, and renders children through <Outlet />.
 */
export const Route = createFileRoute("/study-abroad")({
  head: pageMeta(
    "Study Abroad with Hague Travel",
    "Destinations, admissions support, visa documentation, financial-evidence discipline and pre-departure orientation — with verified partner coverage.",
  ),
  component: StudyAbroadLayout,
});

function StudyAbroadLayout() {
  const destinations = getDestinations();
  const { pathname } = useLocation();

  return (
    <>
      <Outlet />

      <div className="border-y border-border bg-card">
        <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-3 no-scrollbar sm:px-5">
          <Link
            to="/study-abroad"
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition",
              pathname === "/study-abroad"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent",
            )}
          >
            Overview
          </Link>
          {destinations.map((d) => (
            <Link
              key={d.slug}
              to="/study-abroad/$country"
              params={{ country: d.slug }}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition",
                pathname === `/study-abroad/${d.slug}`
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent",
              )}
            >
              {d.flag} {d.name}
            </Link>
          ))}
        </div>
      </div>

      <Section eyebrow="Next step" title="Start with an assessment, not a payment" size="sm">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Notice tone="sea" title="Read this before you engage anyone" icon={ShieldAlert}>
            {COMPLIANCE_NOTES.visa} Be equally careful with any agent who promises an admission, a
            visa or a job — that is the single most common way students lose money and a year of
            their life.
          </Notice>
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-border bg-secondary p-5">
            <p className="text-sm leading-relaxed">
              Talk to {BRAND.name} on WhatsApp and send your transcripts, or request a callback and
              we will call inside desk hours.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={waLink(waMessages.study)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-xs font-bold text-whatsapp-foreground"
              >
                <PhoneCall className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <Link
                to="/contact"
                search={{ topic: "study" }}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
              >
                Request a callback <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
