import { useMemo, useState, type ChangeEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  CalendarClock,
  Download,
  Eye,
  FileCheck2,
  FilePlus2,
  FileWarning,
  Fingerprint,
  IdCard,
  LockKeyhole,
  Pencil,
  Search,
  ShieldCheck,
  UploadCloud,
  Users,
} from "lucide-react";
import {
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
  SAVED_PASSENGERS,
  PORTAL_DOCUMENTS,
  PORTAL_PROFILE,
  type PortalDocument,
  type PortalDocumentType,
  type SavedPassenger,
} from "@/data/portal";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/portal/documents")({
  head: pageMeta(
    "Profile & Documents",
    "Manage saved passenger details, passport copies and visa documents in your encrypted Hague Travel document vault.",
    { robots: "noindex" },
  ),
  component: PortalDocuments,
});

const DOC_TYPES: PortalDocumentType[] = [
  "Passport",
  "Visa",
  "Admissions",
  "Financial",
  "Health",
  "Travel",
];

const FILTERS = [
  { id: "all", label: "All documents" },
  { id: "Passport", label: "Passport" },
  { id: "Visa", label: "Visa" },
  { id: "Admissions", label: "Admissions" },
  { id: "Financial", label: "Financial" },
  { id: "Health", label: "Health" },
];

