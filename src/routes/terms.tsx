import { createFileRoute } from "@tanstack/react-router";
import { LegalArticle, type LegalSection } from "@/components/site/Legal";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/terms")({
  head: pageMeta(
    "Booking Terms & Conditions",
    "How we quote, book, invoice and support a trip: guide prices, deposits, supplier rules, changes, documents, who is answerable, and complaints.",
    { ogType: "article" },
  ),
  component: Terms,
});

const BRAND_LINE =
  "Send complaints and questions to desk@haguetravel.example, or the WhatsApp line shown on every page.";

const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    title: "Scope of our service",
    intro:
      "We are a travel agency. We arrange services with other companies — the airline, the hotel, the insurer, the school, the government. We are not them, and we cannot decide what they decide.",
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
          "Prices on this site are a guide. A fare, room rate or package price only becomes the price when the supplier confirms it and we send a written quote with an expiry date.",
        ],
        note: COMPLIANCE_NOTES.indicative,
      },
      {
        h: "Quotation validity",
        p: [
          "Airline fares usually hold for 24 to 72 hours. Package and group rates usually hold 7 days. The date is printed on your quote. After that we check again — we do not assume.",
        ],
      },
      {
        h: "Currency",
        p: [
          "We bill in naira first. If a supplier bills in USD or GBP, the quote states the currency and the rate we used. The switcher in the header is only for reading. Invoices stay in the currency we agreed.",
        ],
      },
      {
        h: "Taxes and charges",
        p: [
          "Government, airline, airport, visa, biometric and school charges sit on their own lines, apart from our fee, on every invoice.",
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
          "A booking exists only when three things are true: you accept the written quote, we have your deposit, and the supplier has confirmed and we have sent your ticket, voucher or certificate.",
        ],
      },
      {
        h: "Deposits",
        p: [
          "Most packages need 30% to hold space. Groups need 20%, with time to add names. Airline tickets are paid in full when issued. Your quote states the exact rule.",
        ],
      },
      {
        h: "Deadlines we enforce",
        p: [
          "Deposit and balance dates come from the supplier. If a date passes unpaid, they may release your space or re-price the fare. We cannot override that.",
        ],
      },
      {
        h: "Names and documents",
        p: [
          "Names must match the passport exactly. After a ticket is issued, a name fix may be impossible, or the airline charges for it. It is not an error we can repair for free.",
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
          "Changes and cancellations follow the supplier's rules and ours, whichever is stricter. Supplier penalties are passed to you at cost, and our handling fee is stated in writing before we act.",
        ],
      },
      {
        h: "Where to read the detail",
        p: [
          "The exact percentages and dates are on the Refund & Cancellation Policy page and on the package page you booked. Your confirmation email says them again.",
        ],
      },
      {
        h: "Refund timing",
        p: [
          "Supplier refunds usually take 14 to 60 days, because they depend on the airline or hotel, not us. We chase them and update you at every stage.",
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
          "You are answerable for what you tell us. Wrong or missing information can void insurance, cause a visa refusal, or make a booking useless at your own cost.",
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
          "If something goes wrong, our liability is capped at the service fees we earned on that booking, unless Nigerian law says otherwise. What a supplier does — or fails to do — is on the supplier.",
        ],
      },
      {
        h: "Not acceptable",
        p: [
          "Fake documents, lying about your case, trying to work or migrate illegally, or abusing our staff. We close the file, keep nothing we owe you, and report crime to the police.",
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
          "Nigerian law governs these terms, and Lagos is where any dispute is heard. Nothing here takes away your consumer rights in law.",
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
      summary="The plain-English agreement between you and Hague Travel: what we book, what we cannot promise, when money is owed, and how a problem gets fixed."
      sections={SECTIONS}
      compliance={COMPLIANCE_NOTES.fees}
    />
  );
}
