import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  getNextStep,
  getPrevStep,
  getStepProgress,
} from "@/features/signup/signupMachine";
import {
  INITIAL_SIGNUP_FORM_DATA,
  SignupStep,
  type AccountType,
  type SignupFormData,
  type SignupStep as SignupStepType,
} from "@/types/signup";

export interface SignupState extends SignupFormData {
  step: SignupStepType;
}

export type SignupAction =
  | { type: "SET_ACCOUNT_TYPE"; payload: AccountType }
  | {
      type: "SET_PHONE";
      payload: { dialCode: string; phone: string };
    }
  | { type: "SET_OTP"; payload: string }
  | {
      type: "SET_NAME";
      payload: { firstName: string; lastName: string };
    }
  | {
      type: "SET_PASSWORD";
      payload: { password: string; confirmPassword: string };
    }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" };

export interface SignupContextValue {
  state: SignupState;
  dispatch: Dispatch<SignupAction>;
  progress: number;
}

const SignupContext = createContext<SignupContextValue | null>(null);

const initialState: SignupState = {
  step: SignupStep.AccountType,
  ...INITIAL_SIGNUP_FORM_DATA,
};

function signupReducer(state: SignupState, action: SignupAction): SignupState {
  switch (action.type) {
    case "SET_ACCOUNT_TYPE":
      return { ...state, accountType: action.payload };
    case "SET_PHONE":
      return {
        ...state,
        dialCode: action.payload.dialCode,
        phone: action.payload.phone,
      };
    case "SET_OTP":
      return { ...state, otp: action.payload };
    case "SET_NAME":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
      };
    case "NEXT_STEP":
      return { ...state, step: getNextStep(state.step) };
    case "PREV_STEP": {
      const prev = getPrevStep(state.step);
      return prev === null ? state : { ...state, step: prev };
    }
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

interface SignupProviderProps {
  children: ReactNode;
}

export function SignupProvider({ children }: Readonly<SignupProviderProps>) {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  const value = useMemo<SignupContextValue>(
    () => ({
      state,
      dispatch,
      progress: getStepProgress(state.step),
    }),
    [state],
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
}

// Hook is intentionally co-located with SignupProvider
// eslint-disable-next-line react-refresh/only-export-components
export function useSignup(): SignupContextValue {
  const context = useContext(SignupContext);

  if (context === null) {
    throw new Error("useSignup must be used within a SignupProvider");
  }

  return context;
}
