import {
  test as base,
  expect,
  type Locator,
  type Page,
} from "@playwright/test";

import { navLinks } from "../src/data/nav-links";
import { projects } from "../src/data/projects";
import { mockTurnstile } from "./helpers/turnstile";

// Baseline next-themes warning: RootLayout's <html className="scroll-smooth">
// is hydrated after next-themes adds light/dark and style.colorScheme.
function isBaselineThemeWarning(message: string) {
  return (
    message.startsWith("A tree hydrated but some attributes") &&
    message.includes("<RootLayout>") &&
    /\+\s+className="scroll-smooth"/.test(message) &&
    /-\s+className="scroll-smooth (light|dark)"/.test(message) &&
    /-\s+style=\{\{color-scheme:"(light|dark)"\}\}/.test(message) &&
    !message.includes("data-slot=")
  );
}

const test = base.extend<{ guard: void }>({
  guard: [
    async ({ page }, use) => {
      await mockTurnstile(page);
      const errors: string[] = [];
      const posts: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (
          message.type() === "error" &&
          !isBaselineThemeWarning(message.text())
        ) {
          errors.push(message.text());
        }
      });
      await page.route("http://127.0.0.1:3100/**", async (route) => {
        if (
          route.request().method() === "POST" &&
          new URL(route.request().url()).pathname !==
            "/__nextjs_original-stack-frames"
        ) {
          posts.push(new URL(route.request().url()).pathname);
          await route.abort();
        } else {
          await route.continue();
        }
      });
      await use();
      expect(posts, "No contact/server-action POST may be attempted").toEqual(
        [],
      );
      expect(
        errors,
        "No browser errors beyond the exact baseline theme warning",
      ).toEqual([]);
    },
    { auto: true },
  ],
});

const themeTrigger = (page: Page) =>
  page.getByRole("button", { name: "Toggle theme" });
const mobileTrigger = (page: Page) =>
  page.getByRole("button", { name: "Toggle navigation", includeHidden: true });
const desktopLinks = (page: Page) =>
  page.locator('[data-slot="navigation-menu"]');

async function visit(page: Page, width = 1280, theme = "light") {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(
    (value) => localStorage.setItem("theme", value),
    theme,
  );
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
  await expect(themeTrigger(page)).toBeVisible();
}

