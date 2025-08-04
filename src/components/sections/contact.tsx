import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";

export function Contact() {
  return (
    <section id="contact" className="relative py-20">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          Get In Touch
        </Badge>
        <h2 className="mb-4 text-4xl font-bold tracking-tight">
          Let&apos;s work together
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-prose text-lg">
          Have a project in mind or just want to chat? I&apos;d love to hear
          from you. Send me a message and I&apos;ll get back to you as soon as
          possible.
        </p>
      </div>

      <ContactForm className="mx-auto max-w-lg" />
    </section>
  );
}
