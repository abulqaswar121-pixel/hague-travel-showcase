import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Plane,
  Printer,
  ReceiptText,
  Wallet,
} from "lucide-react";
import {
  DetailRow,
  EmptyState,
  KpiCard,
  PageHeading,
  Panel,
  Segmented,
  StatusBadge,
  TableSkeleton,
  useDemoLoading,
} from "@/components/dashboard/UI";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PORTAL_BOOKINGS,
  PORTAL_PAYMENTS,
  PORTAL_PROFILE,
  type PortalBooking,
  type PortalPayment,
} from "@/data/portal";
import { useCurrency } from "@/lib/currency";
import { formatDate, formatDateRange } from "@/lib/format";
import { downloadText, printPage } from "@/lib/download";
import { BRAND } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/portal/bookings")({
  head: pageMeta(
    "Bookings & Payments",
    "Review tour reservations, deposit balances, Paystack-ready payments and printable confirmation slips.",
    { robots: "noindex" },
  ),
  component: PortalBookings,
});

const FILTERS = [
  { id: "all", label: "All bookings" },
  { id: "upcoming", label: "Upcoming" },
  { id: "paid", label: "Paid in full" },
  { id: "past", label: "Past" },
] as const;

function PortalBookings() {
  const loading = useDemoLoading();
  const { money } = useCurrency();
  const [filter, setFilter] = useState<string>("all");
  const [slip, setSlip] = useState<PortalBooking | null>(null);
  const [payFor, setPayFor] = useState<PortalBooking | null>(null);

  const totalPaid = PORTAL_BOOKINGS.reduce((sum, b) => sum + b.paid, 0);
  const outstanding = PORTAL_BOOKINGS.reduce((sum, b) => sum + b.balance, 0);
  const next = PORTAL_BOOKINGS.filter((b) => b.balance > 0).sort((a, b) =>
    a.nextDue.localeCompare(b.nextDue),
  )[0];

  const bookings = useMemo(() => {
    const sorted = [...PORTAL_BOOKINGS].sort((a, b) => b.departDate.localeCompare(a.departDate));
    if (filter === "upcoming")
      return sorted.filter((b) => b.status === "Confirmed" || b.status === "Balance due");
    if (filter === "paid") return sorted.filter((b) => b.balance === 0 && b.status !== "Cancelled");
    if (filter === "past")
      return sorted.filter((b) => b.status === "Completed" || b.status === "Cancelled");
    return sorted;
  }, [filter]);

  const paymentsFor = (bookingId: string) =>
    PORTAL_PAYMENTS.filter((payment) => payment.bookingId === bookingId);

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Bookings & payments"
        title="Reservations, receipts and what is left to pay"
        sub="Every reservation shows its payment schedule and the supplier rules that apply. Receipts are generated per successful Paystack or bank transfer record."
        actions={
          <span className="rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground">
            Client ref {PORTAL_PROFILE.reference}
          </span>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Reservations"
          value={PORTAL_BOOKINGS.length}
          hint="Across 3 destinations"
          icon={Plane}
        />
        <KpiCard
          label="Paid to date"
          value={money(totalPaid)}
          hint="Deposits and instalments"
          icon={Banknote}
          tone="success"
        />
        <KpiCard
          label="Outstanding"
          value={money(outstanding)}
          hint="Deposits + balances"
          icon={Wallet}
          tone="warning"
        />
        <KpiCard
          label="Next payment"
          value={next ? money(next.balance) : money(0)}
          hint={next ? `${formatDate(next.nextDue)} · ${next.title}` : "Nothing due"}
          icon={CreditCard}
          tone="gold"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          options={FILTERS.map((f) => ({ ...f }))}
          value={filter}
          onChange={setFilter}
          label="Filter bookings"
        />
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {bookings.length} record{bookings.length === 1 ? "" : "s"}
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-5">
              <span className="block h-32 animate-pulse rounded-2xl bg-secondary" />
              <span className="mt-4 block h-4 w-2/3 animate-pulse rounded-full bg-secondary" />
              <span className="mt-2.5 block h-3 w-1/2 animate-pulse rounded-full bg-secondary" />
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState
          icon={Plane}
          title="No bookings in this view"
          body="Try a different filter, or browse the holiday catalogue to reserve your next departure."
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {bookings.map((booking) => {
            const pct = Math.round((booking.paid / booking.total) * 100);
            return (
              <article
                key={booking.id}
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
              >
                <div className="relative isolate h-32 sm:h-36">
                  <img
                    src={booking.cover}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/10" />
                  <div className="flex h-full flex-col justify-end p-4 text-ink-foreground">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge>{booking.status}</StatusBadge>
                      <span className="rounded-full glass px-2.5 py-1 text-[10px] font-bold">
                        {booking.reference}
                      </span>
                    </div>
                    <h2 className="mt-2 font-display text-2xl leading-tight">{booking.title}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-foreground/75">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDateRange(booking.departDate, booking.returnDate)} ·{" "}
                      {booking.destination}
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{money(booking.paid)} paid</span>
                    <span className={booking.balance > 0 ? "text-primary" : "text-success"}>
                      {booking.balance > 0 ? `${money(booking.balance)} outstanding` : "Fully paid"}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gold-gradient"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span>
                      {booking.travellers} traveller{booking.travellers === 1 ? "" : "s"} ·{" "}
                      {booking.hotelCategory}
                    </span>
                    <span className="font-semibold">
                      {booking.balance > 0
                        ? `Next due ${formatDate(booking.nextDue)}`
                        : "Paid in full"}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSlip(booking)}>
                      <FileText className="h-3.5 w-3.5" /> Confirmation slip
                    </Button>
                    {booking.balance > 0 ? (
                      <Button size="sm" onClick={() => setPayFor(booking)}>
                        <CreditCard className="h-3.5 w-3.5" /> Pay {money(booking.balance)}
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-xs font-bold text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Settled
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Panel
        title="Payment receipts"
        sub="Every successful charge or transfer is attached to the booking file."
        action={<ReceiptText className="h-4 w-4 text-muted-foreground" />}
        bodyClassName="p-0"
      >
        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={4} columns={6} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PORTAL_PAYMENTS.map((payment) => {
                  const booking = PORTAL_BOOKINGS.find((b) => b.id === payment.bookingId);
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">{payment.receipt}</TableCell>
                      <TableCell className="text-xs font-semibold">
                        {booking?.title ?? payment.bookingId}
                      </TableCell>
                      <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                        {formatDate(payment.date)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge>
                          {payment.kind === "Refund" ? "Refunded" : payment.kind}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                        {payment.method}
                      </TableCell>
                      <TableCell className="text-right text-sm font-bold tabular-nums">
                        {money(payment.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            downloadText(
                              `${payment.receipt}.txt`,
                              receiptText(payment, booking, money(payment.amount)),
                            );
                            toast.success(`${payment.receipt} downloaded`);
                          }}
                        >
                          <Download className="h-3.5 w-3.5" /> Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Panel>

      <div className="rounded-2xl border border-border bg-secondary/60 p-4 text-[11px] leading-relaxed text-muted-foreground">
        <span className="font-bold text-foreground">
          Payments in this preview are illustrative.
        </span>{" "}
        Live deposits are collected through Paystack, and a booking only changes state when the
        gateway webhook confirms the charge. Receipts are downloadable demo text files, not tax
        invoices.{" "}
        <a href="/refund-policy" className="font-bold text-primary hover:underline">
          Read the refund policy
        </a>
        .
      </div>

      <ConfirmationDialog
        booking={slip}
        payments={slip ? paymentsFor(slip.id) : []}
        onClose={() => setSlip(null)}
      />
      {payFor ? <PayDialog booking={payFor} onClose={() => setPayFor(null)} /> : null}
    </div>
  );
}

/* ---------------------------------------------------------- confirmation slip */

function ConfirmationDialog({
  booking,
  payments,
  onClose,
}: {
  booking: PortalBooking | null;
  payments: PortalPayment[];
  onClose: () => void;
}) {
  const { money } = useCurrency();
  if (!booking) return null;
  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto print:static print:max-h-none print:w-full print:max-w-none print:border-0 print:p-0 print:shadow-none">
        <DialogHeader className="print:hidden">
          <DialogTitle>Confirmation slip</DialogTitle>
          <DialogDescription>
            Printable summary for booking {booking.reference}. The supplier confirmation remains the
            operative document.
          </DialogDescription>
        </DialogHeader>

        <div className="print-slip rounded-2xl border border-border bg-card p-5 print:border-0 print:p-0">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="font-display text-xl text-primary">{BRAND.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {BRAND.tagline}
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground">{BRAND.address}</p>
            </div>
            <div className="text-right text-[11px] text-muted-foreground">
              <p className="font-bold text-foreground">BOOKING CONFIRMATION</p>
              <p className="mt-1 font-mono">{booking.reference}</p>
              <p>{formatDate(new Date().toISOString().slice(0, 10))}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Lead traveller
              </p>
              <p className="mt-1 text-sm font-bold">{booking.leadTraveller}</p>
              <p className="text-xs text-muted-foreground">{PORTAL_PROFILE.email}</p>
              <p className="text-xs text-muted-foreground">{PORTAL_PROFILE.phone}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Consultant
              </p>
              <p className="mt-1 text-sm font-bold">{booking.consultant}</p>
              <p className="text-xs text-muted-foreground">{BRAND.email}</p>
              <p className="text-xs text-muted-foreground">{BRAND.phone}</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-secondary/60 p-4">
            <p className="font-display text-xl">{booking.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {booking.destination} · {formatDateRange(booking.departDate, booking.returnDate)}
            </p>
            <div className="mt-3 grid gap-1.5 text-xs sm:grid-cols-2">
              <p>
                <span className="text-muted-foreground">Travellers:</span>{" "}
                <strong>{booking.travellers}</strong>
              </p>
              <p>
                <span className="text-muted-foreground">Hotel:</span>{" "}
                <strong>{booking.hotelCategory}</strong>
              </p>
              <p>
                <span className="text-muted-foreground">Room basis:</span>{" "}
                <strong>{booking.roomBasis}</strong>
              </p>
              <p>
                <span className="text-muted-foreground">Flights:</span>{" "}
                <strong>{booking.flightNote}</strong>
              </p>
            </div>
          </div>

          <dl className="mt-4">
            <DetailRow label="Package total" value={money(booking.total)} />
            <DetailRow label="Paid to date" value={money(booking.paid)} />
            <DetailRow
              label="Balance due"
              value={
                booking.balance > 0
                  ? `${money(booking.balance)} · ${formatDate(booking.nextDue)}`
                  : "Nil"
              }
              strong
            />
            <DetailRow label="Status" value={<StatusBadge>{booking.status}</StatusBadge>} />
          </dl>

          <div className="mt-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Payment history
            </p>
            {payments.length ? (
              <ul className="mt-2 space-y-1.5 text-xs">
                {payments.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between gap-3 border-b border-border/60 pb-1.5"
                  >
                    <span>
                      {formatDate(p.date)} · {p.kind} · {p.method}
                    </span>
                    <span className="font-semibold tabular-nums">{money(p.amount)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">No payment recorded yet.</p>
            )}
          </div>

          <p className="mt-4 border-t border-border pt-3 text-[10px] leading-relaxed text-muted-foreground">
            This slip confirms a request and recorded payments in the Hague Travel demonstration
            preview. It is not an airline ticket, a supplier voucher or proof of visa approval.
            Cancellation and refund rules follow the booking terms supplied with your quotation.
          </p>
        </div>

        <DialogFooter className="print:hidden">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              downloadText(
                `${booking.reference}-confirmation.txt`,
                slipText(booking, payments, money),
              );
              toast.success("Confirmation slip downloaded");
            }}
          >
            <Download className="h-4 w-4" /> Download
          </Button>
          <Button onClick={printPage}>
            <Printer className="h-4 w-4" /> Print slip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------- pay dialog */

const paySchema = z.object({
  amount: z.coerce.number().min(1_000, "Minimum payment is ₦1,000"),
  method: z.enum(["Paystack card", "Paystack transfer"]),
  reference: z.string().optional(),
  confirm: z.literal(true, { message: "Please confirm the payment terms" }),
});

type PayValues = z.infer<typeof paySchema>;

function PayDialog({ booking, onClose }: { booking: PortalBooking; onClose: () => void }) {
  const { money } = useCurrency();
  const form = useForm<PayValues>({
    resolver: zodResolver(paySchema),
    defaultValues: { amount: booking.balance, method: "Paystack card", reference: "" },
    mode: "onBlur",
  });

  const max = booking.balance;

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Pay towards {booking.title}</DialogTitle>
          <DialogDescription>
            Outstanding balance {money(booking.balance)}. A Paystack checkout would open next; this
            preview does not charge a card.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          noValidate
          onSubmit={form.handleSubmit((values) => {
            toast.success("Paystack checkout ready", {
              description: `${money(values.amount)} via ${values.method} — no charge was made in this preview.`,
            });
            form.reset();
            onClose();
          })}
        >
          <div>
            <Label htmlFor="pay-amount">Amount (NGN)</Label>
            <Input
              id="pay-amount"
              type="number"
              min={1000}
              max={max}
              step={500}
              className="mt-1.5"
              aria-invalid={Boolean(form.formState.errors.amount)}
              {...form.register("amount")}
            />
            {form.formState.errors.amount ? (
              <p className="mt-1 text-xs font-medium text-destructive">
                {form.formState.errors.amount.message}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-muted-foreground">
                Pay any amount between {money(1000)} and {money(max)}.
              </p>
            )}
            <div className="mt-2 flex gap-2">
              {[0.3, 0.5, 1].map((fraction) => (
                <button
                  key={fraction}
                  type="button"
                  onClick={() =>
                    form.setValue("amount", Math.round(max * fraction), { shouldValidate: true })
                  }
                  className="rounded-full border border-input px-2.5 py-1 text-[10px] font-bold hover:bg-accent"
                >
                  {fraction === 1 ? "Full balance" : `${fraction * 100}%`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="pay-method">Payment method</Label>
            <select
              id="pay-method"
              className="field-base mt-1.5"
              {...form.register("method")}
              aria-invalid={Boolean(form.formState.errors.method)}
            >
              <option value="Paystack card">Paystack — card</option>
              <option value="Paystack transfer">Paystack — bank transfer</option>
            </select>
          </div>

          <div>
            <Label htmlFor="pay-reference">Payment reference (optional)</Label>
            <Input
              id="pay-reference"
              className="mt-1.5"
              placeholder="e.g. bank transfer narration"
              {...form.register("reference")}
            />
          </div>

          <label className="flex items-start gap-2.5 rounded-xl border border-border bg-secondary/50 p-3 text-xs leading-relaxed">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
              {...form.register("confirm")}
            />
            <span>
              I understand this is a demo checkout, my booking changes only after the Paystack
              webhook confirms payment, and supplier cancellation rules still apply.
            </span>
          </label>
          {form.formState.errors.confirm ? (
            <p className="text-xs font-medium text-destructive">
              {form.formState.errors.confirm.message}
            </p>
          ) : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <CreditCard className="h-4 w-4" /> Continue to Paystack
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------- text */

function receiptText(
  payment: PortalPayment,
  booking: PortalBooking | undefined,
  amount: string,
): string {
  return [
    "HAGUE TRAVEL — PAYMENT RECEIPT (DEMO)",
    "=====================================",
    `Receipt: ${payment.receipt}`,
    `Payment ID: ${payment.id}`,
    `Date: ${payment.date}`,
    `Client: ${PORTAL_PROFILE.name}`,
    `Booking: ${booking?.reference ?? payment.bookingId}`,
    booking ? `Tour: ${booking.title}` : "",
    `Type: ${payment.kind}`,
    `Method: ${payment.method}`,
    `Amount: ${amount}`,
    "",
    "This is a demonstration receipt generated by the Hague Travel preview.",
    "It is not a tax invoice or proof of a live gateway charge.",
  ]
    .filter(Boolean)
    .join("\n");
}

function slipText(
  booking: PortalBooking,
  payments: PortalPayment[],
  money: (n: number) => string,
): string {
  return [
    "HAGUE TRAVEL — CONFIRMATION SLIP (DEMO)",
    "=======================================",
    `Booking: ${booking.reference}`,
    `Lead traveller: ${booking.leadTraveller}`,
    `Tour: ${booking.title}`,
    `Destination: ${booking.destination}`,
    `Dates: ${booking.departDate} to ${booking.returnDate}`,
    `Travellers: ${booking.travellers}`,
    `Consultant: ${booking.consultant}`,
    "",
    `Total: ${money(booking.total)}`,
    `Paid: ${money(booking.paid)}`,
    `Balance: ${money(booking.balance)}`,
    `Status: ${booking.status}`,
    "",
    "Payments:",
    ...payments.map((p) => `- ${p.date} ${p.kind} ${p.method}: ${money(p.amount)}`),
    "",
    "Demo slip only. Not an airline ticket, supplier voucher or proof of visa approval.",
  ].join("\n");
}
