import { useMemo, useState } from "react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useSignup } from "@/features/signup/SignupContext";
import { StepNavigation } from "@/features/signup/components/StepNavigation";
import { errorsToMap } from "@/features/signup/steps/stepUtils";
import { runAsyncStep } from "@/lib/runAsyncStep";
import { validatePassword } from "@/lib/validators";
import styles from "./step.module.scss";

const SUBMIT_DELAY_MS = 1000;

const PASSWORD_HINT =
  "Minimum 8 characters with 1 uppercase, 1 number, and 1 special character";

export interface PasswordStepProps {
  readOnly?: boolean;
}

export function PasswordStep({
  readOnly = false,
}: Readonly<PasswordStepProps>) {
  const { state, dispatch } = useSignup();
  const [password, setPassword] = useState(state.password);
  const [confirmPassword, setConfirmPassword] = useState(state.confirmPassword);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  const canContinue = useMemo(() => {
    if (!password || !confirmPassword) {
      return false;
    }
    return validatePassword(password, confirmPassword).valid;
  }, [password, confirmPassword]);

  const handleContinue = () => {
    if (readOnly) {
      return;
    }

    const result = validatePassword(password, confirmPassword);
    if (!result.valid) {
      setErrors(errorsToMap(result.errors));
      return;
    }

    runAsyncStep({
      delayMs: SUBMIT_DELAY_MS,
      onSetLoading: setLoading,
      onError: (message) =>
        setErrors((current) => ({ ...current, password: message })),
      onSuccess: () => {
        dispatch({
          type: "SET_PASSWORD",
          payload: { password, confirmPassword },
        });
        dispatch({ type: "NEXT_STEP" });
      },
    });
  };

  return (
    <section
      className={styles.step}
      aria-label="Create password step"
      aria-hidden={readOnly}
    >
      <div className={styles.stack}>
        <PasswordInput
          label="New Password"
          required
          placeholder="Enter new password"
          value={password}
          hint={PASSWORD_HINT}
          showStrength
          disabled={readOnly || loading}
          onChange={(event) => {
            setErrors((current) => ({ ...current, password: null }));
            setPassword(event.target.value);
          }}
          error={errors.password ?? null}
        />
        <PasswordInput
          label="Confirm Password"
          required
          placeholder="Confirm password"
          value={confirmPassword}
          showStrength={false}
          disabled={readOnly || loading}
          onChange={(event) => {
            setErrors((current) => ({ ...current, confirmPassword: null }));
            setConfirmPassword(event.target.value);
          }}
          error={errors.confirmPassword ?? null}
        />
      </div>

      {readOnly ? null : (
        <StepNavigation
          onBack={() => dispatch({ type: "PREV_STEP" })}
          onContinue={handleContinue}
          continueDisabled={!canContinue}
          continueLoading={loading}
        />
      )}
    </section>
  );
}
