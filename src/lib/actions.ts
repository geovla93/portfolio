"use server";

import { checkBotId } from "botid/server";
import { z } from "zod";

import { ContactFormSchema } from "@/lib/schemas";
import { resend } from "./resend";

type ActionResponse<Schema extends z.core.$ZodType> = {
  success: boolean;
  values?: z.core.input<Schema>;
  errors?: z.core.$ZodFlattenedError<z.core.output<Schema>>["fieldErrors"];
  message?: string;
};

async function sendFollowUpEmail(name: string, to: string) {
  return resend.emails.send({
    from: "no-reply <contact@geovla.dev>",
    to: [to],
    subject: "Request received",
    html: `<p>Hi ${name},</p>
    <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
    <p>Best regards,<br/>Geovla</p>`,
  });
}

async function sendNotificationEmail(
  name: string,
  email: string,
  message: string,
) {
  const recipient = process.env.RECIPIENT_EMAIL;
  if (!recipient) {
    throw new Error("Recipient email is not defined");
  }

  return resend.emails.send({
    from: "no-reply <contact@geovla.dev>",
    to: [recipient],
    subject: "Portfolio Contact Request",
    html: `<p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>`,
  });
}
export async function sendContactRequest(
  _prevState: ActionResponse<typeof ContactFormSchema> | null,
  formData: FormData,
): Promise<ActionResponse<typeof ContactFormSchema>> {
  const rawValues = Object.fromEntries(formData.entries()) as z.core.input<
    typeof ContactFormSchema
  >;

  const verification = await checkBotId();
  if (verification.isBot) {
    return {
      success: false,
      values: rawValues,
      message: "Bot submissions are not allowed.",
    };
  }

  const parsedValues = z.safeParse(ContactFormSchema, rawValues);
  if (!parsedValues.success) {
    return {
      success: false,
      values: rawValues,
      errors: z.flattenError(parsedValues.error).fieldErrors,
    };
  }

  const { name, email, message } = parsedValues.data;

  const [followUpResult, notificationResult] = await Promise.all([
    sendFollowUpEmail(name, email),
    sendNotificationEmail(name, email, message),
  ]);

  if (followUpResult.error || notificationResult.error) {
    if (followUpResult.error) {
      console.error("Failed to send follow-up email:", followUpResult.error);
    }

    if (notificationResult.error) {
      console.error(
        "Failed to send notification email:",
        notificationResult.error,
      );
    }

    return {
      success: false,
      values: rawValues,
      message: "Failed to send email. Please try again later.",
    };
  }

  return {
    success: true,
  };
}
