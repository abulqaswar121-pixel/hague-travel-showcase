import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Briefcase, FileText, GraduationCap, Headphones, Plane, Quote, ShieldCheck, Star } from "lucide-react";
import { BookingPanel } from "@/components/site/BookingPanel";
import { PackageCard } from "@/components/site/Cards";
import { Section } from "@/components/site/Blocks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cohorts, countries, faqs, images, jobs, naira, packages, routes, testimonials, WHATSAPP } from "@/data/site";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => meta("Flights, Holidays, Study Abroad & Relocation", "Book flights and holidays, apply to study abroad, relocate for work and launch a travel career — online convenience with real human experts."),
  component: Index,
});

const pillars = [
  { icon: Plane, t: "Flights & Holidays", d: "Book flights, hotels and curated packages in Naira.", to: "/flights" },
  { icon: GraduationCap, t: "Study Abroad", d: "Admissions, study visas, housing and pre-departure.", to: "/study-abroad" },
  { icon: Briefcase, t: "Work & Relocation", d: "Pathways, family moves, settlement support.", to: "/relocation" },
  { icon: FileText, t: "Passports & Docs", d: "Guidance for new passports, renewals and checklists.", to: "/passports" },
] as const;

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink pt-28 pb-16 lg:pt-36">
        <img src={images.hero} alt="Airplane wing above golden clouds at sunset" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover animate-kenburns" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-3xl text-ink-foreground">
            <p className="eyebrow animate-rise">Hague Travel · Lagos to the world</p>
            <h1 className="mt-5 text-5xl font-medium leading-[0.98] animate-rise sm:text-7xl lg:text-8xl">
              Your World.<br /><em className="font-normal text-gold">Your Next Chapter.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base text-ink-foreground/80 animate-rise sm:text-lg">
              From flight bookings to international education and relocation, let us help you plan the journey ahead.
            </p>
          </div>
          <div className="mt-10 animate-rise lg:mt-14" style={{ animationDelay: "200ms" }}>
            <BookingPanel />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-foreground/80">
            {["Pay in Naira", "Human consultants 7 days", "Transparent fees", "Visa & document experts"].map((t) => (
              <span key={t} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-gold" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow">One platform, every journey</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-medium sm:text-5xl">Travel, study, work and settle — with one trusted team.</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Link key={p.t} to={p.to} className="group lift rounded-3xl border bg-card p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground transition group-hover:bg-gold-gradient group-hover:text-gold-foreground"><p.icon className="h-5 w-5" /></span>
                <h3 className="mt-6 text-xl">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                <span className="mt-6 flex items-center gap-1 text-sm font-semibold text-primary">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <Section tone="muted" eyebrow="Hague Experiences" title="Featured holidays & seasonal offers" sub="Curated escapes with flights, stays and experiences — deposits and staged payments available.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>
        <Link to="/packages" className="mt-10 inline-flex items-center gap-2 font-semibold text-primary">View all packages <ArrowRight className="h-4 w-4" /></Link>
      </Section>

      {/* ROUTES */}
      <Section eyebrow="Popular routes" title="Where Nigerians are flying this season" sub="Indicative return economy fares. A consultant confirms live availability before ticketing.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <Link key={r.code} to="/flights" className="lift flex items-center justify-between rounded-2xl border bg-card p-5">
              <div>
                <p className="text-xs font-bold tracking-widest text-muted-foreground">{r.code}</p>
                <p className="mt-1 font-display text-xl">{r.from} <span className="text-gold">→</span> {r.to}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">from</p>
                <p className="font-semibold">{naira(r.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* STUDY SPLIT */}
      <section className="bg-ink-gradient text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div className="relative">
            <img src={images.study} alt="Student on a university campus" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-elegant" />
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-card p-5 text-card-foreground shadow-elegant sm:right-6">
              <p className="font-display text-4xl text-gold">6</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">study destinations</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Study abroad</p>
            <h2 className="mt-3 text-3xl font-medium sm:text-5xl">From admission letter to your first lecture.</h2>
            <p className="mt-4 text-ink-foreground/70">Course selection, applications, study visas, accommodation, flights and orientation — one guided journey.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {countries.map((c) => (
                <Link key={c.slug} to="/study-abroad" className="rounded-2xl glass p-4 transition hover:bg-ink-foreground/10">
                  <p className="text-2xl">{c.flag}</p>
                  <p className="mt-1 text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-ink-foreground/60">{c.intake}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY + JOBS */}
      <Section eyebrow="Hague Travel Academy" title="Launch a career in travel — every quarter." sub="Paid virtual training with live classes, practical booking exercises and a pathway to remote work.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cohorts.map((c) => (
            <div key={c.n} className="lift rounded-3xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl text-primary">{c.month}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${c.status === "Open" ? "bg-gold-gradient text-gold-foreground" : "bg-secondary text-secondary-foreground"}`}>{c.status}</span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Cohort {c.n}</p>
              <p className="mt-1 text-sm">{c.focus}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {jobs.map((j) => (
            <Link key={j.id} to="/jobs" className="lift flex items-start gap-4 rounded-2xl bg-secondary p-5">
              <Headphones className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-semibold">{j.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{j.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Example role categories — not live vacancies.</p>
      </Section>

      {/* TESTIMONIALS */}
      <Section tone="muted" eyebrow="Real journeys" title="Trusted by travellers, students and families.">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-3xl bg-card p-8 shadow-elegant">
              <Quote className="h-8 w-8 text-gold" />
              <div className="mt-3 flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 font-display text-xl leading-snug">"{t.quote}"</blockquote>
              <figcaption className="mt-6 text-sm"><span className="font-semibold">{t.name}</span> · <span className="text-muted-foreground">{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ + CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-3 text-3xl font-medium sm:text-5xl">Honest answers, before you ask.</h2>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-ink-foreground">
            <img src={images.resort} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <div className="relative">
              <ShieldCheck className="h-10 w-10 text-gold" />
              <h3 className="mt-6 text-4xl">Speak to a real person.</h3>
              <p className="mt-3 text-ink-foreground/80">Our consultants answer on WhatsApp, phone and email — before, during and after your trip.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full bg-whatsapp px-6 py-3.5 text-center text-sm font-bold text-ink-foreground">Chat on WhatsApp</a>
                <Link to="/contact" className="rounded-full glass px-6 py-3.5 text-center text-sm font-bold">Request a callback</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
