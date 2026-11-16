import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Award,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  CirclePlay,
  Download,
  FileText,
  GraduationCap,
  LockKeyhole,
  PlayCircle,
  Sparkles,
  Video,
} from "lucide-react";
import {
  EmptyState,
  KpiCard,
  PageHeading,
  Panel,
  StatusBadge,
  useDemoLoading,
} from "@/components/dashboard/UI";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ENROLLED_COURSES, type AcademyModule, type EnrolledCourse } from "@/data/portal";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/portal/academy")({
  head: pageMeta(
    "Academy Learning",
    "Your enrolled Hague Travel Academy courses, video modules, resource downloads and certificate status.",
    { robots: "noindex" },
  ),
  component: PortalAcademy,
});

function PortalAcademy() {
  const loading = useDemoLoading();
  const [courseId, setCourseId] = useState(ENROLLED_COURSES[0]!.id);
  const [activeModule, setActiveModule] = useState<{
    course: EnrolledCourse;
    module: AcademyModule;
  } | null>(null);

  const course = useMemo(
    () => ENROLLED_COURSES.find((item) => item.id === courseId) ?? ENROLLED_COURSES[0]!,
    [courseId],
  );
  const completed = course.modules.filter((m) => m.state === "Completed").length;
  const totalHours = ENROLLED_COURSES.reduce(
    (sum, item) => sum + item.modules.reduce((s, m) => s + Number.parseInt(m.duration, 10), 0),
    0,
  );

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Academy learning"
        title="Your classroom, modules and certificate track"
        sub="Live classes, recordings and downloadable worksheets for every course you are enrolled in. Progress is updated after each assessed module."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[11px] font-bold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Cohort 01 · Feb 2027
          </span>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Courses enrolled"
          value={ENROLLED_COURSES.length}
          hint="Masterclass + GDS add-on"
          icon={GraduationCap}
        />
        <KpiCard
          label="Overall progress"
          value={`${course.progress}%`}
          hint={`${completed} of ${course.modules.length} modules complete`}
          icon={BookOpen}
          tone="gold"
        />
        <KpiCard
          label="Attendance"
          value={course.attendance}
          hint="Live classes this cohort"
          icon={CalendarClock}
        />
        <KpiCard
          label="Certificate"
          value="In progress"
          hint="Issued after the final assessment"
          icon={Award}
          tone="warning"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {ENROLLED_COURSES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCourseId(item.id)}
            className={cn(
              "rounded-2xl border px-4 py-3 text-left transition",
              item.id === course.id
                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                : "border-border bg-card hover:border-gold/60",
            )}
          >
            <span className="block text-sm font-bold">{item.title}</span>
            <span
              className={cn(
                "mt-0.5 block text-[10px]",
                item.id === course.id ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {item.cohort} · {item.progress}%
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-3xl border border-border bg-card p-6">
          <span className="block h-3 w-1/3 animate-pulse rounded-full bg-secondary" />
          <span className="mt-4 block h-40 animate-pulse rounded-2xl bg-secondary" />
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
          <Panel
            title={course.title}
            sub={course.nextClass}
            action={<StatusBadge>Active</StatusBadge>}
            bodyClassName="p-0"
          >
            <div className="border-b border-border bg-secondary/40 px-5 py-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Course progress</span>
                <span className="text-primary">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="mt-2 h-2.5" />
              <p className="mt-2 text-[11px] text-muted-foreground">
                Instructor {course.instructor} · {totalHours} minutes of recorded material
              </p>
            </div>
            <ul className="divide-y divide-border">
              {course.modules.map((module) => (
                <li
                  key={module.number}
                  className="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:px-5"
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                      module.state === "Completed"
                        ? "bg-success/10 text-success"
                        : module.state === "In progress"
                          ? "bg-primary/10 text-primary"
                          : module.state === "Unlocked"
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {module.state === "Completed" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : module.state === "Locked" ? (
                      <LockKeyhole className="h-4 w-4" />
                    ) : (
                      <PlayCircle className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-snug">
                      Module {module.number} · {module.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {module.duration} video · {module.state}
                      {module.score ? ` · Score ${module.score}` : ""}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={module.state === "In progress" ? "default" : "outline"}
                    disabled={module.state === "Locked"}
                    onClick={() => {
                      if (module.state === "Locked") {
                        toast.info("Complete the previous module to unlock this lesson.");
                        return;
                      }
                      setActiveModule({ course, module });
                    }}
                  >
                    {module.state === "Locked"
                      ? "Locked"
                      : module.state === "Completed"
                        ? "Rewatch"
                        : "Open"}
                  </Button>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="space-y-5">
            <Panel title="Certificate status" sub="Hague Travel Academy certificate track">
              <div className="flex items-start gap-3 rounded-2xl bg-ink p-4 text-ink-foreground">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-gradient text-gold-foreground">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">{course.certificate}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink-foreground/65">
                    Finish all assessed modules, submit the final case study and clear any
                    outstanding tuition before the certificate is released.
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-xs">
                {[
                  { label: "All 8 lessons completed", done: completed === 8 },
                  { label: "Attendance at 75% of live classes", done: false },
                  { label: "Final case study submitted", done: false },
                  { label: "Tuition fully settled", done: false },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full",
                        item.done
                          ? "bg-success/15 text-success"
                          : "bg-secondary text-muted-foreground",
                      )}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    <span className={item.done ? "font-semibold" : "text-muted-foreground"}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
                Certificates are issued by Hague Travel Academy and are not IATA or government
                accreditation.
              </p>
            </Panel>

            <Panel
              title="Resource downloads"
              sub="Yours to keep for the cohort."
              bodyClassName="p-0"
            >
              {course.resources.length === 0 ? (
                <div className="p-4">
                  <EmptyState
                    icon={FileText}
                    title="No resources yet"
                    body="Your instructor uploads worksheets after each live class."
                  />
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {course.resources.map((resource) => (
                    <li key={resource.name}>
                      <a
                        href={resource.href}
                        download
                        className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-secondary/50"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                          <FileText className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold leading-snug">
                            {resource.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {resource.kind} · {resource.size}
                          </span>
                        </span>
                        <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </div>
      )}

      <Dialog
        open={Boolean(activeModule)}
        onOpenChange={(open) => (!open ? setActiveModule(null) : undefined)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Module {activeModule?.module.number} · {activeModule?.module.title}
            </DialogTitle>
            <DialogDescription>
              {activeModule?.course.title} · {activeModule?.module.duration} recorded lesson
            </DialogDescription>
          </DialogHeader>
          <div className="grid aspect-video place-items-center rounded-2xl bg-ink text-ink-foreground">
            <div className="text-center">
              <CirclePlay className="mx-auto h-14 w-14 text-gold" />
              <p className="mt-3 font-display text-xl">Recorded lesson preview</p>
              <p className="mt-1 text-xs text-ink-foreground/60">
                Video hosting is connected in the live classroom. This preview shows the lesson
                shell.
              </p>
            </div>
          </div>
          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
            <p className="rounded-xl bg-secondary/60 p-3">
              <span className="block font-bold text-foreground">Lesson outcome</span>
              Build a compliant itinerary and price it with the correct fare and tax basis.
            </p>
            <p className="rounded-xl bg-secondary/60 p-3">
              <span className="block font-bold text-foreground">Assessment</span>
              Short quiz after the video, with one applied case study per module.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                toast.success("Lesson marked as opened", {
                  description: "Progress only changes after the module quiz is submitted.",
                });
                setActiveModule(null);
              }}
            >
              <Video className="h-4 w-4" /> Continue lesson
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
