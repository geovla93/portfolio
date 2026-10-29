import { expect, test } from "@playwright/test";

import { verifyTurnstile } from "../src/lib/turnstile";
import { mockTurnstile, triggerTurnstile } from "./helpers/turnstile";

test.describe("Turnstile server verification", () => {
  const originalFetch = globalThis.fetch;
  let originalEnv: NodeJS.ProcessEnv;
  let calls: Parameters<typeof fetch>[];

  test.beforeEach(() => {
    originalEnv = { ...process.env };
    process.env.TURNSTILE_SECRET_KEY = "test-only-secret";
    process.env.NEXT_PUBLIC_SITE_URL = "https://geovla.dev";
    delete process.env.TURNSTILE_HOSTNAMES;
    calls = [];
    globalThis.fetch = async (...args) => {
      calls.push(args);
      return Response.json({
        success: true,
        action: "contact",
        hostname: "geovla.dev",
      });
    };
  });

  test.afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  });

  test("validates the action and exact hostname with an uncached server POST", async () => {
    expect(await verifyTurnstile("fresh-token")).toBe(true);
    expect(calls).toHaveLength(1);
    const [url, init] = calls[0];
    expect(url).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    expect(init?.method).toBe("POST");
    expect(init?.cache).toBe("no-store");
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    expect(init?.body).toBeInstanceOf(URLSearchParams);
    expect((init?.body as URLSearchParams).get("secret")).toBe(
      "test-only-secret",
    );
    expect((init?.body as URLSearchParams).get("response")).toBe("fresh-token");
  });

  test("rejects missing, empty, oversized and non-string tokens before fetching", async () => {
    for (const token of [
      null,
      "",
      " ",
      "x".repeat(2049),
      new File([], "token"),
    ]) {
      expect(await verifyTurnstile(token)).toBe(false);
    }
    expect(calls).toHaveLength(0);
  });

  test("fails closed without a secret or hostname configuration", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(await verifyTurnstile("token")).toBe(false);
    process.env.TURNSTILE_SECRET_KEY = "test-only-secret";
    process.env.NEXT_PUBLIC_SITE_URL = "invalid-url";
    expect(await verifyTurnstile("token")).toBe(false);
    process.env.NEXT_PUBLIC_SITE_URL = "https://geovla.dev";
    process.env.TURNSTILE_HOSTNAMES = " , ";
    expect(await verifyTurnstile("token")).toBe(false);
    expect(calls).toHaveLength(0);
  });

  test("supports a deployment-specific hostname allowlist", async () => {
    process.env.TURNSTILE_HOSTNAMES = " www.geovla.dev, geovla.dev ";
    expect(await verifyTurnstile("token")).toBe(true);
    process.env.TURNSTILE_HOSTNAMES = "www.geovla.dev";
    expect(await verifyTurnstile("token")).toBe(false);
  });

  test("rejects production allowlists containing loopback hosts", async () => {
    Object.assign(process.env, { NODE_ENV: "production" });
    for (const host of ["localhost", "127.0.0.1", "[::1]", "::1"]) {
      process.env.TURNSTILE_HOSTNAMES = `geovla.dev,${host}`;
      expect(await verifyTurnstile("token")).toBe(false);
    }
    expect(calls).toHaveLength(0);
  });

  for (const [name, result] of Object.entries({
    "failed challenge": { success: false },
    "non-boolean success": {
      success: "true",
      action: "contact",
      hostname: "geovla.dev",
    },
    "wrong action": { success: true, action: "login", hostname: "geovla.dev" },
    "wrong hostname": {
      success: true,
      action: "contact",
      hostname: "geovla.dev.attacker.example",
    },
    "missing hostname": { success: true, action: "contact" },
    "null response": null,
    "replayed or expired token": {
      success: false,
      "error-codes": ["timeout-or-duplicate"],
    },
  })) {
    test(`rejects ${name}`, async () => {
      globalThis.fetch = async () => Response.json(result);
      expect(await verifyTurnstile("token")).toBe(false);
    });
  }

  test("fails closed on HTTP errors, malformed JSON, and network failures", async () => {
    for (const response of [
      new Response("unavailable", { status: 503 }),
      new Response("invalid-json"),
    ]) {
      globalThis.fetch = async () => response;
      expect(await verifyTurnstile("token")).toBe(false);
    }
    globalThis.fetch = async () => {
      throw new Error("network failure");
    };
    expect(await verifyTurnstile("token")).toBe(false);
  });
});

