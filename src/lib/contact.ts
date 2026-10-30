/** Why someone is writing, shown as the form's first choice and in the email's subject. */
export const CONTACT_REASONS = [
  { value: "question", label: "A question" },
  { value: "suggestion", label: "A suggestion or correction" },
  { value: "support", label: "Supporting this work" },
  { value: "other", label: "Something else" },
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number]["value"];

export const isContactReason = (value: string): value is ContactReason =>
  CONTACT_REASONS.some((r) => r.value === value);

export const contactReasonLabel = (reason: ContactReason) =>
  CONTACT_REASONS.find((r) => r.value === reason)!.label;

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 20,
  messageMax: 5000,
} as const;

/**
 * A hidden field that people never see or fill in. Named like something a
 * form-filling bot will want to complete, but not like anything a browser
 * autofills.
 */
export const HONEYPOT_FIELD = "homepage";

export type ContactValues = {
  name: string;
  email: string;
  reason: ContactReason;
  message: string;
};

export type ContactField = keyof ContactValues;

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "error";
      /** Echoed back so the form can restore what was typed. */
      values: Partial<ContactValues>;
      fieldErrors: Partial<Record<ContactField, string>>;
      formError?: string;
    };
