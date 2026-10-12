import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { CURRENCIES } from "@/data/site";
import type { CurrencyCode } from "@/data/types";
import { formatPrice } from "./format";

const STORAGE_KEY = "hague-travel:currency";

interface CurrencyValue {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
  /** Formats a price stored in NGN into the selected display currency. */
  money: (ngn: number, opts?: { compact?: boolean; decimals?: number }) => string;
}

const CurrencyContext = createContext<CurrencyValue | null>(null);

/**
 * Reads persisted preference inside an effect (never at module scope) so the
 * server render and the first client render agree, then hydrates.
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>("NGN");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "NGN" || stored === "USD" || stored === "GBP") setCodeState(stored);
    } catch {
      /* storage unavailable (private mode) — fall back to NGN */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore write failures */
    }
  }, [code, hydrated]);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    const label = CURRENCIES.find((c) => c.code === next)?.label ?? next;
    toast.success(`Prices now shown in ${label}`, {
      description:
        next === "NGN"
          ? "Naira is our primary billing currency."
          : "Demo conversion only — invoices are raised in the supplier's currency.",
    });
  }, []);

  const value = useMemo<CurrencyValue>(
    () => ({ code, setCode, money: (ngn, opts) => formatPrice(ngn, code, opts) }),
    [code, setCode],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
