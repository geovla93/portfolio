import { readFileSync } from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";

const read = (file: string) =>
  readFileSync(path.join(process.cwd(), file), "utf8");

// shadcn/ui v4 theme tokens. globals.css may declare these and nothing else.
const colorTokens = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

const allowedProperties = new Set([
  ...colorTokens.map((token) => `--${token}`),
  ...colorTokens.map((token) => `--color-${token}`),
  "--radius",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--radius-xl",
  "--font-sans",
  "--font-mono",
]);

test("globals.css declares only shadcn/ui theme tokens", () => {
  const css = read("src/app/globals.css");
  const declared = [...css.matchAll(/(--[\w-]+)\s*:/g)].map(
    (match) => match[1],
  );

  expect(declared.length).toBeGreaterThan(0);
  expect(declared.filter((name) => !allowedProperties.has(name))).toEqual([]);
  expect(css).not.toMatch(/@utility|@keyframes|url\(/);
});

test("the root layout loads only Geist and Geist Mono", () => {
  const layout = read("src/app/layout.tsx");
  const fontImports = [...layout.matchAll(/from "next\/font\/[^"]+"/g)].map(
    (match) => match[0],
  );

  expect(fontImports).toEqual(['from "next/font/google"']);
  expect(layout).toContain(
    'import { Geist, Geist_Mono } from "next/font/google";',
  );
});
