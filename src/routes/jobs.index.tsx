import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, Search, UserCheck } from "lucide-react";
import { EnquiryForm, contactFields, type FieldDef } from "@/components/site/Form";
import {
  ComplianceNote,
  Notice,
  PageHero,
  Pill,
  Reveal,
  Section,
  Tabs,
} from "@/components/site/Blocks";
import { JobCard } from "@/components/site/Cards";
import { JOB_CATEGORIES, JOB_COUNTRIES, getJobs } from "@/data/jobs";
import { images, COMPLIANCE_NOTES } from "@/data/site";
import { cn } from "@/lib/utils";
import { pluralise } from "@/lib/format";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/jobs/")({
  head: pageMeta(
    "Careers & Job Board",
    "Example travel roles — consultant, reservations, visa officer, relocation coordinator — employed, freelance, commission or agent work. Not live vacancies.",
  ),
  component: JobsIndex,
});

const MODES = ["All", "Remote", "Hybrid", "On-site"] as const;

const fields: FieldDef[] = [
  ...contactFields,
  {
    name: "role",
    label: "Role you're targeting",
    type: "select",
    options: [...JOB_CATEGORIES, "Something else"],
  },
  {
    name: "mode",
    label: "How you want to work",
    type: "select",
    options: ["Remote", "Hybrid", "On-site", "Flexible"],
  },
  {
    name: "experience",
    label: "Years in travel or adjacent work",
    type: "select",
    options: ["None — starting out", "Under 1 year", "1–3 years", "4–7 years", "8+ years"],
  },
  {
    name: "cv",
    label: "Where should we send your profile?",
    placeholder: "Portfolio link, LinkedIn URL, or 'email me the CV builder'",
    full: true,
    required: false,
  },
  {
    name: "consent",
    label: "I understand Hague Travel moderates listings but does not guarantee placement",
    type: "checkbox",
    help: "We verify employers and publish approved roles. Interviews and offers remain between you and the employer.",
  },
];

