"use client";

import Script from "next/script";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { useFieldContext } from "@/components/form/form-context";
import { Field, FieldError } from "@/components/ui/field";
import { TURNSTILE_ACTION, TURNSTILE_SITE_KEY } from "@/lib/turnstile-config";

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

export type TurnstileFieldHandle = {
  /** Clears the spent token and issues a fresh challenge. */
  reset: () => void;
};

type TurnstileFieldProps = {
  ref?: React.Ref<TurnstileFieldHandle>;
};

export function TurnstileField({ ref }: TurnstileFieldProps) {
  const field = useFieldContext<string>();
  // Stable across renders, unlike `field`, which changes with its state.
  const { handleBlur, handleChange } = field;
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [error, setError] = useState("");
  const [isNearby, setIsNearby] = useState(false);
  // A widget or script failure outranks the schema's "missing token" error.
  const errors = error ? [{ message: error }] : field.state.meta.errors;

  // The form sits at the bottom of the page, so load Cloudflare's script only
  // once it is within reach.
  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !container.current || widgetId.current !== null) {
      return;
    }

    widgetId.current = window.turnstile.render(container.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: TURNSTILE_ACTION,
      size: "flexible",
      "response-field": false,
      callback: (token) => {
        handleChange(token);
        // The widget never blurs, so revalidate here to clear a "missing
        // token" error left by an earlier submission.
        handleBlur();
        setError("");
      },
      "expired-callback": () => handleChange(""),
      "timeout-callback": () => handleChange(""),
      "error-callback": () => {
        handleChange("");
        setError("Verification failed. Please try again.");
        return true;
      },
    });
  }, [handleBlur, handleChange]);

  useEffect(() => {
    renderWidget();

    return () => {
      if (widgetId.current !== null) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [renderWidget]);

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        handleChange("");
        if (widgetId.current !== null) {
          window.turnstile?.reset(widgetId.current);
        }
      },
    }),
    [handleChange],
  );

  return (
    <Field data-invalid={errors.length > 0}>
      {isNearby && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          onReady={renderWidget}
          onError={() => {
            handleChange("");
            setError(
              "Verification could not load. Refresh the page and try again.",
            );
          }}
        />
      )}
      <input type="hidden" name={field.name} value={field.state.value} />
      {/* Reserves the flexible widget's 65px so the form doesn't shift. */}
      <div ref={container} className="min-h-[65px]" />
      <FieldError errors={errors.slice(0, 1)} />
      <noscript>Enable JavaScript to verify and send your message.</noscript>
    </Field>
  );
}