test.describe("Turnstile contact widget", () => {
  test.beforeEach(async ({ page }) => {
    await mockTurnstile(page, false);
    await page.goto("/");
    await expect(
      page.locator('[data-turnstile-action="contact"]'),
    ).toBeAttached();
  });

  test("requires a fresh token and clears expired, timed out and failed challenges", async ({
    page,
  }) => {
    const submit = page.getByRole("button", { name: "Send Message" });
    const token = page.locator('input[name="cf-turnstile-response"]');
    await expect(page.locator("[data-turnstile-sitekey]")).toHaveAttribute(
      "data-turnstile-sitekey",
      "0x4AAAAAAFq4H9ljrur0kahN",
    );
    await expect(submit).toBeDisabled();

    for (const event of [
      "expired-callback",
      "timeout-callback",
      "error-callback",
    ] as const) {
      await triggerTurnstile(page, "callback");
      await expect(submit).toBeEnabled();
      await expect(token).toHaveValue("mock-turnstile-token");
      await triggerTurnstile(page, event);
      await expect(submit).toBeDisabled();
      await expect(token).toHaveValue("");
    }
    await expect(
      page.getByText("Verification failed. Please try again."),
    ).toBeVisible();
    await triggerTurnstile(page, "callback");
    await expect(
      page.getByText("Verification failed. Please try again."),
    ).toHaveCount(0);
    await expect(submit).toBeEnabled();
  });

  test("the actual server action rejects a bad token, preserves values and resets before retry", async ({
    page,
  }) => {
    await page.getByLabel("Name", { exact: true }).fill("Turnstile Test");
    await page
      .getByLabel("Email Address", { exact: true })
      .fill("turnstile@example.com");
    await page
      .getByLabel("Message", { exact: true })
      .fill("This request must never send an email.");
    const invalidToken = "invalid-token-".repeat(200);
    await triggerTurnstile(page, "callback", invalidToken);
    // The email domain check is also a server action; wait for the submission.
    const responsePromise = page.waitForResponse(
      (response) =>
        response.request().headers()["next-action"] !== undefined &&
        !!response.request().postData()?.includes("cf-turnstile-response"),
    );
    await page.getByRole("button", { name: "Send Message" }).click();
    const response = await responsePromise;
    expect(response.ok()).toBe(true);
    await expect(
      page.getByText("Please complete the verification and try again."),
    ).toBeVisible();
    await expect(
      page.locator('input[name="cf-turnstile-response"]'),
    ).toHaveValue("");
    await expect(
      page.getByRole("button", { name: "Send Message" }),
    ).toBeDisabled();
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
      "Turnstile Test",
    );
    await expect
      .poll(() => page.evaluate(() => window.__turnstileMock.resets))
      .toBe(1);
    await triggerTurnstile(page, "callback", "fresh-retry-token");
    await expect(
      page.getByRole("button", { name: "Send Message" }),
    ).toBeEnabled();
  });
});

test("a blocked Turnstile script explains recovery and prevents submission", async ({
  page,
}) => {
  await page.route(
    "https://challenges.cloudflare.com/turnstile/v0/api.js*",
    (route) => route.abort(),
  );
  await page.goto("/");
  await expect(
    page.getByText(
      "Verification could not load. Refresh the page and try again.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send Message" }),
  ).toBeDisabled();
});
