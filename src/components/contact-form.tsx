"use client";

import { SendIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

import { useAppForm } from "@/components/form";
import type { TurnstileFieldHandle } from "@/components/form/turnstile-field";
import { Field, FieldGroup } from "@/components/ui/field";
import { checkEmailDomain, sendContactRequest } from "@/lib/actions";
import { getZodConstraint } from "@/lib/constraint";
import { ContactFormSchema } from "@/lib/schemas";

const constraint = getZodConstraint(ContactFormSchema);

const defaultValues = {
  name: "",
  email: "",
  message: "",
  "cf-turnstile-response": "",
};

type ContactFormProps = React.ComponentProps<"form">;

export function ContactForm(props: ContactFormProps) {
  const turnstile = useRef<TurnstileFieldHandle>(null);
  const form = useAppForm({
    defaultValues,
    // Always validate on submit. Otherwise a submit during the email check's
    // debounce is silently dropped because the form is still validating.
    canSubmitWhenInvalid: true,
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

      // Server errors clear as soon as the field is edited or revalidated.
      for (const [name, messages] of Object.entries(response.errors ?? {})) {
        formApi.setFieldMeta(name as keyof typeof value, (meta) => ({
          ...meta,
          errorMap: { ...meta.errorMap, onServer: { message: messages?.[0] } },
        }));
      }

      if (response.message) {
        toast.error("There was an error with your submission.", {
          description: response.message,
        });
      }
    },
  });

  return (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.AppForm>
        <FieldGroup>
          <form.AppField
            name="name"
            validators={{ onChange: ContactFormSchema.shape.name }}
          >
            {(field) => (
              <field.TextField
                label="Name"
                placeholder="Your full name"
                autoComplete="name"
                {...constraint.name}
              />
            )}
          </form.AppField>
          <form.AppField
            name="email"
            validators={{
              onChange: ContactFormSchema.shape.email,
              onChangeAsync: ({ value }) => checkEmailDomain(value),
              onChangeAsyncDebounceMs: 500,
            }}
          >
            {(field) => (
              <field.TextField
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                {...constraint.email}
              />
            )}
          </form.AppField>
          <form.AppField
            name="message"
            validators={{ onChange: ContactFormSchema.shape.message }}
          >
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
          <form.Subscribe
            selector={(state) => !state.values["cf-turnstile-response"]}
          >
            {(isUnverified) => (
              <Field>
                <form.SubmitButton size="lg" disabled={isUnverified}>
                  Send Message
                  <SendIcon className="size-5" />
                </form.SubmitButton>
              </Field>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form.AppForm>
    </form>
  );
}