function PortalDocuments() {
  const loading = useDemoLoading();
  const [passengers, setPassengers] = useState<SavedPassenger[]>(SAVED_PASSENGERS);
  const [documents, setDocuments] = useState<PortalDocument[]>(PORTAL_DOCUMENTS);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<SavedPassenger | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchesType = filter === "all" || doc.type === filter;
      const matchesTerm =
        term === "" ||
        `${doc.name} ${doc.owner} ${doc.type} ${doc.note}`.toLowerCase().includes(term);
      return matchesType && matchesTerm;
    });
  }, [documents, filter, q]);

  const actionNeeded = documents.filter((doc) => doc.state === "Action needed").length;
  const verified = documents.filter((doc) => doc.state === "Verified").length;
  const passportDocs = documents.filter((doc) => doc.type === "Passport").length;

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Profile & documents"
        title="Your people, your papers, kept safe"
        sub="Passenger details are reused across bookings. Passport copies and visa evidence are stored encrypted, visible only to your named consultant, and purged 14 days after travel."
        actions={
          <Button onClick={() => setUploadOpen(true)}>
            <UploadCloud className="h-4 w-4" /> Upload a document
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Saved passengers"
          value={passengers.length}
          hint="Reusable across bookings"
          icon={Users}
        />
        <KpiCard
          label="Documents on file"
          value={documents.length}
          hint={`${passportDocs} passport copies`}
          icon={FileCheck2}
        />
        <KpiCard
          label="Verified"
          value={verified}
          hint="Checked by your consultant"
          icon={ShieldCheck}
          tone="success"
        />
        <KpiCard
          label="Action needed"
          value={actionNeeded}
          hint="Upload or replace a document"
          icon={FileWarning}
          tone="warning"
        />
      </div>

      <Panel
        title="Saved passenger details"
        sub="Names must match the passport exactly. Tell your consultant before any legal name change."
        action={
          <span className="text-[11px] text-muted-foreground">
            Client {PORTAL_PROFILE.reference}
          </span>
        }
        bodyClassName="p-0"
      >
        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={3} columns={4} />
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {passengers.map((passenger) => (
              <li key={passenger.id} className="flex flex-wrap items-start gap-4 p-4 sm:p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                  <IdCard className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold">{passenger.name}</p>
                    <StatusBadge>{passenger.relationship}</StatusBadge>
                  </div>
                  <div className="mt-1.5 grid gap-x-5 gap-y-1 text-[11px] text-muted-foreground sm:grid-cols-2">
                    <p>
                      DOB{" "}
                      <span className="font-medium text-foreground">
                        {formatDate(passenger.dob)}
                      </span>{" "}
                      · {passenger.nationality}
                    </p>
                    <p>
                      Passport{" "}
                      <span className="font-mono font-medium text-foreground">
                        {passenger.passportNumber}
                      </span>{" "}
                      · expires {formatDate(passenger.passportExpiry)}
                    </p>
                    <p>
                      Seat <span className="font-medium text-foreground">{passenger.seat}</span> ·{" "}
                      {passenger.meal}
                    </p>
                    <p>
                      Frequent flyer{" "}
                      <span className="font-medium text-foreground">{passenger.frequentFlyer}</span>
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditing(passenger)}>
                  <Pencil className="h-3.5 w-3.5" /> Edit details
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        title="Document vault"
        sub="Encrypted upload · role-scoped access · 14-day purge after travel."
        action={<ShieldCheck className="h-4 w-4 text-success" />}
        bodyClassName="p-0"
      >
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <Segmented
            options={FILTERS.map((f) => ({
              ...f,
              count:
                f.id === "all"
                  ? documents.length
                  : documents.filter((doc) => doc.type === f.id).length,
            }))}
            value={filter}
            onChange={setFilter}
            label="Filter documents"
          />
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search documents or owners"
              aria-label="Search documents"
              className="pl-9"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={4} columns={4} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={FilePlus2}
              title="No document matches"
              body="Clear the search or choose another category. New uploads appear here immediately."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQ("");
                    setFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((doc) => (
              <li key={doc.id} className="flex flex-wrap items-start gap-3 p-4 sm:p-5">
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    doc.state === "Action needed"
                      ? "bg-destructive/10 text-destructive"
                      : doc.state === "Verified"
                        ? "bg-success/10 text-success"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {doc.state === "Action needed" ? (
                    <FileWarning className="h-4.5 w-4.5" />
                  ) : (
                    <FileCheck2 className="h-4.5 w-4.5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold">{doc.name}</p>
                    <StatusBadge>{doc.state}</StatusBadge>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {doc.type} · {doc.owner} · {doc.size} · added {doc.added}
                    {doc.expires !== "—" ? ` · valid to ${doc.expires}` : ""}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {doc.note}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toast.info("Document preview", {
                        description: "Encrypted preview is available in the production vault.",
                      })
                    }
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toast.info("Download requested", {
                        description: "Watermarked copies are issued only to the named consultant.",
                      })
                    }
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: LockKeyhole,
            title: "Encrypted upload",
            body: "Files are transmitted over TLS and stored with encryption at rest. Only your consultant and the compliance lead can open them.",
          },
          {
            icon: Fingerprint,
            title: "Role-scoped access",
            body: "Every view is logged. Staff see only the files for cases assigned to them — never the whole client book.",
          },
          {
            icon: CalendarClock,
            title: "14-day purge",
            body: "Documents are deleted 14 days after travel unless you ask us in writing to keep them for a future application.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-card p-4">
            <item.icon className="h-5 w-5 text-primary" />
            <p className="mt-2.5 text-sm font-bold">{item.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>

      <PassengerDialog
        passenger={editing}
        onClose={() => setEditing(null)}
        onSave={(updated) => {
          setPassengers((current) =>
            current.map((item) => (item.id === updated.id ? updated : item)),
          );
          setEditing(null);
          toast.success("Passenger details updated");
        }}
      />

      <UploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={(doc) => {
          setDocuments((current) => [doc, ...current]);
          setUploadOpen(false);
          toast.success("Document uploaded for review", {
            description: "Your consultant will verify it within desk hours.",
          });
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------- edit passenger form */

const passengerSchema = z.object({
  name: z.string().min(3, "Enter the full name as it appears on the passport"),
  relationship: z.enum(["Self", "Spouse", "Child", "Parent", "Colleague"]),
  dob: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(2, "Nationality is required"),
  passportNumber: z.string().min(5, "Enter at least five characters"),
  passportExpiry: z.string().min(1, "Passport expiry is required"),
  seat: z.enum(["Window", "Aisle", "No preference", "With adult"]),
  meal: z.string().min(2, "Tell us the meal preference"),
  frequentFlyer: z.string().optional(),
});

type PassengerValues = z.infer<typeof passengerSchema>;

function PassengerDialog({
  passenger,
  onClose,
  onSave,
}: {
  passenger: SavedPassenger | null;
  onClose: () => void;
  onSave: (passenger: SavedPassenger) => void;
}) {
  if (!passenger) return null;
  return (
    <PassengerForm key={passenger.id} passenger={passenger} onClose={onClose} onSave={onSave} />
  );
}

function PassengerForm({
  passenger,
  onClose,
  onSave,
}: {
  passenger: SavedPassenger;
  onClose: () => void;
  onSave: (passenger: SavedPassenger) => void;
}) {
  const form = useForm<PassengerValues>({
    resolver: zodResolver(passengerSchema),
    mode: "onBlur",
    defaultValues: {
      name: passenger.name,
      relationship: passenger.relationship,
      dob: passenger.dob,
      nationality: passenger.nationality,
      passportNumber: passenger.passportNumber.replace(/•/g, "0"),
      passportExpiry: passenger.passportExpiry,
      seat: (["Window", "Aisle", "No preference", "With adult"] as const).includes(
        passenger.seat as "Window",
      )
        ? (passenger.seat as PassengerValues["seat"])
        : "No preference",
      meal: passenger.meal,
      frequentFlyer: passenger.frequentFlyer === "—" ? "" : passenger.frequentFlyer,
    },
  });

  const fieldError = (name: keyof PassengerValues) => form.formState.errors[name]?.message;

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit passenger details</DialogTitle>
          <DialogDescription>
            Use the exact spelling on the passport. Changes to a booked ticket may carry airline
            fees.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 sm:grid-cols-2"
          noValidate
          onSubmit={form.handleSubmit((values) => {
            onSave({
              ...passenger,
              ...values,
              frequentFlyer: values.frequentFlyer || "—",
              passportNumber: `A•••••${values.passportNumber.slice(-3)}`,
            });
          })}
        >
          <div className="sm:col-span-2">
            <Label htmlFor="pax-name">Full name</Label>
            <Input
              id="pax-name"
              className="mt-1.5"
              aria-invalid={Boolean(fieldError("name"))}
              {...form.register("name")}
            />
            {fieldError("name") ? (
              <p className="mt-1 text-xs text-destructive">{fieldError("name")}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="pax-rel">Relationship</Label>
            <select id="pax-rel" className="field-base mt-1.5" {...form.register("relationship")}>
              {["Self", "Spouse", "Child", "Parent", "Colleague"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="pax-dob">Date of birth</Label>
            <Input id="pax-dob" type="date" className="mt-1.5" {...form.register("dob")} />
          </div>
          <div>
            <Label htmlFor="pax-nat">Nationality</Label>
            <Input id="pax-nat" className="mt-1.5" {...form.register("nationality")} />
          </div>
          <div>
            <Label htmlFor="pax-pass">Passport number</Label>
            <Input
              id="pax-pass"
              className="mt-1.5 font-mono"
              aria-invalid={Boolean(fieldError("passportNumber"))}
              {...form.register("passportNumber")}
            />
            {fieldError("passportNumber") ? (
              <p className="mt-1 text-xs text-destructive">{fieldError("passportNumber")}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="pax-exp">Passport expiry</Label>
            <Input
              id="pax-exp"
              type="date"
              className="mt-1.5"
              {...form.register("passportExpiry")}
            />
          </div>
          <div>
            <Label htmlFor="pax-seat">Seat preference</Label>
            <select id="pax-seat" className="field-base mt-1.5" {...form.register("seat")}>
              {["Window", "Aisle", "No preference", "With adult"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="pax-meal">Meal preference</Label>
            <Input id="pax-meal" className="mt-1.5" {...form.register("meal")} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="pax-ff">Frequent flyer number (optional)</Label>
            <Input id="pax-ff" className="mt-1.5" {...form.register("frequentFlyer")} />
          </div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save passenger</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------- upload form */

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];

function UploadDialog({
  open,
  onClose,
  onUpload,
}: {
  open: boolean;
  onClose: () => void;
  onUpload: (doc: PortalDocument) => void;
}) {
  const [type, setType] = useState<PortalDocumentType>("Passport");
  const [owner, setOwner] = useState(PORTAL_PROFILE.name);
  const [expiry, setExpiry] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [confirm, setConfirm] = useState(false);
  type DocErrors = { file?: string; owner?: string; expiry?: string; confirm?: string };
  const [errors, setErrors] = useState<DocErrors>({});

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0] ?? null;
    if (!picked) {
      setFile(null);
      return;
    }
    if (!ACCEPTED.includes(picked.type)) {
      setErrors((current) => ({ ...current, file: "Use a PDF, JPG or PNG file." }));
      setFile(null);
      return;
    }
    if (picked.size > MAX_BYTES) {
      setErrors((current) => ({ ...current, file: "Keep the file under 5 MB." }));
      setFile(null);
      return;
    }
    setErrors((current) => {
      const next = { ...current };
      delete next.file;
      return next;
    });
    setFile(picked);
  };

  const submit = () => {
    const next: DocErrors = {};
    if (!file) next.file = "Choose a PDF, JPG or PNG file.";
    if (!owner) next.owner = "Choose whose document this is.";
    if (!expiry) next.expiry = "Add the expiry or issue date, or choose 'No expiry'.";
    if (!confirm) next.confirm = "Confirm that the document is genuine and yours to share.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onUpload({
      id: `DOC-${Date.now()}`,
      name: file!.name.replace(/\.[^.]+$/, ""),
      type,
      owner,
      added: formatDate(new Date().toISOString().slice(0, 10)),
      expires: expiry === "none" ? "—" : expiry,
      state: "Received",
      size: `${(file!.size / 1024).toFixed(0)} KB`,
      note: "Uploaded from the customer portal. Awaiting consultant verification.",
    });
    setFile(null);
    setExpiry("");
    setConfirm(false);
    setErrors({});
  };

  if (!open) return null;

  return (
    <Dialog open onOpenChange={(value) => (!value ? onClose() : undefined)}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>
            PDF, JPG or PNG up to 5 MB. Uploads are encrypted and only your consultant can open
            them.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="doc-type">Document type</Label>
              <select
                id="doc-type"
                className="field-base mt-1.5"
                value={type}
                onChange={(e) => setType(e.target.value as PortalDocumentType)}
              >
                {DOC_TYPES.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="doc-owner">Whose document?</Label>
              <select
                id="doc-owner"
                className="field-base mt-1.5"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                aria-invalid={Boolean(errors.owner)}
              >
                {SAVED_PASSENGERS.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.owner ? (
                <p className="mt-1 text-xs text-destructive">{errors.owner}</p>
              ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="doc-file">Choose file</Label>
            <label
              htmlFor="doc-file"
              className={cn(
                "mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-8 text-center transition hover:bg-secondary/40",
                errors.file
                  ? "border-destructive bg-destructive/5"
                  : "border-input bg-secondary/20",
              )}
            >
              <UploadCloud className="h-7 w-7 text-primary" />
              <span className="mt-2 text-sm font-bold">
                {file ? file.name : "Tap to choose a PDF or image"}
              </span>
              <span className="mt-1 text-[11px] text-muted-foreground">
                {file ? `${(file.size / 1024).toFixed(0)} KB selected` : "Maximum 5 MB"}
              </span>
              <input
                id="doc-file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className="sr-only"
                onChange={onFile}
              />
            </label>
            {errors.file ? <p className="mt-1 text-xs text-destructive">{errors.file}</p> : null}
          </div>

          <div>
            <Label htmlFor="doc-expiry">Expiry or issue date</Label>
            <Input
              id="doc-expiry"
              type="date"
              className="mt-1.5"
              value={expiry === "none" ? "" : expiry}
              onChange={(e) => setExpiry(e.target.value)}
              aria-invalid={Boolean(errors.expiry)}
            />
            <button
              type="button"
              onClick={() => setExpiry("none")}
              className={cn(
                "mt-2 text-[11px] font-bold hover:underline",
                expiry === "none" ? "text-success" : "text-primary",
              )}
            >
              This document has no expiry date
            </button>
            {errors.expiry ? (
              <p className="mt-1 text-xs text-destructive">{errors.expiry}</p>
            ) : null}
          </div>

          <label className="flex items-start gap-2.5 rounded-xl border border-border bg-secondary/50 p-3 text-xs leading-relaxed">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
              aria-invalid={Boolean(errors.confirm)}
            />
            <span>
              This document is genuine, belongs to the named passenger and I consent to Hague Travel
              processing it for this application.
            </span>
          </label>
          {errors.confirm ? <p className="text-xs text-destructive">{errors.confirm}</p> : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>
            <UploadCloud className="h-4 w-4" /> Encrypt & upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
