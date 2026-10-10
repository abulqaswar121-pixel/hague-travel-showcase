import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export function PageHero({ image, eyebrow, title, sub, children }: { image: string; eyebrow: string; title: string; sub: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-32 pb-20 lg:pt-44 lg:pb-28">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover animate-kenburns" />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="mx-auto max-w-7xl px-5 text-ink-foreground">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.05] animate-rise sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base text-ink-foreground/80 animate-rise sm:text-lg">{sub}</p>
        {children && <div className="mt-8 animate-rise">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, sub, children, tone = "default" }: { eyebrow?: string; title: string; sub?: string; children: ReactNode; tone?: "default" | "muted" | "ink" }) {
  const bg = tone === "ink" ? "bg-ink-gradient text-ink-foreground" : tone === "muted" ? "bg-secondary" : "";
  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-5">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">{title}</h2>
        {sub && <p className={`mt-4 max-w-2xl ${tone === "ink" ? "text-ink-foreground/70" : "text-muted-foreground"}`}>{sub}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-gold/40 bg-accent p-5 text-sm text-accent-foreground">{children}</div>;
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s} className="lift rounded-2xl border bg-card p-6">
          <span className="font-display text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-3 font-medium">{s}</p>
        </li>
      ))}
    </ol>
  );
}

export function FeatureGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-3 rounded-xl border bg-card p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <span className="text-sm">{f}</span>
        </li>
      ))}
    </ul>
  );
}

export type Field = { name: string; label: string; type?: string; options?: string[]; full?: boolean };

export function EnquiryForm({ title, fields, cta = "Submit request", note }: { title: string; fields: Field[]; cta?: string; note?: string }) {
  const [done, setDone] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
    toast.success("Request received — a Hague consultant will reach out within 2 hours.");
  };
  const input = "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-ring/30";
  if (done)
    return (
      <div className="rounded-3xl border bg-card p-10 text-center shadow-elegant">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h3 className="mt-4 text-2xl">Thank you — we've got it.</h3>
        <p className="mt-2 text-sm text-muted-foreground">Reference HT-{Math.floor(100000 + Math.random() * 900000)}. A consultant will contact you shortly by phone, email or WhatsApp.</p>
        <button onClick={() => setDone(false)} className="mt-6 text-sm font-semibold text-primary underline">Send another request</button>
      </div>
    );
  return (
    <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-6 shadow-elegant sm:p-8">
      <h3 className="text-2xl">{title}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground ${f.full ? "sm:col-span-2" : ""}`}>
            {f.label}
            <div className="mt-1.5 normal-case tracking-normal">
              {f.options ? (
                <select required name={f.name} className={input}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
              ) : f.type === "textarea" ? (
                <textarea name={f.name} rows={4} className={input} />
              ) : (
                <input required name={f.name} type={f.type ?? "text"} className={input} />
              )}
            </div>
          </label>
        ))}
      </div>
      <button className="mt-6 w-full rounded-full bg-gold-gradient py-3.5 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105">{cta}</button>
      {note && <p className="mt-3 text-center text-xs text-muted-foreground">{note}</p>}
    </form>
  );
}

export const contactFields: Field[] = [
  { name: "name", label: "Full name" },
  { name: "phone", label: "Phone / WhatsApp", type: "tel" },
  { name: "email", label: "Email", type: "email", full: true },
];
