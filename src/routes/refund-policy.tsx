import { createFileRoute } from "@tanstack/react-router";
import { LegalArticle, type LegalSection } from "@/components/site/Legal";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/refund-policy")({
  head: pageMeta(
    "Refund & Cancellation Policy",
    "Cancellation windows and charges for flights, hotels, tour packages, visa documentation services, Academy cohorts and insurance — and who actually decides each refund.",
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
          "No refund is quoted on this site. A refund is calculated only after we hold your ticket or voucher and the supplier confirms the amount in writing.",
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
          "₦10,000 per refund request we pursue for you, or free where the refund is triggered by a carrier schedule change. The fee is charged when we file, not when the money arrives — because that is when our work happens.",
        ],
      },
      {
        h: "Timing",
        p: [
          "Carriers take 14–60 days. We monitor the claim, chase weekly, and update your file at each step. If a carrier refuses, we send you the written reason.",
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
          "Student housing deposits, holding fees and move-in dates are set by the provider. We read the agreement with you before you sign and flag anything that should not be accepted.",
        ],
      },
      {
        h: "Vouchers",
        p: [
          "Your hotel voucher is the cancellation schedule in force at the time of booking. If you cancel inside the window stated on the voucher, the property is entitled to keep the amount shown.",
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
          "Hotels, ground operators and seat blocks on a group departure are committed 30–45 days out. After that the supplier has already been paid and will not release the money, so we cannot refund what we cannot recover.",
        ],
      },
      {
        h: "Group departures",
        p: [
          "If we cancel a departure for not meeting minimum numbers, you get a full refund or a rebooking — your choice, no charge. If an individual cancels from a confirmed group, the scale above applies.",
        ],
      },
      {
        h: "Deposit forfeiture",
        p: [
          "An unpaid balance past its due date releases your seat; the deposit is retained to cover costs already committed.",
        ],
      },
      {
        h: "Transfer instead of cancel",
        p: [
          "Name changes are permitted up to 14 days before departure where the carrier and hotel allow it, for ₦15,000 plus any supplier charge — usually cheaper than cancelling.",
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
          "Government, embassy, biometric and test fees — never refundable by us; the authority sets that rule and most do not refund",
        ],
      },
      {
        h: "If we are at fault",
        p: [
          "Where a refusal or a rejected application traces back to a demonstrable error by us, we refund our service fee in full and re-file at no charge. That has a name in our ledger: service recovery, and it is approved by the managing partner.",
        ],
      },
      {
        h: "Academy cohorts",
        p: [
          "Full refund up to 7 days after the first class; 50% until the end of Module 2; no refund afterwards. Deferral to the next cohort is free once, before Module 4, if life intervenes.",
        ],
      },
      {
        h: "Insurance",
        p: [
          "Free-look periods are set by the insurer, commonly 14 days from the certificate where cover has not begun. We help you cancel inside it and confirm the insurer's response in writing.",
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
          "Reply to your booking confirmation or email desk@haguetravel.example with your reference",
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
          "We will not promise a refund amount before the supplier confirms it, and we will not 'process' a refund that has not been authorised by the supplier. Anyone who offers that is describing a chargeback, not a refund — and it will cost you your file, your seat and possibly your future applications.",
        ],
      },
      {
        h: "Disputes",
        p: [
          "Unhappy with a decision? Escalate in writing to desk@haguetravel.example with 'REFUND ESCALATION' in the subject. A lead reviews it within 3 working days and the managing partner within 7. Every step is answered in writing.",
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
      summary="What is refundable, what is not, who decides, and how long it takes — written so a client can read it once and know exactly where they stand."
      sections={SECTIONS}
      compliance={COMPLIANCE_NOTES.fees}
    />
  );
}
