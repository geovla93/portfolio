"use client";

import { SendIcon } from "lucide-react";
import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getZodConstraint } from "@/lib/constraint";
import { ContactFormSchema } from "@/lib/schemas";
import { sendContactRequest } from "@/lib/actions";

type ContactFormProps = React.ComponentProps<"form">;

export function ContactForm({ className, ...props }: ContactFormProps) {
  const formId = useId();
  const [formState, formAction, isPending] = useActionState(
    sendContactRequest,
    null,
  );

  const constraint = getZodConstraint(ContactFormSchema);

  return (
    <form
      id={formId}
      action={formAction}
      className={cn("space-y-6", className)}
      {...props}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id={`${formId}-name`}
            name="name"
            type="text"
            defaultValue={formState?.values?.name}
            placeholder="Your full name"
            autoComplete="name"
            aria-describedby={`${formId}-name-message`}
            aria-invalid={!!formState?.errors?.name}
            {...constraint.name}
          />
          {formState?.errors?.name && (
            <small
              id={`${formId}-name-message`}
              role="alert"
              className="text-sm"
            >
              {formState.errors.name.at(0)}
            </small>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            defaultValue={formState?.values?.email}
            placeholder="your.email@example.com"
            autoComplete="email"
            aria-describedby={`${formId}-email-message`}
            aria-invalid={!!formState?.errors?.email}
            {...constraint.email}
          />
          {formState?.errors?.email && (
            <small
              id={`${formId}-email-message`}
              role="alert"
              className="text-sm"
            >
              {formState.errors.email.at(0)}
            </small>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          defaultValue={formState?.values?.subject}
          placeholder="What's this about?"
          aria-describedby={`${formId}-subject-message`}
          aria-invalid={!!formState?.errors?.subject}
          {...constraint.subject}
        />
        {formState?.errors?.subject && (
          <small
            id={`${formId}-subject-message`}
            role="alert"
            className="text-sm"
          >
            {formState.errors.subject.at(0)}
          </small>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id={`${formId}-message`}
          name="message"
          defaultValue={formState?.values?.message}
          placeholder="Tell me about your project or just say hello..."
          className="min-h-24 resize-none"
          aria-describedby={`${formId}-message-message`}
          aria-invalid={!!formState?.errors?.message}
          {...constraint.message}
        />
        {formState?.errors?.message && (
          <small
            id={`${formId}-message-message`}
            role="alert"
            className="text-sm"
          >
            {formState.errors.message.at(0)}
          </small>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        aria-disabled={isPending}
      >
        Send Message
        <SendIcon className="size-5" />
      </Button>
    </form>
  );
}