test("hero and portrait are plain content and the page never scrolls horizontally", async ({
  page,
}) => {
  await visit(page, 1280);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "George Vlassis",
  );
  await expect(
    page.locator("svg.engrave, .microprint, .portrait-engraving"),
  ).toHaveCount(0);

  const portrait = page.getByRole("img", {
    name: /^Portrait of George Vlassis/,
  });
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toBeVisible();
  await expect
    .poll(() =>
      portrait.evaluate((element) => (element as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);

  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

async function assertPopup(page: Page) {
  const menu = page.getByRole("menu");
  await expect(menu).toHaveCount(1);
  await expect(menu).toBeVisible();
  await expect
    .poll(async () => {
      const bounds = await menu.boundingBox();
      const viewport = page.viewportSize()!;
      return (
        !!bounds &&
        bounds.x >= 0 &&
        bounds.y >= 0 &&
        bounds.x + bounds.width <= viewport.width &&
        bounds.y + bounds.height <= viewport.height
      );
    })
    .toBe(true);
  await expect
    .poll(() =>
      menu.evaluate((element) => {
        const { x, y, width, height } = element.getBoundingClientRect();
        return element.contains(
          document.elementFromPoint(x + width / 2, y + height / 2),
        );
      }),
    )
    .toBe(true);
  return menu;
}

test("theme pointer choices preserve light, dark, and system behavior", async ({
  page,
}) => {
  await visit(page);
  for (const choice of ["Dark", "Light", "System"]) {
    await themeTrigger(page).click();
    const menu = await assertPopup(page);
    await menu.getByRole("menuitem", { name: choice, exact: true }).click();
    await expect(menu).toHaveCount(0);
    await expect(page.locator("html")).toHaveClass(/\blight\b|\bdark\b/);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("theme")))
      .toBe(choice.toLowerCase());
    await expect(page.locator("html")).toHaveClass(
      new RegExp(`\\b${choice === "Dark" ? "dark" : "light"}\\b`),
    );
  }
});

test("theme keyboard opening, option navigation, selection, Escape and focus", async ({
  page,
}) => {
  await visit(page);
  const trigger = themeTrigger(page);
  for (const key of ["Enter", "Space", "ArrowDown"]) {
    await trigger.focus();
    await trigger.press(key);
    const menu = await assertPopup(page);
    await page.keyboard.press("ArrowDown");
    await expect(
      menu.getByRole("menuitem", { name: "Dark", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveCount(0);
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    await trigger.focus();
    await trigger.press(key);
    await expect(page.getByRole("menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test("mobile controlled menu follows hashes and closes on selection, Escape and outside click", async ({
  page,
}) => {
  await visit(page, 390);
  const trigger = mobileTrigger(page);
  await expect(trigger).toHaveAccessibleName("Toggle navigation");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const menu = await assertPopup(page);
  await expect(menu.getByRole("menuitem")).toHaveCount(4);
  for (const link of navLinks) {
    await expect(
      menu.getByRole("menuitem", { name: link.label, exact: true }),
    ).toHaveAttribute("href", `#${link.hash}`);
  }
  await menu.getByRole("menuitem", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveCount(0);
  await trigger.click();
  await assertPopup(page);
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await expect(menu).toHaveCount(0);
  await trigger.click();
  await page.mouse.click(10, 450);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("navigation changes at 768px and desktop links retain keyboard hashes", async ({
  page,
}) => {
  await visit(page, 767);
  await expect(mobileTrigger(page)).toBeVisible();
  await expect(desktopLinks(page)).not.toBeVisible();
  for (const width of [768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(mobileTrigger(page)).not.toBeVisible();
    await expect(desktopLinks(page)).toBeVisible();
    for (const link of navLinks) {
      const anchor = desktopLinks(page).getByRole("link", {
        name: link.label,
        exact: true,
      });
      await expect(anchor).toHaveAttribute("href", `#${link.hash}`);
      await anchor.focus();
      await anchor.press("Enter");
      await expect(page).toHaveURL(new RegExp(`#${link.hash}$`));
    }
  }
});

async function assertAnchor(
  anchor: Locator,
  href: string,
  target: string | null,
  rel: string | null,
) {
  await expect(anchor).toHaveAttribute("href", href);
  expect(await anchor.evaluate((element) => element.tagName)).toBe("A");
  expect(await anchor.getAttribute("role")).toBeNull();
  expect(await anchor.getAttribute("target")).toBe(target);
  expect(await anchor.getAttribute("rel")).toBe(rel);
  await expect(
    anchor.locator("button, a, input, select, textarea, [role=button]"),
  ).toHaveCount(0);
}

test("CTA anchors keep exact destinations and native link semantics", async ({
  page,
}) => {
  await visit(page);
  await assertAnchor(
    page.getByRole("link", { name: "Get in touch" }),
    "#contact",
    null,
    null,
  );
  await assertAnchor(
    page.getByRole("link", { name: "View Github" }),
    "https://github.com/geovla93",
    "_blank",
    null,
  );
  await assertAnchor(
    page.getByRole("link", { name: "Download CV" }),
    "/george_vlassis_cv.pdf",
    null,
    null,
  );
  const demos = page.getByRole("link", { name: "Live Demo", exact: true });
  await expect(demos).toHaveCount(projects.length);
  for (const [index, project] of projects.entries()) {
    await assertAnchor(
      demos.nth(index),
      project.liveUrl,
      "_blank",
      "noopener noreferrer",
    );
  }
  // The current project data contains no code URL; optional CTAs stay absent.
  await expect(
    page.getByRole("link", { name: "View Code", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator("a button, button button, button a")).toHaveCount(
    0,
  );
});

test("CV emits a real download with its existing filename", async ({
  page,
}, testInfo) => {
  await visit(page);
  const anchor = page.getByRole("link", { name: "Download CV" });
  await expect(anchor).toHaveAttribute("download", "");
  const downloadPromise = page.waitForEvent("download");
  await anchor.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("george_vlassis_cv.pdf");
  await download.saveAs(testInfo.outputPath(download.suggestedFilename()));
  expect(await download.failure()).toBeNull();
});

test("native labels focus inputs and empty submit stays in browser validation", async ({
  page,
}) => {
  await visit(page);
  for (const name of ["Name", "Email Address", "Message"]) {
    const control = page.getByLabel(name, { exact: true });
    await expect(control).toBeVisible();
    await page
      .locator("label")
      .filter({ hasText: new RegExp(`^${name}$`) })
      .click();
    await expect(control).toBeFocused();
  }
  const submit = page.getByRole("button", { name: "Send Message" });
  expect(await submit.evaluate((element) => element.tagName)).toBe("BUTTON");
  await expect(submit).toHaveAttribute("type", "submit");
  await submit.click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  expect(
    await page
      .locator("form")
      .evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBe(false);
});

test("contact constraints survive schema upgrade", async ({ page }) => {
  await visit(page);
  const name = page.getByLabel("Name", { exact: true });
  const email = page.getByLabel("Email Address", { exact: true });
  const message = page.getByLabel("Message", { exact: true });

  await expect(name).toHaveAttribute("required", "");
  await expect(name).toHaveAttribute("minlength", "2");
  await expect(email).toHaveAttribute("required", "");
  await expect(email).toHaveAttribute("type", "email");
  await expect(message).toHaveAttribute("required", "");
  await expect(message).toHaveAttribute("minlength", "10");

  await name.fill("A");
  await email.fill("invalid-email");
  await message.fill("123456789");
  expect(
    await name.evaluate(
      (element) => (element as HTMLInputElement).validity.tooShort,
    ),
  ).toBe(true);
  expect(
    await email.evaluate(
      (element) => (element as HTMLInputElement).validity.typeMismatch,
    ),
  ).toBe(true);
  expect(
    await message.evaluate(
      (element) => (element as HTMLTextAreaElement).validity.tooShort,
    ),
  ).toBe(true);
});

test("contact form validates on submit, then revalidates a field on blur", async ({
  page,
}) => {
  await visit(page);
  const email = page.getByLabel("Email Address", { exact: true });
  const emailError = page.getByText("Invalid email address");

  await page.getByLabel("Name", { exact: true }).fill("George");
  // Passes the native type="email" check, so only the schema rejects it.
  await email.fill("george@localhost");
  await email.blur();
  await expect(emailError).toHaveCount(0);
  await expect(email).toHaveAttribute("aria-invalid", "false");
  expect(
    await email.evaluate(
      (element) => (element as HTMLInputElement).validity.valid,
    ),
  ).toBe(true);

  await page.getByLabel("Message", { exact: true }).fill("Hello there!");
  // The guard fixture fails the test if this submit reaches the server.
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(emailError).toBeVisible();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toHaveAccessibleDescription("Invalid email address");

  // After a submission, typing alone keeps the error; leaving the field
  // revalidates it.
  await email.fill("george@example.com");
  await expect(emailError).toBeVisible();
  await email.blur();
  await expect(emailError).toHaveCount(0);
  await expect(email).toHaveAttribute("aria-invalid", "false");
  await expect(email).not.toHaveAttribute("aria-describedby");
});

test("icon controls retain accessible names", async ({ page }) => {
  for (const width of [1280, 390]) {
    await visit(page, width);
    const theme = themeTrigger(page);
    const mobile = mobileTrigger(page);

    await expect(theme).toHaveAccessibleName("Toggle theme");
    await expect(mobile).toHaveAttribute("aria-label", "Toggle navigation");
    if (width === 390) {
      await expect(mobile).toHaveAccessibleName("Toggle navigation");
    }
  }
});

for (const width of [390, 1280]) {
  for (const theme of ["light", "dark"]) {
    test(`menu geometry, styling and evidence at ${width}px in ${theme}`, async ({
      page,
    }, testInfo) => {
      await visit(page, width, theme);
      const trigger = themeTrigger(page);
      const box = await trigger.boundingBox();
      expect(box?.width).toBe(36);
      expect(box?.height).toBe(36);
      await expect(trigger.locator("button")).toHaveCount(0);
      await page.screenshot({ path: testInfo.outputPath("homepage.png") });
      await trigger.click();
      const menu = await assertPopup(page);
      expect(
        await menu.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        ),
      ).not.toBe("rgba(0, 0, 0, 0)");
      await menu.screenshot({ path: testInfo.outputPath("theme-menu.png") });
      await page.keyboard.press("Escape");
      await expect(menu).toHaveCount(0);
      if (width === 390) {
        await mobileTrigger(page).click();
        const navigationMenu = await assertPopup(page);
        await navigationMenu.screenshot({
          path: testInfo.outputPath("navigation-menu.png"),
        });
        await page.keyboard.press("Escape");
        await expect(navigationMenu).toHaveCount(0);
      }
      await page.locator("#about").scrollIntoViewIfNeeded();
      await trigger.click();
      await assertPopup(page);
      await page.keyboard.press("Escape");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    });
  }
}

test("pointer highlight and outside dismissal keep theme menu usable", async ({
  page,
}) => {
  await visit(page);
  const trigger = themeTrigger(page);
  await trigger.click();
  const menu = await assertPopup(page);
  const dark = menu.getByRole("menuitem", { name: "Dark", exact: true });
  await dark.hover();
  await expect(dark).toHaveAttribute("data-highlighted", "");
  await page.mouse.click(10, 450);
  await expect(menu).toHaveCount(0);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("mobile links support keyboard navigation and hash selection", async ({
  page,
}) => {
  await visit(page, 390);
  const trigger = mobileTrigger(page);
  await trigger.focus();
  await trigger.press("ArrowDown");
  const menu = await assertPopup(page);
  await expect(
    menu.getByRole("menuitem", { name: "About", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(
    menu.getByRole("menuitem", { name: "Experience", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#experience$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveCount(0);
});

test("both menus retain exit animations until unmount", async ({ page }) => {
  await visit(page, 390);
  for (const trigger of [themeTrigger(page), mobileTrigger(page)]) {
    await trigger.click();
    const menu = await assertPopup(page);
    const ending = await menu.evaluateHandle((element) => {
      const result: { animation: { name: string; duration: string } | null } = {
        animation: null,
      };
      const observer = new MutationObserver(() => {
        if (element.hasAttribute("data-closed")) {
          const style = getComputedStyle(element);
          result.animation = {
            name: style.animationName,
            duration: style.animationDuration,
          };
          observer.disconnect();
        }
      });
      observer.observe(element, { attributes: true });
      return result;
    });
    await page.keyboard.press("Escape");
    await expect
      .poll(() => ending.evaluate((result) => result.animation))
      .not.toBeNull();
    const animation = (await ending.evaluate((result) => result.animation))!;
    expect(animation.name).not.toBe("none");
    expect(animation.duration).not.toBe("0s");
    await expect(menu).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});
