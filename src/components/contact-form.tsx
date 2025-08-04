"use client";

import { SendIcon } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ContactFormProps = React.ComponentProps<"form">;

export function ContactForm({ className, ...props }: ContactFormProps) {
  const formId = useId();

  const getFieldId = (field: string) => `${formId}-${field}`;

  return (
    <form id={formId} className={cn("space-y-6", className)} {...props}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id={`${formId}-name`}
            name="name"
            type="text"
            placeholder="Your full name"
            minLength={2}
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            placeholder="your.email@example.com"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          placeholder="What's this about?"
          minLength={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id={`${formId}-message`}
          name="message"
          placeholder="Tell me about your project or just say hello..."
          className="resize-none"
          minLength={3}
          required
        />
      </div>

      <Button type="submit" size="lg">
        Send Message
        <SendIcon className="size-5" />
      </Button>
    </form>
  );
}
