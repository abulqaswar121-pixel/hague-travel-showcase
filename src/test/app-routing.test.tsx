import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { getPublishedPackages } from "@/data/packages";
import { getDestinations } from "@/data/destinations";
import { getJobs } from "@/data/jobs";
import { FOOTER_COLUMNS, NAV_FLAT, NAV_GROUPS } from "@/data/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

const resolves = (path: string) => router.matchRoutes(path).at(-1)?.routeId !== rootRouteId;

describe("App routing", () => {
  it.each([
    "/",
    "/flights",
    "/hotels",
    "/packages",
    `/packages/${getPublishedPackages()[0]!.slug}`,
    "/study-abroad",
    `/study-abroad/${getDestinations()[0]!.slug}`,
    "/relocation",
    "/passports",
    "/insurance",
    "/extras",
    "/academy",
    "/jobs",
    `/jobs/${getJobs()[0]!.id}`,
    "/corporate",
    "/dashboard",
    "/admin",
    "/about",
    "/contact",
    "/faqs",
    "/terms",
    "/privacy",
    "/refund-policy",
    "/visa-disclaimer",
  ])("matches a page for %s instead of falling back to not found", (path) => {
    expect(resolves(path)).toBe(true);
  });

  it("does not invent a page for an unknown path", () => {
    expect(resolves("/definitely-not-a-route")).toBe(false);
  });

  it("points every navigation entry at a route that exists", () => {
    const targets = [
      ...NAV_GROUPS.flatMap((g) => [g.to, ...g.children.map((c) => c.to)]),
      ...NAV_FLAT.map((n) => n.to),
      ...FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => l.to)),
    ];
    expect(targets.length).toBeGreaterThan(20);
    for (const to of targets) {
      // Parameterised targets are the only ones with a `$` in the path.
      const path = to.includes("$")
        ? to
            .replace("/$slug", `/${getPublishedPackages()[0]!.slug}`)
            .replace("/$country", `/${getDestinations()[0]!.slug}`)
        : to;
      expect(resolves(path), path).toBe(true);
    }
  });
});
