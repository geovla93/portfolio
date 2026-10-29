import {
  test as base,
  expect,
  type Locator,
  type Page,
} from "@playwright/test";

import { navLinks } from "../src/data/nav-links";
import { projects, type Project } from "../src/data/projects";
import { mockTurnstile } from "./helpers/turnstile";

const test = base.extend<{ guard: void }>({
  guard: [
    async ({ page }, use) => {
      await mockTurnstile(page);
      const errors: string[] = [];
      const posts: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
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
      expect(errors, "No browser errors, including hydration warnings").toEqual(
        [],
      );
    },
    { auto: true },
  ],
});

const themeTrigger = (page: Page) =>
  page.getByRole("button", { name: "Toggle theme" });
const mobileTrigger = (page: Page) =>
  page.getByRole("button", { name: "Toggle navigation", includeHidden: true });
const navigationPopup = (page: Page) =>
  page.getByRole("dialog", { name: "Menu" });
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
      portrait.evaluate(
        (element) => (element as HTMLImageElement).naturalWidth,
      ),
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

async function assertPopup(page: Page, menu = page.getByRole("menu")) {
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
    await menu
      .getByRole("menuitemradio", { name: choice, exact: true })
      .click();
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
      menu.getByRole("menuitemradio", { name: "Dark", exact: true }),
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

test("mobile navigation follows hashes and closes on selection, Escape and outside click", async ({
  page,
}) => {
  await visit(page, 390);
  const trigger = mobileTrigger(page);
  await expect(trigger).toHaveAccessibleName("Toggle navigation");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const menu = await assertPopup(page, navigationPopup(page));
  const navigation = menu.getByRole("navigation", { name: "Main" });
  await expect(navigation.getByRole("link")).toHaveCount(4);
  for (const link of navLinks) {
    const anchor = navigation.getByRole("link", {
      name: link.label,
      exact: true,
    });
    await expect(anchor).toHaveAttribute("href", `#${link.hash}`);
    // Layout height, unaffected by the popup's zoom-in animation.
    expect(
      await anchor.evaluate((element) => (element as HTMLElement).offsetHeight),
    ).toBe(44);
  }
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveCount(0);
  await trigger.click();
  await assertPopup(page, navigationPopup(page));
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
    page.getByRole("link", { name: "View GitHub" }),
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
  // Each project links where it can be tried, its source, or both.
  const codeLinks = page.getByRole("link", { name: "View code", exact: true });
  const codeUrls: string[] = [];
  for (const project of projects as readonly Project[]) {
    expect(project.live ?? project.githubUrl).toBeTruthy();
    if (project.live) {
      await assertAnchor(
        page.getByRole("link", { name: project.live.label, exact: true }),
        project.live.url,
        "_blank",
        "noopener noreferrer",
      );
    }
    if (project.githubUrl) codeUrls.push(project.githubUrl);
  }
  await expect(codeLinks).toHaveCount(codeUrls.length);
  for (const [index, url] of codeUrls.entries()) {
    await assertAnchor(
      codeLinks.nth(index),
      url,
      "_blank",
      "noopener noreferrer",
    );
  }
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
  for (const name of ["Name", "Email", "Message"]) {
    const control = page.getByLabel(name, { exact: true });
    await expect(control).toBeVisible();
    await page
      .locator("label")
      .filter({ hasText: new RegExp(`^${name}$`) })
      .click();
    await expect(control).toBeFocused();
  }
  const submit = page.getByRole("button", { name: "Send message" });
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
  const email = page.getByLabel("Email", { exact: true });
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
  const email = page.getByLabel("Email", { exact: true });
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
  await page.getByRole("button", { name: "Send message" }).click();
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
      // 44px touch targets on phones, the compact 36px above md.
      const size = width < 768 ? 44 : 36;
      expect(box?.width).toBe(size);
      expect(box?.height).toBe(size);
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
        const navigationMenu = await assertPopup(page, navigationPopup(page));
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
  const dark = menu.getByRole("menuitemradio", { name: "Dark", exact: true });
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
  await trigger.press("Enter");
  const menu = await assertPopup(page, navigationPopup(page));
  await expect(
    menu.getByRole("link", { name: "About", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    menu.getByRole("link", { name: "Experience", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#experience$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveCount(0);
});

test("both menus retain exit animations until unmount", async ({ page }) => {
  await visit(page, 390);
  for (const [trigger, popup] of [
    [themeTrigger(page), page.getByRole("menu")],
    [mobileTrigger(page), navigationPopup(page)],
  ]) {
    await trigger.click();
    const menu = await assertPopup(page, popup);
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

test("the skip link is the first stop and moves focus to the main content", async ({
  page,
}) => {
  await visit(page);
  const skip = page.getByRole("link", { name: "Skip to content" });
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Get in touch" })).toBeFocused();
});

test("keyboard focus never lands under the sticky header", async ({ page }) => {
  await visit(page);
  const lastProjectLink = page.locator("#projects a").last();
  await lastProjectLink.focus();
  const header = await page.locator("header").boundingBox();
  // Walk backwards through the project links, scrolling up each time.
  for (let step = 0; step < 4; step++) {
    await page.keyboard.press("Shift+Tab");
    await expect
      .poll(async () => {
        const focused = await page.evaluate(() => {
          const { top } = document.activeElement!.getBoundingClientRect();
          return top;
        });
        return focused >= header!.y + header!.height;
      })
      .toBe(true);
  }
});

test("smooth scrolling yields to the reduced motion preference", async ({
  page,
}) => {
  await visit(page);
  const scrollBehavior = () =>
    page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
  expect(await scrollBehavior()).toBe("smooth");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await scrollBehavior()).toBe("auto");
});

test("navigation marks the section being read", async ({ page }) => {
  await visit(page);
  const current = desktopLinks(page).locator('[aria-current="location"]');
  await expect(current).toHaveCount(0);
  for (const link of navLinks) {
    await page
      .locator(`#${link.hash}`)
      .evaluate((section) => section.scrollIntoView({ behavior: "instant" }));
    await expect(current).toHaveText(link.label);
  }
});
