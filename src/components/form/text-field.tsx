"use client";

import { useSelector } from "@tanstack/react-form";
import { useId } from "react";

import { useFieldContext } from "@/components/form/form-context";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type BoundProps =
  | "id"
  | "name"
  | "value"
  | "onChange"
  | "onBlur"
  | "aria-invalid"
  | "aria-describedby";

function useTextField() {
  const field = useFieldContext<string>();
  const id = useId();
  const errorId = `${id}-error`;
  const submitted = useSelector(
    field.form.store,
    (state) => state.submissionAttempts > 0,
  );
  const { errors, isBlurred, isValidating } = field.state.meta;
  // Errors wait until the user leaves the field or submits, then follow every
  // keystroke so a fix clears them immediately. One message at a time.
  const visibleErrors = isBlurred || submitted ? errors.slice(0, 1) : [];
  const invalid = visibleErrors.length > 0;

  return {
    errorId,
    errors: visibleErrors,
    invalid,
    isValidating,
    controlProps: {
      id,
      name: field.name,
      value: field.state.value,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => field.handleChange(event.target.value),
      onBlur: field.handleBlur,
      "aria-invalid": invalid,
      "aria-describedby": invalid ? errorId : undefined,
    },
  };
}

type TextFieldProps = Omit<React.ComponentProps<typeof Input>, BoundProps> & {
  label: string;
};

function TextField({ label, className, ...props }: TextFieldProps) {
  const { controlProps, errorId, errors, invalid, isValidating } =
    useTextField();

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={controlProps.id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          {...props}
          {...controlProps}
          className={cn(isValidating && "pr-9", className)}
        />
        {isValidating && (
          <Spinner
            aria-hidden
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
          />
        )}
      </div>
      <FieldError id={errorId} errors={errors} />
    </Field>
  );
}

type TextareaFieldProps = Omit<
  React.ComponentProps<typeof Textarea>,
  BoundProps
> & {
  label: string;
};

function TextareaField({ label, ...props }: TextareaFieldProps) {
  const { controlProps, errorId, errors, invalid } = useTextField();

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={controlProps.id}>{label}</FieldLabel>
      <Textarea {...props} {...controlProps} />
      <FieldError id={errorId} errors={errors} />
    </Field>
  );
}

export { TextareaField, TextField };
