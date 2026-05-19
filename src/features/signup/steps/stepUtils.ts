import type { FieldError } from "@/types/signup";

export function getFieldError(
  errors: FieldError[],
  field: string,
): string | null {
  return errors.find((entry) => entry.field === field)?.message ?? null;
}

export function errorsToMap(
  errors: FieldError[],
): Record<string, string | null> {
  return errors.reduce<Record<string, string | null>>((accumulator, error) => {
    accumulator[error.field] = error.message;
    return accumulator;
  }, {});
}
