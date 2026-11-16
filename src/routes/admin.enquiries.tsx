import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Mail,
  MessageCircle,
  Phone,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";
import {
  DemoTag,
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
import { ADMIN_ENQUIRIES, type AdminEnquiry, type AdminEnquiryStatus } from "@/data/admin";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/admin/enquiries")({
  head: pageMeta(
    "Enquiry Desk",
    "A single inbox for flight, study, relocation and visa requests, with a clear New to Closed workflow.",
    { robots: "noindex" },
  ),
  component: AdminEnquiries,
});

const WORKFLOW: AdminEnquiryStatus[] = ["New", "In Review", "Contacted", "Converted", "Closed"];

function AdminEnquiries() {
  const loading = useDemoLoading();
  const { money } = useCurrency();
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>(ADMIN_ENQUIRIES);
  const [status, setStatus] = useState("All");
  const [service, setService] = useState("All");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = enquiries.find((enquiry) => enquiry.id === selectedId) ?? null;
  const services = useMemo(
    () => ["All", ...Array.from(new Set(enquiries.map((enquiry) => enquiry.service)))],
    [enquiries],
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return enquiries.filter((enquiry) => {
      const matchesStatus = status === "All" || enquiry.status === status;
      const matchesService = service === "All" || enquiry.service === service;
      const matchesTerm =
        term === "" ||
        `${enquiry.id} ${enquiry.client} ${enquiry.subject} ${enquiry.email} ${enquiry.detail}`
          .toLowerCase()
          .includes(term);
      return matchesStatus && matchesService && matchesTerm;
    });
  }, [enquiries, status, service, q]);

  const updateStatus = (id: string, next: AdminEnquiryStatus) => {
    setEnquiries((current) =>
      current.map((enquiry) =>
        enquiry.id === id
          ? {
              ...enquiry,
              status: next,
              consultant:
                next !== "New" && enquiry.consultant === "Unassigned"
                  ? "Seyi B."
                  : enquiry.consultant,
            }
          : enquiry,
      ),
    );
    toast.success(`${id} moved to ${next}`, {
      description: "Status update is local to this demo session.",
    });
  };

  const newCount = enquiries.filter((enquiry) => enquiry.status === "New").length;
  const inReview = enquiries.filter((enquiry) => enquiry.status === "In Review").length;
  const converted = enquiries.filter((enquiry) => enquiry.status === "Converted").length;
  const pipeline = enquiries
    .filter((enquiry) => enquiry.status !== "Closed" && enquiry.status !== "Converted")
    .reduce((sum, enquiry) => sum + (enquiry.value ?? 0), 0);

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Enquiry desk"
        title="One inbox. Every request. No lost leads."
        sub="Flight quotes, study assessments, visa reviews, relocation consults and corporate RFPs all land here. Work the status forward; nothing closes silently."
        actions={<DemoTag>Shared demo inbox</DemoTag>}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total enquiries"
          value={enquiries.length}
          hint="Across every service desk"
          icon={ClipboardList}
        />
        <KpiCard
          label="New & unassigned"
          value={newCount}
          hint="Respond within 2 desk hours"
          icon={Mail}
          tone="warning"
        />
        <KpiCard
          label="In review"
          value={inReview}
          hint="Documents or supplier checks"
          icon={Search}
          tone="gold"
        />
        <KpiCard
          label="Open pipeline"
          value={money(pipeline)}
          hint={`${converted} converted this period`}
          icon={CheckCircle2}
          tone="success"
        />
      </div>

      <Panel
        title="Shared inbox"
        sub={`${filtered.length} of ${enquiries.length} enquiries`}
        action={
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search client, reference or subject"
              aria-label="Search enquiries"
              className="pl-9"
            />
          </div>
        }
        bodyClassName="p-0"
      >
        <div className="flex flex-col gap-2 border-b border-border p-4 xl:flex-row xl:items-center xl:justify-between">
          <Segmented
            options={[
              { id: "All", label: "All", count: enquiries.length },
              ...WORKFLOW.map((s) => ({
                id: s,
                label: s,
                count: enquiries.filter((enquiry) => enquiry.status === s).length,
              })),
            ]}
            value={status}
            onChange={setStatus}
            label="Filter by status"
          />
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {services.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold transition",
                  service === s
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-input text-muted-foreground hover:border-gold/60",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={8} columns={6} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={ClipboardList}
              title="No enquiries match"
              body="Clear the filters or search for another client. New web enquiries appear here automatically."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus("All");
                    setService("All");
                    setQ("");
                  }}
                >
                  Reset inbox filters
                </Button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Client & request</TableHead>
                  <TableHead className="hidden md:table-cell">Service</TableHead>
                  <TableHead className="hidden lg:table-cell">Consultant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Received</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((enquiry) => (
                  <TableRow
                    key={enquiry.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(enquiry.id)}
                  >
                    <TableCell className="font-mono text-xs">{enquiry.id}</TableCell>
                    <TableCell>
                      <p className="text-sm font-bold leading-snug">{enquiry.subject}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {enquiry.client} · {enquiry.channel}
                      </p>
                    </TableCell>
                    <TableCell className="hidden text-xs font-semibold md:table-cell">
                      {enquiry.service}
                    </TableCell>
                    <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                      {enquiry.consultant}
                    </TableCell>
                    <TableCell>
                      <StatusBadge>{enquiry.status}</StatusBadge>
                    </TableCell>
                    <TableCell className="hidden text-[11px] text-muted-foreground sm:table-cell">
                      {enquiry.received}
                    </TableCell>
                    <TableCell className="text-right text-xs font-semibold tabular-nums">
                      {enquiry.value ? money(enquiry.value) : "—"}
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

      {selected ? (
        <EnquiryDialog
          enquiry={selected}
          onClose={() => setSelectedId(null)}
          onStatus={updateStatus}
        />
      ) : null}
    </div>
  );
}

