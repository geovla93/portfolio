"use client";

import { useSelector } from "@tanstack/react-form";

import { useFormContext } from "@/components/form/form-context";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SubmitButtonProps = Omit<React.ComponentProps<typeof Button>, "type">;

export function SubmitButton({
  children,
  disabled,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);
  const isDisabled = isSubmitting || !!disabled;

  return (
    <Button
      {...props}
      type="submit"
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {isSubmitting ? (
        <>
          <Spinner />
          Submitting...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
