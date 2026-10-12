import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarClock,
  GraduationCap,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { MultiStepForm, type FieldDef } from "@/components/site/Form";
import { ComplianceNote, Notice, PageHero, Pill, Reveal, Section } from "@/components/site/Blocks";
import { getJobById } from "@/data/jobs";
import { images, COMPLIANCE_NOTES } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/jobs/$id")({
  loader: ({ params }) => {
    const job = getJobById(params.id);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    const job = loaderData?.job;
    if (!job)
      return meta({
        title: "Role not found",
        description: "This example role is no longer published.",
        robots: "noindex",
      });
    return meta({
      title: `${job.title} — example role`,
      description: job.summary,
      ogType: "article",
    });
  },
  component: JobDetail,
});

const stepOne: FieldDef[] = [
  { name: "name", label: "Full name", placeholder: "Chidinma Eze" },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { name: "phone", label: "Phone (WhatsApp)", type: "tel", placeholder: "+234 801 234 5678" },
  { name: "location", label: "Where are you based?", placeholder: "Lagos, Nigeria" },
  {
    name: "link",
    label: "CV or portfolio link",
    required: false,
    placeholder: "Google Drive / LinkedIn / portfolio URL",
    full: true,
    help: "Paste a shareable link. This demo never uploads files.",
  },
];

const stepTwo: FieldDef[] = [
  {
    name: "years",
    label: "Relevant experience",
    type: "select",
    options: ["None — starting out", "Under 1 year", "1–3 years", "4–7 years", "8+ years"],
  },
  {
    name: "systems",
    label: "Systems you have used",
    type: "select",
    options: [
      "None yet",
      "Booking portals only",
      "Amadeus / Sabre (training)",
      "Sabre or Travelport (live)",
      "CRM + portal mix",
    ],
  },
  {
    name: "languages",
    label: "Languages you can work in",
    type: "select",
    options: [
      "English only",
      "English + Nigerian language",
      "English + French",
      "English + Arabic",
      "Other — specify below",
    ],
  },
  {
    name: "why",
    label: "Why this role fits you",
    type: "textarea",
    rows: 5,
    full: true,
    placeholder: "Two or three sentences. Be concrete: what you have done, not what you would do.",
  },
];

const stepThree: FieldDef[] = [
  { name: "start", label: "Earliest start", type: "date" },
  {
    name: "mode",
    label: "Working mode you want",
    type: "select",
    options: ["Remote", "Hybrid", "On-site", "Any"],
  },
  {
    name: "expect",
    label: "Your expectation on pay",
    type: "select",
    options: [
      "Employer's stated structure",
      "Discuss at interview",
      "Have a range in mind (state below)",
    ],
  },
  {
    name: "range",
    label: "Range or note (optional)",
    required: false,
    full: true,
    placeholder: "e.g. ₦450,000 base + commission, or 'open to the partner's structure'",
  },
  {
    name: "truth",
    label: "Everything here is accurate and verifiable",
    type: "checkbox",
    help: "Fabricated tenures or certificates end the introduction immediately — for that role and the next.",
  },
  {
    name: "understand",
    label: "I understand this is an example category, not a guaranteed offer",
    type: "checkbox",
    help: "Interviews and offers are between you and the employer. Hague Travel moderates and introduces.",
  },
];

function JobDetail() {
  const { job } = Route.useLoaderData();
  const router = useRouter();

  return (
    <>
      <PageHero
        image={images.culture}
        eyebrow={job.category}
        title={job.title}
        sub={job.summary}
        size="md"
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Example role category — not a live vacancy</Pill>
          <Pill>{job.employmentType}</Pill>
          <Pill>{job.workMode}</Pill>
          <Pill>{job.experience} level</Pill>
        </div>
      </PageHero>

      <Section title={<span className="sr-only">Role detail</span>}>
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Building2, l: "Employer", v: job.employer },
                { icon: Briefcase, l: "Country", v: job.country },
                { icon: Layers, l: "Source", v: job.source },
                { icon: CalendarClock, l: "Applications", v: job.deadline },
              ].map((f) => (
                <div key={f.l} className="rounded-2xl border border-border bg-card p-4">
                  <f.icon className="h-4 w-4 text-gold" />
                  <p className="mt-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {f.l}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug">{f.v}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-2xl leading-snug">What you would actually do</h2>
              <ul className="mt-4 space-y-2.5">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-sm leading-relaxed">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-secondary p-6">
                <h3 className="font-display text-xl">What they look for</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  {job.qualifications.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl">How it is paid</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.salary}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    {job.employmentType} role. Any commission or retainer terms are agreed directly
                    with the employer; we publish only what they confirm in writing.
                  </p>
                </div>
                <div className="rounded-3xl border border-gold/50 bg-accent p-6 text-accent-foreground">
                  <p className="flex items-center gap-2 font-bold">
                    <GraduationCap className="h-5 w-5" /> Prepares for this via
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{job.academyModule}</p>
                  <button
                    type="button"
                    onClick={() => void router.navigate({ to: "/academy" })}
                    className="mt-4 rounded-full bg-accent-foreground px-4 py-2 text-xs font-bold text-accent transition hover:opacity-90"
                  >
                    See the curriculum
                  </button>
                </div>
              </div>
            </div>

            <Notice tone="sea" title="Read this before you apply">
              {COMPLIANCE_NOTES.jobs} This page is an example role category published for the
              preview, so nobody is hiring through it today.
            </Notice>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <p className="eyebrow">Free · no fee ever</p>
              <p className="mt-2 font-display text-2xl leading-snug">
                Send your profile for this category
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Three short steps. A moderator reads every profile before an introduction is made.
              </p>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("apply")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="mt-5 w-full rounded-full bg-gold-gradient py-3.5 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105"
              >
                Start my application
              </button>
              <button
                type="button"
                onClick={() => void router.navigate({ to: "/jobs" })}
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border border-input py-3 text-sm font-bold transition hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all roles
              </button>
              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                We will never ask you to pay for a listing, a file, or a guaranteed offer — and
                neither should an employer.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <section id="apply" className="scroll-mt-24 bg-secondary/60 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-5">
          <MultiStepForm
            title={`Apply — ${job.title}`}
            description="Your answers stay in this browser. Later they become a candidate record on the partner desk."
            cta="Submit my profile"
            refPrefix="HTJA"
            steps={[
              {
                label: "Who you are",
                hint: "Contact details and where to find your CV",
                fields: stepOne,
              },
              {
                label: "What you can do",
                hint: "Experience, systems and a short written note",
                fields: stepTwo,
              },
              {
                label: "Availability",
                hint: "Start date and two confirmations",
                fields: stepThree,
              },
            ]}
            successTitle="Profile submitted for review"
            successLines={[
              "A moderator verifies the details in your profile within two working days.",
              "You receive written feedback before any introduction is made.",
              "If the category has no approved opening right now, your profile stays on file for 90 days.",
            ]}
          />
          <ComplianceNote className="mt-4 text-center" text={COMPLIANCE_NOTES.fees} />
        </div>
      </section>
    </>
  );
}
