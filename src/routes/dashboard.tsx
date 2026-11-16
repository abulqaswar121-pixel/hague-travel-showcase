import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageMeta } from "@/lib/meta";

/**
 * Legacy URL. The customer area now lives under /portal, so old links and
 * printed materials keep working.
 */
export const Route = createFileRoute("/dashboard")({
  head: pageMeta("Customer Portal", "Continue to your Hague Travel customer portal.", {
    robots: "noindex",
  }),
  beforeLoad: () => {
    throw redirect({ to: "/portal", replace: true });
  },
});
