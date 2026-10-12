import { createFileRoute } from "@tanstack/react-router";
import { LegalArticle, type LegalSection } from "@/components/site/Legal";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/visa-disclaimer")({
  head: pageMeta(
    "Visa & Immigration Disclaimer",
    "Visas and admissions are decided by embassies and immigration offices — never by us. We handle the paperwork and the process, nothing more.",
    { ogType: "article" },
  ),
  component: VisaDisclaimer,
});

const SECTIONS: LegalSection[] = [
  {
    id: "core",
    title: "The disclaimer, stated plainly",
    blocks: [
      {
        h: "Read this first",
        note: COMPLIANCE_NOTES.visa,
        p: [
          "No agency, consultant, lawyer or 'connection' can decide your visa. Only the embassy or immigration office of the country you are applying to can do that.",
        ],
      },
      {
        h: "What we therefore never say",
        list: [
          "'Guaranteed visa'",
          "'100% approval rate'",
          "'We can get it approved in 48 hours'",
          "'My contact inside the High Commission will handle it'",
          "'Pay me and skip the interview'",
          "'A marriage certificate will sort the refusal out'",
        ],
      },
      {
        h: "What we do promise",
        list: [
          "A complete, consistent, honestly prepared application",
          "Every document checked against the current published requirements",
          "Financial evidence assembled to the 28-day or 90-day rule, correctly",
          "Interview preparation that teaches you your own file",
          "Written status updates at every stage",
          "A clear refusal reason and a realistic re-application plan if it goes wrong",
        ],
      },
    ],
  },
  {
    id: "scope",
    title: "Where our role stops",
    blocks: [
      {
        h: "Boundaries by authority",
        list: [
          "Visa approval, refusal, cancellation and revocation — the immigration authority only",
          "Passport issuance and biometrics — the Nigeria Immigration Service, or the relevant mission abroad",
          "Admission, scholarships and CAS/I-20 issuance — the university",
          "English and health test results — the approved test provider",
          "Insurance claims — the insurer",
          "Employer sponsorship licences — the destination country's regulator",
        ],
      },
      {
        h: "Our actual scope",
        p: [
          "Advice, paperwork, appointments, submission help, tracking and escalation. That is what our fee pays for. It does not buy influence with any office, and we will not pretend it does.",
        ],
      },
    ],
  },
  {
    id: "factors",
    title: "What actually determines an outcome",
    blocks: [
      {
        h: "The factors an officer weighs",
        list: [
          "Ties to home: employment, property, family, history of returning",
          "Funds: real, documented, held long enough, and explainable",
          "Purpose: consistent across form, letter, interview and itinerary",
          "Study history: relevant progression, no serial course-hopping",
          "Compliance record: prior overstays, refusals, removals, deception findings",
          "Credibility: how the file reads as a whole, not how well it is written",
        ],
      },
      {
        h: "Why we ask hard questions",
        p: [
          "When we ask why this course, this city, this employer, we are practising the exact question from the visa interview. A consultant who never asks those is not preparing you.",
        ],
      },
      {
        h: "Refusal reasons we most often see",
        list: [
          "Funds appear in the account just before printing ('funds parking')",
          "Course is a downgrade from prior qualification without explanation",
          "Inconsistent travel or work history between documents",
          "Unexplained sponsor and unclear relationship",
          "Prior overstay or refusal not disclosed",
          "Generic or obviously copied study plan",
        ],
      },
    ],
  },
  {
    id: "risk",
    title: "The risks of the shortcuts other people sell",
    blocks: [
      {
        h: "Fabricated documents",
        p: [
          "Bank statements, job letters and offers made by a 'processor' are fraud. Past the refusal, they usually bring a 10-year deception ban in the UK, US, Canada, Australia and Schengen.",
        ],
      },
      {
        h: "Guaranteed-work scams",
        p: [
          "An 'employer' who asks for money for registration, a visa, a medical or a file before a signed contract — and promises a visa — is running a scam. Tell us, and we publish the pattern without naming you.",
        ],
      },
      {
        h: "Marriage and asylum routes as 'options'",
        p: [
          "These are not services for sale. Telling someone to lie about a relationship or an asylum claim is a crime, and we refuse it in writing.",
        ],
      },
      {
        h: "Third parties on social media",
        p: [
          "We do not work through unnamed Telegram or WhatsApp handles, we do not take payment to a personal account, and we never ask you to 'send cash to the officer'. If someone claims to be us, check the number on this site first.",
        ],
      },
    ],
  },
  {
    id: "third-party",
    title: "Third-party advice and limits of ours",
    blocks: [
      {
        h: "We are not immigration lawyers",
        p: [
          "Our consultants know the paperwork and the process. We are not licensed immigration advisers for every country. When a case needs one — refusals, appeals, criminal or protection issues — we say so and work with a licensed adviser instead of pretending.",
        ],
      },
      {
        h: "Rules move",
        p: [
          "Immigration rules change with little warning. What is on this site is a guide, correct when we wrote it. The authority's own rules always win.",
        ],
      },
      {
        h: "Fees and refusal consequences",
        p: [
          "Application fees are usually not refundable once a decision is made, whatever that decision is. A refusal also puts your school deposit and any early ticket at risk. That is why we time the payments.",
        ],
      },
    ],
  },
  {
    id: "report",
    title: "Reporting and escalation",
    blocks: [
      {
        h: "See something wrong?",
        list: [
          "Anyone asking candidates or clients for a 'guaranteed visa' fee — report it to info@haguetravel.com",
          "An employer demanding payment for a listing or visa — we reject them and warn the network",
          "A document offered to you as 'processed' — send us the screenshot before you pay",
          "One of our own staff requesting a payment outside an invoice — escalate to the managing partner",
        ],
      },
      {
        h: "We will not use your story for marketing",
        p: [
          "Every story here is used with written consent, refusal reasons and hard parts included. A testimonial that hides the process is not a testimonial — it is an advert.",
        ],
      },
    ],
  },
];

function VisaDisclaimer() {
  return (
    <LegalArticle
      eyebrow="Legal & policy"
      title="Visa & Immigration Disclaimer"
      updated="10 October 2026"
      summary="The most important page on this site. It says what no agency can promise, what we can be held to, and how to spot the promises that get people banned."
      sections={SECTIONS}
      compliance={COMPLIANCE_NOTES.visa}
    />
  );
}
