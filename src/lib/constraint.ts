// Source: https://github.com/edmundhung/conform/blob/main/packages/conform-zod/v4/constraint.ts

import type { $ZodType, $ZodTypes, $ZodNumber, $ZodString } from "zod/v4/core";

export type Constraint = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  multiple?: boolean;
  pattern?: string;
};

const keys: Array<keyof Constraint> = [
  "required",
  "minLength",
  "maxLength",
  "min",
  "max",
  "step",
  "multiple",
  "pattern",
];

export function getZodConstraint<TSchema extends $ZodType>(
  schema: TSchema,
): Record<keyof TSchema["_zod"]["input"], Constraint> {
  function updateConstraint(
    schema: $ZodType,
    data: Record<string, Constraint>,
    name = "",
  ): void {
    const constraint = name !== "" ? (data[name] ??= { required: true }) : {};
    const def = (schema as unknown as $ZodTypes)._zod.def;

    if (def.type === "object") {
      for (const key in def.shape) {
        updateConstraint(def.shape[key], data, name ? `${name}.${key}` : key);
      }
    } else if (def.type === "pipe") {
      // FIXME: What to do with .pipe()?
      updateConstraint(def.out, data, name);
    } else if (def.type === "intersection") {
      const leftResult: Record<string, Constraint> = {};
      const rightResult: Record<string, Constraint> = {};

      updateConstraint(def.left, leftResult, name);
      updateConstraint(def.right, rightResult, name);

      Object.assign(data, leftResult, rightResult);
    } else if (
      def.type === "union" // || def.type === 'discriminatedUnion'
    ) {
      Object.assign(
        data,
        (def.options as $ZodType[])
          .map((option) => {
            const result: Record<string, Constraint> = {};

            updateConstraint(option, result, name);

            return result;
          })
          .reduce((prev, next) => {
            const list = new Set([...Object.keys(prev), ...Object.keys(next)]);
            const result: Record<string, Constraint> = {};

            for (const name of list) {
              const prevConstraint = prev[name];
              const nextConstraint = next[name];

              if (prevConstraint && nextConstraint) {
                const constraint: Constraint = {};

                result[name] = constraint;

                for (const key of keys) {
                  if (
                    typeof prevConstraint[key] !== "undefined" &&
                    typeof nextConstraint[key] !== "undefined" &&
                    prevConstraint[key] === nextConstraint[key]
                  ) {
                    // @ts-expect-error Both are on the same type
                    constraint[key] = prevConstraint[key];
                  }
                }
              } else {
                result[name] = {
                  ...prevConstraint,
                  ...nextConstraint,
                  required: false,
                };
              }
            }

            return result;
          }),
      );
    } else if (name === "") {
      // All the cases below are not allowed on root
      throw new Error("Unsupported schema");
    } else if (def.type === "array") {
      constraint.multiple = true;
      updateConstraint(def.element, data, `${name}[]`);
    } else if (def.type === "string") {
      const _schema = schema as $ZodString;
      if (_schema._zod.bag.minimum !== null) {
        constraint.minLength = _schema._zod.bag.minimum ?? undefined;
      }
      if (_schema._zod.bag.maximum !== null) {
        constraint.maxLength = _schema._zod.bag.maximum;
      }
    } else if (def.type === "optional") {
      constraint.required = false;
      updateConstraint(def.innerType, data, name);
    } else if (def.type === "default") {
      constraint.required = false;
      updateConstraint(def.innerType, data, name);
    } else if (def.type === "number") {
      const _schema = schema as $ZodNumber;
      if (_schema._zod.bag.minimum !== null) {
        constraint.min = _schema._zod.bag.minimum;
      }
      if (_schema._zod.bag.maximum !== null) {
        constraint.max = _schema._zod.bag.maximum;
      }
    } else if (def.type === "enum") {
      constraint.pattern = Object.keys(def.entries)
        .map((option: string) =>
          // To escape unsafe characters on regex
          option.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d"),
        )
        .join("|");
    } else if (def.type === "tuple") {
      for (let i = 0; i < def.items.length; i++) {
        updateConstraint(def.items[i], data, `${name}[${i}]`);
      }
    } else if (def.type === "lazy") {
      // FIXME: If you are interested in this, feel free to create a PR
    }
  }

  const result = {} as Record<keyof TSchema["_zod"]["input"], Constraint>;

  updateConstraint(schema, result);

  return result;
}
