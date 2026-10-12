/**
 * Server-only facts the concierge is allowed to quote from.
 *
 * Everything here comes from the same mock catalogue the pages render, so the
 * assistant never invents a trip, a cohort or a fee. Prices stay labelled
 * indicative — the system prompt in chat.server.ts owns that rule.
 */
import { getOpenCohorts } from "@/data/academy";
import { getDestinations } from "@/data/destinations";
import { getPopularRoutes } from "@/data/flights";
import { getHotels, getStudentHousing } from "@/data/hotels";
import { getJobs } from "@/data/jobs";
import { getPublishedPackages } from "@/data/packages";
import { FAQS, INSURANCE_PRODUCTS } from "@/data/services";
import { BRAND } from "@/data/site";

const naira = (value: number) => `NGN ${value.toLocaleString("en-NG")}`;

const join = (rows: string[]) => rows.filter(Boolean).join("\n");

const packages = getPublishedPackages()
  .slice(0, 12)
  .map(
    (p) =>
      `- ${p.title} (${p.destination}, ${p.category}) — ${p.days} days/${p.nights} nights, departs ${p.departDate}, returns ${p.returnDate}. From ${naira(p.pricePerPerson)} per person; single supplement ${naira(p.singleSupplement)}; child ${naira(p.childPrice)}. ${p.spacesRemaining} of ${p.maxGroup} spaces left. Deposit ${p.depositPct}% by ${p.depositDue}, balance by ${p.balanceDue}. Flights included: ${p.flightsIncluded ? "yes" : "no"} (${p.flightNote}). Visa: ${p.visaRequirement}`,
  );

const routes = getPopularRoutes(8).map(
  (r) =>
    `- ${r.fromCode} ${r.from} → ${r.toCode} ${r.to} with ${r.airline}, ${r.stops === 0 ? "direct" : `${r.stops} stop(s)`}, ${r.duration}. From ${naira(r.indicativeFrom)} return, economy.`,
);

const hotels = getHotels()
  .slice(0, 10)
  .map(
    (h) =>
      `- ${h.name}, ${h.city} (${h.kind}, ${h.stars}★) — from ${naira(h.pricePerNight)} per night. ${h.tags.slice(0, 3).join(", ")}.`,
  );

const housing = getStudentHousing()
  .slice(0, 6)
  .map(
    (s) =>
      `- ${s.name}, ${s.city} — budget ${naira(s.monthlyBudget)} per month, deposit ${s.deposit}, near ${s.near}.`,
  );

const study = getDestinations().map(
  (d) =>
    `- ${d.name}: intakes ${d.intakes.join(", ")}. Tuition range ${d.tuitionRange}. Post-study work: ${d.postStudyWork}. Visa route: ${d.visaRoute}.`,
);

const cohorts = getOpenCohorts().map(
  (c) =>
    `- ${c.title} (${c.cohort}, ${c.month} ${c.year}) — starts ${c.startDate}, ends ${c.endDate}, classes ${c.classes}. ${c.seats - c.seatsTaken} of ${c.seats} seats left. Fee ${naira(c.fee)} (${c.feeNote}). Register by ${c.registrationDeadline}.`,
);

const jobs = getJobs()
  .slice(0, 10)
  .map(
    (j) =>
      `- ${j.title} — ${j.employer}, ${j.country}, ${j.workMode}, ${j.employmentType}, ${j.experience} level. ${j.salary}. Apply by ${j.deadline}.`,
  );

const insurance = INSURANCE_PRODUCTS.map(
  (i) => `- ${i.name} (${i.type}) — from ${naira(i.from)} with ${i.insurer}. Covers ${i.cover.slice(0, 4).join(", ")}.`,
);

const faqs = FAQS.map((f) => `- Q: ${f.q}\n  A: ${f.a}`);

export const FACT_DIGEST = `
CONTACT DESK
Phone/WhatsApp: ${BRAND.phone}. Email: ${BRAND.email}. Hours: ${BRAND.hours}. Office: ${BRAND.address}.

HOLIDAY PACKAGES ON THE SITE (indicative, supplier-quoted)
${join(packages)}

POPULAR FLIGHT ROUTES (indicative return fares, economy)
${join(routes)}

HOTELS (indicative nightly rates)
${join(hotels)}

STUDENT / LONG-STAY HOUSING (indicative monthly budgets)
${join(housing)}

STUDY-ABROAD DESTINATIONS
${join(study)}

HAQUE TRAVEL ACADEMY — OPEN COHORTS
${join(cohorts)}

REMOTE / TRAVEL JOBS CURRENTLY LISTED (no fees ever charged to apply)
${join(jobs)}

TRAVEL INSURANCE PRODUCTS (indicative premiums)
${join(insurance)}

STANDARD ANSWERS ALREADY AGREED WITH THE BRAND
${join(faqs)}
`.trim();
