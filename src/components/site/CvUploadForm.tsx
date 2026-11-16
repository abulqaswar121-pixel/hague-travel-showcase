import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2, FileText, UploadCloud, X } from "lucide-react";
import { makeReference } from "@/lib/format";
import { COMPLIANCE_NOTES } from "@/data/site";

const ACCEPTED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_BYTES = 3 * 1024 * 1024;

export function CvUploadForm({ role }: { role?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  type CvErrors = { name?: string; email?: string; file?: string; consent?: string };
  const [errors, setErrors] = useState<CvErrors>({});
  const [done, setDone] = useState<string | null>(null);

  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    if (!next) {
      setFile(null);
      return;
    }
    if (!ACCEPTED.includes(next.type)) {
      setErrors((e) => ({ ...e, file: "Use a PDF or Word document." }));
      setFile(null);
      return;
    }
    if (next.size > MAX_BYTES) {
      setErrors((e) => ({ ...e, file: "Keep the CV under 3 MB." }));
      setFile(null);
      return;
    }
    setErrors(({ file: _file, ...rest }) => rest);
    setFile(next);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: CvErrors = {};
    if (name.trim().length < 3) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!file) next.file = "Attach a PDF or Word CV.";
    if (!consent) next.consent = "Confirm the CV is accurate and yours to share.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const reference = makeReference("HT-CV", `${email}-${file?.name ?? "cv"}`);
    setDone(reference);
    toast.success("CV submitted for review", {
      description: `${reference} · a moderator reviews it before any employer introduction.`,
    });
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-success/40 bg-success/8 p-5" role="status">
        <CheckCircle2 className="h-8 w-8 text-success" />
        <p className="mt-3 font-display text-xl">CV received for review</p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Reference <strong className="text-foreground">{done}</strong>. You get written feedback
          before your profile is shown to any employer. In this preview no file leaves your browser.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(null);
            setName("");
            setEmail("");
            setFile(null);
            setConsent(false);
          }}
          className="mt-3 text-xs font-bold text-primary underline"
        >
          Submit another CV
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-display text-xl">
            <FileText className="h-5 w-5 text-primary" /> Submit your CV
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {role ? `Applying for: ${role}. ` : ""}PDF or Word, 3 MB maximum. No fee, ever.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label
            htmlFor="cv-name"
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Full name
          </label>
          <input
            id="cv-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field-base mt-1"
            placeholder="As it appears on your CV"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-1 text-[11px] text-destructive">{errors.name}</p> : null}
        </div>
        <div>
          <label
            htmlFor="cv-email"
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Email
          </label>
          <input
            id="cv-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-base mt-1"
            placeholder="you@email.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className="mt-1 text-[11px] text-destructive">{errors.email}</p>
          ) : null}
        </div>

        {file ? (
          <div className="flex items-center gap-2.5 rounded-xl border border-success/40 bg-success/8 p-2.5">
            <FileText className="h-4 w-4 shrink-0 text-success" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{file.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
            <button
              type="button"
              aria-label="Remove CV"
              onClick={() => setFile(null)}
              className="grid h-7 w-7 place-items-center rounded-full hover:bg-secondary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="cv-file"
            className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-input bg-secondary/30 px-3 py-3 transition hover:bg-secondary/60"
          >
            <span className="flex items-center gap-2 text-xs font-semibold">
              <UploadCloud className="h-4 w-4 text-primary" /> Attach CV (PDF / DOCX)
            </span>
            <span className="text-[10px] text-muted-foreground">3 MB max</span>
            <input
              id="cv-file"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={pick}
            />
          </label>
        )}
        {errors.file ? <p className="text-[11px] text-destructive">{errors.file}</p> : null}

        <label className="flex items-start gap-2 text-[11px] leading-relaxed">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 accent-[var(--color-primary)]"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            The CV is accurate, mine to share, and I understand Hague Travel never charges
            applicants.
          </span>
        </label>
        {errors.consent ? <p className="text-[11px] text-destructive">{errors.consent}</p> : null}
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
      >
        Submit CV for review
      </button>
      <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
        {COMPLIANCE_NOTES.jobs}
      </p>
    </form>
  );
}
