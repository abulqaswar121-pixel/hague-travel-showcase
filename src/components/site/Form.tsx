import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, ChevronLeft, ChevronRight, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { makeReference } from "@/lib/format";
import { waLink } from "@/data/site";

/* ------------------------------------------------------------------ schema */

export type FieldType =
  "text" | "email" | "tel" | "date" | "month" | "select" | "textarea" | "number" | "checkbox";

export interface FieldDef {
  name: string;
  label: string;
  type?: FieldType;
  options?: readonly (string | { value: string; label: string })[] | undefined;
  required?: boolean;
  full?: boolean;
  placeholder?: string | undefined;
  help?: string | undefined;
  defaultValue?: string | undefined;
  rows?: number | undefined;
  min?: number | undefined;
  max?: number | undefined;
  /** Free-form custom validation layered on top of the inferred rule. */
  rule?: z.ZodTypeAny | undefined;
}

export type FormValues = Record<string, string | number | boolean>;

function normaliseOptions(options: FieldDef["options"]) {
  return (options ?? []).map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

/** Builds a zod object from field descriptors so one engine validates every form on the site. */
export function buildSchema(fields: FieldDef[]): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};
  for (const f of fields) {
    const required = f.required !== false;
    let schema: z.ZodTypeAny;
    switch (f.type) {
      case "number":
        schema = z.coerce
          .number({ invalid_type_error: `${f.label} must be a number` })
          .min(f.min ?? -Infinity, `${f.label} is too low`)
          .max(f.max ?? Infinity, `${f.label} is too high`);
        break;
      case "checkbox":
        schema = z.literal(true, {
          errorMap: () => ({ message: `Please confirm ${f.label.toLowerCase()}` }),
        });
        break;
      case "email":
        schema = z.string().min(1, `${f.label} is required`).email("Enter a valid email address");
        break;
      case "tel":
        schema = z
          .string()
          .min(7, `Enter a reachable phone number (${f.label.toLowerCase()})`)
          .regex(/^[0-9+()\-\s.]+$/, "Use digits, spaces and + only");
        break;
      case "textarea":
        schema = required
          ? z.string().min(10, "Please add a little more detail (10+ characters)")
          : z.string().optional();
        break;
      default:
        schema = required ? z.string().min(1, `${f.label} is required`) : z.string().optional();
    }
    if (f.rule) schema = f.rule;
    shape[f.name] = schema;
  }
  return z.object(shape);
}

/* ------------------------------------------------------------- the form body */

const control =
  "w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive disabled:opacity-60";

