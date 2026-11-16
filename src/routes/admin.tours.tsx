import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarDays, ImageIcon, MapPin, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import {
  EmptyState,
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
import { getPackages } from "@/data/packages";
import type { PackageStatus } from "@/data/types";
import { useCurrency } from "@/lib/currency";
import { formatDateRange } from "@/lib/format";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/admin/tours")({
  head: pageMeta(
    "Tour Manager",
    "Create, edit, schedule and publish Hague Travel tour departures with prices, deposits and seat capacity.",
    { robots: "noindex" },
  ),
  component: AdminTours,
});

const STATUSES: PackageStatus[] = ["draft", "scheduled", "published", "unpublished", "archived"];

interface TourRow {
  id: string;
  slug: string;
  title: string;
  destination: string;
  cover: string;
  departDate: string;
  returnDate: string;
  price: number;
  deposit: number;
  spots: number;
  status: PackageStatus;
  featured: boolean;
}

function initialRows(): TourRow[] {
  return getPackages().map((pkg) => ({
    id: pkg.slug,
    slug: pkg.slug,
    title: pkg.title,
    destination: pkg.destination,
    cover: pkg.cover,
    departDate: pkg.departDate,
    returnDate: pkg.returnDate,
    price: pkg.pricePerPerson,
    deposit: Math.round((pkg.pricePerPerson * pkg.depositPct) / 100),
    spots: pkg.spacesRemaining,
    status: pkg.status,
    featured: pkg.featured,
  }));
}

