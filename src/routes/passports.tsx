import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Fingerprint, Lock, ShieldAlert } from "lucide-react";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import {
  ComplianceNote,
  FeeSplit,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Steps,
} from "@/components/site/Blocks";
import { PASSPORT_PATHWAYS, PASSPORT_SECURITY, PACKING_CHECKLISTS } from "@/data/services";
import { images, COMPLIANCE_NOTES } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/passports")({
  head: pageMeta(
    "Passport Assistance & Document Guidance",
    "New passport assistance, renewal and replacement guidance, photo specifications, appointment scheduling and secure document handling. Guidance only — issuance stays with the government.",
  ),
  component: Passports,
});

const fields: FieldDef[] = [
  ...contactFields,
  {
    name: "pathway",
    label: "What do you need?",
    type: "select",
    options: [
      "New passport",
      "Renewal",
      "Lost or damaged replacement",
      "Data change (name / state)",
      "Children's passports",
      "Not sure — advise me",
    ],
  },
  {
    name: "state",
    label: "State of application",
    type: "select",
    options: [
      "Lagos",
      "Abuja (FCT)",
      "Port Harcourt",
      "Kano",
      "Ibadan",
      "Onitsha",
      "Other — I'll specify",
      "Diaspora mission",
    ],
  },
  {
    name: "pages",
    label: "Booklet type",
    type: "select",
    options: ["32-page (5 years)", "62-page (10 years)", "Advise me"],
  },
  { name: "when", label: "Deadline / travel date", type: "date", required: false },
  {
    name: "pax",
    label: "How many applicants?",
    type: "select",
    options: ["1", "2", "3–5", "6–10 (family or group)"],
  },
  {
    name: "notes",
    label: "Anything we should know",
    type: "textarea",
    required: false,
    full: true,
    placeholder: "Old passport number, name mismatch, pending appointment, data change needed…",
  },
  {
    name: "consent",
    label: "I understand the NIS issues the passport, not Hague Travel",
    type: "checkbox",
    help: "Our role is documentation review, appointment booking and status follow-up. Biometrics and approval are handled solely by the authority.",
  },
];

