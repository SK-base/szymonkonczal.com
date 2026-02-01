"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Metadata sent with the subscription for analytics/segmentation. */
export interface NewsletterFormMetadata {
  /** Source identifier (e.g. "szymonkonczalcom"). */
  source: string;
  /** Page where the form is shown (e.g. "about"). */
  page: string;
}

export interface NewsletterFormProps {
  /** Show name field (e.g. for About page). */
  showName?: boolean;
  /** Compact single-line layout (name + email + button in one row). */
  inline?: boolean;
  /** Optional tagline shown below the form row, inside the bordered box (when inline). */
  tagline?: string;
  /** Metadata for analytics (source, page). UTM params are read from the URL. */
  metadata?: NewsletterFormMetadata;
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

function getUtmFromSearchParams(searchParams: URLSearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of UTM_PARAMS) {
    const v = searchParams.get(key);
    if (v != null && v.trim() !== "") out[key] = v.trim();
  }
  return out;
}

function NewsletterFormFallback({
  inline = false,
  tagline,
  className,
}: Pick<NewsletterFormProps, "inline" | "tagline" | "className">) {
  const withBox = Boolean(tagline && inline);
  return (
    <div className={className}>
      <div className={cn(withBox && "rounded-lg border border-border p-4")}>
        {withBox ? (
          <div className="flex flex-col gap-3">
            <div className="min-w-0 flex flex-nowrap items-center gap-2 h-10" />
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-w-sm h-[88px]" />
        )}
      </div>
    </div>
  );
}

function NewsletterFormInner({
  showName = false,
  inline = false,
  tagline,
  metadata,
  className,
}: NewsletterFormProps) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("loading");

    const utm = getUtmFromSearchParams(searchParams);
    const payload: Record<string, unknown> = {
      email: email.trim(),
      company: company.trim(),
      ...(showName ? { name: name.trim() } : {}),
    };
    if (metadata) {
      payload.data = {
        source: metadata.source,
        page: metadata.page,
        utm_source: utm.utm_source ?? "",
        utm_campaign: utm.utm_campaign ?? "",
        ...(utm.utm_medium ? { utm_medium: utm.utm_medium } : {}),
        ...(utm.utm_term ? { utm_term: utm.utm_term } : {}),
        ...(utm.utm_content ? { utm_content: utm.utm_content } : {}),
      };
    }

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(
        typeof data.error === "string" ? data.error : "Something went wrong. Please try again."
      );
      return;
    }

    setStatus("success");
    setEmail("");
    setName("");
    setCompany("");
  }

  const inputClass =
    "rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const formContent = (
    <>
      {showName && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(inputClass, inline ? "min-w-24 flex-1 basis-0" : "w-full mb-2")}
          autoComplete="name"
          aria-label="Name"
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          inputClass,
          inline ? "min-w-40 flex-1 basis-0" : "w-full mb-2"
        )}
        required
        autoComplete="email"
        aria-label="Email"
        disabled={status === "loading"}
      />
      {/* Honeypot: hidden from users, bots may fill it */}
      <div className="absolute -left-[9999px] top-0 overflow-hidden" aria-hidden>
        <label htmlFor="newsletter-company">Company</label>
        <input
          id="newsletter-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={status === "loading"} className="shrink-0">
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </Button>
    </>
  );

  const formEl = (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative",
        inline
          ? "flex flex-nowrap items-center gap-2"
          : "flex flex-col gap-2 max-w-sm"
      )}
    >
      {formContent}
    </form>
  );

  if (status === "success") {
    const successContent = (
      <p className="text-muted-foreground">
        You&apos;re in — check your inbox 👋
      </p>
    );
    if (tagline && inline) {
      return (
        <div
          className={cn(
            "rounded-lg border border-border p-4",
            className
          )}
        >
          {successContent}
        </div>
      );
    }
    return (
      <div className={className}>
        {successContent}
      </div>
    );
  }

  const withBox = tagline && inline;
  return (
    <div className={className}>
      <div
        className={cn(
          withBox && "rounded-lg border border-border p-4"
        )}
      >
        {withBox ? (
          <div className="flex flex-col gap-3">
            <div className="min-w-0">{formEl}</div>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
        ) : (
          formEl
        )}
      </div>
      {status === "error" && errorMessage && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export function NewsletterForm(props: NewsletterFormProps) {
  return (
    <Suspense fallback={<NewsletterFormFallback {...props} />}>
      <NewsletterFormInner {...props} />
    </Suspense>
  );
}
