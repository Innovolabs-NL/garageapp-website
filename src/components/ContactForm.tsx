"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-hairline bg-canvas px-3.5 py-3 text-sm text-ink outline-none focus:border-primary";

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            {t("name")}
          </label>
          <input id="name" name="name" required className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-ink">
            {t("company")}
          </label>
          <input id="company" name="company" className={field} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={field}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-accent w-full disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </form>

      {status === "ok" ? (
        <p className="mt-4 text-sm text-success" role="status">
          {t("success")}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-error" role="alert">
          {t("error")}
        </p>
      ) : null}

      <p className="mt-6 text-sm text-muted">
        {t("mailtoHint")}{" "}
        <a
          className="text-primary underline underline-offset-2"
          href={`mailto:${siteConfig.contactEmail}`}
        >
          {siteConfig.contactEmail}
        </a>
      </p>
    </div>
  );
}
