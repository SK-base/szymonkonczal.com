import { NextRequest } from "next/server";

const PLUNK_BASE = "https://api.useplunk.com/v1";
const IDEMPOTENCY_MS = 60_000; // 1 minute: skip duplicate sends for same email
const MAX_UTM_LENGTH = 200;
const recentEmails = new Map<string, number>(); // in-memory idempotency (best effort)

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Sanitize UTM/analytics string: max length, allow alphanumeric and common safe chars. */
function sanitizeUtmField(value: unknown): string {
  if (value == null || typeof value !== "string") return "";
  const trimmed = value.trim().slice(0, MAX_UTM_LENGTH);
  return trimmed.replace(/[^\w\s.-]/g, "") || "";
}

/** Simple in-memory idempotency: returns true if we should skip (recently sent). */
function wasRecentlySent(email: string): boolean {
  const key = email.toLowerCase().trim();
  const at = recentEmails.get(key);
  if (!at) return false;
  if (Date.now() - at > IDEMPOTENCY_MS) {
    recentEmails.delete(key);
    return false;
  }
  return true;
}

function markRecentlySent(email: string): void {
  recentEmails.set(email.toLowerCase().trim(), Date.now());
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.PLUNK_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Newsletter signup is not configured." },
      { status: 503 }
    );
  }

  let body: {
    email?: string;
    company?: string;
    name?: string;
    data?: {
      source?: string;
      page?: string;
      utm_source?: string;
      utm_campaign?: string;
      utm_medium?: string;
      utm_term?: string;
      utm_content?: string;
    };
  };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    return Response.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Honeypot: if "company" (or other bot field) is filled, reject silently
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";
  if (honeypot.length > 0) {
    return Response.json({ ok: true }); // pretend success to avoid leaking
  }

  if (wasRecentlySent(email)) {
    return Response.json({ ok: true }); // idempotent: treat as success
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const dataIn = body.data ?? {};
  const trackData: Record<string, string> = {
    source: typeof dataIn.source === "string" && dataIn.source.trim() ? dataIn.source.trim() : "szymonkonczalcom",
    page: typeof dataIn.page === "string" && dataIn.page.trim() ? dataIn.page.trim() : "unknown",
    utm_source: sanitizeUtmField(dataIn.utm_source),
    utm_campaign: sanitizeUtmField(dataIn.utm_campaign),
  };
  if (dataIn.utm_medium != null) trackData.utm_medium = sanitizeUtmField(dataIn.utm_medium);
  if (dataIn.utm_term != null) trackData.utm_term = sanitizeUtmField(dataIn.utm_term);
  if (dataIn.utm_content != null) trackData.utm_content = sanitizeUtmField(dataIn.utm_content);
  if (name) trackData.name = name;

  // 1) Track: create/update contact and mark subscribed
  const trackRes = await fetch(`${PLUNK_BASE}/track`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      event: "subscribed",
      email,
      subscribed: true,
      data: trackData,
    }),
  });

  if (!trackRes.ok) {
    const errText = await trackRes.text();
    return Response.json(
      { error: "Could not subscribe. Please try again later." },
      { status: 502 }
    );
  }

  // 2) Send welcome email via transactional endpoint (Plunk /v1/send requires to, subject, body)
  const welcomeSubject = "Welcome to the list 👋";
  const welcomeBody = `<p>Thanks for subscribing! You're on the list.</p>${name ? `<p>Cheers,<br/>Szymon</p>` : ""}`;

  const sendRes = await fetch(`${PLUNK_BASE}/send`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      to: email,
      subject: welcomeSubject,
      body: welcomeBody,
      subscribed: true,
    }),
  });

  if (!sendRes.ok) {
    // Contact is already subscribed; return success; idempotency not marked so retry can send welcome
    return Response.json({ ok: true });
  }

  markRecentlySent(email);
  return Response.json({ ok: true });
}

