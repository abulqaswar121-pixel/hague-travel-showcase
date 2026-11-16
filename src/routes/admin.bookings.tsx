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
  ChevronRight,
  CreditCard,
  Plus,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ADMIN_BOOKINGS, type AdminBooking, type AdminBookingPayment } from "@/data/admin";
import { useCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/admin/bookings")({
  head: pageMeta(
    "Bookings & Payments",
    "Confirmed reservations, deposit ledger and outstanding balance tracking for the Hague Travel finance desk.",
    { robots: "noindex" },
  ),
  component: AdminBookings,
});

const FILTERS = [
  { id: "all", label: "All bookings" },
  { id: "Balance due", label: "Balance due" },
  { id: "Fully paid", label: "Fully paid" },
  { id: "Confirmed", label: "Deposit only" },
  { id: "Cancelled", label: "Cancelled" },
];

function AdminBookings() {
  const loading = useDemoLoading();
  const { money } = useCurrency();
  const [bookings, setBookings] = useState<AdminBooking[]>(ADMIN_BOOKINGS);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [payOpen, setPayOpen] = useState(false);

  const selected = bookings.find((booking) => booking.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  const collected = bookings.reduce((sum, booking) => sum + booking.paid, 0);
  const outstanding = bookings.reduce((sum, booking) => sum + booking.balance, 0);
  const deposits = bookings.reduce(
    (sum, booking) => sum + booking.payments.reduce((s, p) => s + p.amount, 0),
    0,
  );
  const chasing = bookings.filter((booking) => booking.balance > 0).length;

  const allPayments = useMemo(
    () =>
      bookings
        .flatMap((booking) => booking.payments.map((payment) => ({ ...payment, booking })))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [bookings],
  );

  const recordPayment = (bookingId: string, payment: AdminBookingPayment) => {
    setBookings((current) =>
      current.map((booking) => {
        if (booking.id !== bookingId) return booking;
        const paid = booking.paid + payment.amount;
        const balance = Math.max(0, booking.total - paid);
        return {
          ...booking,
          paid,
          balance,
          status: balance === 0 ? "Fully paid" : "Balance due",
          nextDue: balance === 0 ? "Paid in full" : booking.nextDue,
          payments: [...booking.payments, payment],
        };
      }),
    );
    toast.success(`${money(payment.amount)} recorded`, {
      description: "Balance updated in this demo ledger only.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Bookings & payments"
        title="Every deposit, balance and receipt in one ledger"
        sub="Confirmed reservations with the deposit recorded against each one. Finance can chase what is due without guessing which payment belongs to which file."
        actions={
          <span className="rounded-full border border-border bg-card px-3 py-2 text-[11px] font-bold text-muted-foreground">
            Paystack webhook not connected
          </span>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total collected"
          value={money(collected)}
          hint={`${bookings.length} reservations`}
          icon={Banknote}
          tone="success"
        />
        <KpiCard
          label="Outstanding"
          value={money(outstanding)}
          hint={`${chasing} bookings to chase`}
          icon={Wallet}
          tone="warning"
        />
        <KpiCard
          label="Deposit & payment log"
          value={money(deposits)}
          hint={`${allPayments.length} recorded entries`}
          icon={ReceiptText}
        />
        <KpiCard
          label="Fully settled"
          value={bookings.filter((b) => b.balance === 0 && b.status !== "Cancelled").length}
          hint="Ready for supplier payment"
          icon={CheckCircle2}
          tone="gold"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          options={FILTERS.map((item) => ({
            ...item,
            count:
              item.id === "all"
                ? bookings.length
                : bookings.filter((booking) => booking.status === item.id).length,
          }))}
          value={filter}
          onChange={setFilter}
          label="Filter bookings"
        />
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {filtered.length} record{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <Panel
        title="Confirmed reservations"
        sub="Click a booking for its payment history and to record a receipt."
        bodyClassName="p-0"
      >
        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={6} columns={7} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={CalendarDays}
              title="No bookings in this view"
              body="Try another status filter. Confirmed reservations appear here once a deposit is matched."
              action={
                <Button variant="outline" onClick={() => setFilter("all")}>
                  Show all bookings
                </Button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Tour</TableHead>
                  <TableHead className="hidden md:table-cell">Departure</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Deposit</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((booking) => (
                  <TableRow
                    key={booking.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(booking.id)}
                  >
                    <TableCell className="font-mono text-[11px]">{booking.reference}</TableCell>
                    <TableCell>
                      <p className="text-xs font-bold">{booking.client}</p>
                      <p className="text-[10px] text-muted-foreground">{booking.travellers} pax</p>
                    </TableCell>
                    <TableCell className="hidden max-w-[15rem] text-xs lg:table-cell">
                      {booking.tour}
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap text-[11px] text-muted-foreground md:table-cell">
                      {formatDate(booking.departDate)}
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums">
                      {money(booking.total)}
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                      {money(booking.deposit)}
                    </TableCell>
                    <TableCell
                      className={`text-right text-xs font-bold tabular-nums ${booking.balance > 0 ? "text-primary" : "text-success"}`}
                    >
                      {booking.balance > 0 ? money(booking.balance) : "Nil"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge>{booking.status}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Panel>

      <Panel
        title="Deposit & payment log"
        sub="Every recorded receipt, newest first. Refunds are shown with a negative value in the live ledger."
        action={<ReceiptText className="h-4 w-4 text-muted-foreground" />}
        bodyClassName="p-0"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Client / booking</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPayments.map((payment, i) => (
                <TableRow key={`${payment.reference}-${i}`}>
                  <TableCell className="font-mono text-[11px]">{payment.reference}</TableCell>
                  <TableCell>
                    <p className="text-xs font-semibold">{payment.booking.client}</p>
                    <p className="text-[10px] text-muted-foreground">{payment.booking.tour}</p>
                  </TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                    {formatDate(payment.date)}
                  </TableCell>
                  <TableCell className="text-xs">{payment.method}</TableCell>
                  <TableCell className="text-right text-xs font-bold tabular-nums">
                    {money(payment.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>

      {selected ? (
        <>
          <BookingDialog
            booking={selected}
            onClose={() => setSelectedId(null)}
            onPay={() => setPayOpen(true)}
          />
          {payOpen ? (
            <RecordPaymentDialog
              key={`${selected.id}-${selected.paid}`}
              booking={selected}
              onClose={() => setPayOpen(false)}
              onRecord={(payment) => {
                recordPayment(selected.id, payment);
                setPayOpen(false);
              }}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------- booking detail */

function BookingDialog({
  booking,
  onClose,
  onPay,
}: {
  booking: AdminBooking;
  onClose: () => void;
  onPay: () => void;
}) {
  const { money } = useCurrency();
  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{booking.tour}</DialogTitle>
          <DialogDescription>
            {booking.reference} · {booking.client} · {booking.travellers} traveller
            {booking.travellers === 1 ? "" : "s"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          <StatusBadge>{booking.status}</StatusBadge>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {booking.consultant}
          </span>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {booking.destination}
          </span>
        </div>

        <dl>
          <DetailRow label="Departure" value={formatDate(booking.departDate)} />
          <DetailRow label="Package total" value={money(booking.total)} />
          <DetailRow label="Deposit required" value={money(booking.deposit)} />
          <DetailRow label="Paid to date" value={money(booking.paid)} />
          <DetailRow
            label="Balance"
            value={
              booking.balance > 0
                ? `${money(booking.balance)} · due ${formatDate(booking.nextDue)}`
                : "Nil"
            }
            strong
          />
        </dl>

        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Payment history
          </p>
          <ul className="mt-2 divide-y divide-border rounded-xl border border-border">
            {booking.payments.map((payment, index) => (
              <li
                key={`${payment.reference}-${index}`}
                className="flex items-center justify-between gap-3 px-3.5 py-2.5"
              >
                <div>
                  <p className="text-xs font-semibold">
                    {payment.method} · {payment.reference}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{formatDate(payment.date)}</p>
                </div>
                <span className="text-xs font-bold tabular-nums">{money(payment.amount)}</span>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onPay} disabled={booking.balance === 0}>
            <Plus className="h-4 w-4" /> Record payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* --------------------------------------------------------- record payment */

const paymentSchema = z
  .object({
    amount: z.coerce.number().min(1_000, "Minimum payment is ₦1,000"),
    method: z.enum(["Paystack card", "Bank transfer", "Paystack transfer", "Cash"]),
    reference: z.string().min(3, "Add the gateway or bank reference"),
    date: z.string().min(1, "Payment date is required"),
  })
  .superRefine((values, ctx) => {
    // Booking-specific ceiling is enforced in the submit handler where it is in scope.
    if (!values.date) return;
    if (values.date > new Date().toISOString().slice(0, 10)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["date"],
        message: "Payment date cannot be in the future",
      });
    }
  });

type PaymentValues = z.infer<typeof paymentSchema>;

function RecordPaymentDialog({
  booking,
  onClose,
  onRecord,
}: {
  booking: AdminBooking;
  onClose: () => void;
  onRecord: (payment: AdminBookingPayment) => void;
}) {
  const { money } = useCurrency();
  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    mode: "onBlur",
    defaultValues: {
      amount: booking.balance,
      method: "Paystack transfer",
      reference: "",
      date: new Date().toISOString().slice(0, 10),
    },
  });

  const amount = Number(form.watch("amount") ?? 0);
  const tooMuch = amount > booking.balance;

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Record a payment</DialogTitle>
          <DialogDescription>
            {booking.reference} · balance {money(booking.balance)}. This updates the demo ledger
            only.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          noValidate
          onSubmit={form.handleSubmit((values) => {
            if (values.amount > booking.balance) {
              form.setError("amount", {
                message: `Amount cannot exceed the outstanding balance (${money(booking.balance)})`,
              });
              return;
            }
            onRecord({
              amount: values.amount,
              date: values.date,
              method: values.method,
              reference: values.reference,
            });
          })}
        >
          <div>
            <Label htmlFor="record-amount">Amount (NGN)</Label>
            <Input
              id="record-amount"
              type="number"
              min={1000}
              max={booking.balance}
              step={500}
              className="mt-1.5"
              aria-invalid={Boolean(form.formState.errors.amount) || tooMuch}
              {...form.register("amount")}
            />
            {form.formState.errors.amount ? (
              <p className="mt-1 text-xs font-medium text-destructive">
                {form.formState.errors.amount.message}
              </p>
            ) : tooMuch ? (
              <p className="mt-1 text-xs font-medium text-destructive">
                Amount exceeds the {money(booking.balance)} balance.
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-muted-foreground">
                Recorded against {booking.client}.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="record-method">Method</Label>
              <select id="record-method" className="field-base mt-1.5" {...form.register("method")}>
                {["Paystack card", "Bank transfer", "Paystack transfer", "Cash"].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="record-date">Payment date</Label>
              <Input id="record-date" type="date" className="mt-1.5" {...form.register("date")} />
              {form.formState.errors.date ? (
                <p className="mt-1 text-xs text-destructive">
                  {form.formState.errors.date.message}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="record-ref">Gateway / bank reference</Label>
            <Input
              id="record-ref"
              className="mt-1.5 font-mono"
              placeholder="e.g. PSK-7731902"
              aria-invalid={Boolean(form.formState.errors.reference)}
              {...form.register("reference")}
            />
            {form.formState.errors.reference ? (
              <p className="mt-1 text-xs text-destructive">
                {form.formState.errors.reference.message}
              </p>
            ) : null}
          </div>

          <div className="rounded-xl border border-gold/35 bg-accent/70 p-3 text-[11px] leading-relaxed text-accent-foreground">
            <CreditCard className="mr-1 inline h-3.5 w-3.5" />
            Reconcile the gateway reference before the receipt is released. A Paystack webhook is
            the only authority for a live card payment.
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Record payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
