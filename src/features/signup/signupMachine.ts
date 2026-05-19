import { SIGNUP_STEPS } from "@/lib/constants";
import { SignupStep, type SignupStep as SignupStepType } from "@/types/signup";

export const STEP_TRANSITIONS: Record<
  SignupStepType,
  { next: SignupStepType; prev: SignupStepType | null }
> = {
  [SignupStep.AccountType]: {
    next: SignupStep.Phone,
    prev: null,
  },
  [SignupStep.Phone]: {
    next: SignupStep.Otp,
    prev: SignupStep.AccountType,
  },
  [SignupStep.Otp]: {
    next: SignupStep.OtpSuccess,
    prev: SignupStep.Phone,
  },
  [SignupStep.OtpSuccess]: {
    next: SignupStep.Name,
    prev: SignupStep.Otp,
  },
  [SignupStep.Name]: {
    next: SignupStep.Password,
    prev: SignupStep.OtpSuccess,
  },
  [SignupStep.Password]: {
    next: SignupStep.Success,
    prev: SignupStep.Name,
  },
  [SignupStep.Success]: {
    next: SignupStep.Success,
    prev: SignupStep.Password,
  },
};

export function getNextStep(current: SignupStepType): SignupStepType {
  return STEP_TRANSITIONS[current].next;
}

export function getPrevStep(current: SignupStepType): SignupStepType | null {
  return STEP_TRANSITIONS[current].prev;
}

export function getStepProgress(current: SignupStepType): number {
  const index = SIGNUP_STEPS.indexOf(current);
  if (index === -1) {
    return 0;
  }

  return Math.round(((index + 1) / SIGNUP_STEPS.length) * 100);
}
