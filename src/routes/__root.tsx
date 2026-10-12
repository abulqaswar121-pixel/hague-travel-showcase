import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer, MobileConsultBar, WhatsAppFab } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CurrencyProvider } from "@/lib/currency";
import { BRAND } from "@/data/site";

/** Scrolls to a #hash target after navigation so mega-menu deep links land correctly. */
function HashScroller() {
  useEffect(() => {
    const run = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = window.setTimeout(run, 220);
    window.addEventListener("hashchange", run);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", run);
    };
  }, []);
  return null;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center text-ink-foreground">
      <p className="eyebrow">Off the flight path</p>
      <p className="mt-4 font-display text-7xl leading-none text-gold sm:text-8xl">404</p>
      <h1 className="mt-5 text-2xl sm:text-3xl">This destination isn't on our map yet</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-foreground/70">
        That page does not exist. Every service we offer is one tap from the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground shadow-gold"
        >
          Back to home
        </Link>
        <Link
          to="/packages"
          className="rounded-full border border-ink-foreground/25 px-6 py-3 text-sm font-bold"
        >
          Browse packages
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">This page didn't load</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Something went wrong on our side. Try again, or go back to the homepage and start a new
        search.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-bold"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${BRAND.name} — ${BRAND.tagline}` },
      {
        name: "description",
        content:
          "Flights, hotels, trips, study abroad, work and relocation, passports, insurance and travel training — with a consultant who owns your file.",
      },
      { property: "og:site_name", content: BRAND.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { rel: "icon", href: "/site-icon.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Manrope:wght@400..800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <Header />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFab />
        <MobileConsultBar />
        <HashScroller />
        <Toaster position="top-center" richColors closeButton />
      </CurrencyProvider>
    </QueryClientProvider>
  );
}