function FieldRow({
  field,
  error,
  register,
  value,
  onChange,
  id,
}: {
  field: FieldDef;
  error?: string | undefined;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  value: FormValues[string] | undefined;
  onChange: (v: string | boolean) => void;
  id: string;
}) {
  const options = normaliseOptions(field.options);
  const isCheckbox = field.type === "checkbox";

  if (isCheckbox) {
    return (
      <div className={cn("sm:col-span-2", field.full === undefined && "")}>
        <label
          htmlFor={id}
          className="flex cursor-pointer items-start gap-3 rounded-xl border border-input bg-card p-3.5 text-left"
        >
          <input
            id={id}
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
          />
          <span className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">{field.label}</span>
            {field.help ? <span className="mt-1 block">{field.help}</span> : null}
          </span>
        </label>
        {error ? <p className="mt-1 text-xs font-medium text-destructive">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className={cn(field.full ? "sm:col-span-2" : "")}>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
      >
        {field.label}
        {field.required === false ? (
          <span className="ml-1 font-medium normal-case tracking-normal opacity-70">
            (optional)
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">
        {field.type === "select" ? (
          <select
            id={id}
            {...register(field.name)}
            value={typeof value === "string" ? value : ""}
            aria-invalid={Boolean(error)}
            className={cn(control, "appearance-none bg-[length:0] pr-9")}
          >
            <option value="">Select…</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea
            id={id}
            rows={field.rows ?? 4}
            placeholder={field.placeholder}
            {...register(field.name)}
            aria-invalid={Boolean(error)}
            className={cn(control, "resize-y")}
          />
        ) : (
          <input
            id={id}
            type={
              field.type === "number"
                ? "number"
                : field.type === "month"
                  ? "month"
                  : (field.type ?? "text")
            }
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            inputMode={field.type === "number" ? "numeric" : undefined}
            {...register(field.name)}
            aria-invalid={Boolean(error)}
            className={control}
          />
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>
      ) : field.help ? (
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{field.help}</p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------ success state */

export function FormSuccess({
  title = "Request received",
  reference,
  lines = [],
  onReset,
  resetLabel = "Send another request",
}: {
  title?: string | undefined;
  reference: string;
  lines?: string[] | undefined;
  onReset?: (() => void) | undefined;
  resetLabel?: string;
}) {
  return (
    <div
      className="rounded-3xl border border-border bg-card p-7 text-center shadow-soft sm:p-10"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
      <h3 className="mt-4 text-2xl sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Your reference is <span className="font-bold text-foreground">{reference}</span>. A Hague
        Travel consultant picks this up during desk hours and will reply by email, phone or WhatsApp
        — whichever you prefer.
      </p>
      {lines.length ? (
        <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm">
          {lines.map((l) => (
            <li
              key={l}
              className="flex gap-2.5 rounded-xl bg-secondary/60 p-3 text-secondary-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {l}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-input px-5 py-2.5 text-sm font-semibold transition hover:bg-accent"
          >
            {resetLabel}
          </button>
        ) : null}
        <a
          href={waLink(
            "Hello Hague Travel, I just submitted a request on the site and would like to speed it up.",
          )}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-gold-foreground shadow-gold"
        >
          Ping us on WhatsApp
        </a>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Demo preview: this form validates locally and shows a confirmation. It does not transmit
        data or create a booking.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- main form */

export interface EnquiryFormProps {
  fields: FieldDef[];
  title?: string | undefined;
  description?: string | undefined;
  cta?: string;
  note?: string | undefined;
  refPrefix?: string;
  successTitle?: string | undefined;
  successLines?: string[] | undefined;
  /** Async boundary: swap for a real API/server function later. */
  onSubmit?: ((values: FormValues) => void | Promise<void>) | undefined;
  className?: string | undefined;
  compact?: boolean;
  banner?: React.ReactNode | undefined;
}

export function EnquiryForm({
  fields,
  title,
  description,
  cta = "Submit request",
  note,
  refPrefix = "HT",
  successTitle,
  successLines = [],
  onSubmit,
  className,
  compact,
  banner,
}: EnquiryFormProps) {
  const schema = useMemo(() => buildSchema(fields), [fields]);
  const defaultValues = useMemo<FormValues>(() => {
    const v: FormValues = {};
    for (const f of fields) {
      v[f.name] = f.defaultValue ?? (f.type === "checkbox" ? false : f.type === "select" ? "" : "");
    }
    return v;
  }, [fields]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const [done, setDone] = useState<string | null>(null);
  const values = watch();

  if (done) {
    return (
      <FormSuccess
        title={successTitle}
        reference={done}
        lines={successLines}
        onReset={() => {
          setDone(null);
          reset(defaultValues);
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const reference = makeReference(refPrefix, JSON.stringify(data));
        try {
          await onSubmit?.(data);
        } catch {
          toast.error("We could not save this right now", {
            description: "The demo has no backend — your input stayed valid and complete.",
          });
        }
        setDone(reference);
        toast.success("Request received — a consultant will reply within 2 hours on desk hours.");
      })}
      className={cn(
        "rounded-3xl border border-border bg-card shadow-soft",
        compact ? "p-5" : "p-6 sm:p-8",
        className,
      )}
      noValidate
    >
      {title ? (
        <h3 className={cn("font-display", compact ? "text-xl" : "text-2xl")}>{title}</h3>
      ) : null}
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {banner ? <div className="mt-4">{banner}</div> : null}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <FieldRow
            key={f.name}
            id={`${refPrefix}-${f.name}`}
            field={f}
            error={errors[f.name]?.message}
            register={register}
            value={values[f.name]}
            onChange={(v) => setValue(f.name, v as FormValues[string], { shouldValidate: true })}
          />
        ))}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105 disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {cta}
      </button>
      {note ? (
        <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-muted-foreground">
          <Lock className="mt-0.5 h-3 w-3 shrink-0" />
          {note}
        </p>
      ) : null}
    </form>
  );
}

/* ------------------------------------------------------- multi-step variant */

export interface Step {
  label: string;
  hint?: string | undefined;
  fields: FieldDef[];
}

export function MultiStepForm({
  steps,
  title,
  description,
  cta = "Submit",
  refPrefix = "HT",
  successTitle,
  successLines,
  onSubmit,
  note,
}: {
  steps: Step[];
  title: string;
  description?: string | undefined;
  cta?: string;
  refPrefix?: string;
  successTitle?: string | undefined;
  successLines?: string[] | undefined;
  onSubmit?: ((values: FormValues) => void) | undefined;
  note?: string | undefined;
}) {
  const fields = useMemo(() => steps.flatMap((s) => s.fields), [steps]);
  const schema = useMemo(() => buildSchema(fields), [fields]);
  const defaultValues = useMemo<FormValues>(() => {
    const v: FormValues = {};
    for (const f of fields) v[f.name] = f.defaultValue ?? (f.type === "checkbox" ? false : "");
    return v;
  }, [fields]);

  const [step, setStep] = useState(0);
  const [done, setDone] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues, mode: "onTouched" });

  const values = watch();

  useEffect(() => {
    if (typeof window !== "undefined")
      window.dispatchEvent(new CustomEvent("hague:step", { detail: step }));
  }, [step]);

  if (done) {
    return (
      <FormSuccess
        title={successTitle}
        reference={done}
        lines={successLines}
        onReset={() => {
          setDone(null);
          setStep(0);
          reset(defaultValues);
        }}
        resetLabel="Start again"
      />
    );
  }

  const current = steps[step] as Step;
  const isLast = step === steps.length - 1;

  const next = async () => {
    const ok = await trigger(
      current.fields.map((f) => f.name),
      { shouldFocus: true },
    );
    if (!ok) {
      toast.error("Please complete the highlighted fields before continuing.");
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <h3 className="text-2xl">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-5 flex items-center gap-1.5" role="tablist" aria-label="Form progress">
        {steps.map((s, i) => (
          <div key={s.label} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i <= step ? "bg-primary" : "bg-border",
              )}
            />
            <p
              className={cn(
                "mt-2 hidden text-[11px] font-bold uppercase tracking-wider sm:block",
                i === step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {i + 1}. {s.label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground sm:hidden">
          Step {step + 1} of {steps.length}: {current.label}.{" "}
        </span>
        {current.hint}
      </p>
      <form
        className="mt-5"
        noValidate
        onSubmit={handleSubmit((data) => {
          const reference = makeReference(refPrefix, JSON.stringify(data));
          onSubmit?.(data);
          setDone(reference);
          toast.success("Assessment submitted — a consultant will review and call you.");
        })}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {current.fields.map((f) => (
            <FieldRow
              key={f.name}
              id={`step-${step}-${f.name}`}
              field={f}
              error={errors[f.name]?.message}
              register={register}
              value={values[f.name]}
              onChange={(v) => setValue(f.name, v as FormValues[string], { shouldValidate: true })}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center justify-center gap-1 rounded-full border border-input px-5 py-3 text-sm font-semibold transition hover:bg-accent disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          {isLast ? (
            <button
              type="submit"
              className="rounded-full bg-gold-gradient px-7 py-3 text-sm font-bold text-gold-foreground shadow-gold transition hover:brightness-105"
            >
              {cta}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-1 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
      {note ? <p className="mt-4 text-center text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}

/** Shared contact field set used by every enquiry form on the site. */
export const contactFields: FieldDef[] = [
  { name: "name", label: "Full name", placeholder: "Chidinma Okeke" },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+234 803 000 0000" },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com", full: true },
];

export const preferredContactField: FieldDef = {
  name: "channel",
  label: "Best way to reach you",
  type: "select",
  options: ["WhatsApp", "Phone call", "Email", "SMS"],
};
