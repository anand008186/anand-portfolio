"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    setStatus("sending");
    setMessage("Sending your enquiry…");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        },
      );

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setStatus("sent");
      setMessage("Thanks—your enquiry is on its way. I’ll reply by email.");
    } catch {
      setStatus("error");
      setMessage(
        "That did not go through. Please try again or send me a message on LinkedIn.",
      );
    }
  }

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate={false}>
      <input
        className="form-honeypot"
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="_subject" value="New portfolio project enquiry" />
      <input type="hidden" name="_template" value="table" />
      <p className="form-hint">
        Your message will be delivered directly to my inbox. I usually respond
        within two working days.
      </p>
      <div className="form-grid">
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        Company
        <input name="company" type="text" autoComplete="organization" />
      </label>
      <label>
        What are you trying to build or fix?
        <textarea name="message" rows={7} required />
      </label>
      <label>
        Budget / timeline <span className="optional">(optional)</span>
        <input name="budget" type="text" />
      </label>
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a className="btn btn-ghost" href={site.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
      </div>
      {status !== "idle" ? (
        <p className={`form-status ${status === "error" ? "is-error" : ""}`} role="status">
          {message}
        </p>
      ) : null}
      <p className="form-privacy">
        By sending this form, your details are processed by FormSubmit solely to
        deliver this enquiry.
      </p>
    </form>
  );
}
