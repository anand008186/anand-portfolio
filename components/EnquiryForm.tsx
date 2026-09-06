"use client";

import { FormEvent, useMemo, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "copied" | "mailto" | "error";

function buildBody(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  const problem = String(data.get("problem") ?? "").trim();
  const budget = String(data.get("budget") ?? "").trim();

  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "(not provided)"}`,
    "",
    "What are you trying to build or fix?",
    problem,
    "",
    `Budget / timeline: ${budget || "(not provided)"}`,
  ].join("\n");
}

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const hasEmail = Boolean(site.email);

  const hint = useMemo(() => {
    if (hasEmail) {
      return `Submits via your email client to ${site.email}. Nothing is stored on this site.`;
    }
    return "No public inbox is configured yet. The form copies a message you can paste to LinkedIn, or set NEXT_PUBLIC_CONTACT_EMAIL before deploy.";
  }, [hasEmail]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const body = buildBody(form);
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();

    try {
      if (hasEmail) {
        const mailto = `mailto:${encodeURIComponent(site.email)}?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setStatus("mailto");
        setMessage("Your email client should open with a drafted message.");
        return;
      }

      await navigator.clipboard.writeText(body);
      setStatus("copied");
      setMessage("Message copied. Paste it on LinkedIn or email once an address is published.");
    } catch {
      setStatus("error");
      setMessage("Could not copy automatically. Select the drafted text below and copy it manually.");
      const preview = document.getElementById("enquiry-preview");
      if (preview) preview.textContent = body;
    }
  }

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate={false}>
      <p className="form-hint">{hint}</p>
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
        <textarea name="problem" rows={7} required />
      </label>
      <label>
        Budget / timeline <span className="optional">(optional)</span>
        <input name="budget" type="text" />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Discuss a project
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
      <pre id="enquiry-preview" className="enquiry-preview" hidden={status !== "error"} />
    </form>
  );
}
