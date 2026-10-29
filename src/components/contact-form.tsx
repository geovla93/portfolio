"use client";

import { SendIcon } from "lucide-react";
import Script from "next/script";
import {
  useActionState,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
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
import { TURNSTILE_ACTION, TURNSTILE_SITE_KEY } from "@/lib/turnstile-config";

const constraint = getZodConstraint(ContactFormSchema);

type ContactFormProps = React.ComponentProps<"form">;

type Turnstile = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      size: "flexible";
      "response-field": false;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "timeout-callback": () => void;
      "error-callback": () => boolean;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

export function ContactForm(props: ContactFormProps) {
  const formId = useId();
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [formState, formAction, isPending] = useActionState(
    async (...args: Parameters<typeof sendContactRequest>) => {
      try {
        return await sendContactRequest(...args);
      } finally {
        setToken("");
        if (widgetId.current !== null) {
          window.turnstile?.reset(widgetId.current);
        }
      }
    },
    null,
  );

  const renderTurnstile = useCallback(() => {
    if (
      !window.turnstile ||
      !turnstileContainer.current ||
      widgetId.current !== null
    ) {
      return;
    }

    widgetId.current = window.turnstile.render(turnstileContainer.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: TURNSTILE_ACTION,
      size: "flexible",
      "response-field": false,
      callback: (response) => {
        setToken(response);
        setVerificationError("");
      },
      "expired-callback": () => setToken(""),
      "timeout-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setVerificationError("Verification failed. Please try again.");
        return true;
      },
    });
  }, []);

  useEffect(() => {
    renderTurnstile();

    return () => {
      if (widgetId.current !== null) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [renderTurnstile]);

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
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={renderTurnstile}
        onError={() => {
          setToken("");
          setVerificationError(
            "Verification could not load. Refresh the page and try again.",
          );
        }}
      />
      <input type="hidden" name="cf-turnstile-response" value={token} />
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
        <Field data-invalid={!!verificationError}>
          <div ref={turnstileContainer} />
          {verificationError && <FieldError>{verificationError}</FieldError>}
          <noscript>
            Enable JavaScript to verify and send your message.
          </noscript>
        </Field>
        <Field>
          <Button
            type="submit"
            size="lg"
            disabled={isPending || !token}
            aria-disabled={isPending || !token}
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
