import { TURNSTILE_ACTION } from "./turnstile-config";

export async function verifyTurnstile(token: FormDataEntryValue | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  let hostname = "";

  try {
    hostname = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "").hostname;
  } catch {
    // An explicit hostname allowlist can be used without a site URL.
  }

  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? hostname)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

  if (
    typeof token !== "string" ||
    token.trim().length === 0 ||
    token.length > 2048 ||
    !secret?.trim() ||
    expectedHostnames.size === 0 ||
    (process.env.NODE_ENV === "production" &&
      ["localhost", "127.0.0.1", "[::1]", "::1"].some((value) =>
        expectedHostnames.has(value),
      ))
  ) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      },
    );

    if (!response.ok) return false;

    const result: unknown = await response.json();

    return (
      typeof result === "object" &&
      result !== null &&
      "success" in result &&
      result.success === true &&
      "action" in result &&
      result.action === TURNSTILE_ACTION &&
      "hostname" in result &&
      typeof result.hostname === "string" &&
      expectedHostnames.has(result.hostname)
    );
  } catch {
    return false;
  }
}
