import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { ComplianceNote, Notice, PageHero, Pill, Reveal, Section } from "@/components/site/Blocks";
import { FAQ_TOPICS, getFaqs } from "@/data/services";
import { images, BRAND, COMPLIANCE_NOTES, waLink, waMessages } from "@/data/site";
import { cn } from "@/lib/utils";
import { pluralise } from "@/lib/format";
import { pageMeta } from "@/lib/meta";

interface FaqSearch {
  topic?: string | undefined;
}

function validateSearch(search: Record<string, unknown>): FaqSearch {
  return typeof search["topic"] === "string" && search["topic"].length > 0
    ? { topic: search["topic"] }
    : {};
}

export const Route = createFileRoute("/faqs")({
  validateSearch,
  head: pageMeta(
    "Help Centre & FAQs",
    "Plain answers on fares, seats, visas, government fees, deposits, refunds, documents, insurance, Academy enrolment and the job board.",
  ),
  component: Faqs,
});

function Faqs() {
  const { topic: urlTopic } = Route.useSearch();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const topic = urlTopic ?? "All";
  const [open, setOpen] = useState<string | null>(null);

  const all = getFaqs();
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return all.filter((f) => {
      if (topic !== "All" && f.topic !== topic) return false;
      if (!term) return true;
      return (f.q + " " + f.a).toLowerCase().includes(term);
    });
  }, [all, topic, q]);

  const setTopic = (t: string) => {
    void navigate({ to: "/faqs", search: t === "All" ? {} : { topic: t }, replace: true });
  };

  return (
    <>
      <PageHero
        image={images.study}
        eyebrow="Help centre"
        title={
          <>
            Straight answers, before you <em className="text-gold">book anything</em>.
          </>
        }
        sub="What our consultants are asked every day: fares, visas, deposits, documents, insurance, the Academy and the job board."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">{pluralise(all.length, "published answer")}</Pill>
          <Pill>{FAQ_TOPICS.length - 1} topics</Pill>
          <Pill>Updated as rules change</Pill>
        </div>
      </PageHero>

      <Section eyebrow="Search" title="Find the answer">
        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <div>
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try: deposit, refusal, 28 days, name change, refund…"
                className="field-base pl-11"
                aria-label="Search frequently asked questions"
              />
            </label>
            <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto pb-1">
              {FAQ_TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition",
                    topic === t
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-input bg-card text-muted-foreground hover:bg-accent",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Showing {pluralise(list.length, "answer")}
              {topic === "All" ? " across all topics" : ` in ${topic}`}.
            </p>

            <div className="mt-5 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
              {list.map((f) => {
                const isOpen = open === f.q;
                return (
                  <div key={f.q}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.q)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left transition hover:bg-secondary/70"
                    >
                      <span>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-gold">
                          {f.topic}
                        </span>
                        <span className="mt-1 block font-semibold leading-snug">{f.q}</span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {list.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="font-display text-2xl">Nothing matches that yet</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ask us directly — if we answer it twice, it becomes an FAQ.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQ("");
                      setTopic("All");
                    }}
                    className="mt-5 rounded-full border border-input bg-card px-5 py-2.5 text-sm font-bold"
                  >
                    Clear the search
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-secondary p-5">
              <p className="font-bold">Still stuck?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A consultant answers {BRAND.hours}. Send your reference and one screenshot; you will
                get a written answer, not a script.
              </p>
              <a
                href={waLink(waMessages.support)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-bold text-whatsapp-foreground"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp the desk
              </a>
              <Link
                to="/contact"
                className="mt-2 flex items-center justify-center rounded-full border border-input bg-card px-4 py-3 text-sm font-bold transition hover:bg-accent"
              >
                Use the contact form
              </Link>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                Escalation, published
              </p>
              <ol className="mt-3 space-y-2 text-sm">
                {[
                  "Your consultant",
                  "Desk lead — after 3 working days",
                  "Managing partner — after 7",
                  "Supplier or regulator route — in writing",
                ].map((x, i) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-gradient text-[10px] font-black text-gold-foreground">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{x}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Notice title="Read the policy pages too">
              Refunds, cancel windows and what nobody can guarantee are written in full on our
              policy pages, not just here.
            </Notice>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/refund-policy"
                className="rounded-full border border-input bg-card px-4 py-2 text-xs font-bold transition hover:bg-accent"
              >
                Refund & cancellation
              </Link>
              <Link
                to="/terms"
                className="rounded-full border border-input bg-card px-4 py-2 text-xs font-bold transition hover:bg-accent"
              >
                Booking terms
              </Link>
              <Link
                to="/visa-disclaimer"
                className="rounded-full border border-input bg-card px-4 py-2 text-xs font-bold transition hover:bg-accent"
              >
                Visa disclaimer
              </Link>
              <Link
                to="/privacy"
                className="rounded-full border border-input bg-card px-4 py-2 text-xs font-bold transition hover:bg-accent"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
        <ComplianceNote className="mt-8" text={COMPLIANCE_NOTES.indicative} />
      </Section>

      <Section tone="muted" eyebrow="By topic" title="Jump to the desk you need" size="sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FAQ_TOPICS.filter((t) => t !== "All").map((t, i) => {
            const count = all.filter((f) => f.topic === t).length;
            return (
              <Reveal key={t} delay={i * 35}>
                <button
                  type="button"
                  onClick={() => setTopic(t)}
                  className="lift flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-left"
                >
                  <span className="font-semibold">{t}</span>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                    {pluralise(count, "answer", "answers")}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
