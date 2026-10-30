"use server";

import { checkBotId } from "botid/server";

import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  isContactReason,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";
import { sendContactMessage } from "@/lib/contact-email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Set `BOTID_DEV_BYPASS=BAD-BOT` locally to see how a rejected bot is treated. */
const DEV_BYPASS = process.env.BOTID_DEV_BYPASS === "BAD-BOT" ? "BAD-BOT" : undefined;

const field = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    // A name is one line; collapsing whitespace also keeps it safe in a subject line.
    name: field(formData, "name").replace(/\s+/g, " "),
    email: field(formData, "email"),
    reason: field(formData, "reason"),
    message: field(formData, "message"),
  };
  const echo = { ...values, reason: isContactReason(values.reason) ? values.reason : undefined };

  const verification = await checkBotId({ developmentOptions: { bypass: DEV_BYPASS } });
  if (verification.isBot) {
    return {
      status: "error",
      values: echo,
      fieldErrors: {},
      formError: "Your message could not be sent. Please refresh the page and try again.",
    };
  }

  // Bots that fill the hidden field are told it worked, so they don't retry.
  if (field(formData, HONEYPOT_FIELD)) return { status: "sent" };

  const fieldErrors: Extract<ContactState, { status: "error" }>["fieldErrors"] = {};
  if (values.name.length > CONTACT_LIMITS.name) {
    fieldErrors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;
  }
  if (!values.email) {
    fieldErrors.email = "Please enter your email address, so I can write back.";
  } else if (values.email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = "That doesn't look like an email address.";
  }
  if (!isContactReason(values.reason)) {
    fieldErrors.reason = "Please choose what you're writing about.";
  }
  if (values.message.length < CONTACT_LIMITS.messageMin) {
    fieldErrors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (values.message.length > CONTACT_LIMITS.messageMax) {
    fieldErrors.message = `Please keep your message under ${CONTACT_LIMITS.messageMax.toLocaleString("en")} characters.`;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", values: echo, fieldErrors };
  }

  const sent = await sendContactMessage(values as ContactValues);
  if (!sent.ok) {
    return {
      status: "error",
      values: echo,
      fieldErrors: {},
      formError: "Something went wrong sending your message. Please try again in a little while.",
    };
  }
  return { status: "sent" };
}
