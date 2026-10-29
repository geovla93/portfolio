import { expect, test } from "@playwright/test";
import { FieldApi, FormApi, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";
import { util as zodUtil } from "zod/v4/core";

import { getZodConstraint } from "../src/lib/constraint";
import { EMAIL_DOMAIN_NOT_FOUND } from "../src/lib/email-domain";
import { ContactFormSchema, ContactFormValuesSchema } from "../src/lib/schemas";

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

// Mirrors the validation setup and server error handling in
// src/components/contact-form.tsx. Keep the two in sync.
function createContactForm() {
  const submissions: unknown[] = [];
  let serverErrors: Record<string, string[] | undefined> = {};

  const form = new FormApi({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      "cf-turnstile-response": "",
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    validators: { onDynamic: ContactFormValuesSchema },
    onSubmit: ({ value, formApi }) => {
      submissions.push(value);
      // The component resets the spent Turnstile token after every attempt.
      token.handleChange("");
      for (const [name, messages] of Object.entries(serverErrors)) {
        formApi.setFieldMeta(name as keyof typeof value, (meta) => ({
          ...meta,
          errorMap: { ...meta.errorMap, onSubmit: { message: messages?.[0] } },
        }));
      }
    },
  });
  form.mount();

  const name = new FieldApi({ form, name: "name" });
  const email = new FieldApi({ form, name: "email" });
  const message = new FieldApi({ form, name: "message" });
  const token = new FieldApi({ form, name: "cf-turnstile-response" });
  for (const field of [name, email, message, token]) field.mount();

  return {
    form,
    name,
    email,
    message,
    token,
    submissions,
    setServerErrors(errors: typeof serverErrors) {
      serverErrors = errors;
    },
  };
}

function errorsOf(field: { state: { meta: { errors: unknown[] } } }) {
  return field.state.meta.errors.map(
    (error) => (error as { message?: string } | undefined)?.message,
  );
}

test("contact form validates its schema on submit, then on blur", async () => {
  const { form, name, email, message, token, submissions } =
    createContactForm();

  name.handleChange("J");
  name.handleBlur();
  expect(errorsOf(name)).toEqual([]);

  email.handleChange("george@localhost");
  message.handleChange("Hello there!");
  token.handleChange("token");
  await form.handleSubmit();
  expect(submissions).toHaveLength(0);
  expect(errorsOf(name)).toEqual(["Name must be at least 2 characters long"]);
  expect(errorsOf(email)).toEqual(["Invalid email address"]);

  // After a submission, typing alone does not revalidate; leaving does.
  name.handleChange("Jo");
  expect(errorsOf(name)).toEqual(["Name must be at least 2 characters long"]);
  name.handleBlur();
  expect(errorsOf(name)).toEqual([]);
  expect(errorsOf(email)).toEqual(["Invalid email address"]);

  email.handleChange("george@example.com");
  email.handleBlur();
  expect(errorsOf(email)).toEqual([]);

  await form.handleSubmit();
  expect(submissions).toHaveLength(1);

  // A successful send resets the form back to validating on submit only.
  form.reset();
  name.handleChange("J");
  name.handleBlur();
  expect(errorsOf(name)).toEqual([]);
});

test("contact form keeps a server field error until that field changes", async () => {
  const { form, name, email, message, token, submissions, setServerErrors } =
    createContactForm();

  name.handleChange("George");
  email.handleChange("george@example.invalid");
  message.handleChange("Hello there!");
  token.handleChange("token");
  setServerErrors({ email: [EMAIL_DOMAIN_NOT_FOUND] });
  await form.handleSubmit();
  expect(submissions).toHaveLength(1);
  expect(token.state.value).toBe("");
  expect(errorsOf(email)).toEqual([EMAIL_DOMAIN_NOT_FOUND]);

  // A fresh Turnstile token and edits to other fields leave it in place.
  token.handleChange("fresh-token");
  name.handleChange("George V");
  name.handleBlur();
  expect(errorsOf(email)).toEqual([EMAIL_DOMAIN_NOT_FOUND]);

  // Resubmitting the same address is blocked in the browser.
  setServerErrors({});
  await form.handleSubmit();
  expect(submissions).toHaveLength(1);
  expect(errorsOf(email)).toEqual([EMAIL_DOMAIN_NOT_FOUND]);

  token.handleChange("fresh-token");
  email.handleChange("george@example.com");
  expect(errorsOf(email)).toEqual([]);
  await form.handleSubmit();
  expect(submissions).toHaveLength(2);
});
