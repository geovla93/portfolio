"use client";

import { SendIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { sendContactRequest } from "@/lib/actions";
import { getZodConstraint } from "@/lib/constraint";
import { ContactFormSchema } from "@/lib/schemas";

const constraint = getZodConstraint(ContactFormSchema);

type ContactFormProps = React.ComponentProps<"form">;

export function ContactForm(props: ContactFormProps) {
  const formId = useId();
  const [formState, formAction, isPending] = useActionState(
    sendContactRequest,
    null,
  );

  useEffect(() => {
    if (!formState) return;

    if (formState.success) {
      toast.success("Your message has been sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
    }

    if (!formState.success && formState.message) {
      toast.error("There was an error with your submission.", {
        description: formState.message,
      });
    }
  }, [formState]);

  return (
    <form id={formId} action={formAction} {...props}>
      <FieldGroup>
        <Field data-invalid={!!formState?.errors?.name}>
          <FieldLabel htmlFor={`${formId}-name`}>Name</FieldLabel>
          <Input
            id={`${formId}-name`}
            name="name"
            defaultValue={formState?.values?.name}
            placeholder="Your full name"
            autoComplete="name"
            aria-describedby={`${formId}-name-error`}
            aria-invalid={!!formState?.errors?.name}
            {...constraint.name}
          />
          {formState?.errors?.name && (
            <FieldError id={`${formId}-name-error`}>
              {formState.errors.name.at(0)}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={!!formState?.errors?.email}>
          <FieldLabel htmlFor={`${formId}-email`}>Email Address</FieldLabel>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            defaultValue={formState?.values?.email}
            placeholder="your.email@example.com"
            autoComplete="email"
            aria-describedby={`${formId}-email-error`}
            aria-invalid={!!formState?.errors?.email}
            {...constraint.email}
          />
          {formState?.errors?.email && (
            <FieldError id={`${formId}-email-error`}>
              {formState.errors.email.at(0)}
            </FieldError>
          )}
        </Field>

        <Field data-invalid={!!formState?.errors?.message}>
          <FieldLabel htmlFor={`${formId}-message`}>Message</FieldLabel>
          <Textarea
            id={`${formId}-message`}
            name="message"
            defaultValue={formState?.values?.message}
            placeholder="Tell me about your project or just say hello..."
            className="min-h-24 resize-none"
            aria-describedby={`${formId}-message-error`}
            aria-invalid={!!formState?.errors?.message}
            {...constraint.message}
          />
          {formState?.errors?.message && (
            <FieldError id={`${formId}-message-error`}>
              {formState.errors.message.at(0)}
            </FieldError>
          )}
        </Field>
        <Field>
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            aria-disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              <>
                Send Message
                <SendIcon className="size-5" />
              </>
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