function Passports() {
  return (
    <>
      <PageHero
        image={images.documents}
        eyebrow="Passports & Documentation"
        title={
          <>
            Get the document <em className="text-gold">right</em>, the first time.
          </>
        }
        sub="Application review, guarantor forms, photo specifications, appointment scheduling and secure file handling — so a rejected form never costs you a trip."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Assistance & guidance only</Pill>
          <Pill>Fees shown separately</Pill>
          <Pill>Encrypted document upload</Pill>
        </div>
      </PageHero>

      {/* The required notice */}
      <div className="border-b border-border bg-destructive/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-5 md:flex-row md:items-start">
          <ShieldAlert className="h-7 w-7 shrink-0 text-destructive" />
          <div>
            <p className="font-bold">Read this first</p>
            <p className="mt-1.5 text-sm leading-relaxed">{COMPLIANCE_NOTES.passport}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Anyone who promises you a passport in days, or offers to bypass biometrics, is
              describing a crime — not a service. We will never take an assignment like that.
            </p>
          </div>
        </div>
      </div>

      {/* Two pathways */}
      <Section
        eyebrow="Two pathways"
        title="New application, or renewal & replacement"
        sub="Each has its own checklist, timing reality and fee structure. Pick one to see the detail."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {PASSPORT_PATHWAYS.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <div
                id={p.id}
                className="h-full scroll-mt-24 rounded-3xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl leading-tight">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.summary}
                    </p>
                  </div>
                  <Fingerprint className="h-7 w-7 shrink-0 text-gold" />
                </div>
                <ol className="mt-5 space-y-2.5">
                  {p.steps.map((s, idx) => (
                    <li key={s} className="flex gap-3 text-sm">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-black">
                        {idx + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-secondary p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Government fees
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed">
                      {p.governmentFees.map((f) => (
                        <li key={f} className="flex gap-2">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-accent p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-foreground">
                      Our agency fees
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed">
                      {p.agencyFees.map((f) => (
                        <li key={f} className="flex gap-2">
                          <Check className="mt-0.5 h-3 w-3 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-bold">Photo specification:</span> {p.photos}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Checklists */}
      <section
        id="checklists"
        className="scroll-mt-24 bg-ink-gradient py-14 text-ink-foreground lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <p className="eyebrow">Document checklists</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Print these, tick them, keep them with your file
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-foreground/75">
            Every checklist we work from is public. We use the same list to audit your pack before
            submission — nothing is hidden and nothing is "handled internally".
          </p>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {PACKING_CHECKLISTS.map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <div className="h-full rounded-3xl glass p-6">
                  <p className="text-[11px] font-black uppercase tracking-widest text-gold">
                    {c.id === "student" ? "Students" : c.id === "family" ? "Families" : "Business"}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-snug">{c.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border-2 border-gold/60" />
                        <span className="leading-snug text-ink-foreground/90">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security + fees */}
      <Section
        eyebrow="Handling & fees"
        title="Your documents, and your money, stay separated and traceable"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-secondary p-6">
              <p className="flex items-center gap-2 font-bold">
                <Lock className="h-5 w-5 text-primary" /> Secure handling notice
              </p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed">
                {PASSPORT_SECURITY.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                {COMPLIANCE_NOTES.documents}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <FeeSplit
                government={[
                  { label: "32-page, 5-year passport", amount: "₦35,250" },
                  { label: "62-page, 10-year passport", amount: "₦59,750" },
                  { label: "Express delivery (where offered)", amount: "₦75,000" },
                ]}
                agency={[
                  { label: "Documentation review", amount: "₦45,000" },
                  { label: "Full concierge (booking → collection)", amount: "₦120,000" },
                  { label: "Lost-passport casework", amount: "₦85,000" },
                ]}
                thirdParty={[
                  {
                    label: "Police report (loss cases)",
                    amount: "At the station's published rate",
                  },
                  { label: "Guarantor affidavits / legal attestation", amount: "Per deponent" },
                  { label: "Courier of originals", amount: "₦8,000 – ₦25,000" },
                ]}
              />
              <Notice className="mt-4" tone="sea" title="Why the split matters">
                We cannot speed up a government process with our fee, and we do not charge you for
                waiting on theirs. Payment for our work is invoiced by Hague Travel; every authority
                charge is paid direct or receipted at cost.
              </Notice>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Also handled"
        title="Other documents we prepare with you"
        size="sm"
      >
        <Steps
          items={[
            {
              title: "Visa packs",
              detail: "Checklists, financial evidence formats and appointment booking per country.",
            },
            {
              title: "Affidavits & consent",
              detail: "Name-change affidavits, minors' travel consent and death certificates.",
            },
            {
              title: "Attestations",
              detail: "Federal Ministry of Education and foreign-affairs attestation sequences.",
            },
            {
              title: "Translations",
              detail: "Sworn translations and certified copies that embassies actually accept.",
            },
          ]}
        />
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link
            to="/study-abroad"
            className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            Study document checklists
          </Link>
          <Link
            to="/relocation"
            className="rounded-full border border-input bg-card px-5 py-3 text-sm font-bold"
          >
            Work & residence documents
          </Link>
        </div>
      </Section>

      <section id="assist" className="scroll-mt-24 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-5">
          <EnquiryForm
            title="Request passport assistance"
            description="Tell us what you need and where you are applying. We review your forms, fix the photo and guarantor issues, and book the appointment."
            cta="Send my request"
            refPrefix="HTP-D"
            fields={fields}
            note="No passport can be issued by Hague Travel. We provide guidance, documentation and appointment support only."
            successTitle="Request received"
            successLines={[
              "We audit your application details against the current NIS requirements.",
              "You get a written list of what to bring, and an appointment slot if you want one.",
              "Government fees stay with the authority; our service fee is invoiced separately.",
            ]}
          />
          <ComplianceNote className="mt-4 text-center" text={COMPLIANCE_NOTES.fees} />
        </div>
      </section>
    </>
  );
}
