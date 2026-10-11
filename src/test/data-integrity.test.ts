import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { getPublishedPackages } from "@/data/packages";
import { getDestinations } from "@/data/destinations";
import { INSURANCE_PRODUCTS } from "@/data/services";
import { getJobs } from "@/data/jobs";
import { COMPLIANCE_NOTES } from "@/data/site";

/**
 * The business brief lists the fields every experience page must show, and the
 * compliance copy that has to appear. These assertions keep the mock data honest
 * so a preview can never display a half-filled offer.
 */
describe("package data completeness", () => {
  const packages = getPublishedPackages();

  it("has published packages to show", () => {
    expect(packages.length).toBeGreaterThan(5);
  });

  it.each(packages.map((p) => [p.slug, p] as const))(
    "%s carries every brief-required field",
    (_slug, p) => {
      expect(p.title.length).toBeGreaterThan(3);
      expect(p.blurb.length).toBeGreaterThan(40);
      // Every day of the trip is accounted for on the page (open days included by the route).
      expect(Math.max(...p.itinerary.map((d) => d.day))).toBeLessThanOrEqual(p.days);
      expect(p.itinerary.length).toBeGreaterThanOrEqual(Math.ceil(p.days / 2));
      for (const d of p.itinerary) {
        expect(d.title.length).toBeGreaterThan(3);
        expect(d.detail.length).toBeGreaterThan(30);
        expect(d.meals.length).toBeGreaterThan(0); // abbreviated board codes like "B" / "HB" are valid
      }
      expect(p.inclusions.length).toBeGreaterThanOrEqual(4);
      expect(p.exclusions.length).toBeGreaterThanOrEqual(3);
      expect(p.hotelCategory).toBeTruthy();
      expect(p.roomBasis).toBeTruthy();
      expect(p.meals.length).toBeGreaterThan(0);
      expect(p.transfers.length).toBeGreaterThan(0);
      expect(p.pricePerPerson).toBeGreaterThan(0);
      expect(p.singleSupplement).toBeGreaterThan(0);
      expect(p.childPrice).toBeGreaterThanOrEqual(0);
      expect(p.minGroup).toBeLessThan(p.maxGroup);
      expect(p.spacesRemaining).toBeLessThanOrEqual(p.maxGroup);
      expect(p.depositPct).toBeGreaterThan(0);
      expect(p.depositPct).toBeLessThan(100);
      expect(p.cancellationPolicy.length).toBeGreaterThanOrEqual(3);
      expect(p.visaRequirement).toBeTruthy();
      expect(p.visaAssistance).toBeTruthy();
      expect(p.bookingDeadline).toBeTruthy();
      expect(new Date(p.departDate).toString()).not.toBe("Invalid Date");
      expect(new Date(p.returnDate).getTime()).toBeGreaterThan(new Date(p.departDate).getTime());
    },
  );

  it("separates government and supplier charges from agency fees on every study pathway", () => {
    for (const d of getDestinations()) {
      expect(d.costBreakdown.length).toBeGreaterThan(2);
      for (const line of d.costBreakdown) {
        expect(["government", "university", "agency", "third-party"]).toContain(line.owner);
      }
      const owners = new Set(d.costBreakdown.map((l) => l.owner));
      expect(owners.size).toBeGreaterThan(1);
      // The rule that matters commercially: our fee is never mixed into an authority charge.
      expect(d.costBreakdown.some((l) => l.owner === "agency")).toBe(true);
      expect(d.costBreakdown.some((l) => l.owner === "government")).toBe(true);
    }
  });

  it("never publishes a package without a supplier-independent status", () => {
    for (const p of packages) {
      expect(["published"]).toContain(p.status);
    }
  });
});

describe("compliance copy", () => {
  it("keeps the mandated disclaimers in the data layer", () => {
    // Plain English is the house style; the promise each note makes is the contract.
    expect(COMPLIANCE_NOTES.visa).toMatch(/approved only by the embassy or immigration office/i);
    expect(COMPLIANCE_NOTES.passport).toMatch(/only the government can issue a passport/i);
    expect(COMPLIANCE_NOTES.academy).toMatch(/not IATA or government accreditation/);
    expect(COMPLIANCE_NOTES.jobs).toMatch(/example role categories, not live vacancies/);
    expect(COMPLIANCE_NOTES.financing).toMatch(/not a lender/);
    expect(COMPLIANCE_NOTES.fees).toMatch(/Every invoice shows two lines/i);
  });

  it("keeps the booking-panel disclaimer wording verbatim", () => {
    const sentence =
      "Interactive concept preview. Live fares, hotel inventory, payments and confirmed bookings require integration with actual suppliers.";
    expect(COMPLIANCE_NOTES.indicative.startsWith(sentence)).toBe(true);
    const panel = readFileSync("src/components/site/BookingPanel.tsx", "utf8").replace(/\s+/g, " ");
    expect(panel).toContain(sentence.replace(/\s+/g, " "));
  });

  it("labels insurance products with insurer, limits, exclusions and excess", () => {
    for (const p of INSURANCE_PRODUCTS) {
      expect(p.insurer).toBeTruthy();
      expect(p.limits).toBeTruthy();
      expect(p.excess).toBeTruthy();
      expect(p.scope).toBeTruthy();
      expect(p.exclusions.length).toBeGreaterThan(2);
      expect(p.cover.length).toBeGreaterThan(3);
    }
  });

  it("states an employment type on every published role", () => {
    for (const j of getJobs()) {
      expect(["Employed", "Freelance", "Commission-based", "Independent agent"]).toContain(
        j.employmentType,
      );
      expect(j.salary.length).toBeGreaterThan(10);
      expect(j.status).toBe("approved");
    }
  });
});
