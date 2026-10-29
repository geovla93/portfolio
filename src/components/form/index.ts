import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@/components/form/form-context";
import { SubmitButton } from "@/components/form/submit-button";
import { TextareaField, TextField } from "@/components/form/text-field";
import { TurnstileField } from "@/components/form/turnstile-field";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextareaField, TurnstileField },
  formComponents: { SubmitButton },
});
