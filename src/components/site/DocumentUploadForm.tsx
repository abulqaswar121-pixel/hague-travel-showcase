import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2, FileCheck2, LockKeyhole, ShieldCheck, UploadCloud, X } from "lucide-react";
import { makeReference } from "@/lib/format";
import { COMPLIANCE_NOTES } from "@/data/site";
import { cn } from "@/lib/utils";

const TYPES = [
  "International passport data page",
  "Visa application pack",
  "Admissions / CAS documents",
  "Financial evidence",
  "Health / TB certificate",
  "Other supporting document",
];

const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];
const MAX_BYTES = 5 * 1024 * 1024;

interface Values {
  name: string;
  email: string;
  type: string;
  file: File | null;
  consent: boolean;
}

export function DocumentUploadForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    type: TYPES[0]!,
    file: null,
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [done, setDone] = useState<string | null>(null);

  const setFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setValues((v) => ({ ...v, file: null }));
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      setErrors((e) => ({ ...e, file: "Use a PDF, JPG or PNG file." }));
      setValues((v) => ({ ...v, file: null }));
      return;
    }
    if (file.size > MAX_BYTES) {
      setErrors((e) => ({ ...e, file: "Keep the file under 5 MB." }));
      setValues((v) => ({ ...v, file: null }));
      return;
    }
    setErrors(({ file: _file, ...rest }) => rest);
    setValues((v) => ({ ...v, file }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 3) next.name = "Enter the applicant's full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.type) next.type = "Choose the document type.";
    if (!values.file) next.file = "Choose a PDF, JPG or PNG file.";
    if (!values.consent) next.consent = "Confirm you are allowed to share this document.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const reference = makeReference("HT-DOC", `${values.email}-${values.file?.name}`);
    setDone(reference);
    toast.success("Document uploaded for review", {
      description: `${reference} · your consultant will confirm receipt during desk hours.`,
    });
  };

  if (done) {
    return (
      <div
        className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
        role="status"
      >
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="mt-4 font-display text-2xl">Upload received</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your reference is <strong className="text-foreground">{done}</strong>. The document is
          queued for an encrypted handoff to your consultant. In this preview no file has left your
          browser.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setDone(null);
              setValues({ name: "", email: "", type: TYPES[0]!, file: null, consent: false });
            }}
            className="rounded-full border border-input px-5 py-2.5 text-sm font-bold transition hover:bg-accent"
          >
            Upload another document
          </button>
          <a
            href="/portal/documents"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Open the customer vault
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-2xl">Upload your document pack</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            One file at a time. Your consultant reviews it against the country checklist before
            anything is submitted.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
          <ShieldCheck className="h-3.5 w-3.5" /> Encrypted
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="upload-name"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Applicant full name
          </label>
          <input
            id="upload-name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="field-base mt-1.5"
            placeholder="As it appears on the passport"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name}</p> : null}
        </div>
        <div>
          <label
            htmlFor="upload-email"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Email
          </label>
          <input
            id="upload-email"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="field-base mt-1.5"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="upload-type"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Document type
          </label>
          <select
            id="upload-type"
            value={values.type}
            onChange={(e) => setValues((v) => ({ ...v, type: e.target.value }))}
            className="field-base mt-1.5"
          >
            {TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="upload-file"
            className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Document file
          </label>
          {values.file ? (
            <div className="mt-1.5 flex items-center gap-3 rounded-2xl border border-success/40 bg-success/5 p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-success/15 text-success">
                <FileCheck2 className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{values.file.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {(values.file.size / 1024).toFixed(0)} KB · ready to upload
                </p>
              </div>
              <button
                type="button"
                aria-label="Remove selected file"
                onClick={() => setValues((v) => ({ ...v, file: null }))}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="upload-file"
              className={cn(
                "mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-8 text-center transition hover:bg-secondary/40",
                errors.file
                  ? "border-destructive bg-destructive/5"
                  : "border-input bg-secondary/20",
              )}
            >
              <UploadCloud className="h-7 w-7 text-primary" />
              <span className="mt-2 text-sm font-bold">Choose a PDF, JPG or PNG</span>
              <span className="mt-1 text-[11px] text-muted-foreground">Maximum 5 MB</span>
              <input
                id="upload-file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className="sr-only"
                onChange={setFile}
              />
            </label>
          )}
          {errors.file ? <p className="mt-1 text-xs text-destructive">{errors.file}</p> : null}
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 rounded-xl border border-border bg-secondary/40 p-3 text-xs leading-relaxed">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
          className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          The document is genuine, belongs to the named applicant, and I consent to Hague Travel
          reviewing it for this application.
        </span>
      </label>
      {errors.consent ? <p className="mt-1 text-xs text-destructive">{errors.consent}</p> : null}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[10px] leading-relaxed text-muted-foreground">
          <LockKeyhole className="mr-1 inline h-3 w-3" />
          {COMPLIANCE_NOTES.documents}
        </p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105"
        >
          <UploadCloud className="h-4 w-4" /> Upload for review
        </button>
      </div>
    </form>
  );
}
