/**
 * URL search params are parsed by hand rather than zod so a malformed query
 * string can never throw during SSR. Each helper returns a fresh object and only
 * sets keys it actually received (required by `exactOptionalPropertyTypes`).
 */
type Raw = Record<string, unknown>;

export function str(search: Raw, key: string): string | undefined {
  const v = search[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

export function num(search: Raw, key: string, fallback?: number): number | undefined {
  const v = search[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v))) return Number(v);
  return fallback;
}

export function bool(search: Raw, key: string): boolean | undefined {
  const v = search[key];
  if (v === "1" || v === "true" || v === true) return true;
  if (v === "0" || v === "false" || v === false) return false;
  return undefined;
}

export const TRIP_TYPES = ["Round trip", "One way", "Multi-city"] as const;
export const CABINS = ["Economy", "Premium Economy", "Business", "First"] as const;
