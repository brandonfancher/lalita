import { Resend } from "resend";

import { contactReasonLabel, type ContactValues } from "./contact";

/**
 * Emails a contact message to the site's inbox, with the sender as the
 * reply-to address. Server-only: it reads the Resend key from the environment.
 *
 * Needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (an
 * address on a domain verified in Resend). In development without them, the
 * message is logged instead of sent.
 */
export async function sendContactMessage(values: ContactValues): Promise<{ ok: boolean }> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const label = contactReasonLabel(values.reason);
  const from = values.name ? `${values.name} <${values.email}>` : values.email;
  const subject = `${label}${values.name ? ` from ${values.name}` : ""}`;
  const text = `From: ${from}\nAbout: ${label}\n\n${values.message}\n`;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[contact] Email is not configured, so this message was not sent.\n${subject}\n${text}`);
      return { ok: true };
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL is not set.");
    return { ok: false };
  }

  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
    replyTo: values.email,
    subject,
    text,
  });
  if (error) {
    console.error("[contact] Resend could not send the message:", error);
    return { ok: false };
  }
  return { ok: true };
}
