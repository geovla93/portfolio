"use client";

import { useId } from "react";

import { useFieldContext } from "@/components/form/form-context";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
  // The form only validates from its first submission on, so every error is
  // ready to show. One message at a time.
  const errors = field.state.meta.errors.slice(0, 1);
  const invalid = errors.length > 0;

  return {
    errorId,
    errors,
    invalid,
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
  const { controlProps, errorId, errors, invalid } = useTextField();

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={controlProps.id}>{label}</FieldLabel>
      {/* 44px tall on touch-sized screens. */}
      <Input
        className={cn("h-11 md:h-9", className)}
        {...props}
        {...controlProps}
      />
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
