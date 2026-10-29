import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { socialLinks } from "@/data/social-links";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-card relative border-t"
    >
      {/* Perforation: the slip tears off the page here. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-1.5 bg-[radial-gradient(circle,var(--background)_1.75px,transparent_2.25px)] bg-[length:12px_6px] bg-repeat-x"
      />

      <div className="lattice grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-x-6 lg:py-40">
        <div className="lg:col-span-5">
          <h2
            id="contact-title"
            className="font-engraved text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1] font-[680] tracking-[-0.03em] text-balance"
          >
            Hiring, or building something?
          </h2>
          <p className="text-muted-foreground mt-8 max-w-[44ch] text-lg leading-relaxed text-pretty">
            Whether it&apos;s a technical leadership role or a product you need
            built, send me a message. It comes straight to my inbox, and
            I&apos;ll get back to you by email.
          </p>

          <ul className="mt-12 border-t">
            {socialLinks.map(({ label, handle, href }) => (
              <li key={label} className="border-b">
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:text-primary grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-4 transition-colors"
                >
                  <span className="data-label text-muted-foreground">
                    {label}
                  </span>
                  <span className="font-mono text-sm">{handle}</span>
                  <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-background border lg:col-span-6 lg:col-start-7">
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b px-6 py-3 sm:px-10">
            <p className="data-label">To: George Vlassis</p>
            <p className="data-label text-muted-foreground">Reply by email</p>
          </div>
          <ContactForm className="px-6 py-8 sm:px-10 sm:py-10" />
        </div>
      </div>
    </section>
  );
}
