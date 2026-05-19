import { useId, useState } from "react";
import { PhoneDialCode } from "@/components/shared/PhoneDialCode";
import { Input } from "@/components/ui/Input";
import { useSignup } from "@/features/signup/SignupContext";
import { StepNavigation } from "@/features/signup/components/StepNavigation";
import { getFieldError } from "@/features/signup/steps/stepUtils";
import { runAsyncStep } from "@/lib/runAsyncStep";
import { validatePhone } from "@/lib/validators";
import styles from "./step.module.scss";

const VERIFY_DELAY_MS = 800;

export function PhoneStep() {
  const phoneInputId = useId();
  const { state, dispatch } = useSignup();
  const [dialCode, setDialCode] = useState(state.dialCode);
  const [phone, setPhone] = useState(state.phone);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (value: string) => {
    setError(null);
    setPhone(value.replace(/\D/g, ""));
  };

  const handleContinue = () => {
    const result = validatePhone(dialCode, phone);
    if (!result.valid) {
      setError(getFieldError(result.errors, "phone"));
      return;
    }

    runAsyncStep({
      delayMs: VERIFY_DELAY_MS,
      onSetLoading: setLoading,
      onError: setError,
      onSuccess: () => {
        dispatch({
          type: "SET_PHONE",
          payload: { dialCode, phone },
        });
        dispatch({ type: "NEXT_STEP" });
      },
    });
  };

  return (
    <section className={styles.step} aria-label="Phone number step">
      <div className={styles.phoneField}>
        <label className={styles.phoneLabel} htmlFor={phoneInputId}>
          Mobile Number
          <span className={styles.phoneRequired}>*</span>
        </label>
        <div className={styles.phoneRow}>
          <PhoneDialCode
            value={dialCode}
            onChange={setDialCode}
            disabled={loading}
          />
          <div className={styles.phoneInput}>
            <Input
              id={phoneInputId}
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              maxLength={15}
              disabled={loading}
              onChange={(event) => handlePhoneChange(event.target.value)}
              error={error}
            />
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={() => dispatch({ type: "PREV_STEP" })}
        onContinue={handleContinue}
        continueDisabled={!phone}
        continueLoading={loading}
      />
    </section>
  );
}
