import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { ComplianceNote, Pill, Reveal } from "@/components/site/Blocks";
import { BRAND, COMPLIANCE_NOTES } from "@/data/site";

export interface LegalBlock {
  h: string;
  p?: string[];
  list?: string[];
  note?: string;
}

export interface LegalSection {
  id: string;
  title: string;
  intro?: string;
  blocks: LegalBlock[];
}

/**
 * Shared long-form legal/policy layout so every policy page reads identically:
 * sticky contents rail, numbered clauses, and a compliance strip.
 */
export function LegalArticle({
  eyebrow,
  title,
  updated,
  summary,
  sections,
  compliance,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  summary: string;
  sections: LegalSection[];
  compliance?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="bg-ink pt-28 pb-12 text-ink-foreground lg:pt-36 lg:pb-16">
        <div className="mx-auto max-w-4xl px-5">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 text-sm leading-relaxed text-ink-foreground/80 sm:text-base">
            {summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Pill tone="gold">
              <CalendarClock className="mr-1 inline h-3 w-3" /> Last updated {updated}
            </Pill>
            <Pill>
              {BRAND.company} · {BRAND.rc}
            </Pill>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-5 lg:grid-cols-[220px_1fr] lg:py-20">
        <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Contents
          </p>
          <ol className="mt-3 space-y-1.5 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex gap-2 rounded-lg px-2 py-1 leading-snug text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  <span className="tabular-nums text-gold">{i + 1}.</span> {s.title}
                </a>
              </li>
            ))}
          </ol>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Ask us directly
          </Link>
        </nav>

        <article className="max-w-3xl">
          {sections.map((s, si) => (
            <Reveal as="section" key={s.id} className="mb-12 scroll-mt-24 last:mb-0">
              <div id={s.id}>
                <h2 className="font-display text-2xl leading-snug sm:text-3xl">
                  <span className="mr-2 text-gold">{String(si + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.intro ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {s.intro}
                  </p>
                ) : null}
                <div className="mt-5 space-y-6">
                  {s.blocks.map((b) => (
                    <div key={b.h}>
                      <h3 className="text-base font-bold leading-snug">{b.h}</h3>
                      {b.p?.map((para) => (
                        <p
                          key={para.slice(0, 40)}
                          className="mt-2 text-sm leading-relaxed sm:text-[15px]"
                        >
                          {para}
                        </p>
                      ))}
                      {b.list ? (
                        <ul className="mt-3 space-y-2">
                          {b.list.map((li) => (
                            <li
                              key={li}
                              className="flex gap-3 rounded-2xl bg-secondary p-3.5 text-sm leading-relaxed"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {li}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {b.note ? (
                        <p className="mt-3 rounded-2xl border border-gold/50 bg-accent p-3.5 text-sm leading-relaxed text-accent-foreground">
                          {b.note}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          {children}
          <ComplianceNote className="mt-10" text={compliance ?? COMPLIANCE_NOTES.indicative} />
        </article>
      </div>
    </>
  );
}
