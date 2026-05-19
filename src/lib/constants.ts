import { SignupStep, type SignupStep as SignupStepType } from "@/types/signup";

export const SIGNUP_STEPS: readonly SignupStepType[] = [
  SignupStep.AccountType,
  SignupStep.Phone,
  SignupStep.Otp,
  SignupStep.OtpSuccess,
  SignupStep.Name,
  SignupStep.Password,
  SignupStep.Success,
] as const;

export type DialCodeOption = {
  code: string;
  country: string;
  flag: string;
};

export const DIAL_CODES: readonly DialCodeOption[] = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
] as const;

export type StepTitle = {
  title: string;
  subtitle?: string;
};

export const STEP_HEADER_LABEL = "Let's get started";

export const STEP_LAYOUT_COPY = {
  title: "Create your account",
  subtitle: "Follow the steps to create your account",
} as const;

export const STEP_TITLES: Record<SignupStepType, StepTitle> = {
  [SignupStep.AccountType]: {
    title: "Choose account type",
    subtitle:
      "To join us tell us what type of account you are opening",
  },
  [SignupStep.Phone]: {
    title: "Enter your mobile number",
    subtitle: "We will send you a one-time password to verify your number",
  },
  [SignupStep.Otp]: {
    title: "OTP Verification",
    subtitle: "An OTP has been sent to your mobile number",
  },
  [SignupStep.OtpSuccess]: {
    title: "OTP Verification",
    subtitle: "Your mobile number has been verified",
  },
  [SignupStep.Name]: {
    title: "What is your name?",
    subtitle: "Enter your legal name as it appears on official documents",
  },
  [SignupStep.Password]: {
    title: "Create Password for your account",
  },
  [SignupStep.Success]: {
    title: "Create Password for your account",
  },
};

export const PLACEHOLDER_EMAIL = "jason@example.com";

export const OTP_RESEND_SECONDS = 30;
