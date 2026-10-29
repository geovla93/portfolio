"use client";

import { revalidateLogic } from "@tanstack/react-form";
import { SendIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

import { useAppForm } from "@/components/form";
import type { TurnstileFieldHandle } from "@/components/form/turnstile-field";
import { Field, FieldGroup } from "@/components/ui/field";
import { sendContactRequest } from "@/lib/actions";
import { getZodConstraint } from "@/lib/constraint";
import { ContactFormSchema, ContactFormValuesSchema } from "@/lib/schemas";

const constraint = getZodConstraint(ContactFormSchema);

const defaultValues = {
  name: "",
  email: "",
  message: "",
  "cf-turnstile-response": "",
};

// In DOM order. The Turnstile token is left out: its widget is an iframe, and
// its error is announced by FieldError's role="alert" instead.
const focusableFields = ["name", "email", "message"] as const;

type ContactFormProps = React.ComponentProps<"form">;

export function ContactForm(props: ContactFormProps) {
  const formElement = useRef<HTMLFormElement>(null);
  const turnstile = useRef<TurnstileFieldHandle>(null);

  // Native constraint validation already focuses empty or malformed fields;
  // this covers the schema and server errors it can't see.
  function focusFirstInvalidField(
    fieldMeta: Partial<Record<string, { errors: unknown[] }>>,
  ) {
    const name = focusableFields.find(
      (field) => (fieldMeta[field]?.errors.length ?? 0) > 0,
    );
    const control = name && formElement.current?.elements.namedItem(name);
    if (control instanceof HTMLElement) control.focus();
  }

  const form = useAppForm({
    defaultValues,
    // Validate the whole schema on submit, then again whenever a field loses
    // focus until the next successful submission.
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    validators: { onDynamic: ContactFormValuesSchema },
    onSubmit: async ({ value, formApi }) => {
      const formData = new FormData();
      for (const [name, entry] of Object.entries(value)) {
        formData.set(name, entry);
      }

      let response: Awaited<ReturnType<typeof sendContactRequest>>;
      try {
        response = await sendContactRequest(formData);
      } catch {
        response = {
          success: false,
          message: "Something went wrong. Please try again later.",
        };
      } finally {
        // Turnstile tokens are single-use, so every attempt needs a new one.
        turnstile.current?.reset();
      }

      if (response.success) {
        toast.success("Your message has been sent successfully!", {
          description: "I'll get back to you as soon as possible.",
        });
        formApi.reset();
        return;
      }

      // Stored as submit errors, which TanStack clears when that field is
      // next edited or blurred. Other fields, including the Turnstile token
      // refreshing after the reset above, leave them in place.
      for (const [name, messages] of Object.entries(response.errors ?? {})) {
        formApi.setFieldMeta(name as keyof typeof value, (meta) => ({
          ...meta,
          errorMap: { ...meta.errorMap, onSubmit: { message: messages?.[0] } },
        }));
      }
      focusFirstInvalidField(formApi.state.fieldMeta);

      if (response.message) {
        toast.error("There was an error with your submission.", {
          description: response.message,
        });
      }
    },
    onSubmitInvalid: ({ formApi }) =>
      focusFirstInvalidField(formApi.state.fieldMeta),
  });

  return (
    <form
      {...props}
      ref={formElement}
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="name">
            {(field) => (
              <field.TextField
                label="Name"
                placeholder="Your full name"
                autoComplete="name"
                {...constraint.name}
              />
            )}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                {...constraint.email}
              />
            )}
          </form.AppField>
          <form.AppField name="message">
            {(field) => (
              <field.TextareaField
                label="Message"
                placeholder="Tell me about your project or just say hello..."
                className="min-h-24 resize-none"
                {...constraint.message}
              />
            )}
          </form.AppField>
          <form.AppField name="cf-turnstile-response">
            {(field) => <field.TurnstileField ref={turnstile} />}
          </form.AppField>
          {/* Always enabled: submitting without a Turnstile token shows its
              error under the widget instead of leaving the button inert. */}
          <Field>
            <form.SubmitButton size="lg">
              Send message
              <SendIcon />
            </form.SubmitButton>
          </Field>
        </FieldGroup>
      </form.AppForm>
    </form>
  );
}
