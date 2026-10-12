import { createFileRoute } from "@tanstack/react-router";
import { LegalArticle, type LegalSection } from "@/components/site/Legal";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/refund-policy")({
  head: pageMeta(
    "Refund & Cancellation Policy",
    "What you get back on flights, hotels, packages, visa services, Academy cohorts and insurance — who decides, and how long it takes.",
    { ogType: "article" },
  ),
  component: RefundPolicy,
});

const SECTIONS: LegalSection[] = [
  {
    id: "principles",
    title: "Four principles before any table",
    blocks: [
      {
        h: "How to read this policy",
        list: [
          "We pass supplier charges through at cost — we do not add a penalty on top of theirs",
          "Our service fee for work already done is generally not refundable; the money we held for suppliers is",
          "Where a supplier is more generous than this table, you get the better terms",
          "Every charge is stated as a percentage because the amount depends on the fare and the date",
        ],
      },
      {
        h: "Nothing here is invented",
        p: [
          "No refund amount is promised on this site. We can only work one out after we hold your ticket or voucher and the supplier confirms the figure in writing.",
        ],
        note: COMPLIANCE_NOTES.indicative,
      },
    ],
  },
  {
    id: "flights",
    title: "Flights",
    intro: "The fare rules of the ticket decide everything. There is no agency override.",
    blocks: [
      {
        h: "Refundability by fare type",
        list: [
          "Refundable economy and business — refundable with a carrier penalty; we process the claim",
          "Partly refundable — taxes and unused sectors may be refundable even where the base fare is not",
          "Discounted and promotional fares — usually non-refundable, occasionally refundable for a steep fee",
          "Award and consolidated fares — governed by the consolidator's rules, which we obtain for you",
          "Domestic Nigerian economy — typically refundable with a scale of charges by hours before departure",
        ],
      },
      {
        h: "Free windows we do control",
        list: [
          "24-hour grace on carriers that offer it — we flag it at booking",
          "Schedule change of 2+ hours, or a cancelled flight — you get rebooking or a full refund at no charge to you",
          "Duplicate booking made in error within 2 hours, before ticketing — voidable at no charge",
        ],
      },
      {
        h: "Our handling fee",
        p: [
          "₦10,000 for each refund we chase for you. It is free when the airline changed the schedule. We charge when we file the claim, not when the money lands — because filing is the work.",
        ],
      },
      {
        h: "Timing",
        p: [
          "Carriers take 14 to 60 days. We watch the claim, chase weekly, and update your file at each step. If the carrier says no, we send you their written reason.",
        ],
      },
    ],
  },
  {
    id: "hotels",
    title: "Hotels, apartments and long stays",
    blocks: [
      {
        h: "Typical windows",
        list: [
          "Free cancellation up to 48 hours before arrival on most flexible rates",
          "Up to 7 days before arrival on discounted and festive-period rates",
          "Non-refundable advance-purchase rates — no refund, as sold",
          "Long-stay student housing — governed by the tenancy or licence agreement, not by us",
          "No-show — usually one night's charge, sometimes the whole stay",
        ],
      },
      {
        h: "Deposits and move-in",
        p: [
          "Housing deposits, holding fees and move-in dates come from the provider. We read the agreement with you before you sign and flag anything you should not accept.",
        ],
      },
      {
        h: "Vouchers",
        p: [
          "Your hotel voucher holds the cancellation rules that applied when you booked. Cancel inside that window and the property keeps the amount printed on it.",
        ],
      },
    ],
  },
  {
    id: "packages",
    title: "Hague Experiences tour packages",
    blocks: [
      {
        h: "Standard scale",
        list: [
          "60+ days before departure — 90% refund of the package price",
          "59 to 30 days — 75% refund",
          "29 to 15 days — 50% refund",
          "14 to 7 days — 25% refund",
          "Under 7 days or no-show — no refund",
        ],
      },
      {
        h: "Why the dates are hard",
        p: [
          "Hotels, ground operators and group seats are locked 30 to 45 days out. After that the supplier has been paid and will not return the money, so we cannot refund it.",
        ],
      },
      {
        h: "Group departures",
        p: [
          "If we cancel a trip because the group did not fill, you get all your money back or new dates — your choice, no charge. If you leave a group after it is confirmed, the scale above applies.",
        ],
      },
      {
        h: "Deposit forfeiture",
        p: [
          "Miss your balance date and your seat is released. We keep the deposit to cover what we already paid out.",
        ],
      },
      {
        h: "Transfer instead of cancel",
        p: [
          "We can change a name up to 14 days before departure if the airline and hotel allow it: ₦15,000 plus any supplier charge. That is usually cheaper than cancelling.",
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Visa, passport and advisory services",
    blocks: [
      {
        h: "Our service fee",
        list: [
          "Before any work starts — full refund, no question asked",
          "After document review has begun — 50% refundable",
          "After an appointment is booked or an application lodged — not refundable",
          "Government, embassy, biometric and test fees are never refundable by us. The authority sets that rule, and most of them do not refund.",
        ],
      },
      {
        h: "If we are at fault",
        p: [
          "If a refusal traces back to a real error by us, we refund our fee in full and re-file for nothing. In our ledger that has a name: service recovery.",
        ],
      },
      {
        h: "Academy cohorts",
        p: [
          "Full refund up to 7 days after class starts, 50% until the end of Module 2, nothing after that. You can move to the next cohort once for free, before Module 4.",
        ],
      },
      {
        h: "Insurance",
        p: [
          "The insurer sets the free-look window — usually 14 days from the certificate if cover has not started. We help you cancel inside it and get the insurer's answer in writing.",
        ],
      },
    ],
  },
  {
    id: "process",
    title: "How to request a refund",
    blocks: [
      {
        h: "The process",
        list: [
          "Reply to your booking confirmation or email info@haguetravel.com with your reference",
          "State what you are cancelling and why — it changes which rules apply",
          "We acknowledge within one working day and send the calculated figures in writing",
          "You confirm acceptance of the figures",
          "We file the claim with the supplier and track it to settlement",
          "Money is returned to the original payment method wherever the supplier permits it",
        ],
      },
      {
        h: "What we will not do",
        p: [
          "We will not name a refund amount before the supplier confirms it, and we will not 'process' a refund the supplier has not approved. Anyone who offers that is describing a crime.",
        ],
      },
      {
        h: "Disputes",
        p: [
          "Unhappy with a decision? Email info@haguetravel.com with REFUND ESCALATION in the subject. A lead reads it within 3 working days and the managing partner within 7. Every escalation ends with a written answer.",
        ],
      },
    ],
  },
];

function RefundPolicy() {
  return (
    <LegalArticle
      eyebrow="Legal & policy"
      title="Refund & Cancellation Policy"
      updated="10 October 2026"
      summary="What is refundable, what is not, who decides, and how long it takes — written so one read tells you where you stand."
      sections={SECTIONS}
      compliance={COMPLIANCE_NOTES.fees}
    />
  );
}