function EnquiryDialog({
  enquiry,
  onClose,
  onStatus,
}: {
  enquiry: AdminEnquiry;
  onClose: () => void;
  onStatus: (id: string, next: AdminEnquiryStatus) => void;
}) {
  const { money } = useCurrency();
  const index = WORKFLOW.indexOf(enquiry.status);
  const next = index >= 0 && index < WORKFLOW.length - 1 ? WORKFLOW[index + 1] : null;

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{enquiry.subject}</DialogTitle>
          <DialogDescription>
            {enquiry.id} · {enquiry.service} · received {enquiry.received}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          <StatusBadge>{enquiry.status}</StatusBadge>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {enquiry.priority} priority
          </span>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {enquiry.channel}
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Client
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold">{enquiry.client}</p>
              <p className="text-[11px] text-muted-foreground">{enquiry.email}</p>
              <p className="text-[11px] text-muted-foreground">{enquiry.phone}</p>
            </div>
            <div className="flex gap-1.5">
              <Button asChild size="sm" variant="outline">
                <a href={`mailto:${enquiry.email}`} aria-label={`Email ${enquiry.client}`}>
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a
                  href={`tel:${enquiry.phone.replace(/\s/g, "")}`}
                  aria-label={`Call ${enquiry.client}`}
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a
                  href={`https://wa.me/${enquiry.phone.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp ${enquiry.client}`}
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Request detail
          </p>
          <p className="mt-2 text-sm leading-relaxed">{enquiry.detail}</p>
        </div>

        <dl>
          <DetailRow label="Service desk" value={enquiry.service} />
          <DetailRow label="Consultant" value={enquiry.consultant} />
          <DetailRow
            label="Estimated value"
            value={enquiry.value ? money(enquiry.value) : "Not quoted"}
          />
          <DetailRow label="Current status" value={<StatusBadge>{enquiry.status}</StatusBadge>} />
        </dl>

        <div className="rounded-2xl border border-border p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Workflow
          </p>
          <ol className="mt-3 grid grid-cols-5 gap-1">
            {WORKFLOW.map((step, i) => {
              const done = i < index;
              const active = i === index;
              return (
                <li key={step} className="min-w-0">
                  <div
                    className={cn(
                      "h-1.5 rounded-full",
                      done ? "bg-success" : active ? "bg-primary" : "bg-secondary",
                    )}
                  />
                  <p
                    className={cn(
                      "mt-1.5 text-[9px] font-bold uppercase tracking-wide",
                      active ? "text-primary" : done ? "text-success" : "text-muted-foreground",
                    )}
                  >
                    {step}
                  </p>
                </li>
              );
            })}
          </ol>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {WORKFLOW.filter((step) => step !== enquiry.status).map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => onStatus(enquiry.id, step)}
                className={cn(
                  "rounded-full border px-2.5 py-1.5 text-[10px] font-bold transition",
                  step === next
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-input text-muted-foreground hover:border-gold/60 hover:text-foreground",
                )}
              >
                {step === "Closed" ? <XCircle className="mr-1 inline h-3 w-3" /> : null}
                {step === next ? `Advance to ${step}` : step}
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {next ? (
            <Button
              onClick={() => {
                onStatus(enquiry.id, next);
                onClose();
              }}
            >
              <UserRound className="h-4 w-4" /> Move to {next} <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button disabled>
              <CheckCircle2 className="h-4 w-4" /> Workflow complete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
