import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address").toLowerCase(),
  message: z
    .string()
    .nonempty("Message is required")
    .min(10, "Message must be at least 10 characters long"),
});

// The browser form also carries the Turnstile token, which the server action
// verifies separately before parsing ContactFormSchema.
export const ContactFormValuesSchema = ContactFormSchema.extend({
  "cf-turnstile-response": z
    .string()
    .nonempty("Complete the verification above"),
});
