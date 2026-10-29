import type { Page } from "@playwright/test";

declare global {
  interface Window {
    __turnstileMock: {
      resets: number;
      options: Record<string, (token: string) => void>;
    };
  }
}

export async function mockTurnstile(page: Page, autoVerify = true) {
  await page.route(
    "https://challenges.cloudflare.com/turnstile/v0/api.js*",
    (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: `
        window.__turnstileMock = { resets: 0 };
        window.turnstile = {
          render(container, options) {
            window.__turnstileMock.options = options;
            container.dataset.turnstileSitekey = options.sitekey;
            container.dataset.turnstileAction = options.action;
            if (${autoVerify}) options.callback("mock-turnstile-token");
            return "contact-widget";
          },
          reset(id) {
            if (id !== "contact-widget") throw new Error("Wrong widget reset");
            window.__turnstileMock.resets++;
          },
          remove() {},
        };
      `,
      }),
  );
}

export async function triggerTurnstile(
  page: Page,
  event:
    | "callback"
    | "expired-callback"
    | "timeout-callback"
    | "error-callback",
  token = "mock-turnstile-token",
) {
  await page.evaluate(
    ({ event, token }) => {
      window.__turnstileMock.options[event](token);
    },
    { event, token },
  );
}
