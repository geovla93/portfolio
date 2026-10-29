import { expect, test } from "@playwright/test";
import { z } from "zod";
import { util as zodUtil } from "zod/v4/core";

import { getZodConstraint } from "../src/lib/constraint";
import { ContactFormSchema } from "../src/lib/schemas";

const validContact = {
  name: "George",
  email: "GEORGE@example.com",
  message: "Hello there!",
};

test("contact schema normalizes email without changing other values", () => {
  const result = ContactFormSchema.safeParse(validContact);

  expect(result.success).toBe(true);
  if (!result.success) return;

  expect(result.data).toEqual({
    ...validContact,
    email: "george@example.com",
  });
});

test("contact schema keeps field errors and minimum boundaries", () => {
  const invalid = ContactFormSchema.safeParse({
    name: "A",
    email: "invalid-email",
    message: "123456789",
  });

  expect(invalid.success).toBe(false);
  if (!invalid.success) {
    const fieldErrors = z.flattenError(invalid.error).fieldErrors;
    expect(fieldErrors.name).toBeDefined();
    expect(fieldErrors.email).toBeDefined();
    expect(fieldErrors.message).toBeDefined();
  }

  expect(
    ContactFormSchema.safeParse({ ...validContact, name: "A" }).success,
  ).toBe(false);
  expect(
    ContactFormSchema.safeParse({ ...validContact, name: "Jo" }).success,
  ).toBe(true);
  expect(
    ContactFormSchema.safeParse({ ...validContact, message: "123456789" })
      .success,
  ).toBe(false);
  expect(
    ContactFormSchema.safeParse({ ...validContact, message: "1234567890" })
      .success,
  ).toBe(true);
});

test("contact schema exports the native field constraints", () => {
  const constraint = getZodConstraint(ContactFormSchema);

  expect(Object.keys(constraint).sort()).toEqual(["email", "message", "name"]);
  expect(constraint.name).toEqual({ required: true, minLength: 2 });
  expect(constraint.email.required).toBe(true);
  expect(constraint.message).toEqual({ required: true, minLength: 10 });

  const composed = getZodConstraint(
    z.object({
      range: z.string().min(2).min(3).max(10).max(8),
      exact: z.string().length(4),
      numericRange: z.number().min(2).min(5).max(9).max(8),
      exclusiveRange: z.number().gt(1).lt(10),
      integer: z.int(),
      float32: z.float32(),
      optionalNumber: z.number().min(0).optional(),
      values: z.array(z.number().min(1)),
    }),
  );
  expect(composed.range).toEqual({
    required: true,
    minLength: 3,
    maxLength: 8,
  });
  expect(composed.exact).toEqual({
    required: true,
    minLength: 4,
    maxLength: 4,
  });
  expect(composed.numericRange).toEqual({
    required: true,
    min: 5,
    max: 8,
  });
  expect(composed.exclusiveRange).toEqual({ required: true });
  expect(composed.integer).toEqual({
    required: true,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
  });
  expect(composed.float32).toEqual({
    required: true,
    min: zodUtil.NUMBER_FORMAT_RANGES.float32[0],
    max: zodUtil.NUMBER_FORMAT_RANGES.float32[1],
  });
  expect(composed.optionalNumber).toEqual({ required: false, min: 0 });
  expect(composed.values).toEqual({ required: true, multiple: true });
  expect(
    Object.entries(composed).find(([key]) => key === "values[]")?.[1],
  ).toEqual({ required: true, min: 1 });
});
