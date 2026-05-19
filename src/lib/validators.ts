import type { FieldError, ValidationResult } from "@/types/signup";

const OTP_LENGTH = 4;
const MIN_PHONE_LENGTH_DEFAULT = 7;
const IN_DIAL_CODE = "+91";
const IN_PHONE_LENGTH = 10;
const MIN_NAME_LENGTH = 2;
const LETTERS_ONLY = /^[A-Za-z]+$/;

const PASSWORD_MIN_LENGTH = 8;
const HAS_UPPERCASE = /[A-Z]/;
const HAS_NUMBER = /\d/;
const HAS_SPECIAL = /[^A-Za-z0-9]/;

function success(): ValidationResult {
  return { valid: true, errors: [] };
}

function failure(errors: FieldError[]): ValidationResult {
  return { valid: false, errors };
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function validatePhone(
  dialCode: string,
  number: string,
): ValidationResult {
  const phone = digitsOnly(number);
  const errors: FieldError[] = [];

  if (!phone) {
    errors.push({ field: "phone", message: "Mobile number is required" });
    return failure(errors);
  }

  if (dialCode === IN_DIAL_CODE) {
    if (phone.length !== IN_PHONE_LENGTH) {
      errors.push({
        field: "phone",
        message: "Indian mobile number must be 10 digits",
      });
    }
  } else if (phone.length < MIN_PHONE_LENGTH_DEFAULT) {
    errors.push({
      field: "phone",
      message: "Please enter a valid mobile number",
    });
  }

  return errors.length > 0 ? failure(errors) : success();
}

export function validateOtp(otp: string): ValidationResult {
  const digits = digitsOnly(otp);
  const errors: FieldError[] = [];

  if (!digits) {
    errors.push({ field: "otp", message: "OTP is required" });
    return failure(errors);
  }

  if (digits.length !== OTP_LENGTH) {
    errors.push({
      field: "otp",
      message: `OTP must be ${OTP_LENGTH} digits`,
    });
    return failure(errors);
  }

  return success();
}

function validateNameField(
  value: string,
  field: "firstName" | "lastName",
  label: string,
  errors: FieldError[],
): void {
  const trimmed = value.trim();

  if (!trimmed) {
    errors.push({ field, message: `${label} is required` });
    return;
  }

  if (trimmed.length < MIN_NAME_LENGTH) {
    errors.push({
      field,
      message: `${label} must be at least ${MIN_NAME_LENGTH} characters`,
    });
    return;
  }

  if (!LETTERS_ONLY.test(trimmed)) {
    errors.push({
      field,
      message: `${label} must contain letters only`,
    });
  }
}

export function validateName(first: string, last: string): ValidationResult {
  const errors: FieldError[] = [];

  validateNameField(first, "firstName", "First name", errors);
  validateNameField(last, "lastName", "Last name", errors);

  return errors.length > 0 ? failure(errors) : success();
}

export function validatePassword(
  password: string,
  confirm: string,
): ValidationResult {
  const errors: FieldError[] = [];

  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  } else {
    if (password.length < PASSWORD_MIN_LENGTH) {
      errors.push({
        field: "password",
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
      });
    }
    if (!HAS_UPPERCASE.test(password)) {
      errors.push({
        field: "password",
        message: "Password must include at least one uppercase letter",
      });
    }
    if (!HAS_NUMBER.test(password)) {
      errors.push({
        field: "password",
        message: "Password must include at least one number",
      });
    }
    if (!HAS_SPECIAL.test(password)) {
      errors.push({
        field: "password",
        message: "Password must include at least one special character",
      });
    }
  }

  if (!confirm) {
    errors.push({
      field: "confirmPassword",
      message: "Please confirm your password",
    });
  } else if (password && password !== confirm) {
    errors.push({
      field: "confirmPassword",
      message: "Passwords do not match",
    });
  }

  return errors.length > 0 ? failure(errors) : success();
}