function AdminTours() {
  const loading = useDemoLoading();
  const { money } = useCurrency();
  const [rows, setRows] = useState<TourRow[]>(initialRows);
  const [status, setStatus] = useState<string>("all");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<TourRow | "new" | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesStatus = status === "all" || row.status === status;
      const matchesTerm =
        term === "" || `${row.title} ${row.destination} ${row.slug}`.toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [rows, status, q]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        STATUSES.map((s) => [s, rows.filter((row) => row.status === s).length]),
      ) as Record<PackageStatus, number>,
    [rows],
  );

  const save = (row: TourRow) => {
    setRows((current) => {
      const exists = current.some((item) => item.id === row.id);
      return exists ? current.map((item) => (item.id === row.id ? row : item)) : [row, ...current];
    });
    toast.success(editing === "new" ? "Experience added" : "Experience updated", {
      description: `${row.title} · ${row.status} (demo state only)`,
    });
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Tour manager"
        title="Experiences, departures and seat capacity"
        sub="Draft an offer, schedule it, then publish. Every change here is local to the demo — the public catalogue is not modified."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus className="h-4 w-4" /> New experience
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Published", value: counts.published, hint: "Visible on /packages" },
          { label: "Scheduled", value: counts.scheduled, hint: "Goes live on its start date" },
          { label: "Drafts", value: counts.draft, hint: "Never shown publicly" },
          {
            label: "Archived",
            value: counts.archived,
            hint: "Past departures, retained for records",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-2 font-display text-2xl">{item.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{item.hint}</p>
          </div>
        ))}
      </div>

      <Panel
        title="All departures"
        sub={`${filtered.length} of ${rows.length} records`}
        action={
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, destination or slug"
              aria-label="Search tours"
              className="pl-9"
            />
          </div>
        }
        bodyClassName="p-0"
      >
        <div className="border-b border-border p-4">
          <Segmented
            options={[
              { id: "all", label: "All", count: rows.length },
              ...STATUSES.map((s) => ({
                id: s,
                label: s[0]!.toUpperCase() + s.slice(1),
                count: counts[s],
              })),
            ]}
            value={status}
            onChange={setStatus}
            label="Filter tour status"
          />
        </div>

        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={7} columns={7} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={MapPin}
              title="No experiences match"
              body="Change the status filter, clear the search, or create a new departure."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQ("");
                    setStatus("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Experience</TableHead>
                  <TableHead>Departure window</TableHead>
                  <TableHead className="text-right">Price / person</TableHead>
                  <TableHead className="text-right">Deposit</TableHead>
                  <TableHead className="text-right">Spots</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={row.cover}
                          alt=""
                          className="h-11 w-14 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 text-sm font-bold">
                            {row.title}
                            {row.featured ? (
                              <Star
                                className="h-3 w-3 shrink-0 fill-gold text-gold"
                                aria-label="Featured"
                              />
                            ) : null}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{row.destination}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDateRange(row.departDate, row.returnDate)}
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold tabular-nums">
                      {money(row.price)}
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                      {money(row.deposit)}
                    </TableCell>
                    <TableCell className="text-right text-sm font-bold tabular-nums">
                      <span className={row.spots <= 4 ? "text-destructive" : ""}>{row.spots}</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge>{row.status}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Toggle featured for ${row.title}`}
                          onClick={() => {
                            setRows((current) =>
                              current.map((item) =>
                                item.id === row.id ? { ...item, featured: !item.featured } : item,
                              ),
                            );
                            toast.info(
                              row.featured ? "Removed from featured" : "Marked as featured",
                            );
                          }}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              row.featured ? "fill-gold text-gold" : "text-muted-foreground",
                            )}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Edit ${row.title}`}
                          onClick={() => setEditing(row)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${row.title}`}
                          onClick={() => {
                            setRows((current) => current.filter((item) => item.id !== row.id));
                            toast.success(`${row.title} removed from this demo view`);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Panel>

      {editing ? (
        <TourDialog
          key={editing === "new" ? "new" : editing.id}
          row={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- tour modal */

const tourSchema = z
  .object({
    title: z.string().min(5, "Enter a descriptive title"),
    destination: z.string().min(2, "Enter the destination"),
    cover: z.string().min(3, "Add a banner image URL or asset path"),
    departDate: z.string().min(1, "Departure date is required"),
    returnDate: z.string().min(1, "Return date is required"),
    price: z.coerce.number().min(50_000, "Price must be at least ₦50,000"),
    deposit: z.coerce.number().min(10_000, "Deposit must be at least ₦10,000"),
    spots: z.coerce.number().int().min(0).max(500),
    status: z.enum(["draft", "scheduled", "published", "unpublished", "archived"]),
    featured: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.returnDate <= values.departDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["returnDate"],
        message: "Return must be after departure",
      });
    }
    if (values.deposit >= values.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["deposit"],
        message: "Deposit must be less than the full price",
      });
    }
  });

type TourValues = z.infer<typeof tourSchema>;

function TourDialog({
  row,
  onClose,
  onSave,
}: {
  row: TourRow | null;
  onClose: () => void;
  onSave: (row: TourRow) => void;
}) {
  const { money } = useCurrency();
  const form = useForm<TourValues>({
    resolver: zodResolver(tourSchema),
    mode: "onBlur",
    defaultValues: {
      title: row?.title ?? "",
      destination: row?.destination ?? "",
      cover: row?.cover ?? "",
      departDate: row?.departDate ?? "",
      returnDate: row?.returnDate ?? "",
      price: row?.price ?? 1_500_000,
      deposit: row?.deposit ?? 450_000,
      spots: row?.spots ?? 12,
      status: row?.status ?? "draft",
      featured: row?.featured ?? false,
    },
  });

  const cover = form.watch("cover");
  const price = Number(form.watch("price") ?? 0);
  const deposit = Number(form.watch("deposit") ?? 0);
  const error = (name: keyof TourValues) => form.formState.errors[name]?.message;

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{row ? `Edit ${row.title}` : "Create an experience"}</DialogTitle>
          <DialogDescription>
            The banner, dates, deposit and seat count are exactly what the public detail page will
            show once published.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4 sm:grid-cols-2"
          noValidate
          onSubmit={form.handleSubmit((values) => {
            const slug =
              row?.slug ??
              values.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")
                .slice(0, 60);
            onSave({
              id: row?.id ?? `new-${slug}`,
              slug,
              title: values.title,
              destination: values.destination,
              cover: values.cover,
              departDate: values.departDate,
              returnDate: values.returnDate,
              price: values.price,
              deposit: values.deposit,
              spots: values.spots,
              status: values.status,
              featured: values.featured,
            });
          })}
        >
          <div className="sm:col-span-2">
            <Label htmlFor="tour-title">Title</Label>
            <Input
              id="tour-title"
              className="mt-1.5"
              placeholder="e.g. Zanzibar Spice & Shore"
              aria-invalid={Boolean(error("title"))}
              {...form.register("title")}
            />
            {error("title") ? (
              <p className="mt-1 text-xs text-destructive">{error("title")}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="tour-dest">Destination</Label>
            <Input
              id="tour-dest"
              className="mt-1.5"
              placeholder="Zanzibar, Tanzania"
              {...form.register("destination")}
            />
            {error("destination") ? (
              <p className="mt-1 text-xs text-destructive">{error("destination")}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="tour-status">Status</Label>
            <select id="tour-status" className="field-base mt-1.5" {...form.register("status")}>
              {STATUSES.map((value) => (
                <option key={value} value={value}>
                  {value[0]!.toUpperCase() + value.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="tour-cover">Banner image URL or asset path</Label>
            <Input
              id="tour-cover"
              className="mt-1.5"
              placeholder="/assets/… or https://…"
              aria-invalid={Boolean(error("cover"))}
              {...form.register("cover")}
            />
            {error("cover") ? (
              <p className="mt-1 text-xs text-destructive">{error("cover")}</p>
            ) : null}
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-2.5">
              {cover ? (
                <img
                  src={cover}
                  alt="Banner preview"
                  className="h-14 w-20 rounded-lg object-cover"
                />
              ) : (
                <span className="grid h-14 w-20 place-items-center rounded-lg bg-card text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </span>
              )}
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Use a 16:9 image, at least 1600px wide. The header uses a dark gradient over the
                image, so avoid text inside the banner.
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="tour-depart">Departure date</Label>
            <Input
              id="tour-depart"
              type="date"
              className="mt-1.5"
              {...form.register("departDate")}
            />
            {error("departDate") ? (
              <p className="mt-1 text-xs text-destructive">{error("departDate")}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="tour-return">Return date</Label>
            <Input
              id="tour-return"
              type="date"
              className="mt-1.5"
              aria-invalid={Boolean(error("returnDate"))}
              {...form.register("returnDate")}
            />
            {error("returnDate") ? (
              <p className="mt-1 text-xs text-destructive">{error("returnDate")}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="tour-price">Total price per person (NGN)</Label>
            <Input
              id="tour-price"
              type="number"
              min={50_000}
              step={10_000}
              className="mt-1.5"
              aria-invalid={Boolean(error("price"))}
              {...form.register("price")}
            />
            {error("price") ? (
              <p className="mt-1 text-xs text-destructive">{error("price")}</p>
            ) : (
              <p className="mt-1 text-[11px] text-muted-foreground">{money(price)} indicative</p>
            )}
          </div>

          <div>
            <Label htmlFor="tour-deposit">Deposit required (NGN)</Label>
            <Input
              id="tour-deposit"
              type="number"
              min={10_000}
              step={10_000}
              className="mt-1.5"
              aria-invalid={Boolean(error("deposit"))}
              {...form.register("deposit")}
            />
            {error("deposit") ? (
              <p className="mt-1 text-xs text-destructive">{error("deposit")}</p>
            ) : (
              <p className="mt-1 text-[11px] text-muted-foreground">
                {money(deposit)} · {price > 0 ? Math.round((deposit / price) * 100) : 0}% of the
                fare
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="tour-spots">Seats / spots remaining</Label>
            <Input
              id="tour-spots"
              type="number"
              min={0}
              max={500}
              className="mt-1.5"
              {...form.register("spots")}
            />
            {error("spots") ? (
              <p className="mt-1 text-xs text-destructive">{error("spots")}</p>
            ) : null}
          </div>

          <label className="flex items-center gap-2.5 rounded-xl border border-border bg-secondary/40 px-3.5 py-3 text-xs">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[var(--color-primary)]"
              {...form.register("featured")}
            />
            Feature on the homepage and first in search results
          </label>

          <div className="sm:col-span-2 rounded-xl border border-gold/35 bg-accent/70 p-3 text-[11px] leading-relaxed text-accent-foreground">
            <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
            Publishing this record changes only the demo table. In production the public page reads
            the same record and an expiry job archives past departures automatically.
          </div>

          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{row ? "Save changes" : "Create experience"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
