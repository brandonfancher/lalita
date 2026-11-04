"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { submitContact } from "@/app/contact/actions";
import { Lotus } from "@/components/ornament";
import {
  CONTACT_LIMITS,
  CONTACT_REASONS,
  HONEYPOT_FIELD,
  isContactReason,
  type ContactField,
  type ContactReason,
  type ContactState,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const INITIAL_STATE: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-sm border border-line-strong bg-surface-1/70 px-3.5 py-2.5 font-sans text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-sindura/60 aria-invalid:border-sindura/70";

/** The form with its reason chosen from `?reason=`, so a "support" link can open it ready. */
export function PresetContactForm() {
  const reason = useSearchParams().get("reason") ?? "";
  return <ContactForm defaultReason={isContactReason(reason) ? reason : undefined} />;
}

export function ContactForm({ defaultReason }: { defaultReason?: ContactReason }) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL_STATE);
  const thanksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "sent") thanksRef.current?.focus();
    if (state.status === "error") {
      formRef.current
        ?.querySelector<HTMLElement>("fieldset[data-invalid] input, [aria-invalid=true]")
        ?.focus();
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div
        ref={thanksRef}
        tabIndex={-1}
        role="status"
        className="folio rounded-sm px-6 py-10 text-center outline-none sm:px-10"
      >
        <Lotus size={30} className="mx-auto text-gold" />
        <h2 className="display mt-4 text-[1.9rem] leading-tight text-ink">Thank you</h2>
        <p className="mx-auto mt-2 max-w-md text-[1.075rem] leading-relaxed text-ink-muted">
          Your message is on its way. If it calls for a reply, I&rsquo;ll write back to the address you gave.
        </p>
        <Link
          href="/shlokas"
          className="group mt-6 inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-sindura hover:text-sindura-soft"
        >
          Back to the shlokas
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : {};
  const errors: Partial<Record<ContactField, string>> = state.status === "error" ? state.fieldErrors : {};
  const formError = state.status === "error" ? state.formError : undefined;
  const reason = values.reason ?? defaultReason;
  const describe = (name: ContactField) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form ref={formRef} action={formAction} className="relative space-y-7">
      <fieldset aria-describedby={describe("reason")} data-invalid={errors.reason ? true : undefined}>
        <legend className="mb-2.5 font-sans text-[13px] font-medium text-ink-muted">
          What are you writing about?
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_REASONS.map((r, i) => (
            <label key={r.value} className="cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={r.value}
                defaultChecked={reason ? reason === r.value : i === 0}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line-strong bg-surface-1/70 px-3.5 py-1.5 font-sans text-[14px] text-ink-muted transition-colors hover:border-sindura/40 hover:text-ink peer-checked:border-sindura peer-checked:bg-sindura peer-checked:text-on-sindura peer-focus-visible:ring-2 peer-focus-visible:ring-sindura/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0">
                {r.label}
              </span>
            </label>
          ))}
        </div>
        <FieldError name="reason" error={errors.reason} />
      </fieldset>

      <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block font-sans text-[13px] font-medium text-ink-muted">
            Your name <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            defaultValue={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className={inputClass}
          />
          <FieldError name="name" error={errors.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block font-sans text-[13px] font-medium text-ink-muted">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email}
            defaultValue={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            className={inputClass}
          />
          <FieldError name="email" error={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-sans text-[13px] font-medium text-ink-muted">
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={8}
          minLength={CONTACT_LIMITS.messageMin}
          maxLength={CONTACT_LIMITS.messageMax}
          defaultValue={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message")}
          className={cn(inputClass, "resize-y leading-relaxed")}
        />
        <FieldError name="message" error={errors.message} />
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-homepage">Leave this empty</label>
        <input id="contact-homepage" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p role="alert" className="rounded-sm border border-sindura/40 bg-sindura/5 px-4 py-3 font-sans text-[14px] text-sindura">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group flex w-full items-center justify-center gap-2 rounded-sm bg-sindura px-5 py-3.5 font-sans text-sm font-medium tracking-wide text-on-sindura transition-[transform,opacity] hover:-translate-y-px disabled:translate-y-0 disabled:opacity-70 sm:w-auto sm:min-w-48"
      >
        {pending ? (
          <>
            <LoaderCircle size={15} className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send message
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}

function FieldError({ name, error }: { name: ContactField; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${name}-error`} className="mt-1.5 font-sans text-[13px] text-sindura">
      {error}
    </p>
  );
}
