/**
 * Tiny client-side helpers for demo receipts and printable slips.
 * Guarded for SSR: they only run after a user interaction in the browser.
 */
export function downloadText(filename: string, text: string): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function printPage(): void {
  if (typeof window === "undefined") return;
  window.print();
}
