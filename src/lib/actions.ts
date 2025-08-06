"use server";

import { z } from "zod";

import { ContactFormSchema } from "@/lib/schemas";

type ActionResponse<Schema extends z.core.$ZodType> = {
  success: boolean;
  values?: z.core.input<Schema>;
  errors?: z.core.$ZodFlattenedError<z.core.output<Schema>>["fieldErrors"];
  message?: string;
};

export async function sendContactRequest(
  _prevState: ActionResponse<typeof ContactFormSchema> | null,
  formData: FormData,
): Promise<ActionResponse<typeof ContactFormSchema>> {
  const rawValues = Object.fromEntries(formData.entries());

  const parsedValues = z.safeParse(ContactFormSchema, rawValues);
  if (!parsedValues.success) {
    return {
      success: false,
      values: rawValues as any,
      errors: z.flattenError(parsedValues.error).fieldErrors,
    };
  }

  return {
    success: true,
  };
}
