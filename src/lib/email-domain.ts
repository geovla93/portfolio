import { Resolver } from "node:dns/promises";

export const EMAIL_DOMAIN_NOT_FOUND =
  "This email domain doesn't exist. Check for typos.";

const resolver = new Resolver({ timeout: 2_000, tries: 1 });

export async function emailDomainExists(email: string) {
  try {
    await resolver.resolveMx(email.slice(email.lastIndexOf("@") + 1));
    return true;
  } catch (error) {
    // Only a definitive "no such domain" answer fails. Timeouts and other
    // resolver errors pass so a DNS outage never blocks a real sender.
    return (error as NodeJS.ErrnoException).code !== "ENOTFOUND";
  }
}
