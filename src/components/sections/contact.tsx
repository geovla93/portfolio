import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { socialLinks } from "@/data/social-links";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t py-16 sm:py-24"
    >
      <h2
        id="contact-title"
        className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        Hiring, or building something?
      </h2>
      <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed text-pretty">
        Whether it&apos;s a technical leadership role or a product you need
        built, send me a message. It comes straight to my inbox, and I&apos;ll
        get back to you by email.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
        <ul className="divide-y border-y md:col-span-5 md:self-start">
          {socialLinks.map(({ label, handle, href }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[6rem_1fr_auto] items-center gap-4 py-3 text-sm"
              >
                <span className="text-muted-foreground">{label}</span>
                <span className="underline-offset-4 group-hover:underline">
                  {handle}
                </span>
                <ArrowUpRightIcon className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>

        <Card className="md:col-span-7">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
