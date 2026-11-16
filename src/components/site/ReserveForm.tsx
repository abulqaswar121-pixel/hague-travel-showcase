import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { formatDate, makeReference } from "@/lib/format";
import { waLink } from "@/data/site";
import { cn } from "@/lib/utils";
import type { TourPackage } from "@/data/types";

const reserveSchema = z.object({
  fullName: z.string().min(3, "Enter the lead traveller's full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a phone or WhatsApp number"),
  travellers: z.coerce
    .number()
    .int()
    .min(1, "At least one traveller")
    .max(8, "Call us for 9+ travellers"),
  room: z.enum(["Shared double", "Single occupancy", "Family room", "Two rooms"]),
  payment: z.enum(["Paystack card", "Paystack bank transfer", "Pay after quotation"]),
  notes: z.string().optional(),
  consent: z.literal(true, { message: "Please accept the reservation terms" }),
});

type ReserveValues = z.infer<typeof reserveSchema>;

const control = "field-base mt-1.5 aria-[invalid=true]:border-destructive";

export function ReserveForm({ p }: { p: TourPackage }) {
  const { money } = useCurrency();
  const [done, setDone] = useState<{ reference: string; values: ReserveValues } | null>(null);

  const form = useForm<ReserveValues>({
    resolver: zodResolver(reserveSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      travellers: 2,
      room: p.roomBasis.toLowerCase().includes("single") ? "Single occupancy" : "Shared double",
      payment: "Paystack card",
      notes: "",
    },
  });

  const travellers = Number(form.watch("travellers") ?? 2);
  const total = Math.max(1, travellers) * p.pricePerPerson;
  const deposit = Math.round((total * p.depositPct) / 100);
  const balance = total - deposit;
  const error = (name: keyof ReserveValues) => form.formState.errors[name]?.message;

  if (done) {
    return (
      <div
        className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="mt-4 font-display text-2xl sm:text-3xl">Reservation request received</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Your reference is <strong className="text-foreground">{done.reference}</strong>. A
          consultant confirms live seats with the supplier, then sends the written quotation and the
          secure Paystack link for the deposit. Space is not held until that confirmation.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-secondary/40 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Deposit due once confirmed
            </p>
            <p className="mt-1 font-display text-2xl text-primary">{money(deposit)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {p.depositPct}% of {money(total)} for {done.values.travellers} traveller
              {done.values.travellers === 1 ? "" : "s"}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/40 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Balance
            </p>
            <p className="mt-1 font-display text-2xl">{money(balance)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{p.balanceDue}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-gold/40 bg-accent/70 p-4">
          <p className="flex items-center gap-2 text-xs font-bold text-accent-foreground">
            <LockKeyhole className="h-4 w-4" /> Paystack handoff is ready
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-accent-foreground/90">
            In the live build this button opens a Paystack checkout for {money(deposit)}. This
            preview cannot take a card and no charge has been made.
          </p>
          <button
            type="button"
            onClick={() =>
              toast.info("Paystack checkout not connected", {
                description:
                  "The live build opens the gateway here after the supplier confirms your seats.",
              })
            }
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-ink-foreground transition hover:bg-ink/90"
          >
            <CreditCard className="h-4 w-4 text-gold" /> Continue to Paystack
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              form.reset();
              setDone(null);
            }}
            className="rounded-full border border-input px-5 py-2.5 text-sm font-semibold transition hover:bg-accent"
          >
            Start another reservation
          </button>
          <a
            href={waLink(
              `Hello Hague Travel, I just reserved ${p.title} (${done.reference}) and would like to speed up confirmation.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp-foreground"
          >
            <MessageCircle className="h-4 w-4" /> Ping the desk on WhatsApp
          </a>
        </div>
        <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
          Demo only. This form validates and shows the reservation handoff; it does not create a
          live booking, take payment or hold inventory.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
      onSubmit={form.handleSubmit((values) => {
        const reference = makeReference("HTP", `${p.slug}-${values.email}-${values.travellers}`);
        setDone({ reference, values });
        toast.success("Reservation request prepared", {
          description: `${reference} · deposit ${money(deposit)} is due after supplier confirmation.`,
        });
      })}
    >
      <div className="border-b border-border bg-secondary/40 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl">Reserve {p.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {formatDate(p.departDate)} – {formatDate(p.returnDate)} · {p.nights} nights ·{" "}
              {p.hotelCategory}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
            <ShieldCheck className="h-3.5 w-3.5" /> Paystack-ready
          </span>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="res-name"
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Lead traveller
            </label>
            <input
              id="res-name"
              className={control}
              placeholder="Full name as on the passport"
              aria-invalid={Boolean(error("fullName"))}
              {...form.register("fullName")}
            />
            {error("fullName") ? (
              <p className="mt-1 text-xs text-destructive">{error("fullName")}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="res-email"
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Email
            </label>
            <input
              id="res-email"
              type="email"
              className={control}
              placeholder="you@example.com"
              aria-invalid={Boolean(error("email"))}
              {...form.register("email")}
            />
            {error("email") ? (
              <p className="mt-1 text-xs text-destructive">{error("email")}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="res-phone"
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Phone / WhatsApp
            </label>
            <input
              id="res-phone"
              type="tel"
              className={control}
              placeholder="+234 800 000 0000"
              aria-invalid={Boolean(error("phone"))}
              {...form.register("phone")}
            />
            {error("phone") ? (
              <p className="mt-1 text-xs text-destructive">{error("phone")}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="res-travellers"
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Travellers
            </label>
            <select
              id="res-travellers"
              className={control}
              aria-invalid={Boolean(error("travellers"))}
              {...form.register("travellers")}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} traveller{n === 1 ? "" : "s"}
                </option>
              ))}
            </select>
            {error("travellers") ? (
              <p className="mt-1 text-xs text-destructive">{error("travellers")}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="res-room"
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Room preference
            </label>
            <select id="res-room" className={control} {...form.register("room")}>
              {["Shared double", "Single occupancy", "Family room", "Two rooms"].map((room) => (
                <option key={room}>{room}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="res-payment"
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Deposit method
            </label>
            <select id="res-payment" className={control} {...form.register("payment")}>
              <option>Paystack card</option>
              <option>Paystack bank transfer</option>
              <option>Pay after quotation</option>
            </select>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              We never send personal bank details by chat. The payment link comes from Paystack
              after your quotation is confirmed.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="res-notes"
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Anything we should know (optional)
            </label>
            <textarea
              id="res-notes"
              rows={3}
              className={cn(control, "resize-y")}
              placeholder="Anniversary, dietary needs, passport expiry, preferred airline…"
              {...form.register("notes")}
            />
          </div>

          <label className="sm:col-span-2 flex items-start gap-2.5 rounded-xl border border-border bg-secondary/40 p-3 text-xs leading-relaxed">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
              aria-invalid={Boolean(error("consent"))}
              {...form.register("consent")}
            />
            <span>
              I understand a deposit starts a reservation request, space is subject to supplier
              confirmation, and the cancellation rules supplied with my quote apply.
            </span>
          </label>
          {error("consent") ? (
            <p className="sm:col-span-2 text-xs font-medium text-destructive">{error("consent")}</p>
          ) : null}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-secondary/50 p-4">
          <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Wallet className="h-3.5 w-3.5" /> Deposit breakdown
          </p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{Math.max(1, travellers)} × indicative fare</dt>
              <dd className="font-semibold tabular-nums">{money(total)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Deposit ({p.depositPct}%)</dt>
              <dd className="font-bold tabular-nums text-primary">{money(deposit)}</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-border pt-2">
              <dt className="text-muted-foreground">Balance after deposit</dt>
              <dd className="font-semibold tabular-nums">{money(balance)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
            {p.depositDue} Balances are staged; a supplier confirmation is required before any
            payment link is sent.
          </p>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105 disabled:opacity-60"
          >
            Review my reservation <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-2 text-center text-[10px] leading-relaxed text-muted-foreground">
            No payment is taken on this page.
          </p>
        </aside>
      </div>
    </form>
  );
}
