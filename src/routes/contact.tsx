import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, LifeBuoy } from "lucide-react";
import {
  EnquiryForm,
  contactFields,
  preferredContactField,
  type FieldDef,
} from "@/components/site/Form";
import {
  ComplianceNote,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Steps,
} from "@/components/site/Blocks";
import { images, BRAND, COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { FAQ_TOPICS } from "@/data/services";
import { pageMeta } from "@/lib/meta";

interface ContactSearch {
  topic?: string | undefined;
}

function validateSearch(search: Record<string, unknown>): ContactSearch {
  return typeof search["topic"] === "string" && search["topic"].length > 0
    ? { topic: search["topic"] }
    : {};
}

const TOPICS = [
  "Flights",
  "Hotels & long stays",
  "Holiday packages",
  "Study abroad",
  "Work & relocation",
  "Passports & documentation",
  "Travel insurance",
  "Transfers & extras",
  "Academy enrolment",
  "Careers & job board",
  "Corporate travel",
  "Existing booking / support",
  "Feedback or complaint",
] as const;

export const Route = createFileRoute("/contact")({
  validateSearch,
  head: () => {
    const base = pageMeta(
      "Contact a Hague Travel Consultant",
      "Reach the right desk first time: flights, hotels, packages, study abroad, relocation, passports, insurance, academy, careers, corporate and existing-booking support.",
    )();
    return {
      ...base,
      meta: [...base.meta, { name: "keywords", content: FAQ_TOPICS.join(", ") }],
    };
  },
  component: Contact,
});

function fieldsFor(topic: string | undefined): FieldDef[] {
  return [
    ...contactFields,
    {
      name: "topic",
      label: "Which desk?",
      type: "select",
      options: [...TOPICS],
      defaultValue: topic && TOPICS.includes(topic as (typeof TOPICS)[number]) ? topic : "",
    },
    preferredContactField,
    {
      name: "ref",
      label: "Booking or case reference",
      required: false,
      placeholder: "HT-ENQ-78410 — leave blank if you have none",
    },
    {
      name: "when",
      label: "Any deadline?",
      type: "date",
      required: false,
      help: "Travel date, appointment date or intake deadline — it decides our priority.",
    },
    {
      name: "message",
      label: "How can we help?",
      type: "textarea",
      rows: 5,
      full: true,
      placeholder:
        "Route, dates, party size, budget range and what you already tried. Two minutes here saves three calls.",
    },
    {
      name: "consent",
      label: "I understand this form does not create a booking",
      type: "checkbox",
      help: "It sends a request to a consultant. Nothing is confirmed until a supplier confirms and we issue documents to you.",
    },
  ];
}

function Contact() {
  const { topic } = Route.useSearch();
  const navigate = useNavigate();
  const fields = useMemo(() => fieldsFor(topic), [topic]);

  return (
    <>
      <PageHero
        image={images.relocation}
        eyebrow="Contact"
        title={
          <>
            Talk to a person who can <em className="text-gold">actually help</em>.
          </>
        }
        sub="Pick a desk, send the detail you already have, and a consultant answers within the service window below. No call-centre script, no ticket number for a queue."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">
            <Clock className="mr-1 inline h-3 w-3" /> {BRAND.hours}
          </Pill>
          <Pill>Replies in 30 min – 2 hrs</Pill>
          <Pill>Urgent in-trip line, 24/7</Pill>
        </div>
      </PageHero>

      <Section eyebrow="Fastest routes" title="Four ways to reach the desk">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: MessageCircle,
              t: "WhatsApp",
              v: BRAND.phone,
              d: "Fastest for most things. Send your route and dates and we quote.",
              href: waLink(waMessages.general),
            },
            {
              icon: Mail,
              t: "Enquiries",
              v: BRAND.email,
              d: "Best for documents, group briefs and corporate tenders.",
              href: `mailto:${BRAND.email}`,
            },
            {
              icon: LifeBuoy,
              t: "Existing bookings",
              v: BRAND.desk,
              d: "Changes, refunds, delays and escalations go to the desk lead.",
              href: `mailto:${BRAND.desk}`,
            },
            {
              icon: Phone,
              t: "Call the desk",
              v: BRAND.phone,
              d: "Within our hours; 24/7 for travellers already in transit.",
              href: `tel:${BRAND.phone.replace(/\s/g, "")}`,
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 50}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary">
                  <c.icon className="h-5 w-5 text-primary" />
                </span>
                <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  {c.t}
                </p>
                <p className="mt-1 font-display text-lg leading-snug">{c.v}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                <p className="mt-3 text-xs font-bold text-primary">Open →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Send a request"
        title="Tell us the detail you have — we do the rest"
      >
        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <EnquiryForm
            title="Contact form"
            description="This is a preview: the form validates and shows a confirmation, but it does not transmit anything."
            cta="Send my request"
            refPrefix="HT-ENQ"
            fields={fields}
            note="Requests are answered in the order of travel urgency, not the order received. A deadline you can name always moves you up."
            successTitle="Request received"
            successLines={[
              "Your enquiry is logged and routed to the desk you selected.",
              "A consultant reviews it and replies on your chosen channel within the service window.",
              "If documents are needed, you get a checklist before any payment is requested.",
            ]}
          />

          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="font-display text-2xl leading-snug">What happens after you send it</p>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  {
                    t: "Enquiry received",
                    d: "Reference issued immediately; logged against the desk.",
                  },
                  {
                    t: "Documents required",
                    d: "If your case needs paperwork, you get a specific list — not a generic form.",
                  },
                  {
                    t: "Quote prepared",
                    d: "Live availability checked with the supplier and sent in writing with an expiry.",
                  },
                  {
                    t: "Payment pending → confirmed",
                    d: "Invoice with supplier cost, authority charges and our fee as separate lines.",
                  },
                  {
                    t: "Supplier booking confirmed",
                    d: "Only now does anything read as confirmed, with a supplier reference.",
                  },
                  {
                    t: "Ticket / voucher issued",
                    d: "E-ticket, voucher and policy documents in your name.",
                  },
                  {
                    t: "Status updates & reminders",
                    d: "Application stage changes, deadlines and balance reminders.",
                  },
                  {
                    t: "Cancellation / refund updates",
                    d: "If plans change, the same ladder runs in reverse with written updates.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink font-display text-[11px] text-ink-foreground">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-bold leading-snug">{s.t}</span>
                      <span className="block text-muted-foreground">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="flex items-center gap-2 font-bold">
                <MapPin className="h-4 w-4 text-gold" /> Where we are
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{BRAND.address}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {BRAND.company} · {BRAND.rc}. Most of our work is remote and document-first; you
                rarely need to visit anyone to book a trip properly.
              </p>
            </div>

            <Notice tone="sea" title="Never pay into a personal account">
              Every Hague Travel payment goes against an invoice from the company. If someone asks
              you to send money to a personal wallet "to speed up" a visa, a seat or a refund, that
              is fraud — call the desk immediately.
            </Notice>
          </div>
        </div>
      </Section>

      <Section eyebrow="Answered already?" title="Check the FAQ before you write" size="sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Booking", "Visas", "Fees", "Payments", "Documents", "Insurance"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => void navigate({ to: "/faqs", search: { topic: t } })}
              className="lift rounded-2xl border border-border bg-card p-4 text-left"
            >
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                See the {t.toLowerCase()} answers →
              </p>
            </button>
          ))}
        </div>
        <div className="mt-6">
          <Steps
            items={[
              {
                title: "Know your dates",
                detail: "Flexible windows change the price more than any airline does.",
              },
              {
                title: "Know your passport",
                detail: "Expiry date and nationality decide routes, visas and fares.",
              },
              {
                title: "Set a budget ceiling",
                detail:
                  "A range lets us find the best compliant option faster than a single number.",
              },
              {
                title: "Tell us the history",
                detail:
                  "Prior refusals, overstays and name mismatches must be known before we file.",
              },
            ]}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            to="/faqs"
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            Open the help centre
          </Link>
          <Link
            to="/packages"
            className="rounded-full border border-input bg-card px-5 py-3 text-sm font-bold"
          >
            Browse packages first
          </Link>
        </div>
        <ComplianceNote className="mt-6" text={COMPLIANCE_NOTES.indicative} />
      </Section>
    </>
  );
}
