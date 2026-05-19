export type AccountType = "personal" | "business";


export const SignupStep = {
  AccountType: "accountType",
  Phone: "phone",
  Otp: "otp",
  OtpSuccess: "otpSuccess",
  Name: "name",
  Password: "password",
  Success: "success",
} as const;

export type SignupStep = (typeof SignupStep)[keyof typeof SignupStep];

export interface SignupFormData {
  accountType: AccountType | null;
  dialCode: string;
  phone: string;
  otp: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export type FieldError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: FieldError[];
};

export const INITIAL_SIGNUP_FORM_DATA: SignupFormData = {
  accountType: null,
  dialCode: "+91",
  phone: "",
  otp: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};
