import { useEffect, useState } from "react";
import { OtpInput } from "@/components/ui/OtpInput";
import { OTP_RESEND_SECONDS } from "@/lib/constants";
import { runAsyncStep } from "@/lib/runAsyncStep";
import { useSignup } from "@/features/signup/SignupContext";
import { StepNavigation } from "@/features/signup/components/StepNavigation";
import styles from "./step.module.scss";

const VERIFY_DELAY_MS = 600;

export function OtpStep() {
  const { state, dispatch } = useSignup();
  const [otp, setOtp] = useState(state.otp);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    if (secondsLeft > 0) {
      return;
    }

    setSecondsLeft(OTP_RESEND_SECONDS);
    setError(null);
  };

  const handleContinue = () => {
    if (otp.length !== 4) {
      setError("Please enter the complete 4-digit OTP");
      return;
    }

    runAsyncStep({
      delayMs: VERIFY_DELAY_MS,
      onSetLoading: setLoading,
      onError: setError,
      onSuccess: () => {
        dispatch({ type: "SET_OTP", payload: otp });
        dispatch({ type: "NEXT_STEP" });
      },
    });
  };

  return (
    <section className={styles.step} aria-label="OTP verification step">
      <OtpInput
        value={otp}
        onChange={(value) => {
          setError(null);
          setOtp(value);
        }}
        error={error ?? undefined}
        disabled={loading}
        autoFocus
      />

      <p className={styles.resend}>
        Did not receive OTP?{" "}
        <button
          type="button"
          className={styles.resendButton}
          disabled={secondsLeft > 0 || loading}
          aria-label={
            secondsLeft > 0
              ? `Resend OTP available in ${secondsLeft} seconds`
              : "Resend OTP"
          }
          onClick={handleResend}
        >
          {secondsLeft > 0 ? `Resend OTP in ${secondsLeft}s` : "Resend OTP"}
        </button>
      </p>

      <StepNavigation
        onBack={() => dispatch({ type: "PREV_STEP" })}
        onContinue={handleContinue}
        continueDisabled={otp.length !== 4}
        continueLoading={loading}
      />
    </section>
  );
}
