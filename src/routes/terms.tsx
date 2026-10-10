import { createFileRoute } from "@tanstack/react-router";
import { LegalArticle, type LegalSection } from "@/components/site/Legal";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/terms")({
  head: pageMeta(
    "Booking Terms & Conditions",
    "How Hague Travel quotes, books, invoices and supports a trip: indicative quotations, deposits, supplier terms, changes, documents, liability and complaints.",
    { ogType: "article" },
  ),
  component: Terms,
});

const BRAND_LINE =
  "Written complaints and questions go to desk@haguetravel.example, or the WhatsApp line shown on every page of this site.";

const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    title: "Scope of our service",
    intro:
      "Hague Travel is a travel advisory and booking agency. We arrange services on your behalf with third-party suppliers; we are not the carrier, hotel, insurer, university or government authority.",
    blocks: [
      {
        h: "What we do",
        list: [
          "Prepare quotations and itineraries",
          "Book flights, accommodation, packages and add-ons with suppliers",
          "Assemble and review visa, admission and relocation documentation",
          "Manage changes, refunds and escalations on your behalf",
          "Train and place-ready candidates through the Academy",
        ],
      },
      {
        h: "What we do not do",
        list: [
          "We do not issue visas, admission decisions or passports",
          "We do not underwrite insurance or decide claims",
          "We do not operate aircraft, hotels or universities",
          "We do not guarantee any government or supplier outcome",
        ],
      },
    ],
  },
  {
    id: "quotes",
    title: "Quotations, availability and prices",
    blocks: [
      {
        h: "Every price starts as indicative",
        p: [
          "Prices shown anywhere on this site are indicative. A fare, room rate or package price becomes binding only when the supplier confirms it and we issue a written quotation with an expiry date.",
        ],
        note: COMPLIANCE_NOTES.indicative,
      },
      {
        h: "Quotation validity",
        p: [
          "Airline fares usually hold for 24–72 hours; package and group rates usually hold 7 days. The expiry is printed on the quotation. After expiry we re-check rather than assume.",
        ],
      },
      {
        h: "Currency",
        p: [
          "NGN is our primary billing currency. Where a supplier bills in USD or GBP, the quotation states the currency and the exchange basis. The site's currency switcher is a display aid only — invoices are raised in the supplier's currency.",
        ],
      },
      {
        h: "Taxes and charges",
        p: [
          "Government, carrier, airport, visa, biometric and university charges are itemised separately from our agency fee on every invoice.",
        ],
      },
    ],
  },
  {
    id: "booking",
    title: "Booking, deposits and balance",
    blocks: [
      {
        h: "When a booking exists",
        p: [
          "A booking exists only when (a) you accept the written quotation, (b) the required deposit is received, and (c) the supplier has confirmed and we have issued your ticket, voucher or certificate of confirmation.",
        ],
      },
      {
        h: "Deposits",
        p: [
          "Individual packages usually require 30% to hold space; groups 20% with a name-deferral window; airline tickets are payable in full at issue. Your quotation states the exact rule.",
        ],
      },
      {
        h: "Deadlines we enforce",
        p: [
          "Deposit and balance deadlines come from supplier terms. If a deadline passes unpaid, the supplier may release your space or re-price the fare; we are not able to override that.",
        ],
      },
      {
        h: "Names and documents",
        p: [
          "Passenger names must match the passport exactly. A name correction after issue may be impossible or chargeable by the carrier, and is not an error we can fix for free.",
        ],
      },
    ],
  },
  {
    id: "changes",
    title: "Changes, cancellations and refunds",
    blocks: [
      {
        h: "Both rules apply",
        p: [
          "Any change or cancellation is subject to the supplier's rules and ours, whichever is stricter. Supplier penalties are passed through at cost; our service fee for handling the change is stated before we act.",
        ],
      },
      {
        h: "Where to read the detail",
        p: [
          "The percentages and windows are on the Refund & Cancellation Policy page, and repeated on the specific package page you booked. The confirmation email restates them for your booking.",
        ],
      },
      {
        h: "Refund timing",
        p: [
          "Supplier refunds typically take 14–60 days because they depend on the carrier or hotel, not us. We chase them and report status at every stage.",
        ],
      },
    ],
  },
  {
    id: "responsibility",
    title: "Your responsibilities",
    blocks: [
      {
        h: "Before you travel",
        list: [
          "Hold a passport valid for at least six months beyond your return date, with free pages",
          "Obtain and correctly present every visa, permit and health certificate required",
          "Arrive by the check-in time stated on your ticket, and at the correct airport and terminal",
          "Carry printed or offline copies of your documents where required",
          "Tell us about medical needs, minors travelling alone and special assistance in advance",
        ],
      },
      {
        h: "Information you provide",
        p: [
          "You are responsible for the accuracy of the information you give us. Incomplete or inaccurate disclosure can void insurance cover, trigger a visa refusal or make a booking unusable at your cost.",
        ],
      },
    ],
  },
  {
    id: "liability",
    title: "Liability and conduct",
    blocks: [
      {
        h: "Our liability",
        p: [
          "Our liability for any claim is limited to the value of the agency service fees we earned on the affected booking, except where Nigerian law requires otherwise. Supplier acts and omissions — delays, overbooking, injury, loss — are the supplier's responsibility, and we will pursue them for you.",
        ],
      },
      {
        h: "Not acceptable",
        p: [
          "Fraudulent documents, misrepresentation, attempted illegal work or immigration routes, and abuse of staff. We will close the file, retain nothing owed to you, and report criminal conduct where required.",
        ],
      },
    ],
  },
  {
    id: "complaints",
    title: "Complaints, escalation and governing law",
    blocks: [
      {
        h: "Escalation ladder",
        list: [
          "Step 1 — Write to your consultant; we acknowledge within one working day",
          "Step 2 — Unresolved in 3 days, it escalates to the desk lead with a written response",
          "Step 3 — Unresolved in 7 days, it escalates to the managing partner with a decision and remedy",
          "Step 4 — Still unresolved, we give you the supplier's and regulator's complaint routes in writing",
        ],
      },
      {
        h: "Governing law",
        p: [
          "These terms are governed by the laws of the Federal Republic of Nigeria, with Lagos as the seat for any dispute. Nothing here limits your statutory consumer rights.",
        ],
      },
      { h: "Contact", p: [BRAND_LINE] },
    ],
  },
];

function Terms() {
  return (
    <LegalArticle
      eyebrow="Legal & policy"
      title="Booking Terms & Conditions"
      updated="10 October 2026"
      summary="The plain-English agreement between you and Hague Travel: what we book, what we cannot promise, when money is owed, and how a problem gets resolved."
      sections={SECTIONS}
      compliance={COMPLIANCE_NOTES.fees}
    />
  );
}
