import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  Mail,
  Search,
  Users,
  Wallet,
} from "lucide-react";
import {
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
import {
  ACADEMY_APPLICATIONS,
  ADMIN_BATCHES,
  ADMIN_COHORTS,
  type AcademyApplication,
} from "@/data/admin";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/admin/academy")({
  head: pageMeta(
    "Academy Cohorts",
    "Review student applications, assign class batches, confirm tuition payments and track cohort capacity.",
    { robots: "noindex" },
  ),
  component: AdminAcademy,
});

function AdminAcademy() {
  const loading = useDemoLoading();
  const { money } = useCurrency();
  const [applications, setApplications] = useState<AcademyApplication[]>(ACADEMY_APPLICATIONS);
  const [filter, setFilter] = useState("all");
  const [cohort, setCohort] = useState("all");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = applications.find((application) => application.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return applications.filter((application) => {
      const matchesPayment = filter === "all" || application.payment === filter;
      const matchesCohort = cohort === "all" || application.cohort === cohort;
      const matchesTerm =
        term === "" ||
        `${application.name} ${application.email} ${application.id} ${application.course}`
          .toLowerCase()
          .includes(term);
      return matchesPayment && matchesCohort && matchesTerm;
    });
  }, [applications, filter, cohort, q]);

  const paid = applications.filter((application) => application.payment === "Paid").length;
  const unpaid = applications.filter((application) => application.payment === "Unpaid").length;
  const unassigned = applications.filter(
    (application) => !application.batch && application.payment !== "Refunded",
  ).length;
  const tuition = applications.reduce((sum, application) => sum + application.paid, 0);

  const confirmPayment = (id: string) => {
    setApplications((current) =>
      current.map((application) =>
        application.id === id
          ? { ...application, payment: "Paid", paid: application.amount }
          : application,
      ),
    );
    toast.success(`${id} tuition confirmed`, {
      description: "Student can be batched and added to the cohort group.",
    });
  };

  const assignBatch = (id: string, batch: string) => {
    setApplications((current) =>
      current.map((application) =>
        application.id === id ? { ...application, batch } : application,
      ),
    );
    toast.success(`Batch assigned`, { description: batch });
  };

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Academy cohorts"
        title="Applications, batches and tuition"
        sub="Move an applicant from paid to batched. No student joins a class until the payment is confirmed and the identity document is verified."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-[11px] font-bold text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" /> 4 cohorts per year
          </span>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Applications"
          value={applications.length}
          hint="All active cohorts"
          icon={Users}
        />
        <KpiCard
          label="Paid in full"
          value={paid}
          hint="Ready for batch assignment"
          icon={CheckCircle2}
          tone="success"
        />
        <KpiCard
          label="Unpaid"
          value={unpaid}
          hint="Follow up before the deadline"
          icon={Wallet}
          tone="warning"
        />
        <KpiCard
          label="Unassigned"
          value={unassigned}
          hint={`${money(tuition)} tuition collected`}
          icon={Layers}
          tone="gold"
        />
      </div>

      <Panel
        title="Student applications"
        sub={`${filtered.length} of ${applications.length} applicants`}
        action={
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email or ID"
              aria-label="Search academy applications"
              className="pl-9"
            />
          </div>
        }
        bodyClassName="p-0"
      >
        <div className="flex flex-col gap-2 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <Segmented
            options={[
              { id: "all", label: "All", count: applications.length },
              {
                id: "Paid",
                label: "Paid",
                count: applications.filter((a) => a.payment === "Paid").length,
              },
              {
                id: "Part-paid",
                label: "Part-paid",
                count: applications.filter((a) => a.payment === "Part-paid").length,
              },
              { id: "Unpaid", label: "Unpaid", count: unpaid },
              {
                id: "Refunded",
                label: "Refunded",
                count: applications.filter((a) => a.payment === "Refunded").length,
              },
            ]}
            value={filter}
            onChange={setFilter}
            label="Filter by payment"
          />
          <select
            className="field-base h-9 w-full py-1.5 text-xs lg:w-64"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            aria-label="Filter by cohort"
          >
            <option value="all">All cohorts</option>
            {ADMIN_COHORTS.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="p-5">
            <TableSkeleton rows={7} columns={6} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={BookOpenCheck}
              title="No applications match"
              body="Change the payment or cohort filter, or search for another student."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilter("all");
                    setCohort("all");
                    setQ("");
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
                  <TableHead>Applicant</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="hidden lg:table-cell">Cohort</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="hidden md:table-cell">Batch</TableHead>
                  <TableHead className="hidden sm:table-cell">Docs</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((application) => (
                  <TableRow
                    key={application.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(application.id)}
                  >
                    <TableCell>
                      <p className="text-sm font-bold">{application.name}</p>
                      <p className="text-[10px] text-muted-foreground">{application.email}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {application.id}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs">{application.course}</TableCell>
                    <TableCell className="hidden text-[11px] text-muted-foreground lg:table-cell">
                      {application.cohort}
                    </TableCell>
                    <TableCell>
                      <StatusBadge>{application.payment}</StatusBadge>
                    </TableCell>
                    <TableCell className="hidden text-[11px] md:table-cell">
                      {application.batch ?? (
                        <span className="font-semibold text-destructive">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {application.documentsVerified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success">
                          <BadgeCheck className="h-3.5 w-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-destructive">Missing</span>
                      )}
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ADMIN_COHORTS.map((item, index) => {
          const total = applications.filter((application) => application.cohort === item).length;
          const cohortPaid = applications.filter(
            (application) => application.cohort === item && application.payment === "Paid",
          ).length;
          return (
            <div key={item} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {item}
              </p>
              <p className="mt-2 font-display text-2xl">{total} applicants</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gold-gradient"
                  style={{ width: `${total ? (cohortPaid / total) * 100 : 0}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {cohortPaid} paid · {index === 0 ? "starts Feb 2027" : "open for enrolment"}
              </p>
            </div>
          );
        })}
      </div>

      {selected ? (
        <ApplicationDialog
          key={`${selected.id}-${selected.payment}-${selected.batch ?? "none"}`}
          application={selected}
          onClose={() => setSelectedId(null)}
          onConfirmPayment={confirmPayment}
          onAssignBatch={assignBatch}
        />
      ) : null}
    </div>
  );
}

function ApplicationDialog({
  application,
  onClose,
  onConfirmPayment,
  onAssignBatch,
}: {
  application: AcademyApplication;
  onClose: () => void;
  onConfirmPayment: (id: string) => void;
  onAssignBatch: (id: string, batch: string) => void;
}) {
  const { money } = useCurrency();
  const [batch, setBatch] = useState(application.batch ?? "");

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{application.name}</DialogTitle>
          <DialogDescription>
            {application.id} · applied {application.applied}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          <StatusBadge>{application.payment}</StatusBadge>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {application.course}
          </span>
          {application.documentsVerified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold text-success">
              <BadgeCheck className="h-3.5 w-3.5" /> ID verified
            </span>
          ) : (
            <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-[10px] font-bold text-destructive">
              ID missing
            </span>
          )}
        </div>

        <dl>
          <DetailRow label="Email" value={application.email} />
          <DetailRow label="Phone" value={application.phone} />
          <DetailRow label="Cohort" value={application.cohort} />
          <DetailRow label="Tuition" value={money(application.amount)} />
          <DetailRow label="Paid" value={money(application.paid)} />
          <DetailRow
            label="Outstanding"
            value={money(Math.max(0, application.amount - application.paid))}
            strong
          />
          <DetailRow label="Batch" value={application.batch ?? "Not assigned"} />
          <DetailRow label="Note" value={<span className="text-xs">{application.note}</span>} />
        </dl>

        <div className="rounded-2xl border border-border p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Batch assignment
          </p>
          <div className="mt-2 flex gap-2">
            <select
              className="field-base h-9 py-1.5 text-xs"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              aria-label="Choose a class batch"
            >
              <option value="">Choose a batch…</option>
              {ADMIN_BATCHES.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              disabled={!batch || batch === application.batch}
              onClick={() => {
                onAssignBatch(application.id, batch);
                onClose();
              }}
            >
              <Layers className="h-3.5 w-3.5" /> Assign
            </Button>
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
            Batch assignment sends the class calendar and WhatsApp group invite in the live system.
          </p>
        </div>

        <div className="rounded-2xl border border-gold/40 bg-accent/70 p-3 text-[11px] leading-relaxed text-accent-foreground">
          <Mail className="mr-1 inline h-3.5 w-3.5" />
          Payment confirmation is manual in this demo. In production it must match a Paystack
          transaction reference or a reconciled bank transfer before the seat is locked.
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={application.payment === "Paid" || application.payment === "Refunded"}
            onClick={() => {
              onConfirmPayment(application.id);
              onClose();
            }}
          >
            <CheckCircle2 className="h-4 w-4" />
            {application.payment === "Paid" ? "Payment confirmed" : "Confirm payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
