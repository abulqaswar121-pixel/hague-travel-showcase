import { createFileRoute } from "@tanstack/react-router";
import { LegalArticle, type LegalSection } from "@/components/site/Legal";
import { COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/visa-disclaimer")({
  head: pageMeta(
    "Visa & Immigration Disclaimer",
    "Visa and admission decisions rest solely with embassies, consulates and immigration authorities. Hague Travel provides documentation guidance and submission support only.",
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
          "No agency, consultant, lawyer or 'connection' can decide a visa outcome. The decision belongs exclusively to the embassy, consulate or immigration authority of the country you are applying to, and to the university for admission.",
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
          "Advisory, documentation, appointment booking, submission support, tracking and escalation. Our fee pays for that work. It does not buy influence with an authority, and we will not pretend otherwise.",
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
          "When we ask why you chose this course, this city and this employer, we are rehearsing the exact question at the visa interview. A consultant who never asks you those questions is not assessing your file.",
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
          "Bank statements, employment letters and offers produced by a 'processor' are fraud. Beyond the refusal, they commonly cause a 10-year deception ban on UK, US, Canadian, Australian and Schengen applications. No visa is worth a decade of your movement.",
        ],
      },
      {
        h: "Guaranteed-work scams",
        p: [
          "An 'employer' who asks for a registration, visa, medical or file fee before a signed contract, and guarantees a visa, is running a scam. Report it to us and we will publish the pattern — never the person's unverified name.",
        ],
      },
      {
        h: "Marriage and asylum routes as 'options'",
        p: [
          "These are not service options for sale. Advising anyone to misrepresent a relationship or a protection claim is criminal encouragement, and we refuse it in writing.",
        ],
      },
      {
        h: "Third parties on social media",
        p: [
          "We do not operate through unnamed Telegram or WhatsApp handles, we do not accept payment to a personal account, and we do not ask you to 'send cash to the officer'. If someone claims to be us and asks for that, they are not.",
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
          "Our consultants are trained and experienced in documentation and process. We are not registered immigration advisers for every destination; where a case needs one — refusals, appeals, criminal history, prior bans — we tell you, and we will work alongside your lawyer rather than compete with them.",
        ],
      },
      {
        h: "Rules move",
        p: [
          "Immigration rules change with little notice. Requirements published on this site are indicative and current to the best of our knowledge at the time of writing; the authority's published rules always govern. We check the live source before every submission, and never a blog.",
        ],
      },
      {
        h: "Fees and refusal consequences",
        p: [
          "Application fees are generally non-refundable when a decision is made, whatever the outcome. A refusal also affects your deposit with a university and any airline ticket issued early. That is why we sequence: admission → financial evidence → then tickets.",
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
          "Anyone asking candidates or clients for a 'guaranteed visa' fee — report it to desk@haguetravel.example",
          "An employer demanding payment for a listing or visa — we reject them and warn the network",
          "A document offered to you as 'processed' — send us the screenshot before you pay",
          "One of our own staff requesting a payment outside an invoice — escalate to the managing partner",
        ],
      },
      {
        h: "We will not use your story for marketing",
        p: [
          "Every success story on this site is used with written consent, with the refusal reasons and hard parts intact. A testimonial that omits the process is not a testimonial, it is an advertisement.",
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
      summary="The most important page on this site. It explains what no agency can promise, what we can be held to, and how to spot the promises that get people banned."
      sections={SECTIONS}
      compliance={COMPLIANCE_NOTES.visa}
    />
  );
}
