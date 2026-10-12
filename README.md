# Hague Travel — interactive preview

This repository is a **clickable, high-fidelity preview** of Hague Travel: every page, form,
filter, quote journey, dashboard and admin workflow described in the brief is implemented, but
there is **no backend**. All content comes from typed mock data in `src/data/`, so the whole site
runs on static hosting (Cloudflare Workers) and can be handed to a builder as an executable spec.

## Preview-only guarantees (do not remove)

The brief makes these compliance rules, and they are enforced by code and by `src/test/data-integrity.test.ts`:

- Prices are always labelled **indicative**; nothing is ever shown as a confirmed fare, ticket,
  voucher or booking. `IndicativeTag` / `ComplianceNote` come from `src/components/site/Blocks.tsx`.
- **Visa and admission decisions rest with the authorities**, never with Hague Travel
  (`/visa-disclaimer` is linked from every study/relocation page and the footer).
- **Passport issuance, biometrics and approvals belong to the government authority** — we sell
  documentation and appointment support only (`/passports`).
- **Government / university / third-party fees are itemised separately from agency fees** on every
  service page via `<FeeSplit>`.
- Referral, insurance and financing **commissions are disclosed**; Hague Travel is not a lender
  (`/relocation#financing`).
- **Secure document handling** notice (encrypted upload, role-scoped access, 14-day purge) on
  `/passports`, `/privacy` and `/dashboard`.
- Academy: “_Certificates are issued by Hague Travel Academy and are not IATA or government
  accreditation._” Jobs: “_Example role categories — not live vacancies_”, candidates never pay,
  no promised placement or earnings. Study destinations are “_subject to partner coverage_”.
- Every legal route exists: `/terms`, `/privacy`, `/refund-policy`, `/visa-disclaimer`.

Canonical wording lives in one place: `COMPLIANCE_NOTES` in `src/data/site.ts`.

## Stack

- **TanStack Start v1** (React 19) + **Vite 7**, deployed to **Cloudflare Workers** via Nitro.
- **File-based routing** in `src/routes/` — see `src/routes/README.md`. `src/routeTree.gen.ts` is
  generated; never hand-edit it.
- **Tailwind CSS v4**, configured entirely in `src/styles.css` (no `tailwind.config.js`).
- **shadcn/ui** primitives in `src/components/ui/`, icons from `lucide-react`, toasts from `sonner`.
- **zod + react-hook-form** for every form; **recharts** for the admin charts.
- **bun** for install/scripts. `bun run dev`, `bun run build`, `bun run test`, `bun run lint`, `bun run format`.

## Structure

```
src/
  routes/            one file per URL (dots = nesting; `packages.$slug.tsx` → /packages/:slug)
    __root.tsx       app shell: fonts, Header, Footer, WhatsApp FAB, mobile consult bar, Toaster
    index.tsx        home — tabbed “Plan your journey” panel + every homepage section
    flights.tsx hotels.tsx packages.index.tsx packages.$slug.tsx
    study-abroad.tsx (layout, renders <Outlet/>) + study-abroad.index.tsx + study-abroad.$country.tsx
    relocation.tsx passports.tsx insurance.tsx extras.tsx
    academy.tsx jobs.index.tsx jobs.$id.tsx corporate.tsx
    dashboard.tsx admin.tsx about.tsx contact.tsx faqs.tsx
    terms.tsx privacy.tsx refund-policy.tsx visa-disclaimer.tsx
  components/
    ui/              shadcn primitives (do not restyle individually — use the tokens)
    site/            Hague Travel building blocks
      Header.tsx Footer.tsx        mega menu (desktop) / sheet drawer (mobile), legal columns
      BookingPanel.tsx             the 4-tab search panel (flights · hotels · packages · study)
      Blocks.tsx                   PageHero, Section, Reveal, Tabs, Steps, FeeSplit, Notice, Pill…
      Cards.tsx                    PackageCard, RouteCard, HotelCard, HousingCard, CohortCard, JobCard…
      Form.tsx                     FieldDef → zod schema; EnquiryForm, MultiStepForm, FormSuccess
      SmartLink.tsx                resolves string nav targets + in-page #hash
  data/              ← ALL MOCK DATA LIVES HERE (typed in types.ts)
  lib/               format.ts (dates, NGN money, references), currency.tsx (NGN/USD/GBP switcher), meta.ts
  components/site/search.ts + routes/*.tsx `validateSearch`   URL-driven filters
  styles.css         Tailwind v4 entry: oklch tokens, @theme inline mapping, @utility helpers
  assets/            generated photography (hero, resort, hotel, campus, city, documents…)
```

