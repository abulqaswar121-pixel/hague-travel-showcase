import { CURRENCIES } from "@/data/site";
import type { CurrencyCode } from "@/data/types";

/**
 * Prices are stored once, in NGN. `formatPrice` converts for display only —
 * a demo courtesy, never a quotable rate. In production the supplier quotes in
 * its own currency and this becomes a formatting-only helper.
 */
export const CURRENCY_META: Record<
  CurrencyCode,
  { symbol: string; rate: number; locale: string; label: string }
> = CURRENCIES.reduce(
  (acc, c) => {
    acc[c.code] = { symbol: c.symbol, rate: c.rate, locale: c.locale, label: c.label };
    return acc;
  },
  {} as Record<CurrencyCode, { symbol: string; rate: number; locale: string; label: string }>,
);

export function convert(ngn: number, code: CurrencyCode): number {
  return ngn * CURRENCY_META[code].rate;
}

export function formatPrice(
  ngn: number,
  code: CurrencyCode = "NGN",
  opts: { compact?: boolean; decimals?: number } = {},
): string {
  const meta = CURRENCY_META[code];
  const value = convert(ngn, code);
  const fractionDigits = opts.decimals ?? (code === "NGN" ? 0 : value < 1000 ? 2 : 0);
  const formatted = new Intl.NumberFormat(meta.locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: opts.compact ? 1 : fractionDigits,
    ...(opts.compact ? { notation: "compact" as const } : {}),
  }).format(value);
  return `${meta.symbol}${formatted}`;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-NG").format(n);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function safeDate(iso: string): Date | null {
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "16 Jan 2027" */
export function formatDate(iso: string): string {
  const d = safeDate(iso);
  if (!d) return iso;
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "16 January 2027" */
export function formatDateLong(iso: string): string {
  const d = safeDate(iso);
  if (!d) return iso;
  return `${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

/** "16 – 23 Jan 2027" when both dates share a month and year. */
export function formatDateRange(from: string, to: string): string {
  const a = safeDate(from);
  const b = safeDate(to);
  if (!a || !b) return `${from} → ${to}`;
  const sameYear = a.getFullYear() === b.getFullYear();
  const sameMonth = sameYear && a.getMonth() === b.getMonth();
  if (sameMonth)
    return `${a.getDate()} – ${b.getDate()} ${MONTHS[a.getMonth()]} ${a.getFullYear()}`;
  if (sameYear)
    return `${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]} ${a.getFullYear()}`;
  return `${a.getDate()} ${MONTHS[a.getMonth()]} ${a.getFullYear()} – ${b.getDate()} ${MONTHS[b.getMonth()]} ${b.getFullYear()}`;
}

/** Days from today (Africa/Lagos-ish approximation) — used for urgency copy. */
export function daysUntil(iso: string): number {
  const d = safeDate(iso);
  if (!d) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

export function urgencyLabel(iso: string, soonDays = 45): string | null {
  const days = daysUntil(iso);
  if (days < 0) return "Closed";
  if (days === 0) return "Closes today";
  if (days <= soonDays) return `Closes in ${days} days`;
  return null;
}

export function nightsLabel(nights: number, days: number): string {
  return `${nights} nights / ${days} days`;
}

export function pluralise(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** Deterministic demo reference numbers — no crypto, no real booking semantics. */
export function makeReference(prefix: string, seed?: string): string {
  let hash = 7;
  const text = seed ?? prefix;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) % 99991;
  return `${prefix}-${String(hash).padStart(5, "0")}`;
}