function JobsIndex() {
  const jobs = getJobs();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [mode, setMode] = useState<(typeof MODES)[number]>("All");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs.filter((j) => {
      if (cat !== "All" && j.category !== cat) return false;
      if (mode !== "All" && j.workMode !== mode) return false;
      if (!term) return true;
      return [j.title, j.employer, j.summary, j.country, j.category]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [jobs, q, cat, mode]);

  return (
    <>
      <PageHero
        image={images.city}
        eyebrow="Careers & Job Board"
        title={
          <>
            Travel careers, without the <em className="text-gold">myth</em>.
          </>
        }
        sub="Example role categories from verified partners — what the job involves, how it is paid, and what gets you ready. Checked before publishing, never guaranteed."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">Example categories — not live vacancies</Pill>
          <Pill>Employers verified before publishing</Pill>
          <Pill>Always free for candidates</Pill>
        </div>
      </PageHero>

      <Section
        eyebrow="The board"
        title="What roles look like in this industry"
        sub="Filter by category or working mode. Each listing says how you are paid, so nobody learns it after an interview."
      >
        <div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles, employers, countries…"
                className="field-base pl-10"
                aria-label="Search roles"
              />
            </label>
            <div className="flex flex-wrap gap-1.5">
              {MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-xs font-bold transition",
                    mode === m
                      ? "border-transparent bg-ink text-ink-foreground"
                      : "border-input bg-card hover:bg-accent",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {["All", ...JOB_CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition",
                  cat === c
                    ? "border-gold bg-accent text-accent-foreground"
                    : "border-input bg-card text-muted-foreground hover:bg-accent/60",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Showing {pluralise(filtered.length, "role")} of {jobs.length} published examples
            {JOB_COUNTRIES.length > 0 ? ` · ${JOB_COUNTRIES.slice(0, 3).join(", ")} and more` : ""}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-input bg-secondary p-10 text-center">
            <p className="font-display text-2xl">No example role matches that filter</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Clear the search, or register your profile and we will tell you when a matching
              category is published.
            </p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setCat("All");
                setMode("All");
              }}
              className="mt-5 rounded-full border border-input bg-card px-5 py-2.5 text-sm font-bold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((j, i) => (
              <Reveal key={j.id} delay={i * 40}>
                <JobCard job={j} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <Section
        tone="muted"
        eyebrow="Employment types"
        title="Four ways this industry pays people"
        size="sm"
      >
        <Tabs
          ariaLabel="Employment types"
          tabs={[
            { id: "employed", label: "Employed" },
            { id: "freelance", label: "Freelance" },
            { id: "commission", label: "Commission-based" },
            { id: "agent", label: "Independent agent" },
          ]}
          panels={{
            employed: (
              <Panel
                title="Employed (salaried)"
                body="A fixed salary with an employment contract, usually with a host agency, airline desk or TMC. Predictable, and the fastest way to learn volume booking under supervision. Ask about the shift rota and the weekend support expectation before you sign."
              >
                {[
                  "Written contract and probation terms",
                  "Monthly salary, often with a small bonus",
                  "Training provided on the employer's systems",
                  "Least income variance",
                ]}
              </Panel>
            ),
            freelance: (
              <Panel
                title="Freelance (project or retainer)"
                body="Paid per project or per month for an agreed scope: campaigns, group itineraries, content, or a reservations backlog. You invoice, you handle your own tax and pension, and you own your time."
              >
                {[
                  "Scope written before work starts",
                  "Deposit on larger projects",
                  "You supply your own tools",
                  "Income varies with the pipeline",
                ]}
              </Panel>
            ),
            commission: (
              <Panel
                title="Commission-based"
                body="You earn a percentage of the margin or a fee per booking. It scales beautifully when demand is high and disappears in the off-season. Read exactly what the commission is calculated on — ticket price, margin, or net of supplier rebates."
              >
                {[
                  "No cap, but no floor",
                  "Commission basis stated in writing",
                  "Payment cycle and clawbacks matter",
                  "Best after 6–12 months of practice",
                ]}
              </Panel>
            ),
            agent: (
              <Panel
                title="Independent agent"
                body="You run your own agency under a host or partner agreement, keeping a larger share of margin. Requires your own registration, insurance, supplier relationships and — realistically — the Academy's Module 7 on pricing and margins."
              >
                {[
                  "You carry the business risk",
                  "Host or partner agreement governs",
                  "Your own registrations and compliance",
                  "Highest ceiling, highest admin load",
                ]}
              </Panel>
            ),
          }}
        />
      </Section>

      <Section eyebrow="Our rules" title="What we will and will not do with a job board">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              icon: UserCheck,
              t: "Every employer is verified",
              d: "Company registration, a signed posting agreement and a real contact before anything goes public. Unverified employers stay in the queue — you can see that status in the admin demo.",
            },
            {
              icon: AlertTriangle,
              t: "Never a fee to apply",
              d: "We do not charge candidates for access to listings, and any employer that does is rejected. If someone asks you to pay for a visa, a 'file', or a 'guaranteed offer', that is a scam — report it.",
            },
            {
              icon: Search,
              t: "No promised outcomes",
              d: "We do not promise placements, salaries or earnings. We publish roles, prepare your profile and introduce you; the interview and the offer belong to you and the employer.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 60}>
              <div className="h-full rounded-3xl border border-border bg-card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary">
                  <c.icon className="h-5 w-5 text-primary" />
                </span>
                <p className="mt-4 font-semibold leading-snug">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Notice className="mt-6" tone="sea" title="Where training leads">
          Most roles on this board map to a module in the {""}
          <button
            type="button"
            onClick={() => void navigate({ to: "/academy" })}
            className="font-bold text-primary underline decoration-gold underline-offset-4"
          >
            Hague Travel Academy
          </button>
          . Enrol if you need the booking fundamentals first — we would rather you arrive ready than
          arrive hoping.
        </Notice>
      </Section>

      <Section
        id="profile"
        tone="muted"
        eyebrow="Register your profile"
        title="Put your profile in front of the partner network"
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <EnquiryForm
            title="Candidate registration"
            description="Free. We review your profile, help you tighten it, and call you when a matching verified role opens."
            cta="Register my profile"
            refPrefix="HTJ"
            fields={fields}
            note={COMPLIANCE_NOTES.jobs}
            successTitle="Profile registered"
            successLines={[
              "A moderator reviews your profile for accuracy and completeness.",
              "You get written feedback before any introduction is made.",
              "When a matching approved role opens, the partner sees your profile.",
            ]}
          />
          <div className="space-y-3">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="font-display text-2xl leading-snug">
                The five things our reviewers look for
              </p>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  "Evidence you can write professionally — a client email is a work sample",
                  "Availability honesty: shift, weekend and holiday expectations stated up front",
                  "Systems you have actually used (GDS, CRM, booking portals, Excel)",
                  "One measurable result, e.g. '42 group visas filed with 0 refusals'",
                  "A clean, single-page CV without fabricated tenures",
                ].map((x, i) => (
                  <li key={x} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-gradient text-[11px] font-black text-gold-foreground">
                      {i + 1}
                    </span>
                    {x}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl bg-ink-gradient p-6 text-ink-foreground">
              <p className="eyebrow">Employer?</p>
              <p className="mt-2 font-display text-2xl leading-snug">
                Post a role through the partner desk
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/80">
                Send your registration details and the role brief. We check it, fix the wording for
                compliance, and publish — never before.
              </p>
              <button
                type="button"
                onClick={() =>
                  void navigate({ to: "/contact", search: { topic: "corporate" as const } })
                }
                className="mt-4 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-gold-foreground shadow-gold"
              >
                Talk to the partner desk
              </button>
            </div>
          </div>
        </div>
        <ComplianceNote className="mt-6" text={COMPLIANCE_NOTES.jobs} />
      </Section>
    </>
  );
}

function Panel({ title, body, children }: { title: string; body: string; children: string[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <p className="font-display text-2xl leading-snug">{title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{body}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {children.map((c) => (
          <li
            key={c}
            className="rounded-2xl bg-secondary p-3.5 text-xs leading-relaxed font-medium"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