### Design system

`src/styles.css` is the single source of truth: every colour is an `oklch` token declared in `:root`
and mapped in `@theme inline` — components use tokens/utilities (`bg-sea-gradient`, `shadow-elegant`,
`eyebrow`, `lift`, `field-base`, `animate-rise`, `reveal`), never hard-coded colour classes.
Type pairing is **Fraunces** (display serif) + **Manrope** (UI sans), loaded via `<link>` in
`__root.tsx`. Motion is CSS-only and fully neutralised under `prefers-reduced-motion`.
Mobile-first at 390 px, then scales up; horizontal scrolling is confined to data tables that sit
inside `overflow-x-auto` shells.

### Currency

Every stored price is **NGN**. `useCurrency()` converts for display only and tells the user so; the
chosen code is read from `localStorage` inside `useEffect` (no browser API at import time).

## Where the real backend plugs in

The document's own recommendation (Next.js/Node + Postgres) is kept as the **future API surface**;
this preview deliberately has no server logic. Swap points are already isolated:

| Preview today                                                                        | Production replacement                                                                                                           |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/flights.ts → searchDemoFlights()` (deterministic synthetic results)        | Airline/GDS or aggregator API (Amadeus/Sabre/Travelport, or a consolidator API) returning live fares, fare rules and brand fares |
| `src/data/hotels.ts` static arrays                                                   | Hotel content + availability API (rate plans, room types, cancellation rules, long-stay monthly inventory)                       |
| `src/data/packages.ts` typed listings with `status: draft \| scheduled \| published` | Postgres `packages` table + the admin CMS screen (`/admin`) writing to it; auto-expiry job for stale offers                      |
| `src/data/ops.ts` enquiries, applications, cases, payments, promo codes              | `enquiries`, `applications`, `documents`, `payments`, `promo_codes` tables; the `/admin` tables become queries                   |
| `EnquiryForm` / `MultiStepForm` → zod + success screen with `makeReference()`        | Same schemas posted to a server function (`createServerFn`) → insert enquiry → email/WhatsApp acknowledgement                    |
| `useCurrency()` switcher, `formatPrice()`                                            | Supplier currency from the booking record; FX only for display                                                                   |
| `<FeeSplit>` arrays                                                                  | Invoice line items with `owner: government \| university \| agency \| third-party`                                               |
| Insurance quote maths in `src/routes/insurance.tsx`                                  | Partner rating/quote API + policy document retrieval                                                                             |
| `src/data/academy.ts` cohorts                                                        | Cohort/invoice/assessment tables; payments via the gateway                                                                       |
| `src/data/jobs.ts` example roles                                                     | Employer accounts, moderation queue, CV store, application status                                                                |

`src/components/site/Form.tsx` funnels every submit through a single `onSubmit` boundary, and each
`src/data/*.ts` accessor (`getPublishedPackages()`, `searchDemoFlights()`, `getDestinations()`, …) is
the seam where a fetch/server call replaces the array — routes never import raw arrays.

Payments: keep invoices, deposits, balances and refunds server-side with a licensed gateway
(Paystack/Flutterwave), webhooks writing to `payments`, and receipts attached to the client file.
The admin demo (`/admin`) already shows the states those records move through.

## Conventions this repo follows

- Routes own their own `head()` with unique title/description/OG/Twitter tags (`pageMeta()`).
- Dynamic routes use a `loader` + `throw notFound()`, and their `head()` guards for a missing record.
- Parent routes render `<Outlet />`; a `foo.tsx` layout alongside `foo.index.tsx` is intentional.
- No `window`/`localStorage` at module scope or in `useState` initialisers.
- `bun run build` and `bunx tsc --noEmit` must stay at zero errors; `bun run test` guards routes
  (every nav/footer target resolves) and data completeness.

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b1030fd9-dacf-41a1-8d52-3c04bc2a67df).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into
  Lovable, ready for your next prompt.

## Development

Prefer working locally? Use [bun](https://bun.sh) — the lockfile is `bun.lock` (npm works too).

```sh
git clone <this-repository-url>
cd hague-travel-showcase
bun install
bun run dev      # http://localhost:5173
bun run build    # type-safe client + SSR bundles for Cloudflare Workers
bun run test     # route + data-integrity guards
bun run lint     # eslint (prettier rules included)
```
